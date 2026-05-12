import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/main-logo.png";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* LOGO */}
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="E-Pharmacy logo" />
          <span className={styles.logoText}>E-Pharmacy</span>
        </NavLink>

        {/* NAV LINKS */}
        <nav className={styles.nav}>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/medicine"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Medicine
          </NavLink>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Statistics
          </NavLink>
        </nav>

        {/* LOGOUT BUTTON */}
        <button className={styles.logout} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}

export default Header;
