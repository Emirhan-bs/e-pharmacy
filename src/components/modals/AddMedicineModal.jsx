import * as yup from "yup";
import styles from "./AddMedicineModal.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import pillImg from "../../assets/images/upload-pill.png";

const schema = yup.object({
  name: yup.string().required("Medicine name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
});

function AddMedicineModal({ onClose, onAdd }) {
  const [previewImg, setPreviewImg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log("New medicine:", data);
    onAdd({ ...data, image: previewImg });
    onClose();
  };

  return (
    //Overlay - closes modal
    <div className={styles.overlay} onClick={onClose}>
      {/* Modal Box */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/*Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <h2 className={styles.title}>Add medicine to store</h2>

        {/* Image Upload */}
        <div className={styles.imageUpload}>
          <img
            src={previewImg || pillImg}
            alt="medicine"
            className={styles.previewImg}
          />
          <label className={styles.uploadLabel}>
            <svg width="18" height="18">
              <use href="#upload-elements" />
            </svg>
            Upload image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </label>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Name + Price Row */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Medicine Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter text"
                className={` ${styles.input} ${errors.name ? styles.inputError : ""}`}
              />
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Price</label>
              <input
                type="number"
                {...register("price")}
                placeholder="₴0.00"
                className={` ${styles.input} ${errors.price ? styles.inputError : ""}`}
              />
            </div>
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter text"
              className={` ${styles.textarea} ${errors.description ? styles.inputError : ""}`}
              row={4}
            />
            {errors.description && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className={styles.buttons}>
            <button type="submit" className={styles.addBtn}>
              {" "}
              Add medicine{" "}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMedicineModal;
