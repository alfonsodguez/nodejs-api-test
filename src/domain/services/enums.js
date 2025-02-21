export const STOCK_ZONES = {
    ZAR: 'ZAR', 
    MSR: 'MSR', 
    SILO: 'SILO',
}
export const STOCK_ZONES_ENUM = Object.values(STOCK_ZONES)

export const STATES_STOCK = {
    EM01: 'stockEm01',
    EM05: 'stockEm05',
}
export const STATES_STOCK_ENUM = Object.values(STATES_STOCK)

export const STATES_STOCK_VALUES = {
    'stockEm01': 1,
    'stockEm05': 5,
}
export const STATES_STOCK_VALUES_ENUM = Object.values(STATES_STOCK_VALUES)

export const PROPOSE_STATE_STOCK = {
    'PHYSICAL_SHOP': 1,
    'ONLINE_SHOP': 5
} 
export const PROPOSE_STATE_STOCK_ENUM = Object.values(PROPOSE_STATE_STOCK)
