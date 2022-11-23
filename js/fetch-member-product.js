const memberImgProductSection = document.querySelector("#product-member");

function fetchMembersImgP() {
  fetch("../data/reviews.json")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((member) => renderMembertListProduct(member))
    .catch((error) => console.log(error));
}

fetchMembersImgP();

function renderMembertListProduct(member) {
    const markupMember = member
      .map((member) => {
        return `<img class="member-photo" src="${member.image}" alt="${member.name}">`
        })

        .join("");
        memberImgProductSection.insertAdjacentHTML("afterbegin", markupMember);
}





