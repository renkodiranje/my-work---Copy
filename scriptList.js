const article = document.querySelector("article");
const ol = document.createElement("ol");
var userLocalStorage = localStorage.getItem("user") || null;
ol.setAttribute("class", "border border-1 m-auto rounded bg-dark mt-3 mb-3");
db.collection("user")
  .orderBy("scor", "desc")
  .get()
  .then((snapshot) => {
    let changes = snapshot.docChanges();
    var number = 1;
    changes.forEach((change) => {
      let doc = change.doc;
      let user = doc.data();

      if (doc.id == userLocalStorage) {
        let medal = document.createElement("i");
        let text = document.createElement("span");
        text.textContent = "congratulations!";
        medal.setAttribute("class", "fa fa-trophy");
        let message = document.createElement("span");
        message.setAttribute("class", "message");
        message.textContent = `Hello ${user.username}, you have earned ${user.scor} points and are taking a ${number}. place on the leaderboard.`;
        if (number == 1) {
          message.append(text, medal);
          document.body.append(message);
          let timer = setTimeout(() => {
            message.style.display = "none";
          }, 7000);
          let audio = new Audio("/sound/short-crowd-cheer-6713.mp3");
          audio.play();
        } else {
          document.body.append(message);
          let timer = setTimeout(() => {
            message.style.display = "none";
          }, 5000);
          let audio = new Audio("/sound/notifications-sound-127856.mp3");
          audio.play();
        }
      } else {
        number++;
      }

      let li = document.createElement("li");

      li.setAttribute("class", "p-2");
      let spanUser = document.createElement("span");
      let spanScor = document.createElement("span");
      spanScor.setAttribute("class", "badge rounded-pill bg-info");
      spanScor.textContent = user.scor;
      spanUser.textContent = user.username;
      let img = document.createElement("img");
      img.style.background = "white";
      img.src = `${user.image}`;
      img.alt = `${user.username}`;
      li.append(spanUser, img, spanScor);
      ol.append(li);
    });
    let winner = document.querySelector("ol li:first-of-type");
    let cup = document.createElement("i");
    cup.setAttribute("class", "fa fa-trophy");
    cup.setAttribute("aria-hidden", "true");

    winner.append(cup);
  })
  .catch();
article.append(ol);
