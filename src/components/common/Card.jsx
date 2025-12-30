import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { addToCart } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const [productDetails, setProductDetails] = useState(null);
  const [image, setImage] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProductDetails(response.data);
        setImage(productDetails.images);
         console.log(image);
      } catch (error) {
        if (error.response?.status === 404) {
          toast.warn("Product not found!", {
            position: "top-center",
            autoClose: 2000,
            transition: Bounce,
          });
        } else {
          toast.error("Something went wrong!", {
            position: "top-center",
            autoClose: 2000,
            transition: Bounce,
          });
        }
      }
    };
    console.log(image);

    fetchProduct();
  }, [id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const cartItems = useSelector((state) => state.products.cart);

  if (!id) return null;

  const isInCart = user && cartItems?.some((item) => item.id === id);

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
    console.log(productDetails);
    dispatch(
      addToCart({
        userEmail: user.email,
        productDetails,
      })
    );

    toast.success("Item added to cart successfully!");
  };

  if (!productDetails)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Loading />
      </div>
    );

  const handleImageChanges = () => {
    setClassname("rotate-45");
  };

  return (
    <div className=" w-full px-6">
      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex w-[40%] gap-3">
          <div className="flex flex-col gap-3">
            <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
              <img
                className={``}
                src={productDetails.images}
                alt={productDetails.title}
              />
            </div>
            <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
              <img
                className="rotate-75"
                src={productDetails.thumbnail}
                alt="Thumbnail 2"
              />
            </div>
            <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
              <img
                className="rotate-45"
                src={productDetails.thumbnail}
                alt="Thumbnail 3"
              />
            </div>
            <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
              <img src={productDetails.thumbnail} alt="Thumbnail 4" />
            </div>
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img src={image[currentImageIndex]} alt={productDetails.title} />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{productDetails.title}</h1>

          <div className="mt-6">
            <p className="text-2xl font-medium">₹: {productDetails.price}</p>
            <p className="text-gray-500/70 line-through">
              ₹: {productDetails.discountPercentage}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            <li>Category : {productDetails.category}</li>
            <li>Brand : {productDetails.brand}</li>
            <li>WarrantyInformation : {productDetails.warrantyInformation}</li>
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
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
            {/* <button
              className=" px-6 py-2 bg-indigo-600 text-white rounded-md 
             border border-blue-600 
             transition-all duration-300
             hover:bg-white hover:text-indigo-600 w-full"
            >
              {" "}
              Buy now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
