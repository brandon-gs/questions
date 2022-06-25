import React from "react";
import { QuestionWithExtraData } from "../../../services/questions";
import styles from "./TableQuestionsRow.module.css";

export interface TableQuestionsRowProps {
  question: QuestionWithExtraData;
}

const KEYS_TO_SHOW: Array<keyof QuestionWithExtraData> = [
  "id",
  "category",
  "type",
  "difficulty",
  "question",
  "createdBy",
];

function TableQuestionsRow({ question }: TableQuestionsRowProps) {
  return (
    <tr>
      {KEYS_TO_SHOW.map((key, index) => (
        <td
          key={`table-column-key-${question.id}-index-${index}`}
          className={`${styles.table_question_td} ${
            key === "createdBy" ? styles.table_question_td_created_by : ""
          }`}
        >
          {key === "type"
            ? question.type === "multiple"
              ? "Multiple Choice"
              : "True / False"
            : question[key]}
        </td>
      ))}
    </tr>
  );
}

export default TableQuestionsRow;
