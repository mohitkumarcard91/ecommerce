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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {currentProducts.map((product) => (
          <ProductCard product={product} />
        ))}

        <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 py-4">
          <div className="flex justify-center items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg bg-slate-700 text-amber-50 disabled:opacity-50"
            >
              Prev
            </button>
            {getPagination().map((item, index) =>
              item === "..." ? (
                <span
                  key={`dots-${index}`}
                  className="px-3 py-2 text-amber-300 font-bold"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    currentPage === item
                      ? "bg-amber-400 text-black"
                      : "bg-slate-700 text-amber-50"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg bg-slate-700 text-amber-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
