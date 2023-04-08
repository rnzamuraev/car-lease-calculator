export function getNums(elem, round) {
  if (round === "round") {
    return elem.value.replace(/[^.\d]/g, "");
  } else {
    return elem.value.replace(/\D/g, "");
  }
}
