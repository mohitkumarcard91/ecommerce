import { addToCart } from "../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  if (!product) return null;

  const handleAddtoCart = (e) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login first");
      return;
    }

    dispatch(
      addToCart({
        userEmail: user.email,
        product,
      })
    );

    toast("Item added to cart successfully!");
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
        );
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-56 cursor-pointer hover:shadow-md transition"
    >
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-[160px]"
          src={product.images?.[0]}
          alt={product.title}
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
            ₹{product.price}{" "}
          </p>

          <button
            onClick={handleAddtoCart}
            className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-[80px] w-[64px] h-[34px] rounded text-indigo-600 font-medium"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
