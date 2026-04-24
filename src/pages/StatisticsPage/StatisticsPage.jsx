import { useEffect, useState } from "react";
import styles from "./StatisticsPage.module.css";
import { getDashboard } from "../../api/statistics";

function StatisticsPage() {
  const [dashboard, setDashboard] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard();
        console.log("Dashboard data:", data);
        setDashboard(data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Statistics</h1>

        {/* STAT CARDS */}
        <div className={styles.statCards}>
          <div className={styles.statCard}>
            <svg width="20" height="20" fill="none">
              <use href="#icon-money" />
            </svg>
            <p className={styles.statLabel}>All products</p>
            <p className={styles.statValue}>
              {dashboard?.productsCount ?? "—"}
            </p>
          </div>
          <div className={styles.statCard}>
            <svg width="20" height="20" fill="none">
              <use href="#icon-users" />
            </svg>
            <p className={styles.statLabel}>All suppliers</p>
            <p className={styles.statValue}>
              {dashboard?.suppliersCount ?? "—"}
            </p>
          </div>
          <div className={styles.statCard}>
            <svg width="20" height="20" fill="none">
              <use href="#icon-users" />
            </svg>
            <p className={styles.statLabel}>All customers</p>
            <p className={styles.statValue}>
              {dashboard?.customersCount ?? "—"}
            </p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.mainContent}>
          {/* RECENT CUSTOMERS */}
          <div className={styles.section}>
            {/*  GREEN HEADER */}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Customers</h2>
            </div>
            {/*  WHITE CONTENT */}
            <div className={styles.sectionContent}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Email</th>
                    <th className={styles.th}>Spent</th>
                    <th className={styles.th}>Medicine</th>
                    <th className={styles.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard?.customers?.map((customer) => (
                    <tr key={customer._id} className={styles.tr}>
                      <td className={styles.td}>{customer.name}</td>
                      <td className={styles.td}>{customer.email}</td>
                      <td className={styles.td}>{customer.spent}</td>
                      <td className={styles.td}>—</td>
                      <td className={styles.td}>
                        <button
                          className={styles.viewBtn}
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* INCOME / EXPENSES */}
          <div className={styles.section}>
            {/*  GREEN HEADER */}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Income/Expenses</h2>
            </div>
            {/*  WHITE CONTENT */}
            <div className={styles.sectionContent}>
              <p className={styles.todayLabel}>Today</p>
              <div className={styles.transactions}>
                {dashboard?.dashboard?.map((transaction, index) => (
                  <div
                    key={transaction._id || index}
                    className={styles.transaction}
                  >
                    <span
                      className={`${styles.tag} ${styles[`tag${transaction.type}`]}`}
                    >
                      {transaction.type}
                    </span>
                    <span className={styles.transactionTitle}>
                      {transaction.name}
                    </span>
                    <span
                      className={`${styles.amount} ${
                        String(transaction.amount).startsWith("-")
                          ? styles.negative
                          : transaction.type === "Error"
                            ? styles.error
                            : styles.positive
                      }`}
                    >
                      {transaction.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CLIENT'S GOODS MODAL */}
      {selectedCustomer && (
        <div
          className={styles.overlay}
          onClick={() => setSelectedCustomer(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setSelectedCustomer(null)}
            >
              ✕
            </button>
            <h2 className={styles.modalTitle}>The client's goods</h2>
            <div className={styles.clientInfo}>
              <span>
                <strong>Name</strong>
                <br />
                {selectedCustomer.name}
              </span>
              <span>
                <strong>Email</strong>
                <br />
                {selectedCustomer.email}
              </span>
              <span>
                <strong>Spent</strong>
                <br />
                {selectedCustomer.spent}
              </span>
            </div>
            <p className={styles.noData}>No purchase data available</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsPage;
