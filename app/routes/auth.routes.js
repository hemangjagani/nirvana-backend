const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const upload = require("../utils/multerConfig");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);

  app.post(
    "/api/resume",
    upload.single('resumeFile'), // 'resumeFile' should match the field name in the form
    userController.uploadResume
  );
  app.get("/api/resumes", userController.getAllResumes);
};
