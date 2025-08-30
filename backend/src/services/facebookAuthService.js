import User from "../models/user.js";

export const handleFacebookAuth = async (profile) => {
  const email = profile.emails?.[0]?.value;
  const name = `${profile.name.givenName} ${profile.name.familyName}`;
  const providerId = profile.id;
  const profilePic = profile.photos?.[0]?.value;

  let user = await User.findOne({ provider: "facebook", providerId });

  if (!user) {
    user = await User.findOne({ email });

    if (user) {
      user.provider = "facebook";
      user.providerId = providerId;
      user.profilePic = profilePic;
      user.isVerified = true;
    } else {
      user = new User({
        name,
        email,
        provider: "facebook",
        providerId,
        profilePic,
        isVerified: true,
      });
    }
    await user.save();
  }

  return user;
};
