import React from "react";
import { Fragment, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  selectItems,
  updateCartAsync,
  deleteItemFromCartAsync,
} from "../Redux/slices/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { discountedPrice } from "../app/constants";

function Cart() {
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);
  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const dispatch = useDispatch();

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 min-h-screen">
        <div className="mt-8 p-4 bg-white ">
          <h2 className="text-3xl pt-3 pb-5 pl-7 font-semibold bg-white">
            Cart Items
          </h2>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200 px-7">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <Link
                    to={`/product-detail/${item.product.id}`}
                    className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                  >
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </Link>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product-detail/${item.product.id}`}>
                            {item.product.title}
                          </Link>
                        </h3>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
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
                        Qty
                      </label>
                      <select
                        onChange={(e) => handleQuantity(e, item)}
                        value={item.quantity}
                        className="mx-3"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <div className="flex">
                        <button
                          onClick={(e) => handleRemove(e, item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-4 bg-white border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500 gap-2">
              <p>or</p>
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
