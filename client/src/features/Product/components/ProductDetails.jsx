import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectProductById } from "../ProductSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/CartSlice";
import { discountedPrice } from "../../../app/constants";
import { selectLoggedInUser } from "../../auth/authSlice";
import { selectUserInfo } from "../../user/userSlice";
import Suggestions from "./Suggestions";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const product = useSelector(selectProductById);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const params = useParams();
  // Remember this destructuring process
  const { _id } = useSelector(selectLoggedInUser);
  const handleCart = (e) => {
    e.preventDefault();

    if (items.length > 0) {
      if (items.findIndex((item) => item.product.id === product.id) < 0) {
        const newItem = {
          quantity: 1,
          user: _id,
          product: product.id,
        };
        dispatch(addToCartAsync(newItem));
      } else {
        alert("Item Already Exist");
      }
    } else {
      const newItem = {
        quantity: 1,
        user: _id,
        product: product.id,
      };
      dispatch(addToCartAsync(newItem));
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  const [index, setIndex] = useState(0);

  return (
    <div className="bg-white">
      {product && (
        <div>
          <div className="pt-4  flex flex-col md:flex-row w-full">
            {/* Image gallery */}
            <div className=" mt-4 md:w-[350px] md:h-[450px] mx-10">
              <div className="relative">
                <button
                  className="absolute top-2/4 left-0 bg-gray-200/70 py-1 px-1 text-xl"
                  onClick={() => {index>0 && setIndex(index - 1)}}
                >
                  <FaAngleLeft/>
                </button>
                <button
                  className="absolute top-2/4 right-0 bg-gray-200/70 py-1 px-1 text-xl"
                  onClick={() => {index<3 && setIndex(index + 1)}}
                >
                  <FaAngleRight/>
                </button>
                <img
                  src={product.images[index]}
                  alt={product.title}
                  className="h-[400px] w-full object-contain object-center"
                />
              </div>
              <form className="mt-3">
                <button
                  type="submit"
                  onClick={handleCart}
                  className=" flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>
            </div>

            {/* Product info */}
            <div className="md:ml-24 py-3 px-3 scroll-auto overflow-auto">
              <div className="px-5">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
                <p className="text-3xl tracking-tight text-gray-900">
                  ${discountedPrice(product)}
                </p>
                <p className="text-xl text-gray-500 line-through">
                  ${product.price}
                </p>
                {/* Reviews */}
                <div className="flex items-center mt-2 bg-[#4d8c1d] text-white h-7 w-16 rounded-md px-1">
                  <span>{product.rating}</span>
                  <svg className="h-4">
                    <StarIcon />
                  </svg>
                </div>
              </div>

              {/**Details */}

              <div className="py-10 px-3 lg:col-span-2">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6 max-w-xl">
                    <p className="text-sm md:text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10 max-w-xl">
                  <h3 className="text-base font-medium text-gray-900">
                    Highlights
                  </h3>
                  <p className="text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Neque nobis minus natus accusantium tempora amet aperiam
                    dolores iure. Reprehenderit perferendis accusamus
                    consectetur eum tempore. Tempora.
                  </p>
                </div>

                <div className="mt-10  max-w-xl ">
                  <h2 className="text-base font-medium text-gray-900">
                    Details
                  </h2>
                  <p className="text-sm md:text-base">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Laborum vel soluta et quidem, explicabo maxime quis nobis
                    illum iste quia recusandae reiciendis asperiores magni ullam
                    ducimus nemo ab non nam minima odio qui?
                  </p>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Suggestions category={product.category} />
          </div>
        </div>
      )}
    </div>
  );
}
