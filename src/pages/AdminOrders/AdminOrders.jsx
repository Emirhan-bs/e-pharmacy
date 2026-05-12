import { useEffect, useState } from "react";
import logo from "../../assets/images/admin-page-logo.png";
import styles from "./AdminOrders.module.css";
import Pagination from "../../components/Pagination/Pagination";
import useAdminLogout from "../../hooks/useAdminLogout";


const PER_PAGE = 5;

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const logout = useAdminLogout();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`${import.meta.env.VITE_API_URL}/api/orders`, { headers })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []));

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/current`, { headers })
      .then((r) => r.json())
      .then((d) => setAdmin(d));
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setPage(0);
  };

  // filtered must be defined BEFORE paginated
  const filtered = orders.filter((o) =>
    o.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <div>
            <h1 className={styles.storeName}>Medicine store</h1>
            <p className={styles.breadcrumb}>
              <span className={styles.breadcrumbActive}>All orders</span>
              <span> | </span>
              <span>{admin?.email || "..."}</span>
            </p>
          </div>
        </div>
        <button className={styles.avatarBtn} onClick={logout}>
          <svg width="16" height="16"><use href="#icon-logout" /></svg>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.filterBar}>
          <input
            type="text"
            placeholder="User Name"
            value={filter}
            onChange={handleFilter}
            className={styles.input}
          />
          <button className={styles.filterBtn}>
            <svg width="14" height="12"><use href="#icon-filter" /></svg>
            Filter
          </button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>All orders</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User Info</th>
                <th>Address</th>
                <th>Products</th>
                <th>Order date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((order, i) => (
                <tr key={order._id || i}>
                  <td>
                    <div className={styles.nameCell}>
                      <img src={order.photo} alt={order.name} className={styles.avatar} />
                      {order.name}
                    </div>
                  </td>
                  <td>{order.address}</td>
                  <td>{order.products}</td>
                  <td>{order.order_date}</td>
                  <td>{order.price}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[order.status?.toLowerCase()]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            total={filtered.length}
            perPage={PER_PAGE}
            current={page}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;