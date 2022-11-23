const userList = document.querySelector(".statement-list");

function fetchUsers() {
  fetch("../data/reviews.json")
  .then (response => {
   if (!response.ok) {
    throw new Error(response.status);
   }
    return response.json();
   })
   .then((user) => renderUserList(user))
   .catch((error) => console.log(error));
}

fetchUsers();

function renderUserList(users) {
    const markup = users
      .map((user) => {
        return `<li class="statement-item">
            <img  class="client-img" src="${user.image}"</img>
            <p class="statement-text">${user.description}</p>
            <p class="client-name">${user.name}</p>
            <p class="client-role">${user.byline}</p>
          </li>`;
      })
      .join("");
    userList.innerHTML = markup;
  }