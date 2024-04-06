export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/?users.id=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/user/fetchuser/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export const updateUser = async (update) => {
    const response = await fetch("/user/updateAddress/" + update.id, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(update),
    });
    // TODO: on server it will only return relevant insformation of user
    const data = await response.json();
    console.log("User API", data);
    return data
  
};

// export function updateUser(update) {
//   return new Promise(async (resolve) => {
//     const response = await fetch("/user/updateuser/" + update.id, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: { "Content-type": "application/json" },
//     });
//     // TODO: on server it will only return relevant insformation of user
//     const data = await response.json();
//     console.log("User API",data)
//     resolve({ data });
//   });
// }
