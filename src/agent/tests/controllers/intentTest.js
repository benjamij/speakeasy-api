const assert = require('assert');
const request = require('supertest');

describe('Test Intent Controller (agent/controllers/intent.js)', function () {
    var server;
    beforeEach(function () {
        server = require('../../../app');
    });
    afterEach(function () {
        server.close();
    });
    describe('#Route responsiveness', function() {
        it('404 for root /', function testRoot(done) {
            request(server)
                .post('/')
                .expect(404, done);
        });
        it('404 everything else', function testPath(done) {
            request(server)
                .post('/foo/bar')
                .expect(404, done);
        });
        it('422 for post to intent detect without body', function testRoot(done) {
            request(server)
                .post('/api/v1/intent/detect')
                .expect(422, done);
        });
    });
    describe('#Validators', function() {
        it('422 for post to intent detect with text missing', function testRoot(done) {
            request(server)
                .post('/api/v1/intent/detect')
                .send({agent: 'testName', language: 'en-US'})
                .expect(422, done);
        });
        it('422 for post to intent detect with agent missing', function testRoot(done) {
            request(server)
                .post('/api/v1/intent/detect')
                .send({text: 'test text', language: 'en-US'})
                .expect(422, done);
        });
        it('422 for post to intent detect with numeric agent', function testRoot(done) {
            request(server)
                .post('/api/v1/intent/detect')
                .send({text: 'test text', agent: 123, language: 'en-US'})
                .expect(422, done);
        });
        it('422 for post to intent detect with numeric text', function testRoot(done) {
            request(server)
                .post('/api/v1/intent/detect')
                .send({text: 123, agent: 'agent name', language: 'en-US'})
                .expect(422, done);
        });
        it('200 for post to intent detect with correct body', function testRoot(done) {
            request(server)
                .post('/api/v1/intent/detect')
                .send({text: 'sample text', agent: 'agent name', language: 'en-US'})
                .expect(200, done);
        });
    });
    describe('#Dialogflow Connectivity', function() {
        it('Connect to (non-existent) dialogflow agent', function testRoot(done) {
            request(server)
                .post('/api/v1/intent/detect')
                .send({text: 'sample text', agent: 'agent name', language: 'en-US'})
                .expect((res) => {
                    assert(res.body.errors[0] == 'Request could not be processed.');
                })
                .expect(200, done);
        });
    });
  });
