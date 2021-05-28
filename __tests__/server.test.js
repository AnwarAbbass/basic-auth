'use strict';

require('dotenv').config();
const base64 = require('base-64');
const {app} = require('../src/server');

const supertest = require('supertest');
const req = supertest(app);
const { expect } = require('@jest/globals');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, async () => {// delete everything from db after tests
    await mongoose.connection.db.dropDatabase();
  });

describe('server', () => {

    afterAll(() => {
        mongoose.connection.close();
      })

    it('sign up : create new user', async () => {
        const res = await req.post('/signup').send({ username: 'anwar', password: '123' });
        expect(res.body.username).toEqual('anwar');
        expect(res.status).toEqual(201);
    });

    it('sign in : login user', async () => {
        let obj ={ username: 'anwar', password: '123' }
        const user = base64.encode(`${obj.username}:${obj.password}`);

        const res = await req.post('/signin').set('Authorization', `Basic ${user}`);

        expect(res.body.user.username).toEqual('anwar');
        expect(res.status).toEqual(200);
    });

    it('sign in : fail login user', async () => {
        const user = base64.encode("Anwar:123");
        const res = await req.post('/signin').set('Authorization', `Basic ${user}`);

        expect(res.status).toEqual(403);
    });
})
