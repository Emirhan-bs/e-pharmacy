import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import logo from "../../assets/images/main-logo.png";
import pillImg from "../../assets/images/white-pill.png";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Login data", data);
    navigate("/shop");
  };

  return (
    <div className={styles.page}>
      <div className={styles.logoWrapper}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <span className={styles.logoText}>E-Pharmacy</span>
        </NavLink>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.pill}>
            <img
              className={styles.pillImg}
              src={pillImg}
              alt="pill"
            />
          </div>
          <h1 className={styles.title}>
            Your medication, delivered Say goodbye to all{" "}
            <span className={styles.green}>your healthcare worries</span> with
            us
          </h1>
        </div>

        <div className={styles.right}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className={styles.field}>
              <input
                {...register("email")}
                type="email"
                placeholder="Email address"
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
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

            <button type="submit" className={styles.button}>
              Log in
            </button>

            <p className={styles.redirect}>
              Don't have an account?{" "}
              <NavLink to="/register" className={styles.redirectLink}>
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
      <div className={styles.decoration}>
        <svg width="180" height="120" aria-hidden="true">
          <use href="#icon-elements" />
        </svg>
      </div>
    </div>
  );
}

export default LoginPage;
