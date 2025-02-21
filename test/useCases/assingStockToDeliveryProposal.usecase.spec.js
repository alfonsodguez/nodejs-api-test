import StockService from '../../src/domain/services/stock.service.js';
import { stockMother } from '../mothers/stock.mother.js';
import { deliveryProposalMother } from '../mothers/deliveryProposal.mother.js';
import StockRepository from '../../src/infrastructure/repositories/mongo.stock.repository.js';
import UpdateStockPositionService from '../../src/domain/services/updateStockPosition.service.js';
import DeliveryProposalRepository from '../../src/infrastructure/repositories/mongo.proposal.repository.js';
import AssignStockToDeliveryProposalUseCase from '../../src/application/useCases/assignStockToDeliveryProposal.usecase.js';

describe('AssignStockToDeliveryProposalUseCase', () => {
    let stockRepository;
    let deliveryProposalRepository;
    let stockService;
    let updateStockService;
    let useCase;

    beforeEach(() => {
        stockRepository = new StockRepository();
        deliveryProposalRepository = new DeliveryProposalRepository();
        stockService = new StockService();
        updateStockService = new UpdateStockPositionService(stockRepository);
        useCase = new AssignStockToDeliveryProposalUseCase(stockRepository, deliveryProposalRepository, stockService, updateStockService);
    });

    context('on yellow brick road', () => {
        const deliveryProposal = deliveryProposalMother()[0];
        const stocks = stockMother();

        beforeEach(async () => {
            await deliveryProposalRepository.insertOne(deliveryProposal);
            await stockRepository.insertMany(stocks);
        })

        it('should assign stock to delivery proposal', async () => {
            const result = await useCase.execute(deliveryProposal.key);

            expect(result).to.be.an('array').with.lengthOf(3);
            expect(result).to.deep.include.members([
                { Key: '333/410/990/99/V2024', idTienda: '12780', propuesta: 20, tipoStockDesc: 'ZAR', EstadoStock: 1 },
                { Key: '333/410/990/99/V2024', idTienda: '12780', propuesta: 20, tipoStockDesc: 'ZAR', EstadoStock: 1 },
                { Key: '333/410/990/99/V2024', idTienda: '12780', propuesta: 1, tipoStockDesc: 'SILO', EstadoStock: 1 }
            ]);
        })
    })

    context('when the delivery proposal is for an online shop', () => {
        const deliveryProposal = deliveryProposalMother({ esEcommerce: 1 })[0];
        const stocks = stockMother();

        beforeEach(async () => {
            await deliveryProposalRepository.insertOne(deliveryProposal);
            await stockRepository.insertMany(stocks);
        })

        it('should assign stock to delivery proposal', async () => {
            const result = await useCase.execute(deliveryProposal.key);

            expect(result).to.be.an('array').with.lengthOf(3);
            expect(result).to.deep.include.members([
                { Key: '333/410/990/99/V2024', idTienda: '12780', propuesta: 6,  tipoStockDesc: 'ZAR',  EstadoStock: 5 },
                { Key: '333/410/990/99/V2024', idTienda: '12780', propuesta: 6,  tipoStockDesc: 'ZAR',  EstadoStock: 5 },
                { Key: '333/410/990/99/V2024', idTienda: '12780', propuesta: 29, tipoStockDesc: 'SILO', EstadoStock: 5 },
            ]);
        });
    })

    context('when there are not stocks', () => {
        const deliveryProposal = deliveryProposalMother()[0];
        const stocks = []

        beforeEach(async () => {
            await deliveryProposalRepository.insertOne(deliveryProposal);
            await stockRepository.insertMany(stocks);
        })

        it('should return InvalidArgumentError', async () => {
            const result = await useCase.execute(deliveryProposal.key);

            expect(result).to.be.an('array').with.lengthOf(1);
            expect(result).to.deep.include.members([
                { error: 'InvalidArgumentError', message: 'Invalid deliveryProposal or stock' }
            ])
        });
    })

    context('when there is not deliveryProposal', () => {
        const stocks = stockMother();
        const deliveryProposalKey = 'invalid-key';
        
        beforeEach(async () => {
            await stockRepository.insertMany(stocks);
        })

        it('should return InvalidArgumentError', async () => {
            const result = await useCase.execute(deliveryProposalKey);

            expect(result).to.be.an('array').with.lengthOf(1);
            expect(result).to.deep.include.members([
                { error: 'InvalidArgumentError', message: 'Invalid deliveryProposal or stock' }
            ])
        });
    })

    context('when there are not sufficient stock', () => {
        const deliveryProposal = deliveryProposalMother({ propuesta: 100 })[0];
        const stocks = stockMother();

        beforeEach(async () => {
            await deliveryProposalRepository.insertOne(deliveryProposal);
            await stockRepository.insertMany(stocks);
        })

        it('should return InsufficientStockError', async () => {
            const result = await useCase.execute(deliveryProposal.key);

            expect(result).to.be.an('array').with.lengthOf(1);
            expect(result).to.deep.include.members([
                { error: 'InsufficientStockError', message: 'Not enough stock available',  idTienda: deliveryProposal.tiendaId, key: deliveryProposal.key }
            ])
        });
    })

    context('when proposal is invalid', () => {
        const deliveryProposal = deliveryProposalMother({ propuesta: 0 })[0];
        const stocks = stockMother();

        beforeEach(async () => {
            await deliveryProposalRepository.insertOne(deliveryProposal);
            await stockRepository.insertMany(stocks);
        })

        it('should throw an InsufficientStockError', async () => {
            const result = await useCase.execute(deliveryProposal.key);

            expect(result).to.be.an('array').with.lengthOf(1);
            expect(result).to.deep.include.members([
                { error: 'InvalidArgumentError', message: 'Invalid proposal',  idTienda: deliveryProposal.tiendaId, key: deliveryProposal.key }
            ])
        });
    })
});