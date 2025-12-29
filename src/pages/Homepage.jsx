import Products from "../components/section/productPage/Products";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

export default function HomePage() {
  const user = useSelector(selectUser);

  return (
    <div className="w-full h-full">
      <Products />
    </div>
  );
}
