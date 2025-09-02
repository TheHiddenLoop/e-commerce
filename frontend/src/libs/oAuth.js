export const googleOAuth = () => {
  window.location.href = "http://localhost:3000/api/v1/auth/google";
};

export const facebook = () => {
    window.open("http://localhost:3000/auth/facebook", "_self");
  };