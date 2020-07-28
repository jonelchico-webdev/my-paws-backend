require("./models/User");
// require("./models/PetType");
require('./services/passport');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const keys = require('./config/keys');

const passport = require('passport');

const app = express();

// Enable the Cross Origin Resource Sharing (CORS)
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//     next()
// })

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
    console.error("Error connecting to mongo", err);
});




app.use(bodyParser.json());
app.use('/api', require('./routes/routes'));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/passportRoutes')(app);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
