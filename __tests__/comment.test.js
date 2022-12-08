const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');

const loginData = {
    email: 'usertester2@gmail.com', 
    password: '12345678'
};

const photoData = {
    poster_image_url: "https://poster.example.com", 
    title: "testingcomment1", 
    caption: "testingcomment1 ini sangat bagus"
}


let token = null;
let photoId = null;

const commentData = {
    comment: 'foto ini sangat bagus'
}
beforeAll(async () => {
    const resp = await request(app).post('/users/login').send(loginData);
    token = resp.body.token;

    const respPhoto = await request(app).post('/photos').set({"authorization": "Baerer "+token}).send(photoData);
    commentData.PhotoId = respPhoto.body.id;
});

let commentId = null;
describe('POST /comments', () => {
    it('should send response with 201 status code', (done) => {
        request(app)
        .post('/comments')
        .set({
            "authorization": "Baerer "+token
        })
        .send(commentData)
        .end(function (err, res) {
            if(err){
                done(err);
            }
            expect(res.status).toEqual(201);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("comment");
            expect(res.body.comment).toHaveProperty("id");
            expect(res.body.comment).toHaveProperty("comment");
            expect(res.body.comment).toHaveProperty("PhotoId");
            commentId = res.body.comment.id;

            done();
        })
    });
});

const errorCommentData = {
    comment: 'foto ini sangat bagus', 
    PhotoId: -1
}


describe('POST /comments', () => {
    it('should send response with 404 status code because photoId is not found', (done) => {

        request(app)
        .post('/comments')
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorCommentData)
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

const errorCommentData2 = {
    comment: ''
}

describe('POST /comments', () => {
    it('should send response with 400 status code because comment is empty', (done) => {
        errorCommentData2.PhotoId = commentData.PhotoId
        request(app)
        .post('/comments')
        .set({
            "authorization": "Baerer "+token
        })
        .send(errorCommentData2)
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


describe('GET /comments', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .get('/comments')
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
            expect(res.body).toHaveProperty("comments");
            expect(typeof res.body.comments).toEqual("object");
            done();
        })
    });
});

describe('GET /comments', () => {
    it('should send response with 401 status code', (done) => {

        request(app)
        .get('/comments')
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

const editCommentData = {
    comment: 'foto ini tidak bagus'
}

describe('PUT /comments/commentId', () => {
    it('should send response with 200 status code', (done) => {
        editCommentData.PhotoId = commentData.PhotoId;
        request(app)
        .put('/comments/'+commentId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(editCommentData)
        .end(function (err, res) {
            if(err){
                done(err);
            }

            expect(res.status).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("comment");
            expect(res.body.comment).toHaveProperty("id");
            expect(res.body.comment).toHaveProperty("comment");
            expect(res.body.comment).toHaveProperty("PhotoId");
            done();
        })
    });
});

const editErrorCommentData = {
    comment: ''
}

describe('PUT /comments/:commendId', () => {
    it('should send response with 400 status code because comment is empty', (done) => {
        editErrorCommentData.PhotoId = commentData.PhotoId;
        request(app)
        .put('/comments/'+commentId)
        .set({
            "authorization": "Baerer "+token
        })
        .send(editErrorCommentData)
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


describe('PUT /comments/:commentId', () => {
    it('should send response with 404 status code because not found comment', (done) => {
        editCommentData.PhotoId = commentData.PhotoId;
        request(app)
        .put('/comments/-1')
        .set({
            "authorization": "Baerer "+token
        })
        .send(editCommentData)
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

describe('PUT /comments/:commentId', () => {
    it('should send response with 401 status code because there isn\'t token to send', (done) => {
        editCommentData.PhotoId = commentData.PhotoId;
        request(app)
        .put('/comments/'+commentId)
        .set({
            "authorization": "Baerer "
        })
        .send(editCommentData)
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


describe('DELETE /comments/:commentId', () => {
    it('should send response with 200 status code', (done) => {

        request(app)
        .delete('/comments/'+commentId)
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


describe('DELETE /comments/:commentId', () => {
    it('should send response with 404 status code because not found comment', (done) => {

        request(app)
        .delete('/comments/-1')
        .set({
            "authorization": "Baerer "+token
        })
        .send()
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

describe('DELETE /comments/:commentId', () => {
    it('should send response with 401 status code because not authorize', (done) => {

        request(app)
        .delete('/comments/-1')
        .set({
            "authorization": "Baerer "
        })
        .send()
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


afterAll((done) => {
    sequelize.queryInterface.bulkDelete('Comments',{})
    .then(() => {
        return done();
    })
    .catch(err => {
        done(err);
    })
})