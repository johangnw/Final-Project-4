const request = require('supertest');
const app = require('../server');

const loginData = {
    email: 'usertester2@gmail.com', 
    password: '12345678'
};

let token = '';
beforeAll(async () => {
    const resp = await request(app).post('/users/login').send(loginData);
    token = resp.body.token;
});

const socialMediaData = {
    name: 'instagram', 
    social_media_url: 'https://instagram.com/test' 
}
let socialMediaId = -1;
describe('POST /socialmedias', () => {
    it('should send response with 201 status code', (done) => {

        request(app)
        .post('/socialmedias')
        .set({
            "authorization": "Baerer "+token
        })
        .send(socialMediaData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(201);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("social_media");
            expect(res.body.social_media).toHaveProperty("id");
            expect(res.body.social_media).toHaveProperty("name");
            expect(res.body.social_media).toHaveProperty("social_media_url");
            socialMediaId = res.body.social_media.id;

            done();
        })
    });
});

const errorSocialMediaData = {
    name: '', 
    social_media_url: 'https://instagram.com/test' 
}

describe('POST /socialmedias', () => {
    it('should send response with 400 status code because name is empty', (done) => {

        request(app)
        .post('/socialmedias')
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorSocialMediaData)
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


describe('POST /socialmedias', () => {
    it('should send response with 401 status code because no token to send', (done) => {

        request(app)
        .post('/socialmedias')
        .set({
            "authorization": "Baerer "
        })
        .send({})
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


describe('GET /socialmedias', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .get('/socialmedias')
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
            expect(res.body).toHaveProperty("social_medias");
            expect(typeof res.body.social_medias).toEqual("object");
            done();
        })
    });
});

describe('GET /socialmedias', () => {
    it('should send response with 401 status code because no token to send', (done) => {

        request(app)
        .get('/socialmedias')
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


const editSocialMediaData = {
    name: 'whatsapp', 
    social_media_url: 'https://whatsapp.com/test' 
}
describe('PUT /socialmedias/:socialMediaId', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .put('/socialmedias/'+socialMediaId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(editSocialMediaData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(200);
            expect(res.body).not.toBeNull();
            expect(typeof res.body).toEqual("object"); 
            expect(res.body).toHaveProperty("social_media");
            expect(res.body.social_media).toHaveProperty("id");
            expect(res.body.social_media).toHaveProperty("name");
            expect(res.body.social_media).toHaveProperty("social_media_url");
            done();
        })
    });
});

describe('PUT /socialmedias/:socialMediaId', () => {
    it('should send response with 404 status code because social media not found', (done) => {

        request(app)
        .put('/socialmedias/-1')
        .set({
            "authorization": "Baerer "+token
        })
        .send(editSocialMediaData)
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

const errorCommentData3 = {
    name: '', 
    social_media_url: '' 
}

describe('PUT /socialmedias/:socialMediaId', () => {
    it('should send response with 400 status code because no data to send', (done) => {

        request(app)
        .put('/socialmedias/'+socialMediaId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorCommentData3)
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

describe('PUT /socialmedias/:socialMediaId', () => {
    it('should send response with 401 status code because no token to send', (done) => {

        request(app)
        .put('/socialmedias/'+socialMediaId)
        .set({
            "authorization": "Baerer "
        })
        .send({})
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


describe('DELETE /socialmedias/:socialMediaId', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .delete('/socialmedias/'+socialMediaId)
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
            expect(res.body).toHaveProperty("msg");
            expect(res.body.msg).not.toBeNull();
            done();
        })
    });
});

describe('DELETE /socialmedias/:socialMediaId', () => {
    it('should send response with 404 status code because social media not found', (done) => {

        request(app)
        .delete('/socialmedias/abcde')
        .set({
            "authorization": "Baerer "+token
        })
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

describe('DELETE /socialmedias/:socialMediaId', () => {
    it('should send response with 404 status code because social media not found', (done) => {

        request(app)
        .delete('/socialmedias/-1')
        .set({
            "authorization": "Baerer "+token
        })
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

describe('DELETE /socialmedias/:socialMediaId', () => {
    it('should send response with 401 status code because no token to send', (done) => {

        request(app)
        .delete('/socialmedias/'+socialMediaId)
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
