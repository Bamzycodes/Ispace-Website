import express from 'express';
const router = express.Router();
import User from '../model/user.js'
import Main from '../model/main.js'
import Post from '../model/post.js'
import Newsletter from '../model/newsletter.js'
import bcrypt from 'bcryptjs';
import { isAuth } from '../utils.js';
import cloudinary from '../cloudinary.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
// import adminLayout from '../../backend/views/layouts/admin'


/**
 * GET /
 * Admin - Login Page
*/
router.get('/login', async (req, res) => {
  try {
    res.render('admin/login', { });
  } catch (error) {
    console.log(error);
  }
});


/**
 * POST /
 * Admin - Check Login
*/
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne( { email } );

    if(!user) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json( { message: 'Invalid credentials' } );
    }

   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.redirect('/admin');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


/**
 * GET /
 * Admin Dashboard
*/
// Assuming you have the necessary imports and setup for Express, mongoose, and error handling

router.get('/', isAuth, async (req, res) => {
  try {
    const userId = req.user;

    // Find the user by ID
    const user = await User.findById(userId);

    // Find all blogs
    const data = await Post.find();

    res.render('admin/dashboard', { user, data });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});



/**
 * GET /
 * Admin - Blog
*/
router.get('/add-blog', isAuth, async (req, res) => {
  try {
    res.render('admin/add-blog', {
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Admin - Create New Blog
*/
const handleUpload = async (file) => {
    try {
      const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
      });
      return res;
    } catch (error) {
      throw new Error("Could not upload the file to Cloudinary");
    }
  };
  
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  
  router.post('/add-blog', upload.single("file"), isAuth, async (req, res) => {
    const { date, title, description } = req.body;
  
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const cldRes = await handleUpload(dataURI);
  
      const posts = new Post({
        image: cldRes.secure_url,
        date,
        title,
        description
      });
  
      const savedPosts = await posts.save();
      // res.status(200).send(savedUploads);
      res.redirect('/admin');
     

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while processing the file" });
    }
  });


/*
 * GET /
 * Admin - Register
*/
router.get('/register', async (req, res) => {
  try {
    res.render('admin/register');

  } catch (error) {
    console.log(error);
  }

});


/**
 * POST /
 * Admin - Register
*/
router.post(
  "/register",
 async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const userExist = await User.findOne({ email: req.body.email });
    if(userExist){
      res.status(400).send({message: "Email already exists..."});
    }

      const user = await newUser.save();
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
      });


  }
);


/**
 * DELETE /
 * Admin - Delete Blog
*/
router.delete('/delete-blog/:id', isAuth, async (req, res) => {

  try {
    await Post.deleteOne( { _id: req.params.id } );
    res.redirect('/admin');
  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login');
});


/**
 * GET /
 * Blog :id
*/
router.get('/blog/:id', isAuth, async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    res.render('admin/blog', { 
      data,
      currentRoute: `/blog/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


  /**
 * GET /
 * Admin - Newsletter 
*/

router.get('/newsletter', isAuth, async (req, res) => {
  try {

    const data = await Newsletter.find();

    res.render('admin/newsletter', { data });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred while fetching data');
  }
});


  /**
   * GET /
  * Admin - User
 */
 
 router.get('/user', isAuth, async (req, res) => {
   try {
 
     const data = await Main.find();
 
     res.render('admin/user', { data });
 
   } catch (error) {
     console.error('Error fetching data:', error);
     res.status(500).send('An error occurred while fetching data');
   }
 });


export default router