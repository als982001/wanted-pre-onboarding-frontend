export function validEmail(email) {
  return email.includes("@");
}

export function validPassword(password) {
  return password.length >= 8;
}
