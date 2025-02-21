import { v4 as uuidv4 } from 'uuid';
import DeliveryProposalModel from '../../src/domain/entities/deliveryProposal.entity.js';

export const createDeliveryProposal = (overrides = {}) => {
    const base = {
        key: uuidv4(),
        propuesta: Math.floor(Math.random() * 100) + 1,
        tiendaId: uuidv4(),
        grupoLocalizacionDesc: ['CICLO 2 GRUPO A2', 'CICLO 1 GRUPO B', 'CICLO 1 GRUPO A2'][Math.floor(Math.random() * 2)],
        esEcommerce: Math.random() > 0.5 ? 1 : 0
    }   

    return {...base, ...overrides};
}
