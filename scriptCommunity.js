var userLocalStorage = localStorage.getItem("user") || null;

const carouselInner = document.getElementById("carouselInner");
const search = document.getElementById("search");
const header = document.getElementById("header");
const ul = document.createElement("ul");
ul.setAttribute("class", "search");
const closex = document.createElement("i");
const section = document.getElementById("profile");
const delBtn = document.createElement("button");
delBtn.setAttribute(
  "class",
  "bg-danger text-white border-danger rounded p-1 m-2"
);

function displayUl() {
  document.addEventListener("keyup", function (event) {
    if (event.target.id === "search") {
      ul.innerHTML = "";
      closex.setAttribute("class", "fa fa-times-circle m-1");
      ul.append(closex);
      ul.style.display = "block";
      let searchValue = search.value.toLowerCase();

      ul.setAttribute("id", "ulSearch");
      db.collection("user")
        .orderBy("timestamp", "desc")
        .get()
        .then((snapshot) => {
          let changes = snapshot.docChanges();

          changes.forEach((change) => {
            let doc = change.doc;
            let user = doc.data();
            userSearc = user.username.toLowerCase();

            if (userSearc.startsWith(searchValue)) {
              let li = document.createElement("li");

              ul.append(li);
              li.id = doc.id;
              li.innerHTML = `<i class="fa fa-search p-2"></i>${user.username}<img src="${user.image}" alt="" style="width:40px;height:40px;border-radius:50%" >`;
            }
            header.append(ul);
          });
        })
        .catch();
    }
  });
}
displayUl();
function closeUl() {
  closex.addEventListener("click", function () {
    ul.innerHTML = "";
    search.value = "";
  });
}
closeUl();
function displayCarousel() {
  db.collection("user")
    .orderBy("timestamp", "desc")
    .get()
    .then((snapshot) => {
      let changes = snapshot.docChanges();

      changes.forEach((change) => {
        let doc = change.doc;
        let user = doc.data();
        const divInner = document.createElement("div");
        divInner.setAttribute("class", "carousel-item p-2");

        if (doc.id == userLocalStorage) {
          divInner.setAttribute(
            "class",
            "carousel-item active border border-5 border-info rounded p-2"
          );
        }
        let carouselItem = `
    <img
      style=" border-radius: 50%;"
      src="${user.image}"
      class="d-block m-auto border border-5 border-info"
      alt="image${user.username}"
    />
  `;
        let name = `
      <span class="badge rounded-pill bg-info m-auto d-block position-relative" style="width:100px;">${
        user.username
      }
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
 ${user.scor || 0}
      
    </span>
      </span>
      `;

        divInner.innerHTML = carouselItem + name;
        carouselInner.append(divInner);
      });
    })
    .catch();
}
displayCarousel();

function choseDisplayProfile() {
  displayUl();
  var Id;
  ul.addEventListener("click", function (e) {
    ul.innerHTML = "";
    section.innerHTML = "";
    e.preventDefault();

    if (e.target.closest("li")) {
      Id = e.target.id;
      console.log(Id);
      ul.style.display = "none";
      search.value = "";
    }
    if (e.target.closest("img") || e.target.closest("i")) {
      Id = e.target.parentNode.id;
      ul.style.display = "none";
      search.value = "";
    }
    db.collection("user")
      .get()
      .then((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach((change) => {
          let doc = change.doc;
          let user = doc.data();

          let div = document.createElement("div");
          let birthday = user.dateBirth;
          let bDAY = new Date(birthday);
          let join = user.timestamp.toDate();
          let joined = join.toLocaleDateString();
          if (doc.id == Id) {
            let sectionContent = `<div class="card">
            <div class="row g-0">
              <div class="col-md-4 col-12 card-header">
                <img src="${
                  user.image
                }" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8 col-12 card-body p-4">
                  <h5 class="card-title">${user.username}</h5>
                  <blockquote>${user.thought}</blockquote>
                  <cite> - ${user.username}</cite>
                  <hr>
                  <time>Date of Birth: ${bDAY.toLocaleDateString()}</time>
                  <time>Joined: ${joined}</time>
                  <hr>
                  <p class="card-text bg-info rounded text-danger text-center p-2 m-2" id="scor"><strong>Scor: ${
                    user.scor
                  }</strong><i class="fa fa-thumbs-up" aria-hidden="true"></i>
                  </p>
                 
              </div>
            </div>
          </div>`;
            div.innerHTML = sectionContent;
            section.append(div);
          }
        });
      })
      .catch();
  });
}
choseDisplayProfile();

delBtn.addEventListener("click", function () {
  db.doc(`user/${userLocalStorage}`).delete().then().catch();
  section.innerHTML = `<h1 class="text-warning text-center">Account is deleted!</h1>`;
  localStorage.setItem("user", "1");
  displayCarousel();
});
function displayCurrentUserProfile() {
  console.log(userLocalStorage);
  if (userLocalStorage == 1) {
    section.innerHTML = "<h2>Hello World</h2>";
  } else {
    db.doc(`user/${userLocalStorage}`)
      .get()
      .then((doc) => {
        let user = doc.data();
        let div = document.createElement("div");
        div.setAttribute("class", "position:relative");
        let birthday = user.dateBirth;
        let bDAY = new Date(birthday);
        let join = user.timestamp.toDate();
        let joined = join.toLocaleDateString();
        delBtn.style.position = "relative";
        delBtn.style.bottom = 0;

        delBtn.textContent = "Delete acount";
        let sectionContent = `<div class="card" id="card">
      <div class="row g-0">
        <div class="col-md-4 col-12 card-header">
          <img src="${user.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 col-12 card-body p-4">
            <h5 class="card-title">${user.username}</h5>
            <blockquote>${user.thought}</blockquote>
            <cite> - ${user.username}</cite>
            <hr>
            <time>Date of Birth: ${bDAY.toLocaleDateString()}</time>
            <time>Joined: ${joined}</time>
            <hr>
            <p class="card-text bg-info rounded text-danger text-center p-2 m-2" id="scor"><strong>Scor: ${
              user.scor
            }</strong><i class="fa fa-thumbs-up" aria-hidden="true"></i>
            </p>
         
        </div>
      </div>
    </div>`;

        div.innerHTML = sectionContent;

        // div.append(delBtn);
        section.append(div);
        let card = document.getElementById("card");
        card.append(delBtn);
      })
      .catch();
  }
}

displayCurrentUserProfile();
