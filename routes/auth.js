const express = require("express");
const passport = require("passport");
const router = express.Router();

//@desc Auth with Google
//@route GET /auth/google

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

//@desc GOOGLE AUTH CB
//@route GET /auth/google/callback

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
    }),
    (req, resp) => {
        resp.redirect("/dashboard");
    }
);

// @desc Logout
// @router /auth/logout

router.get(
    '/logout',
    (req, res, next) => {
        req.logout(function(err){
            if (err) {
                return next (err)
            }
            res.redirect('/')
        })
    }
)



module.exports = router;
