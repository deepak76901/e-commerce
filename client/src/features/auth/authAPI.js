export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-type": "application/json" },
    });
    // TODO: on server it will only return relevant insformation of user
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(logInInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const email = logInInfo.email;
      const password = logInInfo.password;
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(logInInfo),
        headers: { "content-type": "application/json" },
      });

      if(response.ok){
        const data = await response.json();
        resolve({ data });
      }else{
        const err = await response.json()
        reject(err)
      }
     
    } catch (error) {
      reject(error );
    }
  });
}

export function logOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
  });
}
