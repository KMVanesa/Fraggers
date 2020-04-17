const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')


// const config = require('config');
// const mongoose = require('mongoose');
// const db = config.get('mongoURI');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const crypto = require('crypto');
const multer = require('multer');
const path = require('path')
const fs = require("fs");
// var upload = multer({ storage: storage });
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });




// router.post('/single', upload.single('profile'), async (req, res) => {

//     try {
//         const newPost = new Post({
//             text: req.body.text,
//             post_image: req.file
//         });
//         const post = await newPost.save();
//         res.send(post);
//         // const post= req.file;
//         // res.send(post);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

//Init gfs

// let gfs;
// var conn = mongoose.createConnection(db,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('posts')
//     // all set!
// })

// const storage = new GridFsStorage({
//     url: db,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'posts'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });
// const upload = multer({ storage });

// router.post('/single', [auth, upload.single('profile')], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         const user = await User.findById(req.user.id).select('-password');

//         const newPost = new Post({
//             text: req.body.text,
//             name: user.name,
//             avatar: user.avatar,
//             user: req.user.id,
//             post_image: req.file
//         });

//         const post = await newPost.save();

//         res.json(post);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });




// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'routes')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname)
//     }
// })



// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// });
// var upload = multer({ storage: storage });
//initialize multer
const getExtension = file =>{
    if (file.mimetype == "image/jpeg")
        ext =  ".jpeg"
    else
        ext =".png"
    return ext;
}

var name='';
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname+"/uploads"))
//     },
//     filename: function (req, file, cb) {
//         name = "http://localhost:5000/download/" + Date.now() + '-' + file.originalname;
//         cb(null, file.fieldname + '-' + Date.now()+getExtension(file))
//     }
// })
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/storage/uploads')
    },
    filename: (req, file, cb) => {
        storage_name = Date.now() + '-' + file.originalname;
        name = "http://localhost:5000/download/" + Date.now() + '-' + file.originalname;
        cb(null, storage_name);
    }
});
var upload = multer({ storage: storage })
// @route POST api/posts 
// @access Private
router.post(
    '/', [auth, upload.single('image'), [check('text', 'Text is required')
        .not()
        .isEmpty()
    ]], async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                // post_image: finalImg,
                image: name,
                user: req.user.id,
            });

            const post = await newPost.save();

            res.json(post);
            name='';
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);






// router.get('/single/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//         // Check if file
//         if (!file || file.length === 0) {
//             return res.status(404).json({
//                 err: 'No file exists'
//             });
//         }

//         // Check if image
//         if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//             // Read output to browser
//             const readstream = gfs.createReadStream(file.filename);
//             readstream.pipe(res);
//         } else {
//             res.status(404).json({
//                 err: 'Not an image'
//             });
//         }
//     });
// });




// var upload = multer({ storage: storage })










//@route POST api/posts 
//@access Private
// router.post(
//     '/', [auth, upload.single('profile'), [check('text', 'Text is required')
//         .not()
//         .isEmpty()
//     ]], async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {

//             var img = fs.readFileSync(req.file.path);
//             var encode_image = img.toString('base64');
//             // Define a JSONobject for the image attributes for saving to database

//             var finalImg = {
//                 contentType: req.file.mimetype,
//                 image: new Buffer(encode_image, 'base64')
//             };

//             const user = await User.findById(req.user.id).select('-password');

//             const newPost = new Post({
//                 text: req.body.text,
//                 name: user.name,
//                 avatar: user.avatar,
//                 post_image: finalImg,
//                 user: req.user.id,
//             });

//             const post = await newPost.save();

//             res.json(post);
//         } catch (err) {
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        // Check for ObjectId format and post
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // gfs.files.findOne({ filename: post.post_image.filename }, (err, file) => {
        //     // Check if file
        //     if (!file || file.length === 0) {
        //         return res.status(404).json({
        //             err: 'No file exists'
        //         });
        //     }

        //     // Check if image
        //     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        //         // Read output to browser
        //         const readstream = gfs.createReadStream(file.filename);
        //         readstream.pipe(res);
        //     } else {
        //         res.status(404).json({
        //             err: 'Not an image'
        //         });
        //     }
        // });

        res.json(post);
    } catch (err) {
        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'Post not found' });
        }

        res.status(500).send('Server Error');
    }
});



// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check for ObjectId format and post
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});


// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length > 0
        ) {
            return res.status(400).json({ msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if (
            post.likes.filter(like => like.user.toString() === req.user.id).length ===
            0
        ) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        //console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post('/comment/:id', [auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
}
);



router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Pull out comment
        const comment = post.comments.find(
            comment => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        post.comments = post.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await post.save();

        return res.json(post.comments);
    } catch (err) {
        if (err.name == 'CastError') {
            return res.status(400).json({ msg: 'Post not found' });
        }
        return res.status(500).send('Server Error');
    }
});

module.exports = router;