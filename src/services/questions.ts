export interface QuestionResponse {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type QuestionWithExtraData = QuestionResponse & {
  id: number;
  createdBy: string;
};

const getQuestions = async (): Promise<QuestionResponse[]> => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=50");
    const data = await response.json();
    return data.results;
  } catch (e) {
    return [];
  }
};

const questionsService = {
  getQuestions,
};

export default questionsService;
