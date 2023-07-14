import CommentModel from '../models/Comment.Model.js';
import PostModel from '../models/Post.model.js';
export const getAll = async (req, res) => {
    try {
        const comment = await CommentModel.find().populate().exec();
        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось найти комментарии'
        })
    }
};

export const create = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = new CommentModel({
            user: req.userId,
            text: req.body.text,
            post: req.params.id
        });
        
        const comment = await doc.save()
        
        await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { commentCount: 1 } },
            { new: true }
        );

        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать комментарий'
        });
    }


};

export const remove = async (req, res) => {
    try {
        const commentId = req.params.id;

        const doc = await CommentModel.findOneAndDelete({ _id: commentId });

        if (!doc) {
            return res.status(404).json({
                message: "комментарий не найдена"
            });
        }

        res.json({
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось удалить комментарий'
        });
    }
};

export const update = async (req, res) => {
    try {
        const commentId = req.params.id;

        await PostModel.findOneAndUpdate({ _id: commentId },
            {
                text: req.body.text,
                user: req.userId,
            },

        );

        res.json({
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось изменить комментарий'
        });
    }
};