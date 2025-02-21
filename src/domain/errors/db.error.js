class EntityNotFoundError extends Error {
    constructor(message) {
      super();
      this.name = "EntityNotFoundError";
      this.message = message;
    }
  }
  
  export default EntityNotFoundError;