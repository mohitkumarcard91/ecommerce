export default function AddressSelector({
  selectedAddress,
  setSelectedAddress,
}) {
  const addresses = ["New York, USA", "Delhi, India", "Mumbai, India"];

  return (
    <div className="mt-2">
      <label className="block text-sm text-gray-500 mb-1">
        Select Address
      </label>

      <select
        value={selectedAddress || ""}
        onChange={(e) => setSelectedAddress(e.target.value)}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="" disabled>
          No address found
        </option>

        {addresses.map((addr, i) => (
          <option key={i} value={addr}>
            {addr}
          </option>
        ))}
      </select>
    </div>
  );
}
