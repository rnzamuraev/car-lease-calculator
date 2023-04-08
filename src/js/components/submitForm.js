export function submitForm(e, form) {
  e.preventDefault();

  const url = "sendMail.php";

  const setData = form.querySelectorAll("input[name]");
  let obj = {};

  setData.forEach((input) => {
    obj[input.name] = input.value;
  });

  alert(JSON.stringify(obj));

  const formData = new FormData(form);

  getPost(url, formData)
    .then((data) => console.log("Sucsess", data))
    .catch((err) => {
      console.log(err);
    });

  async function getPost(url, dataForm) {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(dataForm),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }
}
