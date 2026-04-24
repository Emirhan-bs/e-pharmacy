import { useEffect, useState } from "react";
import styles from "./DrugStorePage.module.css";
import AddMedicineModal from "../../components/modals/AddMedicineModal";
import EditMedicineModal from "../../components/modals/EditMedicineModal";
import DeleteMedicineModal from "../../components/modals/DeleteMedicineModal";
import {
  getMedicines,
  addMedicine,
  editMedicine,
  deleteMedicine,
} from "../../api/medicines";

function DrugStorePage() {
  const [activeTab, setActiveTab] = useState("drugstore");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicines();
        console.log("Medicines data:", data);
        setMedicines(data.products);
      } catch (error) {
        console.error("Failed to fetch medicines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const handleAdd = async (newMedicine) => {
    try {
      const added = await addMedicine(newMedicine);
      setMedicines([...medicines, added]);
    } catch (error) {
      console.error("Failed to add medicine:", error);
    }
  };

  const handleEdit = (id) => {
    const medicine = medicines.find((m) => m._id === id);
    setSelectedMedicine(medicine);
    setShowEditModal(true);
  };

  const handleSave = async (updatedMedicine) => {
    try {
      const saved = await editMedicine(updatedMedicine._id, updatedMedicine);
      setMedicines(
        medicines.map((m) => (m._id === updatedMedicine._id ? saved : m)),
      );
    } catch (error) {
      console.error("Failed to edit medicine:", error);
    }
  };

  const handleDeleteClick = (id) => {
    const medicine = medicines.find((m) => m._id === id);
    setSelectedMedicine(medicine);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMedicine(selectedMedicine._id);
      setMedicines(medicines.filter((m) => m._id !== selectedMedicine._id));
      setShowDeleteModal(false);
      setSelectedMedicine(null);
    } catch (error) {
      console.error("Failed to delete medicine:", error);
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* SHOP HEADER */}
        <div className={styles.shopHeader}>
          <h1 className={styles.shopName}>Huel LLC</h1>
          <div className={styles.shopInfo}>
            <span className={styles.infoItem}>
              <svg width="16" height="16">
                <use href="#icon-map" />
              </svg>
              Owner: <strong>Datha Harmon</strong>
            </span>
            <span className={styles.infoItem}>
              <svg width="16" height="16">
                <use href="#icon-map" />
              </svg>
              Kretoria F45
            </span>
            <span className={styles.infoItem}>
              <svg width="16" height="16">
                <use href="#icon-phone" />
              </svg>
              595-08-2102
            </span>
            <button className={styles.editDataBtn}>Edit data</button>
            <button
              className={styles.addMedicineBtn}
              onClick={() => setShowAddModal(true)}
            >
              Add medicine
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "drugstore" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("drugstore")}
          >
            Drug store
          </button>
          <button
            className={`${styles.tab} ${activeTab === "allmedicine" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("allmedicine")}
          >
            All medicine
          </button>
        </div>

        {/* MEDICINE GRID */}
        <div className={styles.grid}>
          {medicines.map((medicine) => (
            <div key={medicine._id} className={styles.card}>
              <div className={styles.imageBox}>
                {medicine.photo ? (
                  <img
                    src={medicine.photo}
                    alt={medicine.name}
                    className={styles.medicineImg}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>💊</div>
                )}
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.cardTop}>
                  <span className={styles.medicineName}>{medicine.name}</span>
                  <span className={styles.medicinePrice}>
                    ₴{medicine.price}
                  </span>
                </div>
                <p className={styles.medicineCategory}>{medicine.category}</p>
                <div className={styles.cardButtons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(medicine._id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteClick(medicine._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <AddMedicineModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAdd}
          />
        )}
        {showEditModal && (
          <EditMedicineModal
            onClose={() => setShowEditModal(false)}
            onSave={handleSave}
            medicine={selectedMedicine}
          />
        )}
        {showDeleteModal && (
          <DeleteMedicineModal
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            medicine={selectedMedicine}
          />
        )}
      </div>
    </div>
  );
}

export default DrugStorePage;
