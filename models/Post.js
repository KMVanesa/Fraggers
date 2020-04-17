const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // post_image: {
    //     fieldname: String,
    //     originalname: String,
    //     encoding: String,
    //     mimetype: String,
    //     id: String,
    //     filename: String,
    //     metadata: String,
    //     bucketName: String,
    //     chunkSize: String,
    //     size: String,
    //     md5: String,
    //     uploadDate: String,
    //     contentType: String
    // },
    post_image:{
        image:Buffer,
        contentType:String
    },image:{
        type:String
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }

    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);
