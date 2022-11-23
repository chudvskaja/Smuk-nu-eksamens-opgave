const memberImgList = document.querySelector("#index-member");


function fetchMembersImg() {
  fetch("../data/reviews.json")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((member) => renderMembertList(member))
    .catch((error) => console.log(error));
}

fetchMembersImg();

function renderMembertList(member) {
    const markupMember = member
      .map((member) => {
        return `<img class="member-photo" src="${member.image}" alt="${member.name}">`
        })

        .join("");
        memberImgList.innerHTML = markupMember;
        // memberImgProductSection.insertAdjacentHTML("beforebegin", markupMember);
        // memberImgQuestionSection.innerHTML = markupMember;
}



