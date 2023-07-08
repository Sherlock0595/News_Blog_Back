import PostModel from '../models/Post.model.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось найти статьи'
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        );

        if (!doc) {
            return res.status(404).json({
                message: 'Статья не найдена'
            });
        }

        res.json(doc);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось найти статью'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
       PostModel.findOneAndDelete({
            _id: postId,
        }, (error, doc) => {
            if (error) {
                console.error(error);
                res.status(500).json({
                    message: 'Не удалось удалить статью'
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: "Статья не найдена"
                })
            }
            res.json({
                succes: true  
            })
        })

        res.json(doc);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Не удалось найти статью'
        });
    }
};


export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        const post = await doc.save()
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать статью'
        });
    }
};