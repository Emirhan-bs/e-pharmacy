import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./RegisterPage.module.css";
import { useNavigate, NavLink } from "react-router-dom";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{7,15}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log("Register data:", data);
    navigate("/login");
  };

  return (
    <div className={styles.page}>
      {/* Left Side */}
      <div className={styles.left}>
        <div className={styles.pill}>💊</div>
        <h1 className={styles.title}>
          Your medication, delivered Say goodbye to all{" "}
          <span className={styles.green}>your healthcare worries</span> with us
        </h1>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Row 1:Name + email */}
          <div className={styles.row}>
            <div className={styles.field}>
              <input
                {...register("name")}
                type="text"
                placeholder="User Name"
                className={` ${styles.input} ${errors.name ? styles.inputError : ""} `}
              />
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </div>

            <div className={styles.field}>
              <input
                type="email"
                {...register("email")}
                placeholder="Email address"
                className={` ${styles.input} ${errors.email ? styles.inputError : ""} `}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Row 2: Phone + Password */}
          <div className={styles.row}>
            <div className={styles.field}>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Phone number"
                className={` ${styles.input} ${errors.phone ? styles.inputError : ""} `}
              />
              {errors.phone && (
                <p className={styles.error}> {errors.phone.message} </p>
              )}
            </div>

            <div className={styles.field}>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className={styles.button}>
            Register
          </button>

          {/* Redirect to Login */}
          <p className={styles.redirect}>
            Already have an account?{" "}
            <NavLink to="/login" className={styles.redirectLink}>
              Log in
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;
