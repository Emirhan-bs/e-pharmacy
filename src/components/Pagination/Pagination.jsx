import styles from "./Pagination.module.css";

function Pagination({ total, perPage, current, onChange }) {
  const pageCount = Math.ceil(total / perPage);
  if (pageCount <= 1) return null;

  const maxDots = 5;
  let start = Math.max(0, current - Math.floor(maxDots / 2));
  let end = start + maxDots;

  if (end > pageCount) {
    end = pageCount;
    start = Math.max(0, end - maxDots);
  }

  const pages = Array.from({ length: end - start }, (_, i) => start + i);

  return (
    <div className={styles.pagination}>
      {pages.map((i) => (
        <button
          key={i}
          className={`${styles.dot} ${current === i ? styles.active : ""}`}
          onClick={() => onChange(i)}
        />
      ))}
    </div>
  );
}

export default Pagination;