import { useEffect, useState } from "react";
import logo from "../../assets/images/admin-page-logo.png";
import styles from "./AdminProducts.module.css";
import Pagination from "../../components/Pagination/Pagination";
import useAdminLogout from "../../hooks/useAdminLogout";

const CATEGORIES = ["Medicine", "Heart", "Head", "Hand", "Leg"];
const emptyForm = { name: "", category: "", stock: "", suppliers: "", price: "" };
const PER_PAGE = 5;

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const logout = useAdminLogout();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, { headers })
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []));
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

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const handleAdd = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
      method: "POST", headers, body: JSON.stringify(form),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    setShowAdd(false);
    setForm(emptyForm);
  };

  const handleEdit = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/admin/products/${editProduct.id}`,
      { method: "PUT", headers, body: JSON.stringify(form) }
    );
    const updated = await res.json();
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    setShowEdit(false);
    setEditProduct(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/admin/products/${id}`, {
      method: "DELETE", headers,
    });
    setProducts(products.filter((p) => p.id !== id));
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      stock: product.stock,
      suppliers: product.suppliers,
      price: product.price,
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
              <span className={styles.breadcrumbActive}>All products</span>
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
          <input type="text" placeholder="Product Name" value={filter}
            onChange={handleFilter} className={styles.input} />
          <button className={styles.filterBtn}>
            <svg width="14" height="12"><use href="#icon-filter" /></svg>
            Filter
          </button>
          <button className={styles.addBtn} onClick={() => setShowAdd(true)}>
            + Add a new product
          </button>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>All products</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product Info</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Suppliers</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, i) => (
                <tr key={`${p.name}-${i}`}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.stock}</td>
                  <td>{p.suppliers}</td>
                  <td>{p.price}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => openEdit(p)}>
                        <svg width="16" height="16"><use href="#icon-edit" /></svg>
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(p.id || p._id)}>
                        <svg width="16" height="16"><use href="#icon-delete" /></svg>
                      </button>
                    </div>
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
              <h2>Add a new product</h2>
              <button onClick={() => setShowAdd(false)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.modalGrid}>
              <input placeholder="Product Info" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} className={styles.modalInput} />
              <select value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })} className={styles.modalInput}>
                <option value="">Category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input placeholder="Stock" value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })} className={styles.modalInput} />
              <input placeholder="Suppliers" value={form.suppliers}
                onChange={(e) => setForm({ ...form, suppliers: e.target.value })} className={styles.modalInput} />
              <input placeholder="Price" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} className={styles.modalInput} />
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
              <h2>Edit product</h2>
              <button onClick={() => setShowEdit(false)} className={styles.closeBtn}>✕</button>
            </div>
            <div className={styles.modalGrid}>
              <input placeholder="Product Info" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} className={styles.modalInput} />
              <select value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })} className={styles.modalInput}>
                <option value="">Category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input placeholder="Stock" value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })} className={styles.modalInput} />
              <input placeholder="Suppliers" value={form.suppliers}
                onChange={(e) => setForm({ ...form, suppliers: e.target.value })} className={styles.modalInput} />
              <input placeholder="Price" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} className={styles.modalInput} />
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
export default AdminProducts;