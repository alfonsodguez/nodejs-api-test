import { PROPOSE_STATE_STOCK } from "./enums.js";

class UpdateStockPositionService {
    constructor(stockRepository) {
        this.stockRepository = stockRepository;
    }

    async updateStockPositions(proposalAllocation) {
        for (const proposal of proposalAllocation) {
            const filter = { key: proposal.Key };
            const update = {};

            if (proposal.EstadoStock === PROPOSE_STATE_STOCK.PHYSICAL_SHOP) {
                update.stockEm05 = proposal.propuesta;
            } else if (proposal.EstadoStock === PROPOSE_STATE_STOCK.ONLINE_SHOP) {
                update.stockEm01 = proposal.propuesta;
            }

            await this.stockRepository.findOneAndUpdate(filter, update);
        }
    }
}

export default UpdateStockPositionService;