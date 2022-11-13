const usersCtrl = {}
const User = require("../models/User");

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

usersCtrl.signUp = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;

    if(password !== confirm_password)
        errors.push({text: "Passwords don't match"});

    if(password.length < 4)
        errors.push({text: "Passwords must be at least 4 characters"});

    if(errors.length > 0){
        res.render('users/signup', {                    //En caso de error, redireccionamos a la misma página con PARAMS
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

usersCtrl.signIn = (req, res) => {
    res.send('SignIn');
}

usersCtrl.logOut = (req, res) => {
    res.send('Logout');
}

module.exports = usersCtrl;