const homeRouter = require("./home");
const userRouter = require("./user");
const postRouter = require("./posts");
const meRouter = require("./me");
const sessionChecker = require("../middlewares/sessionChecker");

function router(app) {
    // app.use(sessionChecker)
  app.use("/user", userRouter);
  app.use("/posts", postRouter);
  app.use('/me', meRouter)
  app.use("/", sessionChecker, homeRouter);

  app.use((req, res) => {
      res.send("Not Found")
  })
}

module.exports = router;
