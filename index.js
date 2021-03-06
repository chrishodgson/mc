const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");


require("./models/UserActivity"); 
require("./models/Challenge"); 
require("./models/UserChallenge"); 
require("./models/Mountain");
require("./models/MountainList");
require("./models/User");
require("./models/Area");

require("./services/passport");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const app = express();

// middleware
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
require("./routes/authRoutes")(app);
require("./routes/areaRoutes")(app);
require("./routes/challengeRoutes")(app);
require("./routes/userChallengeRoutes")(app);
require("./routes/mountainListRoutes")(app);
require("./routes/userActivityRoutes")(app);


if (process.env.NODE_ENV === "production") {
  //attempt to load js and css asset
  app.use(express.static("client/build"));

  //default to react app
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
