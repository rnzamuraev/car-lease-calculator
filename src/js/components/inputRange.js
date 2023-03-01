export function inputRange() {
  for (let e of document.querySelectorAll(
    'input[type="range"].range-progress'
  )) {
    // console.log(e);
    e.style.setProperty("--value", e.value);
    e.style.setProperty("--min", e.min == "" ? "0" : e.min);
    e.style.setProperty(
      "--max",
      e.max == "" ? "100" : e.max
    );
    e.addEventListener("input", () => {
      console.log(e);
      return e.style.setProperty("--value", e.value);
    });
  }
}
