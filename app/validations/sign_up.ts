/*
    validate username:
    ensure that username doesn't already exist
    username is at least 6 characters long, username is alphanumeric only

    validate password:
    ensure password is at least 8 characters long, contains one capital letter, one special character

    validate email:
        email is of the form .*@.*.com
 */

function validateUsername(username: string) {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return username.length >= 6 && usernameRegex.test(username);
}
function validatePassword(password: string) {
  const hasUpperCase = /[A-Z]/.test(password); // Checks for at least one uppercase letter
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks for at least one special character
  return password.length >= 8 && hasUpperCase && hasSpecialChar;
}
function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export { validateUsername, validateEmail, validatePassword };
