export default function mask(e, selector) {
  function getMatrix(elem) {
    let matrix = "";
const num = elem.replace("_", "");
    console.log(num);
    console.log(num.value);
    console.log(num.value.length);

    for (let i = 0; i < elem.value.length; i++) {
      if (elem.value.length < 4) {
        matrix = "___";
        console.log("i++", "elem.value.length < 4");
      } else if (elem.value.length === 4) {
        matrix = "_ ___";
        console.log("i++", "elem.value.length === 4");
      } else if (elem.value.length === 5) {
        matrix = "__ ___";
        console.log("i++", "elem.value.length === 6");
      } else if (elem.value.length === 6) {
        matrix = "___ ___";
        console.log("i++", "elem.value.length === 7");
      } else if (elem.value.length === 7) {
        matrix = "_ ___ ___";
        console.log("i++", "elem.value.length === 8");
      } else if (elem.value.length >= 8) {
        matrix = "__ ___ ___";
        console.log("i++", "elem.value.length === 10");
      }
    }

    // else if (elem.value.length === 11) {
    //   matrix = "___ ___ ___";
    // }

    console.log(matrix);
    return matrix;
  }

  function createMask(elem) {
    let matrix = getMatrix(elem),
      i = 0,
      val = elem.value.replace(/\D/g, "");
    console.log(matrix);
    console.log(i);
    console.log(val.length);

    elem.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
  }

  createMask(selector);
}
