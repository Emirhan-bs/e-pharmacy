import { useEffect, useState } from "react";
import logo from "../../assets/images/admin-page-logo.png";
import styles from "./AdminSuppliers.module.css";
import Pagination from "../../components/Pagination/Pagination";
import useAdminLogout from "../../hooks/useAdminLogout";


const emptyForm = { name: "", address: "", suppliers: "", date: "", amount: "", status: "Active" };
const PER_PAGE = 5;

function AdminSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [form, setForm] = useState(emptyForm);
const logout = useAdminLogout();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/suppliers`, { headers })
      .then((r) => r.json())
      .then((d) => setSuppliers(d.suppliers || []));
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/current`, { headers })
      .then((r) => r.json())
      .then((d) => setAdmin(d));
  }, []);

  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setPage(0);
  };

  const filtered = suppliers.filter((s) =>
    s.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleAdd = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/suppliers`,
      { method: "POST", headers, body: JSON.stringify(form) });
    const newSupplier = await res.json();
    setSuppliers([...suppliers, newSupplier]);
    setShowAdd(false);
    setForm(emptyForm);
  };

  const handleEdit = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/suppliers/${editSupplier.id}`,
      { method: "PUT", headers, body: JSON.stringify(form) }
    );
    const updated = await res.json();
    setSuppliers(suppliers.map((s) => (s.id === updated.id ? updated : s)));
    setShowEdit(false);
    setEditSupplier(null);
    setForm(emptyForm);
  };

  const openEdit = (supplier) => {
    setEditSupplier(supplier);
    setForm({
      name: supplier.name,
      address: supplier.address,
      suppliers: supplier.suppliers,
      date: supplier.date,
      amount: supplier.amount,
      status: supplier.status,
    });
    setShowEdit(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <div>
            <h1 className={styles.storeName}>Medicine store</h1>
            <p className={styles.breadcrumb}>
              <span className={styles.breadcrumbActive}>All suppliers</span>
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
          <input type="text" placeholder="User Name" value={filter}
            onChange={handleFilter} className={styles.input} />
          <button className={styles.filterBtn}>
            <svg width="14" height="12"><use href="#icon-filter" /></svg>
            Filter
          </button>
          <button className={styles.addBtn} onClick={() => setShowAdd(true)}>
            Add a new suppliers
          </button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>All suppliers</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Suppliers Info</th>
                <th>Address</th>
                <th>Company</th>
                <th>Delivery date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((s, i) => (
                <tr key={s.id || i}>
                  <td>{s.name}</td>
                  <td>{s.address}</td>
                  <td>{s.suppliers}</td>
                  <td>{s.date}</td>
                  <td>{s.amount}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[s.status?.toLowerCase()]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.editBtn} onClick={() => openEdit(s)}>
                      <svg width="16" height="16"><use href="#icon-edit" /></svg>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={filtered.length} perPage={PER_PAGE} current={page} onChange={setPage} />
        </div>
      </div>

      {showAdd && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add a new suppliers</h2>
              <button onClick={() => setShowAdd(false)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.modalGrid}>
              <input placeholder="Suppliers Info" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} className={styles.modalInput} />
              <input placeholder="Address" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })} className={styles.modalInput} />
              <input placeholder="Company" value={form.suppliers}
                onChange={(e) => setForm({ ...form, suppliers: e.target.value })} className={styles.modalInput} />
              <input placeholder="Delivery date" value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} className={styles.modalInput} type="date" />
              <input placeholder="Amount" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })} className={styles.modalInput} />
              <select value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })} className={styles.modalInput}>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.saveBtn} onClick={handleAdd}>Add</button>
              <button className={styles.cancelBtn} onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEdit && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Edit supplier</h2>
              <button onClick={() => setShowEdit(false)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.modalGrid}>
              <input placeholder="Suppliers Info" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} className={styles.modalInput} />
              <input placeholder="Address" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })} className={styles.modalInput} />
              <input placeholder="Company" value={form.suppliers}
                onChange={(e) => setForm({ ...form, suppliers: e.target.value })} className={styles.modalInput} />
              <input placeholder="Delivery date" value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })} className={styles.modalInput} type="date" />
              <input placeholder="Amount" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })} className={styles.modalInput} />
              <select value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })} className={styles.modalInput}>
                <option value="Active">Active</option>
                <option value="Deactive">Deactive</option>
              </select>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.saveBtn} onClick={handleEdit}>Save</button>
              <button className={styles.cancelBtn} onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSuppliers;