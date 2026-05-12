import { useState } from "react";
import styles from "./EditShopModal.module.css";

function EditShopModal({ shop, onClose, onSave }) {
  const [form, setForm] = useState({
    name: shop?.name || "",
    ownerName: shop?.ownerName || "",
    address: shop?.address || "",
    phone: shop?.phone || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Edit shop data</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>Store name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Store name"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label>Owner name</label>
            <input
              value={form.ownerName}
              onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
              placeholder="Owner name"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label>Address</label>
            <input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Address"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label>Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditShopModal;