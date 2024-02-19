
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const UserModel = require("../models/user.model");


module.exports = {


  
  register: (req, res) => {
   
    const newUser = new UserModel(req.body);
    
    newUser
      .save()
      .then((newUser) => {
        res
          .status(201)
          .json({ message: "User successfully created", user: newUser });
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(500).json({ message: "Something went wrong", errors: err });
      });
  },


  
   login: (req, res) => {
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          res.status(400).json({ message: "Login Error" });
        } else {
         
          bcrypt
            .compare(req.body.password, user.password)
            .then((isPasswordValid) => {
              if (isPasswordValid) {
                const userInfo = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                };
                console.log("userInfo: ", userInfo);
                const userToken = jwt.sign(userInfo, process.env.JWT_SECRET); 
                const cookieOptions = {
                  httpOnly: true, 
                  expires: new Date(Date.now() + 900000000), 
                };
                
                res
                  .cookie("usertoken", userToken, cookieOptions)
                  .status(200)
                  .json({ message: "Successfully logged in", user: userInfo });
              } else {
                res.status(400).json({ message: "Login Error" });
              }
            })
            .catch((err) => {
              res.status(400).json({ message: "Login Error" });
            });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "Login Error" });
      });
  },


  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.status(200).json({
      message: "You have successfully logged out of our system",
    });
  },


  findAllUsers: (req, res) => {
    UserModel.find({})
      .then((allUsers) => res.status(200).json(allUsers))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

  findOneSingleUser : (req, res) => {
    UserModel.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
          console.log("oneSingleUser",oneSingleUser);
            res.json({ oneSingleUser })
        })
        .catch((err) => {
             res.status(400).json(err) 
        });
  },


findUsersByManyId: (req, res) => {
  const { ids } = req.params.id; 

  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "Liste d'IDs vide." });
  }

  UserModel.find({ _id: { $in: ids } })
    .then((users) => {
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur trouvé." });
      }

      res.json({ users });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
},




  findAllUsersByRoleStudent: (req, res) => {
    UserModel.find({role: 'student'})
      .then((allUsersByRoleStudent) => res.status(200).json(allUsersByRoleStudent))
      .catch((err) =>
        res.status(400).json({ message: "Something went wrong" })
      );
  },


  deleteAllUsers: (req, res) => {
    UserModel.deleteMany({})
      .then((result) => res.status(200).json({ result }))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },

 
updateExistingUser: (req, res) => {
  const userId = req.params.id; 
  const updatedData = req.body; 

  UserModel.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},



createUser: (req, res) => {
  const userData = req.body;

  UserModel.create(userData)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},


deleteOneSpecificUser: (req, res) => {
  const userId = req.params.id; 

  UserModel.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong", error: err })
    );
},

}  















