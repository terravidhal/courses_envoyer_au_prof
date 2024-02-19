
require("dotenv").config();


const express = require("express");
const cors = require('cors')   
const cookieParser = require('cookie-parser'); 

const app = express();


app.use(express.json(), express.urlencoded({ extended: true }));


app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 



app.use(cookieParser());
    

require("./config/mongoose.config");



   const AllMyCoursesRoutes = require("./routes/course.routes");
   AllMyCoursesRoutes(app);

   const AllMyUsersRoutes = require("./routes/user.routes");
   AllMyUsersRoutes(app);


app.listen(8000, () => console.log("The server is all fired up on port 8000"));