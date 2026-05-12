import { NavLink, Outlet } from "react-router-dom";
import styles from "./AdminLayout.module.css";

function AdminLayout() {
  return (
    <div className={styles.layout}>
      {/* Side Bar */}
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <svg width="20" height="20">
              <use href="#icon-dashboard" />
            </svg>
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <svg width="20" height="20">
              <use href="#icon-orders" />
            </svg>
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <svg width="20" height="20">
              <use href="#icon-products" />
            </svg>
          </NavLink>
          <NavLink
            to="/admin/suppliers"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <svg width="20" height="20">
              <use href="#icon-suppliers" />
            </svg>
          </NavLink>
          <NavLink
            to="/admin/customers"
            className={({ isActive }) =>
              isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
            }
          >
            <svg width="20" height="20">
              <use href="#icon-users" />
            </svg>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
export default AdminLayout;
