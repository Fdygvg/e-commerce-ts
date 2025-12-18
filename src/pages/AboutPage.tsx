import React from "react";
import styles from '../Styles/About.module.css'

const About: React.FC = () => {
  return (
    <main className={styles.about}>
      <section className={styles.hero}>
        <h1>About Us</h1>
        <p>
          We build products that make online shopping faster, simpler,
          and more human.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.block}>
          <h2>Who We Are</h2>
          <p>
            We’re a modern e-commerce brand focused on quality, usability,
            and customer experience. Every product is carefully selected
            and tested before it reaches your doorstep.
          </p>
        </div>

        <div className={styles.block}>
          <h2>Our Mission</h2>
          <p>
            To remove friction from online shopping by combining
            great design, solid technology, and honest pricing.
          </p>
        </div>

        <div className={styles.block}>
          <h2>Why Shop With Us</h2>
          <ul>
            <li>Carefully curated products</li>
            <li>Fast and reliable delivery</li>
            <li>Secure payments</li>
            <li>Customer-first support</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default About;
