import { useEffect, useState } from "react";
import logo from "../../assets/images/admin-page-logo.png";
import styles from "./AdminCustomer.module.css";
import Pagination from "../../components/Pagination/Pagination";
import useAdminLogout from "../../hooks/useAdminLogout";

const PER_PAGE = 5;

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const logout = useAdminLogout();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`${import.meta.env.VITE_API_URL}/api/customers`, { headers })
      .then((r) => r.json())
      .then((d) => setCustomers(d.customers || []));

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/current`, { headers })
      .then((r) => r.json())
      .then((d) => setAdmin(d));
  }, []);

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setPage(0);
  };

  const filtered = customers.filter((c) =>
    c.name?.toLowerCase().includes(filter.toLowerCase()),
  );

  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <div>
            <h1 className={styles.storeName}>Medicine store</h1>
            <p className={styles.breadcrumb}>
              <span className={styles.breadcrumbActive}>All customers</span>
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

      {/* Content */}
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
            <svg width="14" height="12">
              <use href="#icon-filter" />
            </svg>
            Filter
          </button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Customers Data</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User Info</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Register date</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c, i) => (
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
                  <td>{c.address}</td>
                  <td>{c.phone}</td>
                  <td>{c.register_date}</td>
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

export default AdminCustomers;
