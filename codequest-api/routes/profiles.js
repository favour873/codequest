const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Profile = require("../models/profiles");
const security = require("../middleware/security");
const { authedUserIsProfileOwner } = require("../middleware/permissions");

router.post("/create", security.verifyAuthUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;

    const user = await User.fetchUserByEmail(email);
    // store new user profile data
    const profileData = req.body;

    // create user profile entry
    const profileEntry = await Profile.create(user.email, profileData);

    // fetch again all the user profiles
    const profiles = await Profile.fetch(email);

    const userprogress = await User.createUserProgress(profileEntry.id);
    return res.status(201).json({
      profiles,
      userprogress,
    });
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/id/:id/:credentials",
  security.verifyAuthUser,
  authedUserIsProfileOwner,
  async (req, res, next) => {
    try {
      const { id, credentials } = req.params;

      const { email } = res.locals.user;
      await Profile.remove(id, credentials, email);

      const profiles = await Profile.fetch(email);

      return res.status(200).json({
        profiles,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/id/:id",
  security.verifyAuthUser,
  authedUserIsProfileOwner,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const profile = await Profile.fetchById(id);
      const userprogress = await User.getUserProgress(id);
      return res.status(200).json({
        ...profile,
        userprogress,
      });
    } catch (error) {
      next(error);
    }
  }
);

// retrieves profiles
router.get("/", security.verifyAuthUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;

    const profiles = await Profile.fetch(email);

    return res.status(200).json({
      profiles,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
