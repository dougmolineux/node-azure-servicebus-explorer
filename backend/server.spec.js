const chai = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const fs = require('fs').promises;

const topicPeek = require('./topic-peek');
const server = require('./server');
const mockData = require('./helpers/mockData');

const expect = chai.expect;

describe('server.js', () => {

  let sandbox = sinon.SinonSandbox;

  beforeEach( () => {
    sandbox = sinon.createSandbox();
  });

  afterEach( () => {
    sandbox.restore();
  });

  it('peek should call topicPeek', async () => {
    sandbox.stub(topicPeek, "peek").callsFake( () => mockData.mock);
    const myServer = await request(server.callback());
    const rawResponse = await myServer.get('/peek');
    const response = JSON.parse(rawResponse.text);
    expect(response[0][0].body).to.equal('Albert Einstein');
  });

  it('set-env', async () => {
    sandbox.stub(fs, "writeFile").callsFake( () => Promise.resolve());
    const envVars = {
      connString: "newConnString",
      topic: "newTopic",
      sub: "newSubscription"
    };
    const myServer = await request(server.callback());
    const rawResponse = await myServer.post('/set-env').send(envVars);
    const response = JSON.parse(rawResponse.text);
    expect(response.connString).to.equal(envVars.connString);
    expect(response.topic).to.equal(envVars.topic);
    expect(response.sub).to.equal(envVars.sub);
  });

});
