import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
});

export default mongoose.model("Comment", commentSchema);