import { useNavigate } from "react-router-dom";

function useAdminLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return logout;
}

export default useAdminLogout;