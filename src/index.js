import _ from "lodash";
import "sanitize.css";
import "./scss/app.scss";
import Logo from "./images/logo.png";
import DATA from "./data.json";
import printMe from "./print";

if (process.env.NODE_ENV !== "production") {
  console.log(
    "%c App running in development mode",
    "background: red; color: white; font-weight: bold"
  );
}

console.log(DATA);

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "Webpack"], " ");
  element.classList.add("hello");

  const logo = new Image();
  logo.src = Logo;

  element.appendChild(logo);

  btn.innerHTML = "Click me and check console";
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

let element = component();
document.body.appendChild(element);

// webpack HMR
if (module.hot) {
  module.hot.accept("./print.js", () => {
    console.log("Accepting the update printMe module");

    document.body.removeChild(element);
    element = component(); // re-render the 'component' to update the click handler
    document.body.appendChild(element);
  });
}
