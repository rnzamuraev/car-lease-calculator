export function mask(selector) {
  let matrix = "___ ___ ___ ___";

  function getMatrix(elem) {
    const arr = elem.value.split(".");
    const num = arr[0].replace(/\D/g, "");
    let counter = 0;

    for (let i = 1; i <= num.length; i++) {
      counter++;
      if ((i + 1) % 4 === 0) {
        counter++;
      }
    }

    return matrix.slice(-counter).trim();
  }

  function createMask(elem) {
    let i = 0;
    let val = elem.value.replace(/\D/g, "");
    matrix = getMatrix(elem);

    elem.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
  }

  if (selector.nodeName) {
    createMask(selector);
  } else if (selector.length) {
    selector.forEach((elem) => {
      createMask(elem);
    });
  }
}
