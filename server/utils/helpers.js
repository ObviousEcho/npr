const validateEmail = (email) => {
  // email validation
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const validEmail = emailRegex.test(email);

  if (!validEmail) {
    return false;
  }
  return true;
};

const validatePassword = (password) => {
  // password validation
  const pwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const validPassword = pwordRegex.test(password);

  if (!validPassword) {
    return false;
  }
  return true;
};

module.exports = { validateEmail, validatePassword };
