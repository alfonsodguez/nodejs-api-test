import StockRepository from "../../infrastructure/repositories/mongo.stock.repository.js";
import DeliveryProposalRepository from "../../infrastructure/repositories/mongo.proposal.repository.js";
import StockService from "../../domain/services/stock.service.js";
import UpdateStockPositionService from "../../domain/services/updateStockPosition.service.js";
import AssignStockPositionsByGroupAndEcommerceUseCase from "../useCases/assignStockPositionsByGroupAndEcommerce.usecase.js";
import AssignStockToDeliveryProposalUseCase from "../useCases/assignStockToDeliveryProposal.usecase.js";

const stockRepository = new StockRepository();
const deliveryProposalRepository = new DeliveryProposalRepository();
const stockService = new StockService();
const updateStockPositionService = new UpdateStockPositionService(stockRepository);

const assignStockPositionsByGroupAndEcommerceUseCase = new AssignStockPositionsByGroupAndEcommerceUseCase(
    stockRepository,
    deliveryProposalRepository,
    stockService,
    updateStockPositionService
);

const assignStockToDeliveryProposalUseCase = new AssignStockToDeliveryProposalUseCase(
    stockRepository,
    deliveryProposalRepository,
    stockService,
    updateStockPositionService
);

const stockController = new StockController(
    assignStockPositionsByGroupAndEcommerceUseCase,
    assignStockToDeliveryProposalUseCase
);

export {
    assignStockPositionsByGroupAndEcommerceUseCase,
    assignStockToDeliveryProposalUseCase
};