import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";
import styles from "../css/Navbar.module.css";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/orders", label: "My Orders" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          🛒 E-Shop
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* Cart & Mobile Toggle */}
        <div className={styles.rightSection}>
          <Link to="/cart" className={styles.cartButton}>
            🛒 Cart
            {getTotalItems() > 0 && (
              <span className={styles.cartBadge}>{getTotalItems()}</span>
            )}
          </Link>

          {/* Hamburger Menu Button (Mobile only) */}
          <button
            className={styles.hamburger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div
              className={`${styles.line} ${isMenuOpen ? styles.line1 : ""}`}
            />
            <div
              className={`${styles.line} ${isMenuOpen ? styles.line2 : ""}`}
            />
            <div
              className={`${styles.line} ${isMenuOpen ? styles.line3 : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}
        >
          <div className={styles.mobileNav}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ""}`
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/cart"
              className={styles.mobileCartLink}
              onClick={closeMenu}
            >
              🛒 Cart ({getTotalItems()})
            </Link>
          </div>

          {/* Close button for mobile */}
          <button className={styles.closeButton} onClick={closeMenu}>
            ✕
          </button>
        </div>
      </div>
    </nav>
  );
}
