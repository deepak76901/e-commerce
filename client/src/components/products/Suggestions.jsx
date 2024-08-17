import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSuggestionAsync,
  selectSuggestions,
} from "../../Redux/slices/ProductSlice";
import { discountedPrice } from "../../app/constants";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function Suggestions({ category }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSuggestionAsync(category));
  }, [category]);
  const data = useSelector(selectSuggestions);

  return (
    <div className="flex pb-5 gap-4 md:justify-around px-10  overflow-x-auto">
      {data.length > 0 &&
        data.map((product) => (
          <div className="border-2 border-gray-600 h-60 w-52  group">
            <div className="h-40 w-40">
              <Link to={`/product-detail/${product.id}`}>
                <img
                  src={product.thumbnail}
                  className="h-40 w-full object-cover group-hover:cursor-pointer mx-auto"
                />
              </Link>
            </div>
            <div className="px-2 group-hover:cursor-pointer space-y-1">
              <p className="hover:underline line-clamp-1 ">{product.title}</p>
              <div className="flex items-center text-sm mt-2 bg-[#4d8c1d] text-white h-5 w-14 rounded-md pl-1">
                <span>{product.rating}</span>
                <svg className="h-4">
                  <StarIcon />
                </svg>
              </div>
              <div className="space-x-2">
                <span className="text-gray-900 font-semibold">
                  ${discountedPrice(product)}
                </span>
                <span className="text-sm line-through text-gray-500">
                  ${product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
