const form = document.getElementById("info");
const inputShow = document.getElementById("inputShow");
const inputHide = document.getElementById("inputHide");
const article = document.querySelector("article");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let fields = this.fields.value;
  let question = this.question.value;
  let answer1 = this.answer1.value;
  let answer2 = this.answer2.value;
  let answer3 = this.answer3.value;
  let answers = new Array();
  answers.push(answer1, answer2, answer3);
  let rightAnswer = Number(this.rightAnswer.value - 1);

  let obj = {
    fields: fields,
    question: question,
    answers: answers,
    rightAnaswer: rightAnswer,
  };
  db.collection("quiz")
    .add(obj)
    .then(() => {
      form.reset();
      let success = document.createElement("div");
      success.setAttribute("class", "alert alert-success m-auto");
      success.setAttribute("role", "alert");
      success.textContent =
        "Thank you very much. Your question has been added to the suggestion list, after review I will add selected questions to the quiz.";
      article.append(success);
      let alert = setTimeout(() => {
        success.style.display = "none";
      }, 10000);
    })
    .catch((error) => {
      let errorMesage = document.createElement("div");
      errorMesage.setAttribute("class", "alert alert-warning w-50 m-auto");
      errorMesage.setAttribute("role", "alert");
      errorMesage.textContent = error;
      article.append(errorMesage);
      let alert = setTimeout(() => {
        errorMesage.style.display = "none";
      }, 6000);
    });
  inputHide.style.display = "none";
  inputShow.style.display = "block";
});

// show inputs for posible answers

let showHide = (a, b) => {
  inputHide.style.display = a;
  inputShow.addEventListener("click", () => {
    inputHide.style.display = b;
    inputShow.style.display = a;
  });
};
showHide("none", "block");
