let display = (x) => {
  let star = document.createElement("img");
  star.src = "/image/dandelion-335222_1280.png";
  star.alt = "dandelion";
  star.classList.add(x);
  let body = document.getElementById("bd");
  body.prepend(star);
  if (window.innerWidth > 720) {
    let audio = new Audio("/sound/summerwind-and-crickets-149577.mp3");
    audio.play();
  } else {
    let audio = new Audio("/sound/little-whoosh-2-6301.mp3");
    audio.play();
  }
};

let timer = 0;
if (timer == 0) {
  timer++;
  let set = setTimeout(() => {
    let counter = [0, 1];

    for (let i = 0; i < counter.length; i++) {
      if (i == 0) {
        display("maslacakAnimacija");
      } else if (i == 1) {
        display("maslacakAnimacija1");
      }
    }
  }, 3000);
}
timer = 0;
