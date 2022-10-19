const { SocialMedia, User } = require('../models');
const { response } = require('../helpers/function_helper');

class SocialMediaController{
    static async add(req, res) {
        try {
            const userId = req.userId;
            const { name, social_media_url } = req.body;

            const dataInsert = {
                name,
                social_media_url,
                UserId: userId
            };

            const socialmedia = await SocialMedia.create(dataInsert);

            res.status(201).send({
                social_media: socialmedia
            });
            
        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }

    static async edit(req, res) {
        try {
            const socialMediaId = req.params.socialMediaId;
            const userId = req.userId;
            const { name, social_media_url } = req.body;

            const socialMedia = await SocialMedia.findOne({
                where: {
                    id: socialMediaId,
                    UserId: userId
                }
            });

            if(!socialMedia){
                return res.status(404).send({ msg: "Social Media not found" });
            }

            const dataUpdate = {
                name,
                social_media_url
            }
            await SocialMedia.update(dataUpdate,{
                where: {
                    id: socialMediaId
                }
            });

            const newSocialMedia = await SocialMedia.findByPk(socialMediaId);

            res.send({ social_media: newSocialMedia });
            
        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }

    static async getAll(req, res){
        try {
            const userId = req.userId;

            const data = await SocialMedia.findAll({
                where: {
                    UserId: userId
                },
                include: [
                    {
                        model: User,
                        attributes: ['id','username','profile_image_url']
                    }
                ]
            });


            res.send({
                social_medias: data
            });
        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }

    static async delete(req, res){
        try {
            const socialMediaId = req.params.socialMediaId;
            const userId = req.userId;

            const socialMedia = await SocialMedia.findOne({
                where: {
                    id: socialMediaId,
                    UserId: userId
                }
            });

            if(!socialMedia){
                return res.status(404).send({ msg: "Social Media not found" });
            }

            await SocialMedia.destroy({
                where: {
                    id: socialMediaId
                }
            });

            res.send({ msg: "Your social media has been successfully deleted"});
        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }
}

module.exports = SocialMediaController;