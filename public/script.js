const inputUrl = document.getElementById("input-url");
const inputMaxWidth = parseFloat(window.getComputedStyle(inputUrl).maxWidth);
const form = document.getElementById("form");

function generateQRCode() {
  if (!inputUrl.checkValidity()) {
    alert("Input a valid url");
    return;
  }

  const qrcodeContainer = document.getElementById("container-qrcode");
  qrcodeContainer.innerHTML = "";

  const url = "http://localhost:8888/qr?url=" + inputUrl.value;
  console.log(url);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      qrcodeContainer.innerHTML = data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function getTextWidth(text) {
  const tempInput = document.createElement("span");
  tempInput.style.visibility = "hidden";
  tempInput.style.position = "absolute";
  tempInput.style.whiteSpace = "nowrap";
  tempInput.innerText = text;
  document.body.appendChild(tempInput);
  const width = tempInput.offsetWidth;
  document.body.removeChild(tempInput);
  return width;
}

function getWidthPercentage(element, parent) {
  const elementWidth = element.getBoundingClientRect().width;
  const parentWidth = parent.getBoundingClientRect().width;

  return Math.floor((elementWidth / parentWidth) * 100);
}

inputUrl.addEventListener("input", (e) => {
  const defaultWidth = "20%";
  const width = getTextWidth(inputUrl.value) + 10;
  inputUrl.style.width = width <= 10 ? defaultWidth : width + "px";

  const widthPercentage = getWidthPercentage(
    inputUrl,
    document.getElementById("form")
  );

  if (widthPercentage == inputMaxWidth) {
    inputUrl.value = inputUrl.value.substring(0, inputUrl.value.length - 1);
    alert("Input width exceeded the maximum allowed.");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  generateQRCode();
});

window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
});
