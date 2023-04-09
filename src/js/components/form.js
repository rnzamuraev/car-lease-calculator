import { inputRange } from "./inputRange";
import { mask } from "./mask.js";
import { submitForm } from "./submitForm";
import { getNums } from "./getNum";

export function form() {
  const form = document.querySelector(".calc__form");
  const inputsForm = form.querySelectorAll("input");
  const creditInput = inputsForm[0];
  const contributionInput = inputsForm[2];
  const termInput = inputsForm[4];
  // const creditRange = inputsForm[1];
  const contributionRange = inputsForm[3];
  // const termRange = inputsForm[5];
  const formSum = inputsForm[6];
  const formPayment = inputsForm[7];

  // Устанивливаем начальное значение первоначального взноса
  contributionInput.value = (getNums(creditInput) / 100) * contributionRange.value;
  // Запускаем маску ввода
  mask(creditInput);
  mask(contributionInput);

  // Получаем сумма договора лизинга
  function getSum() {
    const sum = +getNums(contributionInput) + +getNums(termInput) * +getNums(formPayment);

    if (isNaN(sum)) {
      formSum.value = 0 + " ₽";
    } else if (sum < 0) {
      formPayment.value = 0 + " ₽";
    } else {
      formSum.value = sum;
      mask(formSum);
      formSum.value = formSum.value + " ₽";
    }
  }

  // Получаем ежемесячный платеж от
  function getPayment() {
    const payment = Math.round(
      ((+getNums(creditInput, "round") - +getNums(contributionInput, "round")) *
        (0.05 * Math.pow(1 + 0.05, +getNums(termInput)))) /
        (Math.pow(1 + 0.05, getNums(termInput, "round")) - 1)
    );

    if (payment === Infinity) {
      formPayment.value = 0 + " ₽";
    } else if (isNaN(payment)) {
      formPayment.value = 0 + " ₽";
    } else if (payment < 0) {
      formPayment.value = 0 + " ₽";
    } else {
      formPayment.value = payment;
      mask(formPayment);

      formPayment.value = formPayment.value + " ₽";
    }

    getSum();
  }

  getPayment();

  // Отключаем событие submit по кнопке Enter
  function keydownEnter(e) {
    if (e.target.classList.contains("form__input-input")) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.target.blur();
      }
    }
  }

  // Получаем значения инпутов
  function getInputValue(e) {
    handlerFormInputRange(e);
    handlerFormInputValue(e);
    getPayment();
    mask(contributionInput);
  }

  // Обработчик input-range значения
  function handlerFormInputRange(e) {
    if (e.target.classList.contains("form__input-range")) {
      const prevElement = e.target.previousElementSibling;
      const input = prevElement.querySelector("input");
      const span = prevElement.querySelector("span");

      if (input.name === "contribution") {
        span.textContent = getNums(e.target) + "%";
        contributionInput.value = (getNums(creditInput) / 100) * getNums(e.target);
      } else {
        input.value = e.target.value;
      }

      if (input.name === "credit") {
        contributionInput.value = (getNums(input) / 100) * inputsForm[3].value;
      }
      mask(input);
    }
  }

  // Обработчик введенного значения в input
  function handlerFormInputValue(e) {
    if (e.target.classList.contains("form__input-input")) {
      const range = e.target.parentNode.nextElementSibling;
      const min = range.min;
      const max = range.max;
      let bagePercent;

      if (e.type === "input") {
        if (e.target.name !== "contribution") {
          range.value = +getNums(e.target);

          if (e.target.value == "") {
            range.value = +min;
          }

          if (getNums(e.target).length > max.length) {
            const targetVal = getNums(e.target).slice(0, max.length);
            e.target.value = targetVal;
          }

          if (e.target.name === "credit") {
            const contributionRange = contributionInput.parentNode.nextElementSibling.value;
            const contribution = (getNums(e.target, "round") / 100) * +contributionRange;

            contributionInput.value = Math.round(contribution);
          }
        } else {
          const contributionPercent = Math.round(
            getNums(e.target, "round") / (getNums(creditInput, "round") / 100)
          );
          const maxContributionValue = (getNums(creditInput) / 100) * max;
          bagePercent = e.target.nextElementSibling;

          e.target.value = getNums(e.target);

          if (contributionPercent <= 0) {
            range.value = 0;
            bagePercent.textContent = 0 + "%";
            return;
          }

          if (+getNums(e.target) > maxContributionValue) {
            const targetVal = maxContributionValue;
            e.target.value = targetVal;
            range.value = max;
            bagePercent.textContent = max + "%";
            inputRange();
            return;
          }

          range.value = contributionPercent;
          bagePercent.textContent = contributionPercent + "%";
        }
      }

      if (e.type === "blur") {
        if (e.target.name !== "contribution") {
          e.target.value = range.value;
          if (e.target.name === "credit") {
            contributionInput.value =
              (getNums(e.target) / 100) * contributionInput.parentNode.nextElementSibling.value;
          }
        } else {
          e.target.value = (getNums(creditInput) / 100) * range.value;
          bagePercent = e.target.nextElementSibling;
          bagePercent.textContent =
            Math.round(getNums(e.target, "round") / (getNums(creditInput, "round") / 100)) + "%";
        }
      }

      inputRange();
      mask(e.target);
    }
  }

  // Ослеживаем событие по кнопке Enter
  document.addEventListener("keydown", (e) => {
    keydownEnter(e);
  });

  // Ослеживаем события в input
  inputsForm.forEach((input) => {
    input.addEventListener("input", (e) => {
      getInputValue(e);
    });
    input.addEventListener("blur", (e) => {
      getInputValue(e);
    });
  });

  // Ослеживаем событие submit
  form.addEventListener("submit", (e) =>
    // Отправка формы на почту
    submitForm(e, form)
  );
}
