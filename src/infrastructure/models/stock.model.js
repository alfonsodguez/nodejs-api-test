import mongoose from "mongoose"
import { STOCK_TYPES_ENUM } from "./enums.js"

const stockSchema = new mongoose.Schema({
    key: { type: String },
    tipoStockDesc: { type: String, enum: STOCK_TYPES_ENUM },
    stockEm05: { type: Number },
    stockEm01: { type: Number },
    posicioncompleta: { type: String },
})
  
const StockModel = mongoose.model('Stock', stockSchema)
export default StockModel