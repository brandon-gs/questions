import React from "react";
import { FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import styles from "./TableQuestionsHeader.module.css";

interface StyledTableHeaderProps {
  text: string;
  onClick?: () => void;
  sort?: "asc" | "des";
}

const StyledTableHeader = ({ onClick, text, sort }: StyledTableHeaderProps) => {
  return (
    <th
      onClick={() => {
        onClick && onClick();
      }}
      className={`${styles.table_questions_header} ${
        onClick !== undefined ? "cursor-click" : ""
      }`}
    >
      {text}
      {sort !== undefined && sort === "asc" ? (
        <FaSortNumericDown className={styles.table_sort_icon} />
      ) : sort === "des" ? (
        <FaSortNumericUp className={styles.table_sort_icon} />
      ) : null}
    </th>
  );
};

interface TableQuestionsHeaderProps {
  onSortById: () => void;
  idSort: "asc" | "des";
}

function TableQuestionsHeader({
  onSortById,
  idSort,
}: TableQuestionsHeaderProps) {
  return (
    <tr>
      <StyledTableHeader text="ID" onClick={onSortById} sort={idSort} />
      <StyledTableHeader text="Category" />
      <StyledTableHeader text="Type" />
      <StyledTableHeader text="Difficulty" />
      <StyledTableHeader text="Question / Statement" />
      <StyledTableHeader text="Created By" />
    </tr>
  );
}

export default TableQuestionsHeader;
