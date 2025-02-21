import StockRepository from '../../domain/repositories/stockRepository.repository.js';
import StockModel from '../models/stock.model.js';

class MongoStockRepository extends StockRepository {
    async findAll() {  
        return StockModel.find().lean();
    }

    async findByKey(key) {
        const stock = await StockModel.find({ key }).lean();

        if (!stock) {
            return null
        }

        return stock
    }

    async findOneAndUpdate(filter, update) {
        return StockModel.findOneAndUpdate(filter, update, { new: true }).lean()
    }

    async insertMany(stocks) {
        return StockModel.insertMany(stocks);
    }

    async insertOne(stock) {
        return StockModel.insertOne(stock);
    }

    async deleteAll() {
        return StockModel.deleteMany({});
    }
}

export default MongoStockRepository;