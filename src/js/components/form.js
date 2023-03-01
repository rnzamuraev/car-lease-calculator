import { inputRange } from "./inputRange";
// import mask from "./mask.js";
import { submitForm } from "./submitForm";

export function form() {
  const form = document.querySelector(".calc__form");
  const inputsForm = form.querySelectorAll("input");
  const creditInput = inputsForm[0];
  const contributionInput = inputsForm[2];
  const termInput = inputsForm[4];
  const creditRange = inputsForm[1];
  const contributionRange = inputsForm[3];
  const termRange = inputsForm[5];
  const formSum = inputsForm[6];
  const formPayment = inputsForm[7];

  // mask(creditInput);

  // Получаем сумма договора лизинга
  function getSum() {
    contributionInput.value =
      (creditInput.value / 100) * contributionRange.value;
    console.log(formPayment.value);
    console.log(+formPayment.value.slice(0, -2));
    const sum =
      +contributionInput.value +
      +termInput.value * +formPayment.value.slice(0, -2);

    if (isNaN(sum)) {
      formSum.value = 0 + " ₽";
    } else if (sum < 0) {
      formPayment.value = 0 + " ₽";
    } else {
      formSum.value = sum + " ₽";
    }
  }

  // Получаем ежемесячный платеж от
  function getPayment() {
    const payment = Math.round(
      ((+creditInput.value - +contributionInput.value) *
        (0.05 * Math.pow(1 + 0.05, +termInput.value))) /
        (Math.pow(1 + 0.05, termInput.value) - 1)
    );

    if (payment === Infinity) {
      console.log("Infinity");
      formPayment.value = 0 + " ₽";
    } else if (isNaN(payment)) {
      console.log("isNaN(payment)");
      formPayment.value = 0 + " ₽";
    } else if (payment < 0) {
      console.log("payment < 0");
      formPayment.value = 0 + " ₽";
    } else {
      formPayment.value = payment + " ₽";
    }
    getSum();
  }

  getPayment();

  // Отключаем событие submit по кнопке Enter
  function keydownEnter(e) {
    console.log(e.key);
    if (e.target.classList.contains("form__input-input")) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.target.blur();
      }
    }
  }

  function getInputValue(e) {
    console.log(e.target.value);

    handlerFormInputRange(e);

    handlerFormInputValue(e);

    // mask(".form__input-value");
    getPayment();
  }

  // Обработчик input-range значения
  function handlerFormInputRange(e) {
    if (e.target.classList.contains("form__input-range")) {
      const prevElement = e.target.previousElementSibling;
      const input = prevElement.querySelector("input");
      const span = prevElement.querySelector("span");

      if (input.name === "contribution") {
        span.textContent = e.target.value + "%";
        contributionInput.value =
          (creditInput.value / 100) * e.target.value;
      } else {
        // mask(input);
        input.value = e.target.value;
      }

      if (input.name === "credit") {
        contributionInput.value =
          (input.value / 100) * inputsForm[3].value;
      }
    }
  }

  // Обработчик введенного значения в input
  function handlerFormInputValue(e) {
    if (e.target.classList.contains("form__input-input")) {
      const range = e.target.parentNode.nextElementSibling;
      const min = range.min;
      const max = range.max;

      if (e.type === "input") {
        if (e.target.name !== "contribution") {
          // let a = e.target.value.replace(/\ /g, "");
          // console.log("replace", a);
          // range.value = +e.target.value.replace(/\ /g, "");
          range.value = e.target.value;
          // если поле ввода равно "", Range = своему минимальному значению
          if (e.target.value == "") {
            range.value = +min;
          }

          // console.log(max.length + 2);
          // if (e.target.value.length > max.length + 2) {
          //   e.target.value = e.target.value.slice(
          //     0,
          //     max.length + 2
          //   );
          // }
          console.log(max.length);
          if (e.target.value.length > max.length) {
            e.target.value = e.target.value.slice(
              0,
              max.length
            );
          }

          if (e.target.name === "credit") {
            const contribution =
              (e.target.value / 100) *
              +contributionInput.parentNode
                .nextElementSibling.value;

            contributionInput.value =
              Math.round(contribution);

            // mask(e, e.target);
          }
        } else {
          // range.value = slice(
          //   Math.round(
          //     e.target.value / (creditInput.value / 100)
          //   )
          // );
          // let contribution = e.target.value.slice(
          //   0,
          //   creditInput.value.length - 1
          // );
          // e.target.value = contribution;
          let maxLength = (creditInput.value / 100) * max;
          e.target.value = e.target.value.slice(
            0,
            String(maxLength).length
          );

          range.value = Math.round(
            e.target.value / (creditInput.value / 100)
          );

          e.target.nextElementSibling.textContent =
            range.value + "%";
        }
      }

      if (e.type === "blur") {
        console.log(min);
        if (e.target.name !== "contribution") {
          e.target.value = range.value;
          console.log(
            contributionInput.parentNode.nextElementSibling
              .value
          );
          if (e.target.name === "credit") {
            contributionInput.value =
              (e.target.value / 100) *
              contributionInput.parentNode
                .nextElementSibling.value;
          }
        } else {
          e.target.value =
            (creditInput.value / 100) * range.value;
          console.log("contribution");
        }
      }

      inputRange();
    }
  }

  // событие по кнопке клавиатуры
  document.addEventListener("keydown", (e) => {
    keydownEnter(e);
  });

  // Ослеживаем события в input
  inputsForm.forEach((input) => {
    // input.addEventListener("focus", (e) => {
    //   console.log("focusInput", e.target.value);
    //   getInputValue(e);
    // });
    // input.addEventListener("beforeinput", (e) => {
    //   console.log("beforeinput", e.target.value);
    //   getInputValue(e);
    // });
    input.addEventListener("input", (e) => {
      console.log("nextValue", e.target.value);
      getInputValue(e);
    });
    input.addEventListener("blur", (e) => {
      console.log("blurValue", e.target.value);
      getInputValue(e);
    });
  });

  // Ослеживаем событие submit
  form.addEventListener("submit", (e) =>
    // Отправка формы на почту
    submitForm(e, form)
  );
}
