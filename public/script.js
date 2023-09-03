const inputUrl = document.getElementById("input-url");
const inputMaxWidth = parseFloat(window.getComputedStyle(inputUrl).maxWidth);
const btnGenerate = document.getElementById("btn-generate");

function generateQRCode() {
  if (!inputUrl.checkValidity()) {
    alert("Input a valid url");
    return;
  }

  const qrcodeContainer = document.getElementById("container-qrcode");
  qrcodeContainer.innerHTML = "";

  new QRCode(qrcodeContainer, {
    text: inputUrl.value,
    width: 128,
    height: 128,
    correctLevel: QRCode.CorrectLevel.H,
  });

  document.getElementById("qrcode-container").style.display = "block";
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

btnGenerate.addEventListener("click", (e) => {
  e.preventDefault();
  generateQRCode();
});
