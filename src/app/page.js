"use client";
import { useState, useEffect } from "react";

// Handle browser/mobile back button
useEffect(() => {
  const handleBack = () => {
    setShowQR(false);
  };

  if (showQR) {
    window.history.pushState({ qr: true }, "");
    window.addEventListener("popstate", handleBack);
  }

  return () => {
    window.removeEventListener("popstate", handleBack);
  };
}, [showQR]);

export default function Home() {
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);

  const upiId = "meraj666@ptaxis";

  const amounts = ["100","200","300","500","1000","1100","1500","3000","5000"];

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    alert("UPI ID copied");
  };

  const downloadQR = () => {
  const link = document.createElement("a");
  link.href = "/images/qr.jpeg"; // your QR image path
  link.download = "upi-qr.jpeg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-100"
        style={{ backgroundImage: "url('/images/bg.jpeg')" ,
          filter: "blur(3.4px)",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/30"></div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/40">

        {/* Back Button */}
{showQR && (
  <button
    onClick={() => setShowQR(false)}
    className="absolute top-4 left-4 text-xl font-bold"
  >
    ←
  </button>
)}

        {!showQR ? (
          <>
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

            {/* Input */}
            <div className="mt-6 flex items-center bg-gray-100 rounded-2xl px-4 py-3">
              <span style={{ color: "#fa5f5d" }} className="text-xl mr-2">₹</span>

              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>

            {/* Add Money */}
            <button
              onClick={() => {
                if (!amount) {
                  alert("Please select amount");
                  return;
                }
                setShowQR(true);
              }}
              className="w-full mt-6 text-white py-3 rounded-full font-semibold shadow-lg active:scale-95 transition"
              style={{ backgroundColor: "#fa5f5d" }}
            >
              Add Money
            </button>
          </>
        ) : (
          <>
            {/* QR Screen */}
            <h2 className="text-xl font-semibold text-center mb-4">
              Scan & Pay
            </h2>

            {/* QR Image */}
            <img
              src="/images/qr.jpeg"
              alt="QR Code"
              className="w-56 mx-auto rounded-xl"
            />

            <button
  onClick={downloadQR}
  className="mt-4 mx-auto block px-5 py-2 rounded-full border font-medium active:scale-95 transition"
  style={{ color: "#fa5f5d", borderColor: "#fa5f5d" }}
>
  Download QR
</button>

            {/* UPI ID */}
            <div className="mt-5 text-center">
              <p className="font-semibold">{upiId}</p>

              <button
                onClick={copyUPI}
                className="mt-2 px-4 py-2 rounded-full border"
                style={{ color: "#fa5f5d", borderColor: "#fa5f5d" }}
              >
                Copy UPI ID
              </button>
            </div>

            {/* Note */}
            <p className="text-center text-sm text-gray-700 mt-5">
              Pay on this UPI ID or QR code and click on submit button.
            </p>

            {/* Submit Button */}
            <button
              onClick={() =>
                alert("Please pay on this QR code or UPI ID")
              }
              className="w-full mt-6 text-white py-3 rounded-full font-semibold shadow-lg active:scale-95 transition"
              style={{ backgroundColor: "#fa5f5d" }}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </main>
  );
}
