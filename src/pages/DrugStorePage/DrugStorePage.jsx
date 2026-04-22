import { useState } from "react";
import styles from "./DrugStorePage.module.css";
import hydroImg from "../../assets/images/hydro.png";
import occiImg from "../../assets/images/occi.png";
import octiImg from "../../assets/images/octi.png";
import predImg from "../../assets/images/pred.png";
import helminImg from "../../assets/images/helmin.png";
import alcoholImg from "../../assets/images/alcohol.png";
import AddMedicineModal from "../../components/modals/AddMedicineModal";
import EditMedicineModal from "../../components/modals/EditMedicineModal";
import DeleteMedicineModal from "../../components/modals/DeleteMedicineModal";

const mockMedicines = [
  { id: 1, name: "Hydrochloride", category: "Framing (Wood)", price: 582, image: hydroImg },
  { id: 2, name: "Occidentalis", category: "Fire Sprinkler System", price: 239, image: occiImg },
  { id: 3, name: "Octinoxate", category: "Eifs", price: 306, image: octiImg },
  { id: 4, name: "Prednisone", category: "Soft Flooring and Base", price: 579, image: predImg },
  { id: 5, name: "Helminthos", category: "Overhead Doors", price: 470, image: helminImg },
  { id: 6, name: "Alcohol", category: "Prefabricated Metal", price: 748, image: alcoholImg },
];

function DrugStorePage() {
  const [activeTab, setActiveTab] = useState("drugstore");
  const [medicines, setMedicines] = useState(mockMedicines);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleAdd = (newMedicine) => {
    setMedicines([...medicines, { ...newMedicine, id: Date.now() }]);
  };

  const handleEdit = (id) => {
    const medicine = medicines.find((m) => m.id === id);
    setSelectedMedicine(medicine);
    setShowEditModal(true);
  };

  const handleSave = (updatedMedicine) => {
    setMedicines(medicines.map((m) =>
      m.id === updatedMedicine.id ? updatedMedicine : m
    ));
  };

  const handleDeleteClick = (id) => {
    const medicine = medicines.find((m) => m.id === id);
    setSelectedMedicine(medicine);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setMedicines(medicines.filter((m) => m.id !== selectedMedicine.id));
    setShowDeleteModal(false);
    setSelectedMedicine(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* SHOP HEADER */}
        <div className={styles.shopHeader}>
          <h1 className={styles.shopName}>Huel LLC</h1>
          <div className={styles.shopInfo}>
            <span className={styles.infoItem}>
              <svg width="16" height="16"><use href="#icon-map" /></svg>
              Owner: <strong>Datha Harmon</strong>
            </span>
            <span className={styles.infoItem}>
              <svg width="16" height="16"><use href="#icon-map" /></svg>
              Kretoria F45
            </span>
            <span className={styles.infoItem}>
              <svg width="16" height="16"><use href="#icon-phone" /></svg>
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
            <div key={medicine.id} className={styles.card}>
              <div className={styles.imageBox}>
                {medicine.image ? (
                  <img
                    src={medicine.image}
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
                  <span className={styles.medicinePrice}>₴{medicine.price}</span>
                </div>
                <p className={styles.medicineCategory}>{medicine.category}</p>
                <div className={styles.cardButtons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(medicine.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteClick(medicine.id)}
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