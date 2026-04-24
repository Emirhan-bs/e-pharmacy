import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import DrugStorePage from "./pages/DrugStorePage/DrugStorePage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* PRIVATE routes — all inside PrivateRoute */}
        <Route path="/" element={
          <PrivateRoute>
            <SharedLayout />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="/shop" replace />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="medicine" element={<DrugStorePage />} />
          <Route path="statistics" element={<StatisticsPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;