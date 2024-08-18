import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../Redux/slices/userSlice";
import { discountedPrice } from "../app/constants";

function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch]);
  return (
    <div className="min-h-screen">
      {orders.length === 0 && (
        <div className="mt-28 flex flex-col justify-center items-center gap-4 ">
          <h1 className=" text-4xl font-semibold ">
            You have No Orders
          </h1>
          <Link to="/" className="text-xl w-32 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold p-2 rounded-md">Go to Home</Link>
        </div>
      )}
      {orders.map((order, index) => (
        <div
          className="mx-auto py-4 max-w-5xl px-2 sm:px-6 lg:px-8 "
          key={index}
        >
          <div className="p-4 bg-gray-300 rounded-xl">
            <h2 className="text-lg sm:text-3xl pt-3 pb-3 font-semibold bg-gray-300 pl-3">
              Order Id #{order._id}
            </h2>
            <h2 className="text-red-900 pt-3 pb-3 font-semibold bg-gray-300 pl-3">
              Order status is {order.status}
            </h2>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <p>{item.product.title}</p>
                          </h3>
                          <p className="ml-4">
                            ${discountedPrice(item.product)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <label
                          htmlFor="quantity"
                          className="text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty : {item.quantity}
                        </label>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 p-4 bg-gray-300 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{order.totalItems} items</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;
