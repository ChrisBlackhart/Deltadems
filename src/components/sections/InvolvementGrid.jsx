import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Icon } from "../ui/Icon.jsx";
import { involvement } from "../../data/involvement.js";
import styles from "./InvolvementGrid.module.css";

export function InvolvementGrid() {
  return (
    <div className={styles.grid}>
      {involvement.map((item) => (
        <Link key={item.id} to={item.to} className={styles.card}>
          <span className={styles.icon}>
            <Icon name={item.icon} />
          </span>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.text}>{item.text}</p>
          <span className={styles.cta}>
            {item.cta} <ArrowRight aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
