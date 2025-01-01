export const createUser = async (userData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const checkUser = async (logInInfo) => {
  try {
    const email = logInInfo.email;
    const password = logInInfo.password;
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
      {
        method: "POST",
        body: JSON.stringify(logInInfo),
        headers: { "content-type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      return data;
    } else {
      const err = await response.json();
      console.log(err);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const auto_Login = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/auto-login`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Auto login failed:", error.response.message);
    return null;
  }
};

export const logOut = async (userId) => {
  return { data: "success" };
};
