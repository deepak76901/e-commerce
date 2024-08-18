import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  fetchProductByIdAsync,
  resetCreatedProduct,
  resetProductForm,
  selectBrands,
  selectCategories,
  selectCreatedProduct,
  selectProductById,
  updateProductAsync,
} from "../../Redux/slices/ProductSlice";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../Redux/api/ProductAPI";
import { Loader2 } from "lucide-react";

export default function ProductForm() {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const params = useParams();
  const navigate = useNavigate();
  const selectedProduct = useSelector(selectProductById);
  const createdProduct = useSelector(selectCreatedProduct);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("price", selectedProduct.price);
      setValue("stock", selectedProduct.stock);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
    }
  }, [selectedProduct]);

  const handleForm = (data) => {
    setIsLoading(true);
    const product = new FormData();

    // Append form data
    product.append("title", data.title);
    product.append("description", data.description);
    product.append("price", data.price);
    product.append("category", data.category);
    product.append("brand", data.brand);
    product.append("discountPercentage", data.discountPercentage);
    product.append("stock", data.stock);

    // Append image files
    product.append("thumbnail", data.thumbnail[0]);
    product.append("image1", data.image1[0]);
    product.append("image2", data.image2[0]);
    product.append("image3", data.image3[0]);

    // ## this approch is not beneficial for FormData type Data ##
    
    // let product = {...data}
    // product.price = +product.price;
    // product.stock = +product.stock;
    // product.discountPercentage = +product.discountPercentage;
    // product.rating = +product.rating;
    // product.thumbnail = product.thumbnail[0]
    // product.image1 = product.image1[0]
    // product.image2 = product.image2[0]
    // product.image3 = product.image3[0]

    // console.log("Data : ",product);

    if (params.id) {
      dispatch(updateProductAsync({ id: params.id, product }));
      dispatch(resetProductForm());
      reset();
    } else {
      dispatch(createProductAsync(product));
      reset();
    }
  };

  useEffect(() => {
    if (createdProduct) {
      setIsLoading(false);
      navigate(`/product-detail/${createdProduct.id}`);
      setTimeout(() => {
        dispatch(resetCreatedProduct());
      }, 3000);
    }
  }, [createdProduct]);

  return (
    <div className="mx-20 my-5 pb-8 min-h-screen">
      <form
        noValidate
        className="space-y-6"
        onSubmit={handleSubmit(handleForm)}
        encType="multipart/form-data"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-lg font-semibold leading-7 text-gray-900">
              Add Product
            </h1>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("title", {
                        required: "title is required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brands
                </label>
                <div className="mt-2">
                  <select
                    className="w-full sm:w-52"
                    {...register("brand", {
                      required: "brand is required",
                    })}
                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand, index) => (
                      <option key={index} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Categories
                </label>
                <div className="mt-2">
                  <select
                    className="w-full sm:w-52"
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value="">--choose category--</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <div className="flex rounded-md grid-cols-2 shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="number"
                  {...register("price", {
                    required: "price is required",
                    min: 1,
                    max: 1000000,
                  })}
                  id="price"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="discountPercentage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Discount
            </label>
            <div className="mt-2">
              <div className="flex rounded-md grid-cols-2 shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="number"
                  {...register("discountPercentage", {
                    required: "discountPercentage is required",
                    min: 0,
                    max: 99,
                  })}
                  id="discountPercentage"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="stock"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Stock
            </label>
            <div className="mt-2">
              <div className="flex rounded-md grid-cols-2 shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="number"
                  {...register("stock", {
                    required: "stock is required",
                    min: 0,
                  })}
                  id="stock"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>{" "}
          <div className="sm:col-span-6">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Thumbnail
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                name="thumbnail"
                {...register("thumbnail", {
                  required: "Thumbnail is required",
                })}
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="image1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image1
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                id="image1"
                {...register("image1", { required: "image1 is required" })}
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="image2"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image2
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                id="image2"
                {...register("image2", { required: "image2 is required" })}
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="image3"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image3
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                id="image3"
                {...register("image3", { required: "image3 is required" })}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full sm:w-56 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
