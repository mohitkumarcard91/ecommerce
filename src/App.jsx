import { Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./redux/slices/authSlice";
import { loadUserData } from "./redux/slices/productSlice";
import Loading from "./components/common/Loading";

const Navbar = lazy(() => import("./components/common/Navbar"));
const Footer = lazy(() => import("./components/common/Footer"));
const ProtectedRoute = lazy(() => import("./components/common/ProtectedRoute"));

const HomePage = lazy(() => import("./pages/Homepage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const ProductDetails = lazy(() => import("./components/common/ProductDetails"));
const Successfull = lazy(() =>
  import("./components/section/orderPlaced/Successfull")
);

const Loader = () => (
  <div className="flex justify-center items-center h-screen text-lg">
    <Loading />
  </div>
);

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email) {
      dispatch(loadUserData(user.email));
    }
  }, [user, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-surface-soft">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Bounce}
      />

      <Suspense fallback={<Loader />}>
        {user && <Navbar />}

        <div className="flex flex-1">
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product"
                element={
                  <ProtectedRoute>
                    <ProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderHistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProductDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/successfullyOrderPlaced"
                element={<Successfull />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
