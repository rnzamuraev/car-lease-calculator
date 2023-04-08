export function inputRange() {
  const inputsRange = document.querySelectorAll('input[type="range"].range-progress');
  for (let elem of inputsRange) {
    elem.style.setProperty("--value", elem.value);
    elem.style.setProperty("--min", elem.min == "" ? "0" : elem.min);
    elem.style.setProperty("--max", elem.max == "" ? "100" : elem.max);
    elem.addEventListener("input", () => {
      return elem.style.setProperty("--value", elem.value);
    });
  }
}
