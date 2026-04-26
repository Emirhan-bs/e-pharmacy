import { useEffect, useState } from "react";
import styles from "./DrugStorePage.module.css";
import AddMedicineModal from "../../components/modals/AddMedicineModal";
import EditMedicineModal from "../../components/modals/EditMedicineModal";
import DeleteMedicineModal from "../../components/modals/DeleteMedicineModal";
import {
  getMedicines,
  getAllMedicines,
  addMedicine,
  editMedicine,
  deleteMedicine,
} from "../../api/medicines";
import { getShop } from "../../api/auth";

function DrugStorePage() {
  const [activeTab, setActiveTab] = useState("drugstore");
  const [medicines, setMedicines] = useState([]);
  const [allMedicines, setAllMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [shop, setShop] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditShopModal, setShowEditShopModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [medicinesResult, shopResult, allMedicinesResult] = await Promise.allSettled([
        getMedicines(),
        getShop(),
        getAllMedicines(),
      ]);
      if (medicinesResult.status === "fulfilled") {
        setMedicines(medicinesResult.value.products || []);
      }
      if (shopResult.status === "fulfilled") {
        setShop(shopResult.value);
      }
      if (allMedicinesResult.status === "fulfilled") {
        setAllMedicines(allMedicinesResult.value.products || []);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = async (newMedicine) => {
    try {
      const added = await addMedicine(newMedicine);
      setMedicines((prev) => [...prev, added]);
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
      setMedicines(medicines.map((m) => (m._id === updatedMedicine._id ? saved : m)));
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

  const handleAddToShop = async (medicine) => {
    try {
      const added = await addMedicine({
        name: medicine.name,
        price: medicine.price,
        description: medicine.description || "",
        photo: medicine.photo || "",
        category: medicine.category,
      });
      setMedicines((prev) => [...prev, added]);
      alert(`${medicine.name} added to your store!`);
    } catch (error) {
      console.error("Failed to add to shop:", error);
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* SHOP HEADER */}
        <div className={styles.shopHeader}>
          <h1 className={styles.shopName}>{shop?.name || "Your Store"}</h1>
          <div className={styles.shopInfo}>
            <span className={styles.infoItem}>
              <svg width="16" height="16"><use href="#icon-map" /></svg>
              Owner: <strong>{shop?.ownerName || "—"}</strong>
            </span>
            <span className={styles.infoItem}>
              <svg width="16" height="16"><use href="#icon-map" /></svg>
              {shop?.address || "—"}
            </span>
            <span className={styles.infoItem}>
              <svg width="16" height="16"><use href="#icon-phone" /></svg>
              {shop?.phone || "—"}
            </span>
            <button className={styles.editDataBtn} onClick={() => setShowEditShopModal(true)}>
              Edit data
            </button>
            <button className={styles.addMedicineBtn} onClick={() => setShowAddModal(true)}>
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

        {/* DRUG STORE TAB */}
        {activeTab === "drugstore" && (
          <div className={styles.grid}>
            {medicines.length === 0 && (
              <p style={{ color: "gray", padding: "20px" }}>
                No medicines yet. Click "Add medicine" to get started.
              </p>
            )}
            {medicines.map((medicine) => (
              <div key={medicine._id} className={styles.card}>
                <div className={styles.imageBox}>
                  {medicine.photo ? (
                    <img src={medicine.photo} alt={medicine.name} className={styles.medicineImg} />
                  ) : (
                    <div className={styles.imagePlaceholder}>💊</div>
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardTop}>
                    <span className={styles.medicineName}>{medicine.name}</span>
                    <span className={styles.medicinePrice}>₴{medicine.price}</span>
                  </div>
                  <p className={styles.medicineCategory}>{medicine.category}</p>
                  <div className={styles.cardButtons}>
                    <button className={styles.editBtn} onClick={() => handleEdit(medicine._id)}>Edit</button>
                    <button className={styles.deleteBtn} onClick={() => handleDeleteClick(medicine._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ALL MEDICINE TAB */}
        {activeTab === "allmedicine" && (
          <div className={styles.grid}>
            {allMedicines.map((medicine) => (
              <div key={medicine.id || medicine._id} className={styles.card}>
                <div className={styles.imageBox}>
                  {medicine.photo ? (
                    <img src={medicine.photo} alt={medicine.name} className={styles.medicineImg} />
                  ) : (
                    <div className={styles.imagePlaceholder}>💊</div>
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardTop}>
                    <span className={styles.medicineName}>{medicine.name}</span>
                    <span className={styles.medicinePrice}>₴{medicine.price}</span>
                  </div>
                  <p className={styles.medicineCategory}>{medicine.category}</p>
                  <div className={styles.cardButtons}>
                    <button className={styles.editBtn} onClick={() => handleAddToShop(medicine)}>
                      Add to shop
                    </button>
                    <button className={styles.deleteBtn}>Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddModal && (
          <AddMedicineModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />
        )}
        {showEditModal && (
          <EditMedicineModal onClose={() => setShowEditModal(false)} onSave={handleSave} medicine={selectedMedicine} />
        )}
        {showDeleteModal && (
          <DeleteMedicineModal onClose={() => setShowDeleteModal(false)} onConfirm={handleConfirmDelete} medicine={selectedMedicine} />
        )}

        {showEditShopModal && (
          <div className={styles.overlay} onClick={() => setShowEditShopModal(false)}>
            <div className={styles.editShopModal} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setShowEditShopModal(false)}>✕</button>
              <p style={{ padding: "20px", color: "gray" }}>Edit shop form coming soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DrugStorePage;