// faking asynchronous with Promise here, to simulate call to server 
// the {email, password} passed as object
export function login({ email, password }) {
  const delay = (Math.random() * 2) * 1000; // randomly generated delay
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      // checking password, else reject with message
      if (password === "password123" && email) {
        resolve();
      } else {
        reject(new Error ("Invalid email or password"));
      }
    }, delay);
  });
};