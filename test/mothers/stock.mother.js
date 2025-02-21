import { createStock } from '../factories/stock.factory.js';

export const stockMother = () => [
    createStock('333/410/990/99/V2024', { tipoStockDesc: 'ZAR', stockEm01: 20, stockEm05: 6,  posicioncompleta: 'P-RB1-012-B-443' }),
    createStock('333/410/990/99/V2024', { tipoStockDesc: 'ZAR', stockEm01: 20, stockEm05: 6,  posicioncompleta: 'P-RB1-012-B-123' }),
    createStock('333/410/990/99/V2024', { tipoStockDesc: 'SILO', stockEm01: 5, stockEm05: 77, posicioncompleta: 'P-RB1-012-B-637' }),
    createStock('666/410/990/99/V2024', { tipoStockDesc: 'MSR', stockEm01: 10, stockEm05: 5,  posicioncompleta: 'P-RB1-012-B-456' }),
    createStock('666/410/990/99/V2024', { tipoStockDesc: 'MSR', stockEm01: 15, stockEm05: 10, posicioncompleta: 'P-RB1-012-B-789' }),
    createStock('999/410/990/99/V2024', { tipoStockDesc: 'MSR', stockEm01: 25, stockEm05: 15, posicioncompleta: 'P-RB1-012-B-101' }),
    createStock('111/410/990/99/V2024', { tipoStockDesc: 'MSR', stockEm05: 4,  stockEm01: 20, posicioncompleta: 'P-RB1-012-B-637' }),
    createStock('222/410/990/99/V2024', { tipoStockDesc: 'ZAR', stockEm05: 24, stockEm01: 11, posicioncompleta: 'P-RB1-012-B-456' }),
    createStock('444/410/990/99/V2024', { tipoStockDesc: 'MSR', stockEm05: 12, stockEm01: 33, posicioncompleta: 'P-RB1-012-B-789' }),
    createStock('555/410/990/99/V2024', { tipoStockDesc: 'ZAR', stockEm05: 7,  stockEm01: 15, posicioncompleta: 'P-RB1-012-B-101' })
];