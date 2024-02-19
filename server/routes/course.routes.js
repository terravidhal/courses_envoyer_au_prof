const CourseController = require('../controllers/course.controller');
 

const { authenticate } = require('../config/jwt.config');

const { verifyRole } = require('../config/jwt.config');

const { verifyInstructor } = require('../config/jwt.config');



module.exports = app => {
   // app.get('/api/courses',authenticate, verifyRole(["user", "admin", "instructor"]), CourseController.findAllCourses);  
    app.get('/api/courses',authenticate, CourseController.findAllCourses);  
   // app.get('/api/courses/:id',authenticate, verifyRole(["user", "admin", "instructor"]), CourseController.findOneSingleCourse);
    app.get('/api/courses/:id',authenticate, CourseController.findOneSingleCourse);
  //  app.get('/api/students/:courseId',authenticate, verifyRole(["user", "admin", "instructor"]), CourseController.findAllStudentsBySpecificCourse);
   // app.patch('/api/courses/:id',authenticate, verifyInstructor,  CourseController.updateExistingCourse); 
    app.patch('/api/courses/:id',authenticate,   CourseController.updateExistingCourse); 
  //  app.post('/api/courses',authenticate, verifyRole(["admin", "instructor"]),  CourseController.createNewCourse);
    app.post('/api/courses',authenticate,   CourseController.createNewCourse);
  //  app.delete('/api/courses/:id',authenticate,verifyRole(["admin"]),  CourseController.deleteAnExistingCourse);
    app.delete('/api/courses/:id',authenticate,  CourseController.deleteAnExistingCourse);
}

