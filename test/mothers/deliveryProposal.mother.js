import { createDeliveryProposal } from "../factories/deliveryProposal.factory.js";

export const deliveryProposalMother = (overrides = {}) => [
    createDeliveryProposal({ key: '333/410/990/99/V2024', propuesta: 41, esEcommerce: 0, tiendaId:'12780', grupoLocalizacionDesc: 'CICLO 1 GRUPO A2', ...overrides }),
    createDeliveryProposal({ key: '333/410/990/99/V2024', propuesta: 20, esEcommerce: 1, tiendaId:'12781', grupoLocalizacionDesc: 'CICLO 2 GRUPO A2', ...overrides }),
    createDeliveryProposal({ key: '333/410/990/99/V2024', propuesta: 30, esEcommerce: 0, tiendaId:'12782', grupoLocalizacionDesc: 'CICLO 1 GRUPO B', ...overrides }),
    createDeliveryProposal({ key: '666/410/990/99/V2024', propuesta: 30, esEcommerce: 1, tiendaId:'12781', grupoLocalizacionDesc: 'CICLO 2 GRUPO A2', ...overrides }),
    createDeliveryProposal({ key: '666/410/990/99/V2024', propuesta: 25, esEcommerce: 0, tiendaId:'12783', grupoLocalizacionDesc: 'CICLO 3 GRUPO A1', ...overrides }),
    createDeliveryProposal({ key: '999/410/990/99/V2024', propuesta: 50, esEcommerce: 0, tiendaId:'12782', grupoLocalizacionDesc: 'CICLO 1 GRUPO B', ...overrides }),
    createDeliveryProposal({ key: '111/410/990/99/V2024', propuesta: 20, esEcommerce: 1, tiendaId:'12783', grupoLocalizacionDesc: 'CICLO 3 GRUPO A1', ...overrides }),
    createDeliveryProposal({ key: '222/410/990/99/V2024', propuesta: 15, esEcommerce: 0, tiendaId:'12784', grupoLocalizacionDesc: 'CICLO 2 GRUPO B', ...overrides }),
    createDeliveryProposal({ key: '444/410/990/99/V2024', propuesta: 25, esEcommerce: 1, tiendaId:'12785', grupoLocalizacionDesc: 'CICLO 3 GRUPO A2', ...overrides }),
    createDeliveryProposal({ key: '555/410/990/99/V2024', propuesta: 35, esEcommerce: 0, tiendaId:'12786', grupoLocalizacionDesc: 'CICLO 1 GRUPO C', ...overrides }),
    createDeliveryProposal({ key: '555/410/990/99/V2024', propuesta: 10, esEcommerce: 1, tiendaId:'12787', grupoLocalizacionDesc: 'CICLO 2 GRUPO A2', ...overrides }),
    createDeliveryProposal({ key: '555/410/990/99/V2024', propuesta: 5,  esEcommerce: 0, tiendaId:'12788', grupoLocalizacionDesc: 'CICLO 1 GRUPO B', ...overrides })
];