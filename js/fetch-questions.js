const questionList = document.querySelector(".questions-list");


function fetchQuestion() {
  fetch("../data/questions.json")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((question) => renderQuestionList(question))
   .catch((error) => console.log(error));
}

fetchQuestion();

function renderQuestionList(question) {
    const markup = question
      .map((question) => {
        return `<li class="question-item">
        <div class="question-icon">
        <i class="fa-solid fa-question"></i>
        <p class="question-text">${question.question}</p>
    </div>
        <p class="dropdown-text">${question.answer}</p>
       </li>`;
      })
      .join("");
      questionList.innerHTML = markup;
  }