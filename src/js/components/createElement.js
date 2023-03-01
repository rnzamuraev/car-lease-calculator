export function createElement(value, elem) {
  console.log("value: " + value, "elem: " + elem);
  const span = document.createElement("span");
  console.log(span.offsetWidth + "px");

  span.classList.add("input-sum");
  console.log(span.offsetWidth + "px");

  span.textContent = value;
  console.log(span.offsetWidth + "px");

  if (elem.parentNode.appendChild) {
    elem.parentNode.appendChild(span);
  } else {
    elem.parentNode.append(span);
  }
  console.log(
    getComputedStyle(span).getPropertyValue("width")
  );
  console.log(span.offsetWidth + "px");

  // const widthSpan = span.offsetWidth + "px";
  const widthSpan = span.clientWidth + "px";
  console.log(elem.nextElementSibling);
  elem.nextElementSibling.style.left = widthSpan;

  elem.style.width = widthSpan;
  console.log("Ширина элемента span: " + widthSpan);
  console.log("Ширина элемента: " + elem.style.width);
  span.remove();
  return span.offsetWidth;
}
