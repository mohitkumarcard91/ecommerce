import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slices/productSlice";
import ProductCard from "./ProductCard";
import Header from "../homePage/Header";

export default function Products() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 18;

  const { allProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, allProducts.length]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allProducts.length / productPerPage);
  const getPagination = () => {
    const pages = [];

    const siblingCount = 1;
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    pages.push(1);

    if (showLeftDots) {
      pages.push("...");
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (showRightDots) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="flex flex-col gap-1">
      <Header />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8  gap-2">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-10 mb-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 rounded-md border text-sm font-medium
        disabled:opacity-40 disabled:cursor-not-allowed
        hover:bg-gray-100"
        >
          Prev
        </button>

        {getPagination().map((item, index) =>
          item === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-3 py-2 text-gray-400 font-semibold"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`w-9 h-9 rounded-md text-sm font-medium transition
            ${
              currentPage === item
                ? "bg-indigo-500 text-white shadow"
                : "border hover:bg-gray-100"
            }`}
            >
              {item}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 rounded-md border text-sm font-medium
        disabled:opacity-40 disabled:cursor-not-allowed
        hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}
