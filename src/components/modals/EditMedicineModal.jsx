import * as yup from "yup";
import styles from "./EditMedicineModal.module.css";import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Medicine name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  description: yup.string().required("Description is required"),
});

function EditMedicineModal({ onClose, onSave, medicine }) {
  const [previewImg, setPreviewImg] = useState(medicine?.image || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: medicine?.name || "",
      price: medicine?.price || "",
      description: medicine?.description || "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    onSave({ ...medicine, ...data, image: previewImg });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        <h2 className={styles.title}>Edit Medicine</h2>

        {/* Image */}
        <div className={styles.imageUpload}>
          <img src={previewImg} alt="medicine" className={styles.previewImg} />
          <label className={styles.uploadLabel}>
            <svg width="18" height="18">
              <use href="#upload-elements" />
            </svg>
            Change image
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
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Medicine Name</label>
              <input
                type="text"
                {...register("name")}
                className={` ${styles.input} ${errors.name ? styles.inputError : ""} `}
              />
              {errors.name && (
                <p className={styles.error}> {errors.name.message}</p>
              )}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Price</label>
              <input
                type="number"
                {...register("price")}
                className={`${styles.input} ${errors.price ? styles.inputError : ""}`}
              />
              {errors.price && (
                <p className={styles.error}>{errors.price.message}</p>
              )}
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea
              {...register("description")}
              className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
              rows={4}
            />
            {errors.description && (
              <p className={styles.error}>{errors.description.message}</p>
            )}
          </div>{" "}
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>
              Save medicine
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
export default EditMedicineModal;
