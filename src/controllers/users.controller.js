const usersCtrl = {}

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

usersCtrl.signUp = (req, res) => {
    res.send('SignUp');
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