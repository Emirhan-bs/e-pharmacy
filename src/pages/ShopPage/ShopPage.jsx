import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./ShopPage.module.css";
import shopImage from "../../assets/images/shop-image.png";

const schema = yup.object({
  shopName: yup.string().required("Shop name is required"),
  ownerName: yup.string().required("Owner name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  zip: yup.string().required("Zip code is required"),
  delivery: yup.string().required("Please select an opion"),
});

function ShopPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { delivery: "yes" },
  });

  const onSubmit = async (data) => {
    console.log("Shop data:", data);
    navigate("/medicine");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Form COntainer */}
        <div className={styles.card}>
          <h1 className={styles.title}>Create your Shop </h1>
          <p className={styles.subtitle}>
            This information will be displayed publicly so be careful what you
            share.
          </p>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* ROW 1 - Shop Name, Owner Name, Email */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Shop Name</label>
                <input
                  type="text"
                  {...register("shopName")}
                  placeholder="Enter Text"
                  className={` ${styles.input} ${errors.shopName ? styles.inputError : ""} `}
                />
                {errors.shopName && (
                  <p className={styles.error}>{errors.shopName.message}</p>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Shop Owner Name</label>
                <input
                  type="text"
                  {...register("ownerName")}
                  placeholder="Enter text"
                  className={` ${styles.input} ${errors.ownerName ? styles.inputError : ""} `}
                />
                {errors.ownerName && (
                  <p className={styles.error}>{errors.ownerName.message}</p>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email address</label>
                <input
                  type="email"
                  {...register}
                  placeholder="Enter text"
                  className={` ${styles.input} ${errors.email ? styles.inputError : ""} `}
                />
                {errors.email && (
                  <p className={styles.error}> {errors.email.message}</p>
                )}
              </div>
            </div>
            {/* ROw 2 - Phone, Address, City */}

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="Enter Text"
                  className={` ${styles.input} ${errors.phone ? styles.inputError : ""} `}
                />
                {errors.phone && (
                  <p className={styles.error}>{errors.phone.message}</p>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Street address</label>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Enter text"
                  className={` ${styles.input} ${errors.address ? styles.inputError : ""} `}
                />
                {errors.address && (
                  <p className={styles.error}> {errors.address.message}</p>
                )}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>City</label>
                <input
                  type="text"
                  {...register("city")}
                  placeholder="Enter text"
                  className={` ${styles.input} ${errors.city ? styles.inputError : ""} `}
                />
                {errors.city && (
                  <p className={styles.error}> {errors.city.message}</p>
                )}
              </div>
            </div>

            {/* ROW 3 - Zip only */}

            <div className={styles.rowSingle}>
              <div className={styles.field}>
                <label className={styles.label}>Zip / Postal</label>
                <input
                  type="text"
                  {...register("zip")}
                  placeholder="Enter text"
                  className={` ${styles.input} ${errors.zip ? styles.inputError : ""} `}
                />
                {errors.zip && (
                  <p className={styles.error}> {errors.zip.message} </p>
                )}
              </div>
            </div>

            {/* Delivery Radio */}
            <div className={styles.radioGroup}>
              <label className={styles.label}>Has own Delivery System?</label>
              <div className={styles.radioOptions}>
                <label className={styles.radioLabel}>
                  <input
                    {...register("delivery")}
                    type="radio"
                    value="yes"
                    className={styles.radio}
                  />
                  Yes
                </label>
                <label className={styles.radioLabel}>
                  <input
                    {...register("delivery")}
                    type="radio"
                    value="no"
                    className={styles.radio}
                  />
                  No
                </label>
              </div>
            </div>
            <button type="submit" className={styles.button}>
              Create account
            </button>
          </form>
        </div>
        {/* Right - Shop Image */}
        <div className={styles.imageWrapper}>
          <img src={shopImage} alt="pharmacy" className={styles.image} />
        </div>
      </div>
    </div>
  );
}
export default ShopPage;
