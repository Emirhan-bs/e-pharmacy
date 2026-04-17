import { NavLink } from "react-router-dom";
import logo from "../../assets/images/main-logo.png";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.top}>
          {/* Left - Logo and Description */}
          <div className={styles.brand}>
            <NavLink to="/" className={styles.logo}>
              <img src={logo} alt="E-Pharmacy Logo" />
              <span className={styles.logoText}>E-Pharmacy</span>
            </NavLink>
            <p className={styles.description}>
              Created a drug franchise that embodies effective formulas and
              changes the approach to treatment
            </p>
          </div>
          {/* Right - Navigation and Social Media */}
          <div className={styles.right}>
            <nav className={styles.nav}>
              <NavLink to="/shop" className={styles.link}>
                Shop
              </NavLink>
              <NavLink to="/medicine" className={styles.link}>
                Medicine
              </NavLink>
              <NavLink to="/statistics" className={styles.link}>
                Statistics
              </NavLink>
            </nav>

            {/* Social Media Icons */}
            <ul className={styles.social}>
              <li>
                <a
                  href="https://www.facebook.com/goITclub/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                >
                  <svg width="32" height="32">
                    <use href="#icon-facebook"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/goITclub/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                >
                  <svg width="32" height="32">
                    <use href="#icon-instagram"/>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="httops://www.youtube.com/goITclub/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialLink}
                >
                  <svg width="32" height="32">
                    <use href="#icon-youtube"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; 2026 E-Pharmacy. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLinks}>
              Privacy Policy
            </a>
            <a href="#" className={styles.bottomLinks}>
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
