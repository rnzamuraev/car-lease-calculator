export function mask(selector) {
  function getMatrix(elem) {
    let matrix = "";
    const arr = elem.value.split(".");

    const num = arr[0].replace(/\D/g, "");
    const b = arr[1] ? arr[1] : 0;

    for (let i = 0; i < num.length; i++) {
      if (num.length === 1) {
        matrix = "_";
      } else if (num.length === 2) {
        matrix = "__";
      } else if (num.length === 3) {
        matrix = "___";
      } else if (num.length === 4) {
        matrix = "_ ___";
      } else if (num.length === 5) {
        matrix = "__ ___";
      } else if (num.length === 6) {
        matrix = "___ ___";
      } else if (num.length === 7) {
        matrix = "_ ___ ___";
      } else if (num.length === 8) {
        matrix = "__ ___ ___";
      } else if (num.length >= 9) {
        matrix = "___ ___ ___";
      }
    }

    return matrix;
  }

  function createMask(elem) {
    let matrix = getMatrix(elem),
      i = 0,
      val = elem.value.replace(/\D/g, "");

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
