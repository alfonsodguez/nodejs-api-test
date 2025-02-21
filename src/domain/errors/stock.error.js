class InsufficientStockError extends Error {
    constructor(message) {
      super();
      this.name = "InsufficientStockError";
      this.message = message;
    }
  }
  
  export default InsufficientStockError;