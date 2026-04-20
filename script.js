const usersDiv = document.getElementById("users");
const searchInput = document.getElementById("search");

let allUsers = [];

// تحميل البيانات مرة واحدة
fetch("https://dummyjson.com/users")
  .then(res => res.json())
  .then(data => {
    allUsers = data.users;
    displayUsers(allUsers);
  })
  .catch(() => {
    usersDiv.innerHTML = "Error loading data";
  });

// عرض المستخدمين
function displayUsers(users) {
  usersDiv.innerHTML = "";

  if (users.length === 0) {
    usersDiv.innerHTML = "<p>No users found</p>";
    return;
  }

  users.forEach(user => {
    const div = document.createElement("div");
    div.classList.add("user-card");

    div.innerHTML = `
      <img src="${user.image}" alt="user">
      <h3>${user.firstName} ${user.lastName}</h3>
      <p>${user.email}</p>
    `;

    usersDiv.appendChild(div);
  });
}

// البحث
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allUsers.filter(user =>
    user.firstName.toLowerCase().includes(value) ||
    user.lastName.toLowerCase().includes(value) ||
    user.email.toLowerCase().includes(value)
  );

  displayUsers(filtered);
});
