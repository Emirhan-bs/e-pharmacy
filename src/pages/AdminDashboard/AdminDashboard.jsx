import { useEffect, useState } from "react";
import logo from "../../assets/images/admin-page-logo.png";
import styles from "./AdminDashboard.module.css";
import useAdminLogout from "../../hooks/useAdminLogout";

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [activeCard, setActiveCard] = useState("customers");
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const logout =useAdminLogout();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, { headers })
      .then((r) => r.json())
      .then((d) => setData(d));

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/current`, { headers })
      .then((r) => r.json())
      .then((d) => setAdmin(d));

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/suppliers`, { headers })
      .then((r) => r.json())
      .then((d) => setSuppliers(d.suppliers?.slice(0, 5) || []));

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, { headers })
      .then((r) => r.json())
      .then((d) => setProducts(d.products?.slice(0, 5) || []));
  }, []);

  if (!data) return <div className={styles.loading}>Loading...</div>;

  const renderTable = () => {
    if (activeCard === "customers") {
      return (
        <>
          <h3 className={styles.cardTitle}>Recent Customers</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Spent</th>
              </tr>
            </thead>
            <tbody>
              {data.customers?.map((c, i) => (
                <tr key={c._id || c.name || i}>
                  <td>
                    <div className={styles.nameCell}>
                      <img
                        src={c.photo || c.image}
                        alt={c.name}
                        className={styles.avatar}
                        onError={(e) => {
                          e.target.src = "https://i.imgur.com/UYCE7Rr.png";
                        }}
                      />
                      {c.name}
                    </div>
                  </td>
                  <td>{c.email}</td>
                  <td>{c.spent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (activeCard === "suppliers") {
      return (
        <>
          <h3 className={styles.cardTitle}>Recent Suppliers</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, i) => (
                <tr key={s.id || i}>
                  <td>{s.name}</td>
                  <td>{s.suppliers}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${styles[s.status?.toLowerCase()]}`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    if (activeCard === "products") {
      return (
        <>
          <h3 className={styles.cardTitle}>Recent Products</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id || i}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <div>
            <h1 className={styles.storeName}>Medicine store</h1>
            <p className={styles.breadcrumb}>
              <span className={styles.breadcrumbActive}>Dashboard</span>
              <span> | </span>
              <span>{admin?.email || "..."}</span>
            </p>
          </div>
        </div>
        <button className={styles.avatarBtn} onClick={logout}>
          <svg width="16" height="16">
            <use href="#icon-logout" />
          </svg>
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div
          className={`${styles.statCard} ${activeCard === "products" ? styles.statActive : ""}`}
          onClick={() => setActiveCard("products")}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.statIcon}>
            <svg width="20" height="20">
              <use href="#icon-money" />
            </svg>
          </div>
          <p className={styles.statLabel}>All products</p>
          <h2 className={styles.statNumber}>
            {data.productsCount?.toLocaleString()}
          </h2>
        </div>

        <div
          className={`${styles.statCard} ${activeCard === "suppliers" ? styles.statActive : ""}`}
          onClick={() => setActiveCard("suppliers")}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.statIcon}>
            <svg width="20" height="20">
              <use href="#icon-users" />
            </svg>
          </div>
          <p className={styles.statLabel}>All suppliers</p>
          <h2 className={styles.statNumber}>{data.suppliersCount}</h2>
        </div>

        <div
          className={`${styles.statCard} ${activeCard === "customers" ? styles.statActive : ""}`}
          onClick={() => setActiveCard("customers")}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.statIcon}>
            <svg width="20" height="20">
              <use href="#icon-users" />
            </svg>
          </div>
          <p className={styles.statLabel}>All customers</p>
          <h2 className={styles.statNumber}>{data.customersCount}</h2>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.card}>{renderTable()}</div>

        {/* Income/Expenses */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Income/Expenses</h3>
          <p className={styles.today}>Today</p>
          <ul className={styles.transactions}>
            {data.dashboard?.slice(0, 6).map((item, i) => (
              <li key={`${item.name}-${i}`} className={styles.transaction}>
                <span
                  className={`${styles.badge} ${styles[item.type?.toLowerCase()]}`}
                >
                  {item.type}
                </span>
                <span className={styles.transName}>{item.name}</span>
                <span
                  className={`${styles.amount} ${
                    item.type === "Income"
                      ? styles.positive
                      : item.type === "Error"
                        ? styles.strikethrough
                        : styles.negative
                  }`}
                >
                  {item.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
