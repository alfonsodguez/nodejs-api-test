class AssignStockPositionsByGroupAndEcommerceUseCase {
    constructor(stockRepository, deliveryProposalRepository, stockService, updateStockPositionService) {
        this.deliveryProposalRepository = deliveryProposalRepository;
        this.stockRepository = stockRepository;
        this.stockService = stockService;
        this.updateStockPositionService = updateStockPositionService;
    }

    async execute({ grupoLocalizacionDesc, esEcommerce }) {
        const deliveryProposals = await this.deliveryProposalRepository.find({
            grupoLocalizacionDesc: { $in: grupoLocalizacionDesc },
            esEcommerce
        });

        const allocation = [];

        for (const deliveryProposal of deliveryProposals) {
            const stocks = await this.stockRepository.findByKey(deliveryProposal.key);
            
            const proposalAllocation = this.stockService.assignStockToDeliveryProposal({ deliveryProposal, stocks });
            allocation.push(...proposalAllocation);

            await this.updateStockPositionService.updateStockPositions(proposalAllocation);
        }

        return allocation;
    }
}

export default AssignStockPositionsByGroupAndEcommerceUseCase;