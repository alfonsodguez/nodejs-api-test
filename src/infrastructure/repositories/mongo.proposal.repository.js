import DeliveryProposalRepository from '../../domain/repositories/deliveryProposal.repository.js';
import DeliveryProposalModel from '../models/deliveryProposal.model.js';

class MongoDeliveryProposalRepository extends DeliveryProposalRepository {
    async find(criteria) {
        return DeliveryProposalModel.find(criteria).lean();
    }

    async findByKey(key) {
        const delivery = await DeliveryProposalModel.findOne({ key }).lean();

        if (!delivery) {
            return null
        }

        return delivery
    }

    async insertMany(deliveryProposals) {
        return DeliveryProposalModel.insertMany(deliveryProposals);
    }

    async insertOne(deliveryProposal) {
        return DeliveryProposalModel.insertOne(deliveryProposal);
    }

    async deleteAll() {
        return DeliveryProposalModel.deleteMany({});
    }
}

export default MongoDeliveryProposalRepository;