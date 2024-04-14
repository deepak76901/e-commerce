export const fetchAllProducts = async () => {
  const response = await fetch("/products/getAllProducts");
  const data = await response.json();
  return data;
};

export const fetchProductById = async (id) => {
  const response = await fetch("/products/" + id);
  const data = await response.json();
  return data;
};

export const createProduct = async (product) => {
  const response = await fetch("/products/create", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const updateProduct = async ({id,product}) => {
  const response = await fetch("/products/update/"+id, {
    method: "PATCH",
    body: JSON.stringify(product),
    headers: { "Content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchProductsByFilter = async (filter, sort, pagination) => {
  // filter = {"category" : {"smartphone","laptop"}}
  // sort = {_sort:"price",_order:"desc"}
  // pagination = {_page=1,_limit=10}

  // TODO : on server we will support multi values
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];

    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  const response = await fetch("/products/getAllProducts?" + queryString);
  const data = await response.json();
  const totalItems = await response.headers.get("X-Total-Count");
  return { products: data, totalItems: +totalItems };
};

export const fetchCategories = async () => {
  const response = await fetch("/categories");
  const data = await response.json();
  return data;
};
export const fetchBrands = async () => {
  const response = await fetch("/brands");
  const data = await response.json();
  return data;
};

export const fetchSuggestions = async (category) => {
  const response = await fetch(`/products/suggestion/${category}`,)
  if(response.ok){
    const data = await response.json()
    return data;
  }
}