import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

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
   <div className="relative overflow-hidden h-[350px] bg-black">
  <div
    className="flex transition-transform duration-500"
    style={{ transform: `translateX(-${index * 100}%)` }}
  >
    {products.map((item) => (
      <div key={item.id} className="flex-shrink-0 w-full flex flex-col items-center justify-center">
        <img src={item.thumbnail} alt={item.title} className="h-[240px] object-contain" />
        <h5 className="text-white mt-3 font-bold">{item.title}</h5>
        <p className="text-white text-lg">₹{item.price}</p>
      </div>
    ))}
  </div>

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
</div>

  );
}
