const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const User = require('..//models/user');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

module.exports = new function () {
    this.strategy = new JwtStrategy(
        {jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET},
        async function (jwt_payload, next) {
            let user = await User.findOne({where: {id: jwt_payload.id}});
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        }
    );

    this.generateToken = function (user) {
        return jwt.sign({id: user.id}, process.env.JWT_SECRET);
    };
};


