export const googleOAuth = () => {
  window.location.href = "https://e-cltxbackend.vercel.app/api/v1/auth/google";
};

export const facebook = () => {
    window.open("https://e-cltxbackend.vercel.app/api/v1/auth/facebook", "_self");
  };