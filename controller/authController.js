// const { User } = require('../models');
// const middleware = require('../middleware');

// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email }, raw: true });

//     if (user && (await middleware.comparePassword(user.passwordDigest, password))) {
//       let payload = { id: user.id, email: user.email };
//       let token = middleware.createToken(payload);
//       return res.send({ user: payload, token });
//     }

//     res.status(401).send({ status: 'Error', msg: 'Unauthorized, User Error' });
//   } catch (error) {
//     throw error;
//   }
// };

// const Register = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;
//     console.log(req.body)
//     console.log(password)
//     let passwordDigest = await middleware.hashPassword(password);
//     const user = await User.create({ email, passwordDigest, name });
//     res.send(user);
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   Login,
//   Register,
// };
