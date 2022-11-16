const usersCtrl = {}
const User = require("../models/User");

const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

usersCtrl.signUp = async (req, res) => {    //Podría usarse dependencia passport
    const errors = [];
    const {name, email, password, confirm_password} = req.body;

    if(password !== confirm_password)
        errors.push({text: "Passwords don't match"});

    if(password.length < 4)
        errors.push({text: "Passwords must be at least 4 characters"});

    if(errors.length > 0){
        res.render('users/signup', {                    //En caso de error, renderizamos la misma página con PARÁMETROS
            errors,
            name,
            email,
            password,
            confirm_password
        });
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('err_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name:name, email:email, password:password});
            newUser.password = await newUser.encryptPassword(password);        //→→→→→Cifrar contraseña←←←←←
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    }
}

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signIn = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true,                  //Si existe error, pasar a Flash
});


usersCtrl.logOut = (req, res) => {
    //Podría ser req.session.user={}
    req.logout((err)=>{                 //Función de passport que cierra sesión del servidor
        if(err) return next(err);
        req.flash('success_msg', 'You are logged out now');
        res.redirect('/users/signin')
    });                      
    
}

module.exports = usersCtrl;