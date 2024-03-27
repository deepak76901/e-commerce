export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart",{
      method:"POST",
      body: JSON.stringify(item),
      headers:{"Content-type":"application/json"}
    });
    // TODO: on server it will only return relevant insformation of user
    const data = await response.json();
    resolve({data})
  });
}



export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart?user="+userId);
    const data = await response.json();
    resolve({data})
  });
}


export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/"+update.id,{
      method:"PATCH",
      body: JSON.stringify(update),
      headers:{"Content-type":"application/json"}
    });
    // TODO: on server it will only return relevant insformation of user
    const data = await response.json();
    resolve({data})
  });
}


export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/"+itemId,{
      method:"DELETE",
      headers:{"Content-type":"application/json"}
    });
    const data = await response.json();
    // TODO: on server it will only return relevant insformation of user
    resolve({data:{id:itemId}})
  });
}

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items =  response.data;
    for(let item of items){
      await deleteItemFromCart(item.id)
    }
    resolve({status:'success'})
  })

}
