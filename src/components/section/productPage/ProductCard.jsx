import { addToCart } from "../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const cartItems = useSelector((state) => state.products.cart);
  const isInCart = user && cartItems?.some((item) => item.id === product.id);

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddtoCart = (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login first");
      return;
    }

    if (isInCart) {
      navigate("/cart");
      return;
    }

    dispatch(addToCart({ userEmail: user.email, product }));
    toast.success("Item added to cart successfully!");
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2;
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i + 1 <= roundedRating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  };

  if (!product) return null;

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-56 cursor-pointer hover:shadow-md transition"
    >
      <div className="group flex items-center justify-center px-2 relative">
        {!imageLoaded && <ProductCardSkeleton />}

        <img
          src={product.images?.[0]}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={`max-w-[160px] transition group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>

        <p className="text-gray-700 font-medium text-lg truncate">
          {product.title}
        </p>

        <div className="flex items-center gap-1">
          <div className="flex">{renderStars(product.rating)}</div>
          <p className="text-xs">({product.rating})</p>
        </div>

        <div className="flex items-end justify-between mt-2">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            ₹{product.price}
          </p>

          <button
            onClick={handleAddtoCart}
            className={`flex items-center justify-center gap-1 
              ${
                isInCart
                  ? "bg-green-100 border-green-300 text-green-600"
                  : "bg-indigo-100 border-indigo-300 text-indigo-600"
              }
              border md:w-[96px] w-[80px] h-[34px] rounded font-medium`}
          >
            {isInCart ? "Go to Cart" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
