import jwt from 'jsonwebtoken';


//  export const generateToken = (user) => {
//   return jwt.sign(
//     {
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: '30d',
//     }
//   );
// };

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect('/admin/login')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.redirect('/admin/login')
  }
};
