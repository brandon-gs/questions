import React, { Dispatch } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./TablePagination.module.css";

interface TablePaginationProps {
  pages: number[];
  rangePages: number[];
  currentPage: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}

function TablePagination({
  pages,
  setPage,
  currentPage,
  rangePages,
}: TablePaginationProps) {
  const hasNextPage = currentPage < rangePages.length;

  return (
    <div className={styles.pagination_container}>
      {currentPage > 1 && (
        <button onClick={() => setPage(currentPage - 1)}>
          <FaChevronLeft size={15} />
        </button>
      )}
      {pages.map((page) => (
        <button
          key={`table-page-${page}`}
          onClick={() => setPage(page)}
          className={`${page === currentPage ? styles.current_page : ""}`}
        >
          {page}
        </button>
      ))}
      {hasNextPage && (
        <button onClick={() => setPage(currentPage + 1)}>
          <FaChevronRight size={15} />
        </button>
      )}
    </div>
  );
}

export default TablePagination;
