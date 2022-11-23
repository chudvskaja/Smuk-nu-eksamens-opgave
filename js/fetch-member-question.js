const memberImgQuestionSection = document.querySelector("#question-member");

function fetchMembersImgQ() {
  fetch("../data/reviews.json")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((member) => renderMembertListQuestion(member))
    .catch((error) => console.log(error));
}

fetchMembersImgQ();

function renderMembertListQuestion(member) {
    const markupMember = member
      .map((member) => {
        return `<img class="member-photo" src="${member.image}" alt="${member.name}">`
        })

        .join("");
       
        memberImgQuestionSection.innerHTML = markupMember;
}





