const checkAuth = () => {
  const token = localStorage.getItem("usertoken_hash");

  if (!token) {
    return false;
  }
  if (token === null) {
    return false;
  }
  return true;
};
export default checkAuth;
