import { useState } from "react";

export default function AddressSelector({
  selectedAddress,
  setSelectedAddress,
}) {
  const [open, setOpen] = useState(false);

  const addresses = ["New York, USA", "Delhi, India", "Mumbai, India"];

  return (
    <div className="relative">
      <div className="flex justify-between mt-2">
        <p className="text-gray-500">{selectedAddress || "No address found"}</p>
        <button onClick={() => setOpen(!open)} className="text-indigo-500">
          Change
        </button>
      </div>

      {open && (
        <div className="absolute top-10 bg-white border w-full shadow-md z-10">
          {addresses.map((addr, i) => (
            <p
              key={i}
              onClick={() => {
                setSelectedAddress(addr);
                setOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {addr}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
