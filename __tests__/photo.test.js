const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');
const { verifyToken } = require('../helpers/function_helper');
const loginData = {
    email: 'usertester2@gmail.com', 
    password: '12345678'
};

beforeAll(async () => {
    const resp = await request(app).post('/users/login').send(loginData);
    token = resp.body.token;
});

const photoData = {
    poster_image_url: "https://poster.example.com", 
    title: "poster1", 
    caption: "poster1 ini sangat bagus"
}

let photoId = null;

describe('POST /photos', () => {
    it('should send response with 201 status code', (done) => {

        request(app)
        .post('/photos')
        .set({
            "authorization": "Baerer "+token
        })
        .send(photoData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(201);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("id");
            expect(res.body).toHaveProperty("UserId");
            expect(res.body).toHaveProperty("poster_image_url");
            expect(res.body).toHaveProperty("title");
            expect(res.body).toHaveProperty("caption");
            photoId = res.body.id;
            done();
        })
    });
});

const errorPhotoData = {
    poster_image_url: "https://poster.example.com", 
    title: "", 
    caption: "poster1 ini sangat bagus"
}
describe('POST /photos', () => {
    it('should send response with 400 status code because title is empty ', (done) => {

        request(app)
        .post('/photos')
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorPhotoData)
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

describe('POST /photos', () => {
    it('should send response with 400 status code because empty data to send ', (done) => {

        request(app)
        .post('/photos')
        .set({
            "authorization": "Baerer "+token
        })
        .send({})
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

describe('GET /photos', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .get('/photos')
        .set({
            "authorization": "Baerer "+token
        })
        .end(function (err, res) {
            if(err){
                done(err);
            }
            expect(res.status).toEqual(200);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("photos");
            expect(typeof res.body.photos).toEqual("object");
            done();
        })
    });
});


describe('GET /photos', () => {
    it('should send response with 401 status code because no token to send', (done) => {

        request(app)
        .get('/photos')
        .set({
            "authorization": "Baerer "
        })
        .end(function (err, res) {
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


const updatePhotoData = {
    poster_image_url: "https://poster2.example.com", 
    title: "poster2", 
    caption: "poster2 ini sangat bagus"
}

describe('PUT /photos/:photoId', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .put('/photos/'+photoId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(updatePhotoData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("photo");
            expect(res.body.photo).toHaveProperty("poster_image_url");
            expect(res.body.photo).toHaveProperty("title");
            expect(res.body.photo).toHaveProperty("caption");
            
            done();
        })
    });
});

const otherUserPhotoId = 2;
describe('PUT /photos/:photoId', () => {
    it('should send response with 404 status code because photo not found', (done) => {

        request(app)
        .put('/photos/'+otherUserPhotoId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(updatePhotoData)
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

const errorUpdatePhotoData = {
    poster_image_url: "https://poster2.example.com", 
    title: "", 
    caption: "poster2 ini sangat bagus"
}

describe('PUT /photos/:photoId', () => {
    it('should send response with 400 status code because title is empty', (done) => {

        request(app)
        .put('/photos/'+photoId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorUpdatePhotoData)
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

describe('PUT /photos/:photoId', () => {
    it('should send response with 401 status code because no token to send', (done) => {

        request(app)
        .put('/photos/'+photoId)
        .set({
            "authorization": "Baerer "
        })
        .send(updatePhotoData)
        .end(function (err, res) {
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



describe('DELETE /photos/:photoId', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .delete('/photos/'+photoId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorUpdatePhotoData)
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


describe('DELETE /photos/:photoId', () => {
    it('should send response with 404 status code because delete other user photo', (done) => {

        request(app)
        .delete('/photos/-1')
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorUpdatePhotoData)
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


describe('DELETE /photos/:photoId', () => {
    it('should send response with 500 status code because delete other user photo', (done) => {

        request(app)
        .delete('/photos/abcde')
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorUpdatePhotoData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(500);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("msg");
            expect(res.body.msg).not.toBeNull();
            
            done();
        })
    });
});

describe('DELETE /photos/:photoId', () => {
    it('should send response with 401 status code because not authorize', (done) => {

        request(app)
        .delete('/photos/'+photoId)
        .set({
            "authorization": "Baerer "
        })
        .send(errorUpdatePhotoData)
        .end(function (err, res) {
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

