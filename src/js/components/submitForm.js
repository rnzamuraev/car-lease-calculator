export function submitForm(e, form) {
  // const form = document.querySelector(".calc__form");
  e.preventDefault();

  // const form = document.querySelector(selector);
  const url = "sendMail.php";

  console.log(form.querySelectorAll(".form__input-value"));

  const setData = form.querySelectorAll("input[name]");
  // const setData = form.querySelectorAll(
  //   ".form__input-value"
  // );
  let obj = {};
  console.log(setData);
  console.log(form);

  setData.forEach((input) => {
    obj[input.name] = input.value;
  });
  console.log(obj);

  alert(JSON.stringify(obj));

  // const formData = new FormData(setData);
  const formData = new FormData(form);

  getPost(url, formData)
    .then((data) => console.log("Sucsess", data))
    .catch((err) => {
      console.log(err);
    });

  async function getPost(url, dataForm) {
    console.log(dataForm);
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(dataForm),
      // body: dataForm,
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${url}, status: ${res.status}`
      );
    }

    return await res.json();
  }
}
