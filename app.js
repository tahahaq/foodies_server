let express = require("express"),
    methodOverride = require("method-override"),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

let placesRoutes = require("./routes/places"),
    adminRoutes = require("./routes/admin"),
    placesPortalRoutes = require('./routes/placesPortal');
// App Config
app = express();
mongoose.connect("mongodb://taha:qwe123@ds155845.mlab.com:55845/foodies");

// mongoose.connect("mongodb://localhost/foodies");
app.use(bodyParser.json({extended: true}));
app.use(cors());
app.use(methodOverride("_method"));

// SESSION CONFIG


app.use('/portal', placesPortalRoutes);
app.use("/places", placesRoutes);
app.use("/admin", adminRoutes);

const port = process.env.PORT || 9000;
app.listen(port);

console.log(`Foodies Server listening on ${port}`);

module.exports.app = app;