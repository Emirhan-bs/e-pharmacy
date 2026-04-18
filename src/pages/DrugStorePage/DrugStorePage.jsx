import { useState } from "react";
import styles from "./DrugStorePage.module.css";

// Mock medicine data (we'll replace with API later)
const mockMedicines = [
  {
    id: 1,
    name: "Hydrochloride",
    category: "Framing (Wood)",
    price: 582,
    image: null,
  },
  {
    id: 2,
    name: "Occidentalis",
    category: "Fire Sprinkler System",
    price: 239,
    image: null,
  },
  { id: 3, name: "Octinoxate", category: "Eifs", price: 306, image: null },
  {
    id: 4,
    name: "Prednisone",
    category: "Soft Flooring and Base",
    price: 579,
    image: null,
  },
  {
    id: 5,
    name: "Helminthos",
    category: "Overhead Doors",
    price: 470,
    image: null,
  },
  {
    id: 6,
    name: "Alcohol",
    category: "Prefabricated Metal",
    price: 748,
    image: null,
  },
];

function DrugStorePage() {
  const [activeTab, setActiveTab] = useState("drugstore");
  const [medicines, setMedicines] = useState(mockMedicines);

  const handleDelete = (id) => {
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit medicine:", id);
  };

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
            <button className={styles.addMedicineBtn}>Add medicine</button>
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
              {/* IMAGE */}
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

              {/* INFO */}
              <div className={styles.cardInfo}>
                <div className={styles.cardTop}>
                  <span className={styles.medicineName}>{medicine.name}</span>
                  <span className={styles.medicinePrice}>
                    ₴{medicine.price}
                  </span>
                </div>
                <p className={styles.medicineCategory}>{medicine.category}</p>

                {/* BUTTONS */}
                <div className={styles.cardButtons}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(medicine.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(medicine.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrugStorePage;
