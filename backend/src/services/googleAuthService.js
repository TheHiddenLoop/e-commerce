import User from "../models/user.js";

export const handleGoogleAuth = async (profile) => {
  const email = profile.emails?.[0]?.value;
  const name = profile.displayName;
  const providerId = profile.id;
  const profilePic = profile.photos?.[0]?.value;

  let user = await User.findOne({ provider: "google", providerId });

  if (!user) {
    user = await User.findOne({ email });

    if (user) {
      user.provider = "google";
      user.providerId = providerId;
      user.profilePic = profilePic;
      user.isVerified = true;
    } else {
      user = new User({
        name,
        email,
        provider: "google",
        providerId,
        profilePic,
        isVerified: true,
      });
    }
    await user.save();
  }

  return user;
};
