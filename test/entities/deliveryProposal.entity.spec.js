import DeliveryProposal from '../../src/domain/entities/deliveryProposal.entity.js';

describe('DeliveryProposal', () => {
  it('should return true if esEcommerce is 1', () => {
    const deliveryProposal = new DeliveryProposal({
      key: '258/410/990/99/V2024',
      propuesta: 13,
      tiendaId: 'Tienda1',
      grupoLocalizacionDesc: 'CICLO 2 GRUPO A2',
      esEcommerce: 1
    });

    expect(deliveryProposal.isOnlineShop()).to.be.true;
  });

  it('should return false if esEcommerce is not 1', () => {
    const deliveryProposal = new DeliveryProposal({
      key: '258/410/990/99/V2024',
      propuesta: 13,
      tiendaId: 'Tienda1',
      grupoLocalizacionDesc: 'CICLO 2 GRUPO A2',
      esEcommerce: 0
    });

    expect(deliveryProposal.isOnlineShop()).to.be.false;
  });
});