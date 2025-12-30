import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/slices/productSlice";
import { selectUser } from "../../redux/slices/authSlice";
import ProductSkeleton from "./ProductSkeleton";

export default function Card() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const cartItems = useSelector((state) => state.products.cart);

  const [productDetails, setProductDetails] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);

        setProductDetails(res.data);
        setImages(res.data.images || []);
        setCurrentImageIndex(0);
      } catch (error) {
        toast.error("Product not found!", {
          position: "top-center",
          autoClose: 2000,
          transition: Bounce,
        });
      }
    };

    fetchProduct();
  }, [id]);

  if (!productDetails) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <ProductSkeleton />
      </div>
    );
  }

  const isInCart =
    user && cartItems?.some((item) => item.id === productDetails.id);

  const handleAddToCart = () => {
    if (!user) {
      toast.warn("Please login first");
      return;
    }

    if (isInCart) {
      navigate("/cart");
      return;
    }

    dispatch(
      addToCart({
        userEmail: user.email,
        product: productDetails,
      })
    );

    toast.success("Item added to cart!");
  };

  return (
    <div className="w-full px-6">
      <div className="flex flex-col md:flex-row gap-16 mt-6">
        <div className="flex gap-4 w-full md:w-[45%]">
          <div className="flex flex-col gap-3">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`border rounded-md cursor-pointer overflow-hidden
                  ${
                    currentImageIndex === index
                      ? "border-indigo-500 ring-2 ring-indigo-300"
                      : "border-gray-300"
                  }`}
              >
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  className="w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>

          <div className="border rounded-lg overflow-hidden flex-1">
            <img
              src={images[currentImageIndex]}
              alt={productDetails.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{productDetails.title}</h1>

          <div className="mt-6">
            <p className="text-2xl font-semibold">
              ₹ {productDetails.discountPercentage}
            </p>
            <p className="text-gray-400 line-through">
              ₹ {productDetails.price}
            </p>
            <span className="text-gray-500 text-sm">
              (inclusive of all taxes)
            </span>
          </div>

          <p className="text-lg font-medium mt-6">About Product</p>
          <ul className="list-disc ml-5 text-gray-600">
            <li>Category: {productDetails.category}</li>
            <li>Brand: {productDetails.brand}</li>
            <li>Rating: ⭐ {productDetails.rating}</li>
          </ul>

          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              className={`px-6 py-2 rounded-md font-medium transition
                ${
                  isInCart
                    ? "bg-green-100 text-green-600 border border-green-300 hover:bg-green-500 hover:text-white"
                    : "bg-indigo-600 text-white hover:bg-white hover:text-indigo-600 border border-indigo-600"
                }`}
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
