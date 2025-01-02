import passport from "passport";
import local from "passport-local";
import google from "passport-google-oauth20"
import { userDao } from "../mongo/user.dao.js";
import { createHash , isValidPassword} from "../utils/hashPassword.js";
import jwt from "passport-jwt"
import { cookieExtractor } from "../utils/cookiesExtractor.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { request, response } from "express";
import envsConfig from "./envs.config.js";
import { cartDao } from "../mongo/cart.dao.js";


const LocalStrategy = local.Strategy;
const googleStrategy = google.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

// Función que inicializa todas las estrategias
export const initializePassport = () => {
  // Estrategia Local
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {

        try {
          const { first_name, last_name, age ,role} = req.body;
          // validar si el usuario existe
          const user = await userDao.getByEmail(username);
          if (user)
            return done(null, false, { message: "El usuario ya existe" }); 

          // Creamos un carrito nuevo para el usuario
          const cart = await cartDao.create();

          // Si el usuario no existe creamos un nuevo usuario
          const newUser = {
            first_name,
            last_name,
            age,
            email: username,
            password: createHash(password),
            role: role ? role : "user",
            cart: cart._id,
          };

          const userRegister = await userDao.create(newUser);

          return done(null, userRegister);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  passport.use("login", new LocalStrategy({usernameField:"email"}, async (username , password , done) => {
      try {
        const user = await userDao.getByEmail(username);
        if (!user || !isValidPassword(password, user.password)) {
          return done (null , false, {message: "email o contra no valido"})
        }

        done(null , user)
        
      } catch (error) {
        done(error)
      }
      }
    )
  )



  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userDao.getById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });


  passport.use("google", new googleStrategy( { 
    clientID: envsConfig.GOOGLE_CLIENT_ID,
    clientSecret: envsConfig.GOOGLE_CLIENT_SECRET,

    callbackURL: "http://localhost:8080/sessions/google"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      console.log(profile)
      console.log("escuchan2")
      const { id, name, emails } = profile
      const user = {
        first_name: name.givenName,
        last_name: name.familyName,
        email: emails[0].value,
      }

      const existUser = await userDao.getByEmail(user.email) 

      if(existUser){
        return cb(null , existUser)
      }

      const newUser = await userDao.create(user);
      return cb(null, newUser)

    } catch (error) {
      return cb(error);
    }
   }
),


)

 passport.use("jwt", new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: envsConfig.JWT_KEY,
 },
 async (jwt_payload, done)=>{

    try {
      console.log(jwt_payload);
      return done(null , jwt_payload)

  } catch (error) {
      return done(error)
  }
 }
))


};
