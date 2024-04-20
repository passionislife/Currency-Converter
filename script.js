url = `https://open.er-api.com/v6/latest/USD`;
let convert;
let promise = fetchData(url, "INR").then((rate) => {
  convert = rate;
});
async function fetchData(url, val) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.rates[val];
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

//Render Dynamic List
const selectElementFrom = document.getElementById("from");
const selectElementTo = document.getElementById("to");
for (const currencyCode in countryList) {
  if (countryList.hasOwnProperty(currencyCode)) {
    const countryCode = countryList[currencyCode];
    const option = document.createElement("option");
    option.value = countryCode;
    option.text = currencyCode;
    selectElementFrom.appendChild(option);
  }
}
for (const currencyCode in countryList) {
  if (countryList.hasOwnProperty(currencyCode)) {
    const countryCode = countryList[currencyCode];
    const option = document.createElement("option");
    option.value = countryCode;
    option.text = currencyCode;
    selectElementTo.appendChild(option);
  }
}

selectElementFrom.value = "US";
selectElementTo.value = "IN";
let fromFlag = "US";
let toFlag = "IN";
let fromFlagVal = "USD";
let toFlagVal = "INR";

//Dynamic Flag
selectElementFrom.addEventListener("change", function () {
  fromFlag = selectElementFrom.value;
  fromFlagVal = selectElementFrom.options[selectElementFrom.selectedIndex].text;
  url = `https://open.er-api.com/v6/latest/${fromFlagVal}`;
  document
    .getElementById("fromFlag")
    .setAttribute("src", `https://flagsapi.com/${fromFlag}/flat/64.png`);
});

//Dynamic Flag
selectElementTo.addEventListener("change", function () {
  toFlag = selectElementTo.value;
  toFlagVal = selectElementTo.options[selectElementTo.selectedIndex].text;
  document
    .getElementById("toFlag")
    .setAttribute("src", `https://flagsapi.com/${toFlag}/flat/64.png`);
});

//Submit Button
let calc = document.getElementById("calc");
calc.addEventListener("click", async () => {
  try {
    let rate = await fetchData(url, toFlagVal);
    let convert = rate;

    let calculate = parseInt(document.getElementById("convert").value);
    document.getElementById("converted").innerText = (
      convert * calculate
    ).toFixed(2);
  } catch (error) {
    console.error("Error:", error);
  }
});
