export const validCredentials = {
  credentials: {
    email: 'eve.holt@reqres.in',
    password: 'anypassword',
  }

};

export const failedCredentials = [
  {
    name: 'Missing password',
    payload: { email: 'eve.holt@reqres.in' },
    errorMessage: 'Missing password',
  },
  {
    name: 'Missing email',
    payload: { password: 'anypassword' },
    errorMessage: 'Missing email or username',
  },
  {
    name: 'Undefined user',
    payload: { email: 'undefined@email.com', password: 'anypassword' },
    errorMessage: 'Note: Only defined users succeed registration',
  },
]