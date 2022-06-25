import React from "react";
import useQuestions from "../../../hooks/useQuestions";
import TableFilter from "../TableFilter/TableFilter";
import TablePagination from "../TablePagination/TablePagination";
import TableQuestionsHeader from "../TableQuestionsHeader/TableQuestionsHeader";
import TableQuestionsRow from "../TableQuestionsRow/TableQuestionsRow";
import styles from "./TableQuestions.module.css";
import Loader from "../../Layout/Loader/Loader";

function TableQuestions() {
  const {
    questions,
    page,
    pages,
    setPage,
    idSort,
    handleSortById,
    rangePages,
    filters,
    loading,
  } = useQuestions();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div suppressHydrationWarning>
        {typeof window !== "undefined" ? (
          <>
            <TableFilter
              text="Categories"
              filters={filters.categories}
              setFilters={filters.setCategoryFilters}
            />
            <TableFilter
              text="Types"
              filters={filters.types}
              setFilters={filters.setTypeFilters}
            />
            <TableFilter
              text="Difficulty"
              filters={filters.difficulties}
              setFilters={filters.setDifficultyFilters}
            />
          </>
        ) : null}
      </div>
      <div className={styles.table_questions_container}>
        <table className={styles.table_questions}>
          <thead>
            <TableQuestionsHeader idSort={idSort} onSortById={handleSortById} />
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <TableQuestionsRow
                key={`question-row-${index}`}
                question={question}
              />
            ))}
          </tbody>
        </table>
        {questions.length === 0 && (
          <div>
            <h1 className={styles.empty_message}>
              There are no questions that meet these criteria
            </h1>
          </div>
        )}
      </div>
      <TablePagination
        currentPage={page}
        pages={pages}
        rangePages={rangePages}
        setPage={setPage}
      />
    </>
  );
}

export default TableQuestions;
