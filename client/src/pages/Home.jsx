// import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-white p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-4">
        🙏 Welcome to Pooja Booking
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Book Sarasvati Pooja with Pandit Ji and all Samagri included. Weekly seva option available.
      </p>
      <Link
        to="/pooja/sarasvati"
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transition"
      >
        Book Sarasvati Pooja
      </Link>
    </div>
  );
}
