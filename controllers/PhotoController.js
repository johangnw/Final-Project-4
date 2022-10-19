const { Photo, User, Comment } = require('../models');
const { response } = require('../helpers/function_helper');
class PhotoController{
    static async add(req, res){
        try {
            const {poster_image_url, title, caption } = req.body;

            const dataInsert = {
                poster_image_url,
                title,
                caption,
                UserId : req.userId
            };

            const photo = await Photo.create(dataInsert);

            res.status(201).send({
                id: photo.id,
                poster_image_url: photo.poster_image_url,
                title: photo.title,
                caption: photo.caption,
                UserId: photo.UserId
            });

        } catch (error) {
            return res.status(500).send(response(error,error.message));
        }
    }

    static async edit(req, res){
        try {
            const photoId = req.params.photoId;
            const {poster_image_url, title, caption } = req.body;

            const photo = await Photo.findOne({
                where : {
                    id: photoId,
                    UserId: req.userId
                }
            });

            if(!photo){
                return res.status(404).send({ msg: "Photo not found" });
            }

            const dataUpdate = {
                poster_image_url,
                title,
                caption
            };

            await Photo.update(dataUpdate,{
                where: {
                    id: photoId
                }
            });

            const newPhoto = await Photo.findByPk(photoId);

            return res.send({photo: newPhoto})

        } catch (error) {
            return res.status(500).send(response(error,error.message));
        }
    }

    static async getAll(req, res){
        try {
            const userId = req.userId;

            const photos = await Photo.findAll({
                where: {
                    UserId: userId
                },
                include: [{
                    model: User,
                    attributes: ['id','username','profile_image_url']
                },
                {
                    model: Comment,
                    attributes: ['comment'],
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                }]
            });

            return res.send(photos);

        } catch (error) {
            return res.status(500).send(response(error,error.message));
        }
    }

    static async delete(req, res){
        try {
            const photoId = req.params.photoId;
            const userId = req.userId;

            const photo = await Photo.findOne({
                where : {
                    id: photoId,
                    UserId: userId
                }
            });

            if(!photo){
                return res.status(404).send({ msg: "Photo not found" });
            }

            await Photo.destroy({
                where: {
                    id: photoId
                }
            });

            res.send({ msg: "Your photo has been successfully userId" });

        } catch (error) {
            return res.status(500).send(response(error,error.message));
        }
    }
}


module.exports = PhotoController;