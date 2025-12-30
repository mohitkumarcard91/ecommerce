import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ArrowRight,ArrowLeft } from "lucide-react";

export default function Header() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products?limit=5&skip=5&select=title,price,thumbnail"
        );
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [products]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <div className="relative mb-2 z-2 h-[350px] bg-black overflow-hidden">
      {products.map((item, i) => (
        <div
          key={item.id}
          className={`absolute inset-0 flex flex-col items-center justify-center transition-transform duration-700 ${
            i === index ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-[240px] object-contain"
          />
          <h5 className="text-white mt-3 font-bold">{item.title}</h5>
          <p className="text-white text-lg">₹{item.price}</p>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
      >
       <ArrowLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
      >
       <ArrowRight size={20} />
      </button>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
