
const jwt = require("jsonwebtoken");

 const Course = require('../models/course.model');

module.exports = {
  authenticate: (req, res, next) => {
    jwt.verify(
      req.cookies.usertoken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          res.status(401).json({ verified: false });
        } else {
          console.log("You are authenticated!");
          next();
        }
      }
    );
  },
  verifyRole: (roles) => {
    return (req, res, next) => {
      const token = req.cookies.usertoken;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Vous n'avez pas les autorisations nécessaires pour effectuer cette action." });
      }

      next();
    };
  },

  verifyInstructor: async (req, res, next) => {
    try {
      const decoded = jwt.verify(req.cookies.usertoken, process.env.JWT_SECRET); 

      const course = await Course.findById(_id);
      if (!course) {
        return res.status(404).json({ message: "Cours non trouvé" });
      }


    
      if (decoded.role !== "admin" || course.instructor !== decoded._id ) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce cours." });
      }

     
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la vérification de l'instructeur" });
    }
  },
};


