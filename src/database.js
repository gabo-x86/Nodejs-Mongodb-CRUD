const mongoose = require('mongoose');

//Config URI 
const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

//Conexión con BD
mongoose.connect(MONGODB_URI, {//Configs 
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log(`Database is connected`))
    .catch(err => console.log(err));