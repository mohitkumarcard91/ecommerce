import LogoutPage from "./LogoutPage";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

export default function ProfilePage() {
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-col items-center w-full">
      <h1>Name :{user.email}</h1>
      <div>order history</div>
      <div>whislist</div>
      <div>edit profile</div>
      <div>
        <LogoutPage />
      </div>
    </div>
  );
}
