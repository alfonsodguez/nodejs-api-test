import { v4 as uuidv4 } from 'uuid';
import Stock from '../../src/domain/entities/stock.entity.js'

export const createStock = (key, overrides = {}) => {
    const base = {
        key,
        tipoStockDesc: ['ZAR', 'MSR', 'SILO'][Math.floor(Math.random() * 3)],
        stockEm05: Math.floor(Math.random() * 100),
        stockEm01: Math.floor(Math.random() * 100),
        posicioncompleta: uuidv4(),
    }

    return {...base, ...overrides};
};