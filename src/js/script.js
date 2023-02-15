import "../index";
import "../css/style";
import $ from "../lib/lib";

console.log("hello!");

const h1 = $("h1").hide().show("flex");
// const h1 = $("h1").show();
console.log(h1);
