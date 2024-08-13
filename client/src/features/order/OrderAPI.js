export const createOrder = async (order) => {
  const response = await fetch("/user/createOrder/"+order.userId, {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const updateOrder = async (order) => {
  const response = await fetch("/orders/update/" + order._id, {
    method: "PATCH",
    body: JSON.stringify(order),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchAllOrders = async ({sort, pagination}) => {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  console.log("Query String",queryString)
  const response = await fetch("/orders/fetchAll?" + queryString);
  const data = await response.json();
  const totalOrders = response.headers.get("X-Total-Count");
  return { orders: data, totalOrders: +totalOrders };
};
