import axios from "axios";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=1&skip=5&select=title,price,thumbnail"
        );

        if (response.status === 200) {
          setProduct(response.data.products[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <header className="w-full bg-white shadow-md">
      {product && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4">
          <div className="w-[90%] mx-auto flex items-center gap-6">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-20 w-28 object-cover rounded-lg"
            />

            <div>
              <h2 className="font-semibold text-lg truncate">
                {product.title}
              </h2>
              <p className="text-sm">Special Deal</p>
              <p className="text-xl font-bold">₹{product.price}</p>
            </div>

            <button className="ml-auto bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition">
              Shop Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
