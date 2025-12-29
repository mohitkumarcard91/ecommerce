import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const cancelTokenRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!input.trim()) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        if (cancelTokenRef.current) {
          cancelTokenRef.current.cancel();
        }

        cancelTokenRef.current = axios.CancelToken.source();

        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${input}`,
          { cancelToken: cancelTokenRef.current.token }
        );

        setResults(response.data.products.slice(0, 10));
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [input]);

  const handleSearchClick = (id) => {
    setInput("");
    navigate(`/product/${id}`);
  };

  return (
    <div className="relative max-w-md w-full">
      <div className="flex items-center gap-2 border border-none rounded-md px-3 h-[46px] bg-white ">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for products..."
          className="w-full outline-none text-sm text-gray-700 border-none"
        />
      </div>

      {input && (
        <div className="absolute top-[50px] left-0 w-full bg-white border rounded-md shadow-lg z-10">
          {loading && (
            <div className="p-3 text-sm text-gray-400">Searching...</div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-3 text-sm text-gray-400">No results found</div>
          )}

          {!loading &&
            results.map((item) => (
              <button
                onClick={() => handleSearchClick(item.id)}
                key={item.id}
                className="px-3 py-2 cursor-pointer hover:bg-indigo-50 text-sm text-gray-700 w-full text-left"
              >
                {item.title}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
