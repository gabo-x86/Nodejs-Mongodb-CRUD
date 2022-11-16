const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy; //Importamos la manera en la que se conectará (por BD local)
const User = require("../models/User.js");

//Usamos middleware
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      //Esta función recibe los datos y los valida
      //"done" es un callback que representa lo que hará a continuación en caso de falla o éxito
      const user = await User.findOne({ email: email });         //Busca el usuario por email
      console.log(user)
      if (!user) {
        return done(null, false, { message: "Not User Found" }); //(msg_de_error, existe_usuario, mensaje)
      } else {
        const passwordMatch = await user.matchPassword(password); //Compara contraseña
        if (passwordMatch) {
          return done(null, user);                                //Guarda sesión en servidor
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);                      //Si hay error devulve error, si hay usuario devuelve user
  });
});
