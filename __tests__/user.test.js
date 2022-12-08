const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');
const { verifyToken,hashPassword } = require('../helpers/function_helper');

const registerData = {
    full_name: 'user tester', 
    email: 'usertester2@gmail.com', 
    username: 'usertester2', 
    password: '12345678', 
    profile_image_url: 'https://gambar.example.com', 
    age: 25, 
    phone_number: '08123123'
};

beforeAll(() => {
    jest.setTimeout(10000);
})
let userId = null;
//Success
describe('POST /users/register', () => {
    it('should send response with 201 status code', (done) => {

        request(app)
        .post('/users/register')
        .send(registerData)
        .end(function (err, res) {
            if(err){
                done(err);
            }
            expect(res.status).toEqual(201);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("user");
            expect(res.body.user).toHaveProperty("full_name");
            expect(res.body.user).toHaveProperty("email");
            expect(res.body.user).toHaveProperty("username");
            expect(res.body.user).toHaveProperty("profile_image_url");
            expect(res.body.user).toHaveProperty("age");
            expect(res.body.user).toHaveProperty("phone_number");
            done();
        })
    });
});

//Gagal
describe('POST /users/register', () => {
    it('should send response with 400 status code because of email already exist', (done) => {

        request(app)
        .post('/users/register')
        .send(registerData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("msg");
            expect(res.body).toHaveProperty("data");
            expect(res.body.msg).not.toBeNull();
            done();
        })
    });
});

const loginData = {
    email: 'usertester2@gmail.com', 
    password: '12345678'
};

let token = '';
describe('POST /users/login', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .post('/users/login')
        .send(loginData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(200);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("token");
            expect(res.body.token).not.toBeNull();
            token = res.body.token;
            userId = verifyToken(token).id;            
            done();
        })
    });
});

const errorLoginData = {
    email: 'error@login.com', 
    password: '12345678'
};

describe('POST /users/login', () => {
    it('should send response with 404 status code because of email not found', (done) => {

        request(app)
        .post('/users/login')
        .send(errorLoginData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(404);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("msg");
            expect(res.body.token).not.toBeNull();
            done();
        })
    });
});

const updateData = {
        full_name: "pika sunaryo2", 
        username: "pikasunaryo2", 
        profile_image_url: "https://gambar.example2.com", 
        age: 25, 
        phone_number: "08123123"
    }


describe('PUT /users/:userId', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .put('/users/'+userId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(updateData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("user");
            expect(res.body.user).toHaveProperty("full_name");
            expect(res.body.user).toHaveProperty("email");
            expect(res.body.user).toHaveProperty("username");
            expect(res.body.user).toHaveProperty("profile_image_url");
            expect(res.body.user).toHaveProperty("age");
            expect(res.body.user).toHaveProperty("phone_number");
            done();
        })
    });
});

const notFoundUserId = 3;
describe('PUT /users/:userId', () => {
    it('should send response with 404 status code because of user not found', (done) => {

        request(app)
        .put('/users/'+notFoundUserId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(updateData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(404);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("msg");
            expect(res.body.msg).not.toBeNull();
            done();
        })
    });
});

const errorUpdateData = {
    full_name: "", 
    username: "", 
    profile_image_url: "https://gambar.example2.com", 
    age: 25, 
    phone_number: "08123123"
}

describe('PUT /users/:userId', () => {
    it('should send response with 400 status code because there are empty data', (done) => {

        request(app)
        .put('/users/'+userId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorUpdateData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(400);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("msg");
            expect(res.body.msg).not.toBeNull();
            done();
        })
    });
});


let otherUserId = 21;
describe('DELETE /users/:userId', () => {
    it('should send response with 400 status code because of delete other user', (done) => {

        request(app)
        .delete('/users/'+otherUserId)
        .set({
            "authorization": "Baerer "+token
        })
        .send()
        .end(function (err, res) {
            console.log(res.body);
            if(err){
                done(err);
            }

            expect(res.status).toEqual(400);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("msg");
            expect(res.body.msg).not.toBeNull();
            done();
        })
    });
});

describe('DELETE /users/:userId', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .delete('/users/'+userId)
        .set({
            "authorization": "Baerer "+token
        })
        .send()
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(200);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("msg");
            expect(res.body.msg).not.toBeNull();
            done();
        })
    });
});

describe('DELETE /users/:userId', () => {
    it('should send response with 401 status code because unauthorize', (done) => {

        request(app)
        .delete('/users/'+userId)
        .set({
            "authorization": "Baerer "
        })
        .send()
        .end(function (err, res) {
            console.log(res.body);
            if(err){
                done(err);
            }

            expect(res.status).toEqual(401);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("msg");
            expect(res.body.msg).not.toBeNull();
            done();
        })
    });
});



afterAll(async () => {
    await sequelize.queryInterface.bulkInsert('Users',[{
        full_name: 'user tester', 
        email: 'usertester2@gmail.com', 
        username: 'usertester2', 
        password: await hashPassword('12345678'), 
        profile_image_url: 'https://gambar.example.com', 
        age: 25, 
        phone_number: '08123123',
        createdAt: new Date(),
        updatedAt: new Date()
    }])
})