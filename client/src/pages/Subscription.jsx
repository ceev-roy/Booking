import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState("weekly");

  const plans = {
    weekly: { price: 499, discount: 20 },
    monthly: { price: 1699, discount: 25 },
    yearly: { price: 4999, discount: 35 },
  };

  const handleSubscribe = async () => {
    if (!plan) return alert("Select a plan");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan,
        price: plans[plan].price,
        discount: plans[plan].discount,
      }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("selectedPlan", JSON.stringify({ plan, ...plans[plan] }));
      navigate(-1);
    } else {
      alert("Subscription failed: " + (data.error || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
          🔔 Subscription Plans
        </h2>

        <div className="space-y-4">
          {Object.keys(plans).map((key) => (
            <label
              key={key}
              className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition ${plan === key ? "border-orange-500 bg-orange-50" : "border-gray-200"
                }`}
            >
              <div>
                <p className="font-semibold capitalize">{key} Plan</p>
                <p className="text-sm text-gray-600">
                  ₹{plans[key].price} / {key} — {plans[key].discount}% off
                </p>
              </div>
              <input
                type="radio"
                checked={plan === key}
                onChange={() => setPlan(key)}
              />
            </label>
          ))}
        </div>

        <button
          onClick={handleSubscribe}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
        >
          Select Plan
        </button>
      </div>
    </div>
  );
}
