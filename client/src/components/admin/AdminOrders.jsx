import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../Redux/slices/OrderSlice";
import { ITEMS_PER_PAGE, discountedPrice } from "../../app/constants";
import Pagination from "../../components/Pagination";

function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [editableOrderId, setEditableOrderId] = useState(null);

  const handleEdit = (order) => {
    setEditableOrderId(order._id);
  };
  const handleShow = () => {
    console.log("handleShow");
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(null);
  };
  const handlePage = (page) => {
    setPage(page);
  };
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [sort, page]);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <div className="overflow-x-auto min-h-screen">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6 overflow-auto">
            <table className="min-w-max w-full table-auto ">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border border-gray-500">
                  <th className="py-3 px-2 cursor-pointer border-r border-gray-500 w-6">
                    Serial No.
                  </th>
                  <th
                    className="py-3 px-6 text-left cursor-pointer border-r border-gray-500"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order Id
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-left border-r border-gray-500">
                    Items
                  </th>
                  <th
                    className="py-3 px-6 text-left cursor-pointer border-r border-gray-500"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-center border-r border-gray-500">
                    Shipping Address
                  </th>
                  <th className="py-3 px-6 text-center border-r border-gray-500">
                    Status
                  </th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light divide-y-2">
                {orders.map((order, index) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100 divide-x-2"
                    key={index}
                  >
                    <td className="text-center font-semibold h-20">
                      {(page - 1) * ITEMS_PER_PAGE + (index + 1)}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap w-20">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order._id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left w-48">
                      {order.items.map((item, index) => (
                        <div className="flex items-center" key={index}>
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.thumbnail}
                            />
                          </div>
                          <span className="font-semibold">
                            <p>{item.product.title}</p>
                            Quan. - {item.quantity}, Price - $
                            {discountedPrice(item.product)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center w-16">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 w-60">
                      <div className=" inline ">
                        <div className="text-sm font-semibold">
                          {order.selectedAddress.name}
                        </div>
                        <p className="line-clamp-2">
                          {`${order.selectedAddress.street}${order.selectedAddress.city},${order.selectedAddress.state},${order.selectedAddress.pinCode}${order.selectedAddress.phone}`}
                        </p>
                      </div>
                    </td>
                    {/* video me 6:54 se dekh samjh aa jayega*/}
                    <td className="py-3 px-6 text-center w-16">
                      {order._id === editableOrderId ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center w-16">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                          <EyeIcon
                            className="w-8 h-8"
                            onClick={(e) => handleShow(order)}
                          ></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
