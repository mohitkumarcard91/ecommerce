import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { API_BASE_URL } from "../../constant/config";

export default function Card() {
  const [productDetails, setProductDetails] = useState(null);
  const params = useParams();
  const id = params.id;

useEffect(() => {
  if (!id) return;

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProductDetails(response.data);
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

  fetchProduct();
}, [id]);


  if (!productDetails)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <div class="max-w-6xl w-full px-6">
      <div class="flex flex-col md:flex-row gap-16 mt-4">
        <div class="flex gap-3">
          <div class="flex flex-col gap-3">
            <div className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
              <img src={productDetails.images} alt={productDetails.title} />
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
            <img src={productDetails.images} alt={productDetails.title} />
          </div>
        </div>

        <div class="text-sm w-full md:w-1/2">
          <h1 class="text-3xl font-medium">{productDetails.title}</h1>

          <div class="mt-6">
            <p class="text-2xl font-medium">₹: {productDetails.price}</p>
            <p class="text-gray-500/70 line-through">
              ₹: {productDetails.discountPercentage}
            </p>
            <span class="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p class="text-base font-medium mt-6">About Product</p>
          <ul class="list-disc ml-4 text-gray-500/70">
            <li>Category : {productDetails.category}</li>
            <li>Brand : {productDetails.brand}</li>
            <li>WarrantyInformation : {productDetails.warrantyInformation}</li>
          </ul>

          <div class="flex items-center mt-10 gap-4 text-base">
            <button
              className=" px-6 py-2 bg-gray-300 text-white rounded-md
             border border-gray-300 
             transition-all duration-300
             hover:bg-white hover:text-indigo-600 w-full"
            >
              Add to Cart
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
