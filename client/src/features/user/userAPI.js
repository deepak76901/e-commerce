export const fetchLoggedInUserOrders = async (userId) => {
  const response = await fetch("/user/orders/" + userId);
  const data = await response.json();
  console.log("Data",data)
  console.log("Total docs",data.length)
  return data;
};

export const fetchLoggedInUser = async (userId) => {
  const response = await fetch("/user/fetchuser/" + userId);
  const data = await response.json();
  return data;
};

export const updateUser = async (update) => {
  const response = await fetch("/user/updateUser/" + update.id, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(update),
  });
  // TODO: on server it will only return relevant insformation of user
  const data = await response.json();
  console.log(data);
  return data;
};
