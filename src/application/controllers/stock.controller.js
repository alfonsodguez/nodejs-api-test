class StockController {
    constructor(assignStockPositionsByGroupAndEcommerceUseCase, assignStockToDeliveryProposalUseCase) {
        this.assignStockPositionsByGroupAndEcommerceUseCase = assignStockPositionsByGroupAndEcommerceUseCase;
        this.assignStockToDeliveryProposalUseCase = assignStockToDeliveryProposalUseCase;
    }

    async assignStockPositionsByGroupAndEcommerce(req, res) {
        const { grupoLocalizacionDesc, esEcommerce } = req.body;
        try {
            const result = await this.assignStockPositionsByGroupAndEcommerceUseCase.execute({ grupoLocalizacionDesc, esEcommerce });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async assignStockToDeliveryProposal(req, res) {
        const { deliveryProposalKey } = req.body;
        try {
            const result = await this.assignStockToDeliveryProposalUseCase.execute(deliveryProposalKey);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default StockController;