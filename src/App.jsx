import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const Home = () => <h1 style={{ padding: 32 }}>Home Page</h1>;
const Shop = () => <h1 style={{ padding: 32 }}>Shop Page</h1>;
const Medicine = () => <h1 style={{ padding: 32 }}>Medicine Page</h1>;
const Statistics = () => <h1 style={{ padding: 32 }}>Statistics Page</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="medicine" element={<Medicine />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
