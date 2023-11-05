//dom

const questionList = document.getElementById("questionList");
const btnGroup = document.createElement("div");
const btnArt = document.createElement("button");
const btnScience = document.createElement("button");
const btnVisitor = document.createElement("button");
const spanArt = document.createElement("span");
const spanScinece = document.createElement("span");
const spanVisitor = document.createElement("span");
const quizQuestions = document.getElementById("quizQuestions");
const quizContainer = document.createElement("form");
const btnSubmit = document.createElement("button");
const resultText = document.getElementById("points");
const results = document.getElementById("results");
const customForm = document.createElement("form");
const inputImage = document.createElement("input");
const inputName = document.createElement("p");
const btnStart = document.querySelector("#user button:first-of-type");
const displayMenu = document.querySelector("#displayMenu");
const userInfo = document.getElementById("userForm");
const carouselInner = document.getElementById("carouselInner");
const inputAvatar = document.getElementById("image");
const containerImmages = document.getElementById("addedImages");
const buttonAddAvatar = document.getElementById("buttonAddAvatar");
const logInForm = document.getElementById("logIn");
const divBtnContainer = document.getElementById("divBtnContainer");
const btnsignIn = document.getElementById("signIn");
const btnsignUp = document.getElementById("signUp");
const modalAvatar = document.getElementById("staticBackdrop");
const usernameInput = document.getElementById("username");
const wholePage = document.getElementById("wholePage");
const nameU = document.getElementById("name");
const video = document.getElementById("myVideo");
var userLocalStorage = localStorage.getItem("user") || null;

//var
var counterSession = 0;
var endTime = 180;

//choose sign up or sign in start
function displaySignUpOrIn() {
  logInForm.style.display = "none";
  userInfo.style.display = "none";
  btnsignIn.addEventListener("click", function () {
    divBtnContainer.style.display = "none";
    logInForm.style.display = "block";
  });

  btnsignUp.addEventListener("click", function () {
    divBtnContainer.style.display = "none";
    userInfo.style.display = "block";
  });
}
displaySignUpOrIn();
// choose sign up or sign in end

//Cheking is username avilable

usernameInput.addEventListener("blur", function () {
  db.collection("user")
    .get()
    .then((snapshot) => {
      let changes = snapshot.docChanges();
      var avilableUsername = true;
      changes.forEach((change) => {
        let doc = change.doc;
        let user = doc.data();

        if (user.username == usernameInput.value) {
          avilableUsername = false;
        }
      });
      if (!avilableUsername) {
        usernameInput.value = "";

        usernameInput.placeholder =
          "This username is not available, please choose another one.";
        usernameInput.classList.add("border-danger");
      } else {
        usernameInput.classList.remove("border-danger");
      }
    });
});

//adding new user in firebase
userInfo.addEventListener("submit", function (e) {
  e.preventDefault();

  userInfo.style.display = "none";
  btnStart.style.display = "block";
  let username = this.username.value;
  let dateB = this.dateBirth.value;
  let dateBirth = Date.parse(dateB);
  let image = this.image.value;
  let date = new Date();
  let timestamp = firebase.firestore.Timestamp.fromDate(date);
  let thought = this.thought.value;
  let password = this.password.value;
  let scor = 0;

  let obj = {
    username: username,
    dateBirth: dateBirth,
    image: image,
    thought: thought,
    timestamp: timestamp,
    password: password,
    scor: scor,
  };

  db.collection("user")
    .add(obj)
    .then(() => {
      userInfo.reset();
      let success = document.createElement("div");
      success.setAttribute("class", "alert alert-success w-50 m-auto");
      success.setAttribute("role", "alert");
      success.textContent = "Thank you very much!";
      document.body.append(success);
      let alert = setTimeout(() => {
        success.style.display = "none";
      }, 5000);
    })
    .catch((err) => {
      let error = document.createElement("div");
      error.setAttribute("class", "alert alert-success w-50 m-auto");
      error.setAttribute("role", "alert");
      error.textContent = error;
      document.body.append(err);
      let alert = setTimeout(() => {
        error.style.display = "none";
      }, 5000);
    });
  function currentUser() {
    db.collection("user")
      .where("username", "==", username)
      .where("password", "==", password)
      .get()
      .then((snapshot) => {
        let changes = snapshot.docChanges();

        changes.forEach((change) => {
          let doc = change.doc;
          let user = doc.data();
          let current = doc.id;
          nameU.textContent = user.username;
          localStorage.setItem("user", current);
          const divInner = document.createElement("div");
          let imgLoc = user.image;
          console.log(imgLoc);
          let carouselItem = `
            <img
              style="width: 200px; height: 200px; border-radius: 50%; background-color: blue"
              src="${user.image}"
              class="d-block m-auto border border-5 border-info"
              alt="image${user.username}"
            />
          `;
          let name = `
              <span class="badge rounded-pill bg-info m-auto d-block position-relative" style="width:100px;">${user.username}
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
         ${user.scor}
    
            </span>
              </span>
              `;

          divInner.innerHTML = carouselItem + name;
          carouselInner.append(divInner);
        });
      })
      .catch();
  }
  currentUser();
});

//adding new user in firebase end

btnStart.addEventListener("click", () => {
  displayMenu.style.display = "block";
});

let createMenu = () => {
  btnGroup.setAttribute("class", "btn-group w-75");

  btnGroup.setAttribute("role", "group");
  btnGroup.setAttribute("aria-label", "Basic example");
  btnArt.setAttribute("class", "btn btn-secondary");
  btnArt.textContent = "Art";
  spanArt.setAttribute("class", "badge bg-info m-2");
  btnArt.append(spanArt);
  btnScience.setAttribute("class", "btn btn-secondary");
  btnScience.textContent = "Science";
  spanScinece.setAttribute("class", "badge bg-info m-2");
  btnScience.append(spanScinece);
  btnVisitor.setAttribute("class", "btn btn-secondary");
  btnVisitor.textContent = "Visitors questions";
  spanVisitor.setAttribute("class", "badge bg-info m-2");
  btnVisitor.append(spanVisitor);
  btnGroup.append(btnScience, btnArt, btnVisitor);
  questionList.append(btnGroup);
};
createMenu();
let CreateSpanCount = (fieldName, spanName, collectionName) => {
  db.collection(collectionName)
    .where("fields", "==", fieldName)
    .get()
    .then((snapshot) => {
      let Count = snapshot.size;
      spanName.textContent = Count;
    })
    .catch((error) => {
      let errormessage = document.createElement("div");
      errormessage.setAttribute("class", "alert alert-warning w-50 m-auto");
      errormessage.setAttribute("role", "alert");
      errormessage.textContent = error;
      document.body.append(errormessage);
      let alert = setTimeout(() => {
        errormessage.style.display = "none";
      }, 3000);
    });
};
CreateSpanCount("art", spanArt, "quiz");
CreateSpanCount("science", spanScinece, "quiz");
CreateSpanCount("visitor", spanVisitor, "quiz");

let createQuiz = (btnName, collectionName, filedName) => {
  btnName.addEventListener("click", (e) => {
    questionList.style.display = "none";
    btnStart.style.display = "none";
    var count = 0;
    var ref = firebase.firestore().collection(collectionName);
    ref.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          random: Math.random(),
        });
      });
    });

    quizContainer.innerHTML = "";
    e.preventDefault();
    btnSubmit.textContent = "Send";
    btnSubmit.setAttribute("class", "btn btn-secondary w-25 d-block m-auto");
    btnSubmit.type = "submit";
    btnSubmit.disabled = false;
    let audio = new Audio("/sound/start-computeraif-14572.mp3");
    audio.play();

    tt = null;
    const timer = document.createElement("input");
    if (tt == null) {
      let timeCount = setInterval(() => {
        timer.setAttribute("class", "bg-dark timer");
        timer.value = endTime;
        endTime--;
        document.body.append(timer);

        if (timer.value < 0) {
          clearInterval(timeCount);
          timer.style.display = "none";
        } else if (timer == 0) {
          endTime = true;
        }
      }, 1000);
    }

    db.collection(collectionName)
      .where("fields", "==", filedName)
      .orderBy("random")
      .limit(3)
      .get()
      .then((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          let questionDiv = document.createElement("div");
          questionDiv.setAttribute(
            "class",
            "bg-info w-50 m-auto text-light p-3 mt-3 mb-3 rounded"
          );
          questionDiv.setAttribute("style", "min-Width:200px");
          let doc = change.doc;
          let questions = doc.data();

          let questionP = document.createElement("p");
          questionP.setAttribute("style", "font-size:1.5em");
          questionP.textContent = questions.question;
          questionDiv.append(questionP);
          let answers = questions.answers;
          let name = questions.random;
          answers.forEach((ans, i) => {
            const answerInput = `
            <div class="input-group m-2">
              <div class="input-group-text bg-secondary">
                <input class="form-check-input mt-0 radio" type="radio" value="" name="${name}" id="${i}"  aria-label="Radio button for following text input">
              </div>
              <input type="text" class="form-control" aria-label="Text input with radio button" value="${ans}" disabled>
            </div>`;

            questionDiv.innerHTML += answerInput;
          });

          var radio = document.getElementsByName(name);

          quizContainer.addEventListener("submit", (e) => {
            e.preventDefault();
            wholePage.style.display = "none";
            let endTimer = document.querySelector(".timer");
            endTimer.style.display = "none";
            if (endTime < 0) {
              wholePage.style.display = "none";
              let h1 = document.createElement("h1");
              h1.innerHTML = "Unfortunately time has expired, please try again";
              h1.setAttribute("class", "text-white text-center");
              document.body.append(h1);

              let audio = new Audio("/sound/fail-144746.mp3");
              audio.play();
            }
            userLocalStorage = localStorage.getItem("user") || null;

            // counting right answers
            radio.forEach((el) => {
              el.disabled = true;
              if (el.checked == true && el.id == questions.rightAnaswer) {
                counterSession += 1;
                console.log(counterSession);
                count++;
                console.log(count);
                resultText.textContent = counterSession;
                results.style.display = "block";
                video.style.display = "block";

                let audio = new Audio(
                  "/sound/015493_confetti-rustlewav-54075.mp3"
                );
                audio.play();
                let timer = setTimeout(() => {
                  audio.pause();
                }, 3000);

                db.doc(`user/${userLocalStorage}`)
                  .get()
                  .then((doc) => {
                    let curUser = doc.data();
                    let perviousScor = curUser.scor;

                    let nextScor = perviousScor + count;

                    db.doc(`user/${userLocalStorage}`).update({
                      scor: nextScor,
                    });
                  });
              } else {
                resultText.textContent = counterSession;
                results.style.display = "block";
              }
            });
          });
          quizContainer.append(questionDiv);
          quizContainer.append(btnSubmit);
          quizQuestions.append(quizContainer);
          quizContainer.setAttribute("class", "bg-light w-75 m-auto p-3");
          quizQuestions.setAttribute("class", "bg-secondary mt-4");
        });
      });
  });
};
createQuiz(btnArt, "quiz", "art");
createQuiz(btnScience, "quiz", "science");
createQuiz(btnVisitor, "quiz", "visitor");

//display images for avatar

inputAvatar.addEventListener("click", function () {
  modalAvatar.style.display = "none";
  let images = [
    "/image/cat.webp",
    "/image/dandelion-1363238_1280.jpg",
    "/image/goku.jpg",
    "/image/head-2952533_640.webp",
    "/image/man-303792_1280.webp",
    "/image/meteor-147891_1280.png",
    "/image/pokemon.webp",
    "image/children-4967808_1280.jpg",
    "image/fox-3166166_1280.webp",
    "image/smurf-5009586_1280.png",
    "image/unicorn-3637428_1280.webp",
    "image/witch-1456313_1280.webp",
  ];
  let radio = document.createElement("div");
  radio.setAttribute("class", "d-inline");
  containerImmages.innerHTML = "";
  for (let i = 0; i < images.length; i++) {
    let avatarRadio = `

    <div class="input-group w-50 m-auto">
        <div class="input-group-text w-25 p-1">
          <input class="form-check-input mt-0 p-2" type="radio" value="${images[i]}" name="avatar" aria-label="Radio button for following text input">
        </div>
        <img src="${images[i]}" alt="${i}.avatar" class="w-75">
    </div>

    `;

    radio.innerHTML += avatarRadio;
  }

  containerImmages.append(radio);
});
buttonAddAvatar.addEventListener("click", function () {
  let radio = document.querySelectorAll("input[type=radio]");

  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked == true) {
      let radioSrc = radio[i].parentNode.parentNode.childNodes[3].src;
      let image = document.getElementById("image");
      image.value = radioSrc;
    }
  }
});

//Log in and retake quiz

logInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let username1 = this.username.value;
  let password1 = this.password.value;

  db.collection("user")
    .where("username", "==", username1)
    .where("password", "==", password1)
    .get()
    .then((snapshot) => {
      let changes = snapshot.docChanges();
      let size = snapshot.size;

      changes.forEach((change) => {
        let doc = change.doc;
        let user = doc.data();
        nameU.textContent = user.username;

        if (size > 0) {
          logInForm.style.display = "none";
          btnStart.style.display = "block";
          let current = doc.id;

          localStorage.setItem("user", current);
          let divInner = document.createElement("div");

          let carouselItem = `
        <img
          style="width: 200px; height: 200px; border-radius: 50%; background-color: blue"
          src="/image/${user.image}"
          class="d-block m-auto border border-5 border-info"
          alt="image${user.username}"
        />
      `;
          let name = `
          <span class="badge rounded-pill bg-info m-auto d-block position-relative" style="width:100px;">${user.username}
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
     ${user.scor}
  
        </span>
          </span>
          `;

          divInner.innerHTML = carouselItem + name;
          carouselInner.append(divInner);
        }
      });
    })
    .catch();
  const collectionRef = db.collection("user");
  const query = collectionRef
    .where("username", "==", username1)
    .where("password", "==", password1);

  query
    .get()
    .then((querySnapshot) => {
      const countEl = querySnapshot.size;
      if (countEl == 0) {
        logInForm.reset();
        let errorMesage = document.createElement("div");
        errorMesage.setAttribute(
          "class",
          "alert alert-danger w-50 m-auto mt-3"
        );
        errorMesage.setAttribute("role", "alert");
        errorMesage.textContent =
          "Username or password is wrong, please try again or create an account if you don't have one.";
        document.body.append(errorMesage);
        let alert = setTimeout(() => {
          errorMesage.style.display = "none";
        }, 10000);
        logInForm.style.display = "block";
        btnStart.style.display = "none";
      }
    })
    .catch((error) => {});
});
