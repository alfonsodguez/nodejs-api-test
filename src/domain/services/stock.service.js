import { STOCK_ZONES_ENUM, STATES_STOCK_VALUES, STATES_STOCK } from './enums.js';
import DeliveryProposal from '../entities/deliveryProposal.entity.js';

class StockService {
    assignStockToDeliveryProposal({ deliveryProposal, stocks }) {
      if (!deliveryProposal || !stocks.length) {
        return [{ error: 'InvalidArgumentError',  message: 'Invalid deliveryProposal or stock' }]
      }

      const deliveryProposalEntity = new DeliveryProposal(deliveryProposal);
      let { propuesta: proposal, tiendaId: idTienda , key } = deliveryProposalEntity

      if (!proposal) {
        return [{ error: 'InvalidArgumentError',  message: 'Invalid proposal', idTienda, key }]
      }

      let remaining = proposal
      const allocation = []
      const filteredStock = stocks.sort(arrangeByStockZone)

      if (deliveryProposalEntity.isOnlineShop()) {
        assignStock(STATES_STOCK.EM05)

        if (remaining) {
          assignStock(STATES_STOCK.EM01)
        }
      } else {
        assignStock(STATES_STOCK.EM01)
      }

      if (remaining) {
        return [{ error: 'InsufficientStockError', message: 'Not enough stock available',  idTienda, key }]
      }

      return allocation

      function assignStock(stateStock) {
        for (const stock of filteredStock) {
          if (remaining <= 0) {
            break
          }

          const availableStock = stock[stateStock]

          if (availableStock) {
            const toAllocate = Math.min(availableStock, remaining)

            allocation.push({
              Key: stock.key,
              idTienda: deliveryProposal.tiendaId,
              propuesta: toAllocate,
              tipoStockDesc: stock.tipoStockDesc,
              EstadoStock: STATES_STOCK_VALUES[stateStock]
            })

            remaining -= toAllocate
          }
        }
      }

      function arrangeByStockZone(stock1, stock2) {
        return STOCK_ZONES_ENUM.indexOf(stock1.tipoStockDesc) - STOCK_ZONES_ENUM.indexOf(stock2.tipoStockDesc)
      }
    }
}

export default StockService;