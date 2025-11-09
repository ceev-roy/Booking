import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { assets } from "../assets/assets";

export default function SarasvatiPooja() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [selectedSamagri, setSelectedSamagri] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const temp = localStorage.getItem("tempBooking");
    if (temp) {
      const data = JSON.parse(temp);
      setName(data.name || "");
      setPhone(data.phone || "");
      setDate(data.date || "");
      setSelectedSamagri(data.selectedSamagri || []);
      setShowForm(true);
    }

    const storedPlan = localStorage.getItem("selectedPlan");
    if (storedPlan) setSelectedPlan(JSON.parse(storedPlan));
  }, []);

  const samagriList = [
    { id: 1, name: "Flowers & Garland" },
    { id: 2, name: "Incense & Dhoop" },
    { id: 3, name: "Kumkum & Haldi" },
    { id: 4, name: "Naivedyam (Prasad)" },
  ];

  const toggleSamagri = (id) => {
    setSelectedSamagri((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBooking = async () => {
    if (!name || !phone) {
      setMessage("❌ Please enter your name and phone.");
      return;
    }

    const data = {
      id: Date.now(),
      pooja: "Sarasvati Pooja",
      name,
      phone,
      date,
      samagri: selectedSamagri,
      plan: selectedPlan,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });


    const result = await res.json();

    if (result.success) {
      // addToCart(data);
      localStorage.removeItem("tempBooking");
      navigate(`/confirmation/${result.bookingId}`);
    } else {
      setMessage("❌ Error: " + (result.error || "Booking failed"));
    }
  };

  const handleNavigateToSubscription = () => {
    localStorage.setItem(
      "tempBooking",
      JSON.stringify({ name, phone, date, selectedSamagri })
    );
    navigate("/subscription");
  };


  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 
                    w-full max-w-4xl 
                    ${showForm ? "md:h-auto" : "md:h-[420px]"}`}
      >
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={assets.puja}
              alt="Sarasvati"
              className="w-full h-56 object-cover md:h-full md:rounded-l-2xl"
            />
          </div>

          <div className="p-5 md:w-1/2 flex flex-col justify-between">
            <div>

              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-3xl font-bold text-orange-600 ">
                  Sarasvati Pooja
                </h2>

                <button

                  className="text-orange-500 hover:text-orange-600 transition"
                  title="Add to Cart"
                >
                  <ShoppingCart size={28} />
                </button>
              </div>

              <p className="mt-1 text-base md:text-lg font-medium text-gray-600">
                Shri Vidya Mandir, Prayagraj
              </p>

              <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
                Puja for <span className="text-orange-600 font-semibold">wisdom, focus</span> and{" "}
                <span className="text-orange-600 font-semibold">learning</span>. Includes Pandit Ji and
                all Samagri needed for the rituals.
              </p>

              <div className="mt-5 border border-orange-200 rounded-2xl bg-orange-50/40 shadow-sm p-5 space-y-1">
                <p className="text-sm md:text-base text-gray-800">
                  <strong className="text-orange-700">Pandit Ji:</strong> Pandit Ramesh Shastri (12 yrs exp.)
                </p>

                <p className="text-sm md:text-base text-gray-800">
                  <strong className="text-orange-700">Languages:</strong> Hindi, English, Sanskrit
                </p>

                <p className="text-sm md:text-base text-gray-800">
                  <strong className="text-orange-700">Samagri:</strong> Flowers, Incense, Kumkum etc..
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="w-full md:w-auto md:px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 rounded-full shadow-md transition-all"
                >
                  {showForm ? "Booking Form" : "Book Now"}
                </button>

                <div className="ml-4 text-right">
                  <p className="text-sm text-gray-400 line-through">₹999</p>
                  <p className="text-xl font-bold text-orange-600">₹499</p>
                </div>
              </div>

              {message && (
                <div className="mt-3 bg-red-50 text-red-700 p-2 rounded">
                  {message}
                </div>
              )}
            </div>
          </div>


        </div>

        {showForm && (
          <div className="p-6 bg-gray-50 border-t transition-all duration-500">
            <h3 className="font-semibold mb-3 text-lg">Booking Details</h3>

            <div className="grid md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mt-4">
              <p className="font-medium mb-2">Select Samagri:</p>
              <div className="grid grid-cols-2 gap-2">
                {samagriList.map((s) => (
                  <label key={s.id} className="text-sm">
                    <input
                      type="checkbox"
                      checked={selectedSamagri.includes(s.id)}
                      onChange={() => toggleSamagri(s.id)}
                      className="mr-2"
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>

            <div
              className="flex items-center justify-between mt-4 border p-3 rounded-lg cursor-pointer hover:bg-orange-50 transition"
              onClick={handleNavigateToSubscription}
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

            <div className="flex justify-end mt-5">
              <button
                onClick={handleBooking}
                className="w-full md:w-auto px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 rounded-full shadow-md transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


