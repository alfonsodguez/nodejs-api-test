class AssignStockToDeliveryProposalUseCase {
    constructor(stockRepository, deliveryProposalRepository, stockService, updateStockPositionService) {
        this.deliveryProposalRepository = deliveryProposalRepository;
        this.stockRepository = stockRepository;
        this.stockService = stockService;
        this.updateStockPositionService = updateStockPositionService;
    }

    async execute(deliveryProposalKey) {
        const deliveryProposal = await this.deliveryProposalRepository.findByKey(deliveryProposalKey);
        const stocks = await this.stockRepository.findByKey(deliveryProposalKey);

        const proposalAllocation =  this.stockService.assignStockToDeliveryProposal({ deliveryProposal, stocks })
        await this.updateStockPositionService.updateStockPositions(proposalAllocation);

        return proposalAllocation
    }
}

export default AssignStockToDeliveryProposalUseCase;