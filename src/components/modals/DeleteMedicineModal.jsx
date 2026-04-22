import styles from "./DeleteMedicineModal.module.css";

function DeleteMedicineModal({ onClose, onConfirm, medicine }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        <h2 className={styles.title}>Confirm deletion</h2>
        <p className={styles.subtitle}>Are you sure you want to delete this item?</p>

        {/* MEDICINE PREVIEW */}
        <div className={styles.medicinePreview}>
          <img
            src={medicine?.image}
            alt={medicine?.name}
            className={styles.medicineImg}
          />
          <p className={styles.medicineName}>{medicine?.name}</p>
          <p className={styles.medicineCategory}>{medicine?.category}</p>
        </div>

        {/* BUTTONS */}
        <div className={styles.buttons}>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirm
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteMedicineModal;