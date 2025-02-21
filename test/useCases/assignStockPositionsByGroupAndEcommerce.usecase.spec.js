import AssignStockPositionsByGroupAndEcommerceUseCase from '../../src/application/useCases/assignStockPositionsByGroupAndEcommerce.usecase.js';
import StockService from '../../src/domain/services/stock.service.js';
import { stockMother } from '../mothers/stock.mother.js';
import { deliveryProposalMother } from '../mothers/deliveryProposal.mother.js';
import { createDeliveryProposal } from '../factories/deliveryProposal.factory.js';
import StockRepository from '../../src/infrastructure/repositories/mongo.stock.repository.js';
import DeliveryProposalRepository from '../../src/infrastructure/repositories/mongo.proposal.repository.js';
import UpdateStockPositionService from '../../src/domain/services/updateStockPosition.service.js';

describe('AssignStockPositionsByGroupAndEcommerceUseCase', () => {
    let stockRepository;
    let deliveryProposalRepository;
    let stockService;
    let updateStockService
    let useCase;

    beforeEach(() => {
        stockRepository = new StockRepository();
        deliveryProposalRepository = new DeliveryProposalRepository();
        stockService = new StockService();
        updateStockService = new UpdateStockPositionService(stockRepository);
        useCase = new AssignStockPositionsByGroupAndEcommerceUseCase(stockRepository, deliveryProposalRepository, stockService, updateStockService);
    });

    context('on yellow brick road', () => {
        const deliveryProposals = deliveryProposalMother();
        const stocks = stockMother();

        beforeEach(async () => {
            await deliveryProposalRepository.insertMany(deliveryProposals);
            await stockRepository.insertMany(stocks);
        })

        it('should assign stock to delivery proposals based on criteria', async () => {
            const result = await useCase.execute({
                grupoLocalizacionDesc: ['CICLO 2 GRUPO A2', 'CICLO 1 GRUPO B', 'CICLO 1 GRUPO A2'],
                esEcommerce: 1
            });
    
            expect(result).to.be.an('array').with.lengthOf(9);
            expect(result).to.deep.include.members([
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 6, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 6, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 8, tipoStockDesc: 'SILO', EstadoStock: 5 }, 
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 5, tipoStockDesc: 'MSR', EstadoStock: 5 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 10, tipoStockDesc: 'MSR', EstadoStock: 5 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 10, tipoStockDesc: 'MSR', EstadoStock: 1 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 5, tipoStockDesc: 'MSR', EstadoStock: 1 },
                { Key: '555/410/990/99/V2024', idTienda: '12787', propuesta: 7, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '555/410/990/99/V2024', idTienda: '12787', propuesta: 3, tipoStockDesc: 'ZAR', EstadoStock: 1 }
            ]);
        });
    })
   
    context('when there are not sufficient stock', () => {
        const deliveryProposals = deliveryProposalMother();
        const stocks = stockMother();

        const insufficienteProposal = { propuesta: 2000, esEcommerce: 1, tiendaId: 12777, key: '123/410/990/99/V2024' }
        deliveryProposals.push(createDeliveryProposal(insufficienteProposal))

        beforeEach(async () => {
            await deliveryProposalRepository.insertMany(deliveryProposals);
            await stockRepository.insertMany(stocks);
        })

        it('should return InsufficientStockError', async () => {
             const result = await useCase.execute({
                grupoLocalizacionDesc: ['CICLO 2 GRUPO A2', 'CICLO 1 GRUPO B', 'CICLO 1 GRUPO A2'],
                esEcommerce: 1
            })

            expect(result).to.be.an('array').with.lengthOf(10);
            expect(result).to.deep.include.members([
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 6, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 6, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 8, tipoStockDesc: 'SILO', EstadoStock: 5 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 5, tipoStockDesc: 'MSR', EstadoStock: 5 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 10, tipoStockDesc: 'MSR', EstadoStock: 5 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 10, tipoStockDesc: 'MSR', EstadoStock: 1 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 5, tipoStockDesc: 'MSR', EstadoStock: 1  },
                { Key: '555/410/990/99/V2024', idTienda: '12787', propuesta: 7, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '555/410/990/99/V2024', idTienda: '12787',  propuesta: 3, tipoStockDesc: 'ZAR',  EstadoStock: 1 },
                { error: 'InvalidArgumentError', message: 'Invalid deliveryProposal or stock' }
            ]);
        });
    })

    context('on invalid proposal', () => {
        const deliveryProposals = deliveryProposalMother();
        const stocks = stockMother();

        const invalidProposal = { propuesta: 0, esEcommerce: 1, tiendaId: 12777, key: '123/410/990/99/V2024' }
        deliveryProposals.push(createDeliveryProposal(invalidProposal))

        beforeEach(async () => {
            await deliveryProposalRepository.insertMany(deliveryProposals);
            await stockRepository.insertMany(stocks);
        })

        it('should return InsufficientStockError', async () => {            
            const result = await useCase.execute({
                grupoLocalizacionDesc: ['CICLO 2 GRUPO A2', 'CICLO 1 GRUPO B', 'CICLO 1 GRUPO A2'],
                esEcommerce: 1
            })

            expect(result).to.be.an('array').with.lengthOf(10);
            expect(result).to.deep.include.members([
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 6, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 6, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '333/410/990/99/V2024', idTienda: '12781', propuesta: 8, tipoStockDesc: 'SILO', EstadoStock: 5 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 5, tipoStockDesc: 'MSR', EstadoStock: 5 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 10, tipoStockDesc: 'MSR', EstadoStock: 5 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 10, tipoStockDesc: 'MSR', EstadoStock: 1 },
                { Key: '666/410/990/99/V2024', idTienda: '12781', propuesta: 5, tipoStockDesc: 'MSR', EstadoStock: 1 },
                { Key: '555/410/990/99/V2024', idTienda: '12787', propuesta: 7, tipoStockDesc: 'ZAR', EstadoStock: 5 },
                { Key: '555/410/990/99/V2024', idTienda: '12787', propuesta: 3, tipoStockDesc: 'ZAR', EstadoStock: 1 },
                { error: 'InvalidArgumentError', message: 'Invalid deliveryProposal or stock'},       
            ]);
        });
    })
});