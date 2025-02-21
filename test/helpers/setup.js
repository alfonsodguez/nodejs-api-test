import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as chai from 'chai';
import mongoose from 'mongoose';

chai.use(sinonChai);
global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;

beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

afterEach(() => {
    const sandbox = sinon.createSandbox();
    sandbox.restore();
});

before(async () => {
    await mongoose.connect('mongodb://root:example@localhost:27017/test', {
        authSource: 'admin'
    });
});

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});