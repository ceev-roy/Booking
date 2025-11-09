import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Gift } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-orange-500 text-white shadow-md">
      <Link to="/" className="text-xl font-bold">
        🕉 Pooja Booking
      </Link>

      <div className="flex items-center gap-5">
        <button
          onClick={() => navigate("/subscription")}
          className="relative hover:text-yellow-200 transition"
          title="Weekly Subscriptions"
        >
          <Gift size={22} />
        </button>

        <button
          className="relative hover:text-yellow-200 transition"
          title="My Cart"
        >
          <ShoppingCart size={22} />
        </button>
      </div>
    </nav>
  );
}
