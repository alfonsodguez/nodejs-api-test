import mongoose from "mongoose"

const deliveryProposalSchema = new mongoose.Schema({
    key: { type: String },
    propuesta: { type: Number },
    tiendaId: { type: String },
    grupoLocalizacionDesc: { type: String },
    esEcommerce: { type: Number, enum: [0, 1] },
})

const DeliveryProposalModel = mongoose.model('DeliveryProposal', deliveryProposalSchema)
export default DeliveryProposalModel