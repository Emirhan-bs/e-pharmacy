import { useState } from "react";
import styles from "./StatisticsPage.module.css";

const mockCustomers = [
  { id: 1, name: "Alex Shatov", email: "alexshatov@gmail.com", spent: "2,890.66" },
  { id: 2, name: "Philip Harbach", email: "philip.h@gmail.com", spent: "2,767.04" },
  { id: 3, name: "Mirko Fisuk", email: "mirkofisuk@gmail.com", spent: "2,996.00" },
  { id: 4, name: "Olga Semklo", email: "olga.s@cool.design", spent: "1,220.66" },
  { id: 5, name: "Burak Long", email: "longburak@gmail.com", spent: "1,860.66" },
  { id: 6, name: "Emirhan Buyuksenirli", email: "emirhanbuyuksenirli@gmail.com", spent: "3,650.50" },
];

const mockTransactions = [
  { id: 1, type: "Expense", title: "Qonto billing", amount: "-49.88" },
  { id: 2, type: "Income", title: "Crisp.com Market Ltd 70 Wilson St London", amount: "+249.88" },
  { id: 3, type: "Income", title: "Nation Labs Inc", amount: "+99.99" },
  { id: 4, type: "Income", title: "Market Cap Ltd", amount: "+1,200.88" },
  { id: 5, type: "Error", title: "App.com Market Ltd 70 Wilson St London", amount: "+99.99" },
  { id: 6, type: "Expense", title: "App.com Market Ltd 70 Wilson St London", amount: "-49.88" },
];

function StatisticsPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Statistics</h1>

        {/* STAT CARDS */}
        <div className={styles.statCards}>
          <div className={styles.statCard}>
            <svg width="20" height="20" fill="none"><use href="#icon-money" /></svg>
            <p className={styles.statLabel}>All products</p>
            <p className={styles.statValue}>8,430</p>
          </div>
          <div className={styles.statCard}>
            <svg width="20" height="20" fill="none"><use href="#icon-users" /></svg>
            <p className={styles.statLabel}>All suppliers</p>
            <p className={styles.statValue}>211</p>
          </div>
          <div className={styles.statCard}>
            <svg width="20" height="20" fill="none"><use href="#icon-users" /></svg>
            <p className={styles.statLabel}>All customers</p>
            <p className={styles.statValue}>140</p>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.mainContent}>

          {/* RECENT CUSTOMERS */}
          <div className={styles.section}>
            {/* 👇 GREEN HEADER */}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Customers</h2>
            </div>
            {/* 👇 WHITE CONTENT */}
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
                  {mockCustomers.map((customer) => (
                    <tr key={customer.id} className={styles.tr}>
                      <td className={styles.td}>{customer.name}</td>
                      <td className={styles.td}>{customer.email}</td>
                      <td className={styles.td}>{customer.spent}</td>
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
            {/* 👇 GREEN HEADER */}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Income/Expenses</h2>
            </div>
            {/* 👇 WHITE CONTENT */}
            <div className={styles.sectionContent}>
              <p className={styles.todayLabel}>Today</p>
              <div className={styles.transactions}>
                {mockTransactions.map((transaction) => (
                  <div key={transaction.id} className={styles.transaction}>
                    <span className={`${styles.tag} ${styles[`tag${transaction.type}`]}`}>
                      {transaction.type}
                    </span>
                    <span className={styles.transactionTitle}>{transaction.title}</span>
                    <span className={`${styles.amount} ${transaction.amount.startsWith("+") ? styles.positive : styles.negative}`}>
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
        <div className={styles.overlay} onClick={() => setSelectedCustomer(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedCustomer(null)}>✕</button>
            <h2 className={styles.modalTitle}>The client's goods</h2>
            <div className={styles.clientInfo}>
              <span><strong>Name</strong><br />{selectedCustomer.name}</span>
              <span><strong>Email</strong><br />{selectedCustomer.email}</span>
              <span><strong>Spent</strong><br />{selectedCustomer.spent}</span>
            </div>
            <p className={styles.noData}>No purchase data available</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsPage;