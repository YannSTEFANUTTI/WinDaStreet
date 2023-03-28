const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = Joi.object({
  userName: Joi.string().min(3).max(13).required().messages({
    "string.empty": "Choisi un pseudo",
    "any.required": "Choisi un pseudo",
    "string.min": "Pseudo = min 3 caracteres",
    "string.max": "Pseudo = max 13 caracteres",
  }),
  mail: Joi.string().email().required().messages({
    "string.email": "L'adresse mail n'est pas valide",
    "string.empty": "Il faut une adresse mail",
    "any.required": "Il faut une adresse mail",
  }),
  password: Joi.string().min(5).max(12).required().messages({
    "string.min": "Le mot de passe doit faire au moins 5 caracteres",
    "string.max": "Le mot de passe doit faire plus de 12 caracteres",
    "string.empty": "Il faut un mot de passe",
  }),
  avatar: Joi.number().required().messages({
    "number.base": "Avatar should be a number",
    "string.empty": "Avatar cannot be an empty field",
    "any.required": "Avatar is required",
  }),
});

// eslint-disable-next-line consistent-return
const checkByJoi = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, {
      type: argon2.argon2id,
      timeCost: 5,
      memoryCost: 2 ** 16,
      parallelism: 1,
    })
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      next();
    })
    .catch((err) => next(err));
};

const verifyPassword = (req, res, next) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        delete req.user.password;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => next(err));
};

const verifyToken = (req, res, next) => {
  req
    .get("Authorization")
    .then((authorization) => {
      if (!authorization) {
        throw new Error("Authorization header is missing");
      } else {
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer") {
          throw new Error("Authorization header has not the 'Bearer' type");
        }
        req.payload = jwt.verify(token, process.env.JWT_SECRET);
        next();
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  checkByJoi,
};
