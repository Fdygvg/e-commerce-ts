import styles from '../css/Footer.module.css';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>🛒 E-Shop</h3>
          <p className={styles.footerText}>
            Your one-stop shop for all electronics and gadgets.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li>📧 support@eshop.com</li>
            <li>📞 (123) 456-7890</li>
            <li>📍 123 Tech Street, Digital City</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} E-Shop. All rights reserved.</p>
        <div className={styles.socialLinks}>
          <a href="https://facebook.com.com" target='_blank' aria-label="Facebook"><FaFacebook/></a>
          <a href="https://instagram.com" target='_blank' aria-label="Twitter"><FaInstagram/></a>
          <a href="https://x.com" target='_blank' aria-label="Instagram"><FaXTwitter/></a>
        </div>
      </div>
    </footer>
  );
}