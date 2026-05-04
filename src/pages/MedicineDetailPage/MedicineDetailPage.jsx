import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./MedicineDetailPage.module.css";
import { addMedicine, getReviews } from "../../api/medicines";

const REVIEWS_PER_PAGE = 3;

function MedicineDetailPage() {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const navigate = useNavigate();
  const stored = sessionStorage.getItem("detailMedicine");
  const [medicine] = useState(stored ? JSON.parse(stored) : null);
  const [activeTab, setActiveTab] = useState("description");
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToShop, setAddedToShop] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!stored) navigate("/medicine");
    getReviews()
      .then((data) => setReviews(data.reviews || []))
      .catch(() => setReviews([]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToShop = async () => {
    try {
      await addMedicine({
        name: medicine.name,
        price: medicine.price,
        description: medicine.description || "",
        photo: medicine.photo || "",
        category: medicine.category,
      });
      setAddedToShop(true);
      setTimeout(() => setAddedToShop(false), 2000);
    } catch (error) {
      console.error("Failed to add to shop:", error);
    }
  };

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  if (!medicine) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* LEFT — Product Card */}
          <div className={styles.productCard}>
            <div className={styles.imageBox}>
              {medicine.photo ? (
                <img src={medicine.photo} alt={medicine.name} className={styles.productImg} />
              ) : (
                <div className={styles.imagePlaceholder}>💊</div>
              )}
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productTop}>
                <span className={styles.productName}>{medicine.name}</span>
                <span className={styles.productPrice}>₴{medicine.price}</span>
              </div>
              {medicine.suppliers && (
                <p className={styles.productBrand}>Brand: {medicine.suppliers}</p>
              )}
              {medicine.category && !medicine.suppliers && (
                <p className={styles.productBrand}>Category: {medicine.category}</p>
              )}
              <button
                className={styles.addToShopBtn}
                onClick={handleAddToShop}
                disabled={addedToShop}
              >
                {addedToShop ? "Added!" : "Add to shop"}
              </button>
            </div>
          </div>

          {/* RIGHT — Tabs */}
          <div className={styles.tabsCard}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === "description" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`${styles.tab} ${activeTab === "reviews" ? styles.tabActive : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            {/* DESCRIPTION TAB */}
            {activeTab === "description" && (
              <div className={styles.descriptionContent}>
                {medicine.description ? (
                  <p className={styles.descriptionText}>{medicine.description}</p>
                ) : (
                  <>
                    <p className={styles.descriptionText}>
                      Although it's typically considered safe, excessive consumption can lead to side effects. Therefore, it's recommended to consult a healthcare professional before using this medicine, especially if you're pregnant, nursing, or taking other medications.
                    </p>
                    <p className={styles.descriptionSection}>
                      <strong>Medicinal Uses: Antioxidant Properties:</strong> Packed with antioxidants that help fight oxidative stress and inflammation in the body.
                    </p>
                    <p className={styles.descriptionSection}>
                      <strong>Anti-Diabetic Effects:</strong> Some studies have shown that it might lower blood sugar levels, making it a valuable supplement for managing diabetes.
                    </p>
                    <p className={styles.descriptionSection}>
                      <strong>Heart Health:</strong> Has been linked to reduced cholesterol levels, which is vital for heart health.
                    </p>
                    <p className={styles.descriptionSection}>
                      <strong>Immune Support:</strong> With its high vitamin C content, it can boost the immune system.
                    </p>
                    <p className={styles.descriptionSection}>
                      <strong>Digestive Aid:</strong> Can help in treating digestive disorders due to its anti-inflammatory properties.
                    </p>
                  </>
                )}
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <div className={styles.reviewsContent}>
                {reviews.length === 0 && (
                  <p style={{ color: "gray" }}>No reviews yet.</p>
                )}
                {paginatedReviews.map((review) => (
                  <div key={review.name + review.testimonial} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewName}>{review.name}</span>
                    </div>
                    <p className={styles.reviewText}>{review.testimonial}</p>
                  </div>
                ))}

                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <button className={styles.pageBtn} onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>«</button>
                    <button className={styles.pageBtn} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ""}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                    <button className={styles.pageBtn} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>›</button>
                    <button className={styles.pageBtn} onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>»</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicineDetailPage;