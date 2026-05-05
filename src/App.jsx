import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import DrugStorePage from "./pages/DrugStorePage/DrugStorePage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import PrivateRoute from "./components/PrivateRoute";
import MedicineDetailPage from "./pages/MedicineDetailPage/MedicineDetailPage";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminSuppliers from "./pages/AdminSuppliers/AdminSuppliers";
import AdminCustomers from "./pages/AdminCustomers/AdminCustomers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="suppliers" element={<AdminSuppliers />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>

        {/* PRIVATE vendor routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SharedLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/shop" replace />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="medicine" element={<DrugStorePage />} />
          <Route path="medicine/:id" element={<MedicineDetailPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;