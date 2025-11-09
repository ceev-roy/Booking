import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Confirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Fetching booking details
    fetch(`http://localhost:4000/api/bookings`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => b.id == id);
        setBooking(found);
      });

    const storedPlan = localStorage.getItem("selectedPlan");
    if (storedPlan) {
      setSelectedPlan(JSON.parse(storedPlan));
    }
  }, [id]);

  if (!booking) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-yellow-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
          🎉 Booking Confirmed!
        </h2>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Name:</span> {booking.name}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Phone:</span> {booking.phone}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Date:</span> {booking.date}
        </p>

        <div
          className="flex items-center justify-between mt-4 border p-3 rounded-lg cursor-pointer hover:bg-orange-50 transition"
          onClick={() => navigate("/subscription")}
        >
          <div>
            <p className="font-semibold text-gray-700">Subscription Plan</p>
            {selectedPlan ? (
              <p className="text-orange-600 font-medium capitalize">
                {selectedPlan.plan} — ₹{selectedPlan.price} ({selectedPlan.discount}% off)
              </p>
            ) : (
              <p className="text-gray-500">No plan selected</p>
            )}
          </div>
          <ArrowRight className="text-orange-500" size={22} />
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
        >
          Finish
        </button>
      </div>
    </div>
  );
}

