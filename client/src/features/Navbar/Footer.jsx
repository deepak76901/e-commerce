import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="w-full h-36 bg-gray-200 bottom-0 grid grid-cols-3 mt-5">
      <div className="colspan-1 text-sm flex flex-col px-3 py-3 space-y-1 md:text-center">
        <h1 className="text-base">About</h1>
        <Link to="/contact">
          Contact us
        </Link>
        <Link
          to="/about"
        >
          About us
        </Link>
      </div>
      <div className="colspan-1 text-sm flex flex-col px-3 py-3 space-y-1 md:text-center">
        <h1 className="text-base">Help</h1>
        <p>Payment</p>
        <p>Shipping</p>
        <p>FAQs</p>
      </div>
      <div className="colspan-1 text-sm flex flex-col px-3 py-3 space-y-1 md:text-center">
        <h1 className="text-base">Social Media</h1>
        <Link to="https://github.com/deepak76901" target="_blank">
          Git hub
        </Link>
        <Link
          to="https://www.linkedin.com/in/deepak-baghel-38823a23a/"
          target="_blank"
        >
          Linked In
        </Link>
      </div>
    </div>
  );
}
