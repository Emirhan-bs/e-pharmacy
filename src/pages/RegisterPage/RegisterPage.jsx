import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import logo from "../../assets/images/main-logo.png";
import pillImg from "../../assets/images/white-pill.png";

const schema = yup.object({
  name: yup.string().min(2, "Min 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

function RegisterPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Register data:", data);
    navigate("/login");
  };

  return (
    <div className={styles.page}>

      {/* LOGO */}
      <div className={styles.logoWrapper}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <span className={styles.logoText}>E-Pharmacy</span>
        </NavLink>
      </div>

      {/* CONTENT — left and right INSIDE here */}
      <div className={styles.content}>

        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.pill}>
            <img className={styles.pillImg} src={pillImg} alt="pill" />
          </div>
          <h1 className={styles.title}>
            Your medication, delivered Say goodbye to all{" "}
            <span className={styles.green}>your healthcare worries</span>{" "}
            with us
          </h1>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

            <div className={styles.row}>
              <div className={styles.field}>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="User Name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                />
                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
              </div>
              <div className={styles.field}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone number"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                />
                {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
              </div>
              <div className={styles.field}>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
              </div>
            </div>

            <button type="submit" className={styles.button}>Register</button>

            <p className={styles.redirect}>
              Already have an account?{" "}
              <NavLink to="/login" className={styles.redirectLink}>Log in</NavLink>
            </p>

          </form>
        </div>

      </div>

      {/* DECORATION */}
      <div className={styles.decoration}>
        <svg width="180" height="120" aria-hidden="true">
          <use href="#icon-elements" />
        </svg>
      </div>

    </div>
  );
}

export default RegisterPage;