class DeliveryProposal {
  constructor({ key, propuesta, tiendaId, grupoLocalizacionDesc, esEcommerce }) {
    this.key = key;
    this.propuesta = propuesta;
    this.tiendaId = tiendaId;
    this.grupoLocalizacionDesc = grupoLocalizacionDesc;
    this.esEcommerce = esEcommerce;
  }

  isOnlineShop() {
    return this.esEcommerce === 1;
  }
}

export default DeliveryProposal;