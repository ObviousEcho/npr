const validate = (email, password) => {
  // email validation
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const validEmail = emailRegex.test(email);
  // password validation
  const pwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const validPassword = pwordRegex.test(password);

  if (!validEmail || !validPassword) {
    return false;
  }
  return true;
};

module.exports = { validate };
