import { useCallback, useEffect, useState } from "react";
import questionsService, { QuestionWithExtraData } from "../services/questions";
import { generateRandomString } from "../utils/helpers";
import usePagination from "./usePagination";
import useTable from "./useTable";

function useQuestions(rowsPerPage = 10) {
  const [page, setPage] = useState<number>(1);

  const [allQuestions, setAllQuestions] = useState<QuestionWithExtraData[]>([]); // save all the questions
  const [questions, setQuestions] = useState<QuestionWithExtraData[]>([]); // save all the questions
  const [loading, setLoading] = useState<boolean>(true);

  const [idSort, setIdSort] = useState<"asc" | "des">("asc");

  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const [allDifficulties, setAllDifficulties] = useState<string[]>([]);

  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [difficultyFilters, setDifficultyFilters] = useState<string[]>([]);

  /**
   * slice = questions with pagination
   * range = number of questions per page
   */
  const { slice, range } = useTable<QuestionWithExtraData>(
    questions,
    page,
    rowsPerPage
  );

  const [currentQuestions, setCurrentQuestions] =
    useState<QuestionWithExtraData[]>(slice);

  // Pagination data
  const { slice: pages } = usePagination(range, page, 4);

  const handleSortById = useCallback(() => {
    const sortQuestions = [...currentQuestions];
    if (idSort === "asc") {
      setIdSort("des");
      sortQuestions.sort((a, b) => b.id - a.id);
    } else {
      setIdSort("asc");
      sortQuestions.sort((a, b) => a.id - b.id);
    }
    setCurrentQuestions(sortQuestions);
  }, [currentQuestions, idSort]);

  const handleFilterByCategory = useCallback(() => {
    if (categoryFilters.length > 0) {
      const filteredQuestions = [...allQuestions].filter((question) =>
        categoryFilters.includes(question.category)
      );
      return filteredQuestions;
    } else {
      return allQuestions;
    }
  }, [allQuestions, categoryFilters]);

  const handleFilterByType = useCallback(
    (paramQuestions: QuestionWithExtraData[]) => {
      if (typeFilters.length > 0) {
        const filteredQuestions = [...paramQuestions].filter((question) =>
          typeFilters.includes(question.type)
        );
        return filteredQuestions;
      } else {
        return paramQuestions;
      }
    },
    [typeFilters]
  );

  const handleFilterByDifficulties = useCallback(
    (paramQuestions: QuestionWithExtraData[]) => {
      if (difficultyFilters.length > 0) {
        const filteredQuestions = [...paramQuestions].filter((question) =>
          difficultyFilters.includes(question.difficulty)
        );
        return filteredQuestions;
      } else {
        return paramQuestions;
      }
    },
    [difficultyFilters]
  );

  useEffect(() => {
    setCurrentQuestions(slice);
  }, [slice]);

  useEffect(() => {
    const filteredByCategory = handleFilterByCategory();
    const filteredByType = handleFilterByType(filteredByCategory);
    const filteredByDifficulties = handleFilterByDifficulties(filteredByType);
    setQuestions(filteredByDifficulties);
    setPage(1);
  }, [handleFilterByCategory, handleFilterByDifficulties, handleFilterByType]);

  // Filters
  // useEffect(() => {
  //   if (categoryFilters.length > 0) {
  //     const filteredQuestions = [...allQuestions].filter((question) =>
  //       categoryFilters.includes(question.category)
  //     );
  //     setQuestions(filteredQuestions);
  //   } else {
  //     setQuestions(allQuestions);
  //   }
  //   setPage(1);
  // }, [categoryFilters, allQuestions]);

  // useEffect(() => {
  //   if (typeFilters.length > 0) {
  //     const filteredQuestions = [...allQuestions].filter((question) =>
  //       typeFilters.includes(question.type)
  //     );
  //     setQuestions(filteredQuestions);
  //   } else {
  //     setQuestions(allQuestions);
  //   }
  //   setPage(1);
  // }, [typeFilters, allQuestions]);

  // useEffect(() => {
  //   if (difficultyFilters.length > 0) {
  //     const filteredQuestions = [...allQuestions].filter((question) =>
  //       difficultyFilters.includes(question.difficulty)
  //     );
  //     setQuestions(filteredQuestions);
  //   } else {
  //     setQuestions(allQuestions);
  //   }
  //   setPage(1);
  // }, [allQuestions, difficultyFilters]);

  // Get questions at mount page
  useEffect(() => {
    let mounted = true;

    const getQuestions = async () => {
      const data = await questionsService.getQuestions();
      if (mounted) {
        const questionsWithData = data.map((question, index) => {
          const createdBy = generateRandomString(8);
          return { ...question, id: index + 1, createdBy };
        });
        const types = [...new Set(data.map((question) => question.type))];
        const categories = [
          ...new Set(data.map((question) => question.category)),
        ];
        const difficulties = [
          ...new Set(data.map((question) => question.difficulty)),
        ];
        setAllQuestions(questionsWithData);
        setQuestions(questionsWithData);
        setAllTypes(types);
        setAllCategories(categories);
        setAllDifficulties(difficulties);
        setLoading(false);
      }
    };

    getQuestions();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    questions: currentQuestions,
    idSort,
    handleSortById,
    setPage,
    page,
    pages,
    rangePages: range,
    loading,
    filters: {
      types: allTypes,
      categories: allCategories,
      difficulties: allDifficulties,
      setCategoryFilters,
      setDifficultyFilters,
      setTypeFilters,
    },
  };
}
export default useQuestions;
