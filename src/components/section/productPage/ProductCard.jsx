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

  const cartItems = useSelector((state) => state.products.cart);

  if (!product) return null;



const isInCart =
  user &&
  cartItems?.some(
    (item) => item.id === product.id
  );

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

    dispatch(
      addToCart({
        userEmail: user.email,
        product,
      })
    );

    toast.success("Item added to cart successfully!");
  };

  const handleCardClick = () => { 
    navigate(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={
            i <= roundedRating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }
        />
      );
    }

    return stars;
  };

  return (
    <div
      onClick={handleCardClick}
      className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-56 cursor-pointer hover:shadow-md transition"
    >
      <div className="group flex items-center justify-center px-2">
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
