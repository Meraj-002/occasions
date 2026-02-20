"use client";
import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState("");

  const amounts = [
    "100",
    "200",
    "300",
    "500",
    "1000",
    "1100",
    "1500",
    "3000",
    "5000",
  ];

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 overflow-hidden">
      <div
    className="absolute inset-0 bg-cover bg-center blur-sm scale-100"
    style={{ backgroundImage: "url('/images/bg.jpeg')" }}
  ></div>

  <div className="absolute inset-0 bg-black/1"></div>
      {/* Overlay Card */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-xl">

        {/* Title */}
        <h2 className="text-xl font-semibold mb-5">
          💰 Deposit Amount
        </h2>

        {/* Amount Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {amounts.map((item, index) => (
            <button
              key={index}
              onClick={() => setAmount(item)}
              className="border rounded-xl py-3 font-semibold active:scale-95 transition"
style={{ color: "#fa5f5d" }}
 >
              ₹ {item >= 1000 ? item / 1000 + "K" : item}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="mt-6 flex items-center bg-gray-100 rounded-2xl px-4 py-3">
          <span className="text-xl mr-2" style={{ color: "#fa5f5d" }}>₹</span>

          <input
            type="number"
            placeholder="100 - 50,000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent outline-none w-full"
          />

          {amount && (
            <button
              onClick={() => setAmount("")}
              className="text-gray-500 text-lg"
            >
              ✕
            </button>
          )}
        </div>

        {/* Add Money Button */}
        <button
  onClick={() => {
    if (!amount) {
      alert("Please select amount");
      return;
    }

    const upiLink = `upi://pay?pa=meraj666@ptaxis&pn=Meraj%20Alam&am=${amount}&cu=INR`;

    window.location.href = upiLink;
  }}
  className="w-full mt-6 text-white py-3 rounded-full font-semibold shadow-lg active:scale-95 transition"
  style={{ backgroundColor: "#fa5f5d" }}
>
  Add Money
</button>
      </div>
    </main>
  );
}