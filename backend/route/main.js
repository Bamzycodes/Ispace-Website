import express from 'express';
const router = express.Router();
import Newsletter from '../model/newsletter.js'
import Main from '../model/main.js'
import Post from '../model/post.js'
import nodemailer from 'nodemailer'








/**
 * GET /
 * Main - Main Page
*/
router.get('/', async (req, res) => {
  try {
    const data = await Post.find();

    res.render('main/home', { data });
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Affilate - Affilate Page
*/
router.get('/affilate', async (req, res) => {
  try {

    res.render('main/affilate');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Main - About Page
*/
router.get('/about', async (req, res) => {
  try {
    res.render('main/about');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Courses - Courses Page
*/
router.get('/courses', async (req, res) => {
  try {
    res.render('main/courses');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Projects - Project Page
*/
router.get('/projects', async (req, res) => {
  try {
    res.render('main/project');
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Events - Event Page
*/
router.get('/event', async (req, res) => {
  try {
    res.render('main/event');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Contact - Contact Page
*/
router.get('/contact', async (req, res) => {
  try {
    res.render('main/contact');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Main - About Page
*/
router.get('/success', async (req, res) => {
  try {

    res.render('main/success');
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Blog - Blog Page
*/
router.get('/blog', async (req, res) => {
  try {
    const data = await Post.find();

    res.render('main/blog', { data });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Blog - Blog Id
*/
router.get('/blog/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    res.render('main/blog-slum', { 
      data,
      currentRoute: `/blog/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Newsletter - Newsletter Page
*/
router.get('/newsletter', async (req, res) => {
  try {

    res.render('main/newsletter');
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Newsletter - Post Newletter
*/
router.post('/newsletter', async (req, res) => {
  const { email } = req.body;

  try {

    const newsletter = new Newsletter({
      email
    });
     await newsletter.save();
    res.redirect('/success');
   

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while processing the file" });
  }
});

/**
 * PostId /
 * Newsletter -PostId Newletter
*/
router.get('/newsletter/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Newsletter.findById({ _id: slug });

    res.render('main/newsletter', { 
      data,
      currentRoute: `/newsletter/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});


/**
 * GET /
 * Courses - Alice Page
*/
router.get('/alice', async (req, res) => {
  try {
    res.render('main/alice');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Courses - App Inventor Page
*/
router.get('/appinventor', async (req, res) => {
  try {
    res.render('main/appinventor');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Courses - Construst Page
*/
router.get('/gconstrust', async (req, res) => {
  try {
    res.render('main/gconstrust');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Courses - Gdevelop Page
*/
router.get('/gdevelop', async (req, res) => {
  try {
    res.render('main/gdevelop');
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Courses - Kodu Page
*/
router.get('/kodu', async (req, res) => {
  try {
    res.render('main/kodu');
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Courses - Pictoblox Page
*/
router.get('/pictoblox', async (req, res) => {
  try {
    res.render('main/pictoblox');
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Courses - Scratch Page
*/
router.get('/scratch', async (req, res) => {
  try {
    res.render('main/scratch');
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Courses - Scratchgame Page
*/
router.get('/scratchgame', async (req, res) => {
  try {
    res.render('main/scratchgame');
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Courses - Webdev Page
*/
router.get('/webdevelopment', async (req, res) => {
  try {
    res.render('main/webdev');
  } catch (error) {
    console.log(error);
  }
});


/**
 * GET /
 * Main - Register Page
*/
router.get('/register', async (req, res) => {
  try {
    res.render('main/register');
  } catch (error) {
    console.log(error);
  }
});


/**
 * POST /
 * Main - Register
*/
router.post(
  "/register",
 async (req, res) => {
    const newMain = new Main({
      email: req.body.email,
      pname: req.body.pname,
      paname: req.body.paname,
      phone: req.body.phone,
      grade: req.body.grade,
      platform: req.body.platform,
      location: req.body.location,
      disability: req.body.disability,
      disability_desc: req.body.disability_desc,
      course: req.body.course || [],
      session: req.body.session || [],
      about: req.body.about || [],
      other:  req.body.other
    });

      await newMain.save();
      res.redirect('/success');

  }
);

/**
 * POST /
 * Main - Contact
*/
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'deenello83@gmail.com',
      pass: 'ilryxmqadcqckupx'
  }
})
router.post('/contact', (req, res) => {
  const { name, email, phone_number, subject, message } = req.body;

  const mailOptions = {
      from: email,
      to: 'deenello83@gmail.com',
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phone_number}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.send('Error');
      } else {
       res.redirect('/success')
      }
  });
});






export default router