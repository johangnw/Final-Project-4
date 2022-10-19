const { Comment, User, Photo } = require('../models');
const { response } = require('../helpers/function_helper');


class CommentController{
    static async add(req, res){
        try {
            const userId = req.userId;
            const { comment, PhotoId } = req.body;

            const photo = await Photo.findOne({
                where: {
                    id: PhotoId
                }
            });

            if(!photo){
                return res.status(404).send({ msg: "Photo not found" });
            }

            const dataInsert = {
                comment,
                PhotoId,
                UserId: userId
            };

            const data = await Comment.create(dataInsert);

            res.status(201).send({
                comment: data
            });

        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }

    static async edit(req, res){
        try {
            const commentId = req.params.commentId;
            const userId = req.userId;
            const { comment } = req.body;

            const commentData = await Comment.findOne({
                where: {
                    id: commentId,
                    UserId: userId
                }
            });

            if(!commentData){
                return res.status(404).send({ msg: "Comment not found" });
            }

            const dataUpdate = {
                comment
            };

            await Comment.update(dataUpdate,{
                where: {
                    id: commentId
                }
            });

            const newComment = await Comment.findByPk(commentId);

            res.send({
                comment: newComment
            });
        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }

    static async getAll(req, res){
        try {
            const userId = req.userId;

            const comments = await Comment.findAll({
                where:{
                    UserId: userId
                },
                include:[
                    {
                        model: User,
                        attributes: ['id','username','profile_image_url','phone_number']
                    },
                    {
                        model: Photo,
                        attributes: ['id','title','caption','poster_image_url']
                    }
                ]
            });

            res.send({
                comments: comments
            });
        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }

    static async delete(req, res){
        try {
            const commentId = req.params.commentId;
            const userId = req.userId;

            const commentData = await Comment.findOne({
                where: {
                    id: commentId,
                    UserId: userId
                }
            });

            if(!commentData){
                return res.status(404).send({ msg: "Comment not found" });
            }

            await Comment.destroy({
                where: {
                    id: commentId
                }
            });

            res.send({ msg: "Your comment has been successfully deleted"});
            
        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }
}

module.exports = CommentController;