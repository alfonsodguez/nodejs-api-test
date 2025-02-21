class InvalidArgumentError extends Error {
    constructor(message) {
        super();
        this.name = 'InvalidArgumentError';
        this.message = message;
    }
}

export default InvalidArgumentError;