export const addToCart = async (item) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/cart/addToCart`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(item),
    }
  );
  const data = await response.json();
  return data;
};

export const fetchItemsByUserId = async (userId) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/cart/` + userId
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const updateCart = async (update) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/cart/` + update.id,
    {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-type": "application/json" },
    }
  );
  const data = await response.json();
  return data;
};

export const deleteItemFromCart = async (itemId) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/cart/deleteItem/` + itemId,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }
  );
  const data = await response.json();
  return data;
};

export const resetCart = async (userId) => {
  const response = await fetchItemsByUserId(userId);
  const items = response;
  console.log(items);
  for (let item of items) {
    await deleteItemFromCart(item.id);
  }
  console.log(items);
  return { status: "success" };
};
