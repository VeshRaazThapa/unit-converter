const conversionType = document.getElementById("conversionType");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const fromValue = document.getElementById("fromValue");
const toValue = document.getElementById("toValue");
const swapBtn = document.getElementById("swapBtn");

const conversionTypes = [
  "Length",
  "Area",
  "Volume",
  "Weight",
  "Temperature",
  "Time",
  "Speed",
];
let currentTypeIndex = 0;

const unitTypes = {
  Length: [
    "Meter",
    "Kilometer",
    "Centimeter",
    "Millimeter",
    "Mile",
    "Yard",
    "Foot",
    "Inch",
  ],
  Area: [
    "Square Meter",
    "Square Kilometer",
    "Square Centimeter",
    "Square Millimeter",
    "Hectare",
    "Acre",
    "Square Mile",
    "Square Yard",
    "Square Foot",
    "Square Inch",
  ],
  Volume: [
    "Cubic Meter",
    "Cubic Kilometer",
    "Cubic Centimeter",
    "Cubic Millimeter",
    "Liter",
    "Milliliter",
    "Gallon",
    "Quart",
    "Pint",
    "Cup",
  ],
  Weight: [
    "Kilogram",
    "Gram",
    "Milligram",
    "Metric Ton",
    "Pound",
    "Ounce",
    "Carat",
    "Stone",
  ],
  Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  Time: [
    "Second",
    "Minute",
    "Hour",
    "Day",
    "Week",
    "Month",
    "Year",
    "Decade",
    "Century",
  ],
  Speed: [
    "Meter per Second",
    "Kilometer per Hour",
    "Mile per Hour",
    "Foot per Second",
    "Knot",
  ],
};

conversionType.addEventListener("change", () => {
  currentTypeIndex = conversionTypes.indexOf(conversionType.value);
  updateTypeSelector();
  populateUnits();
});

function updateTypeSelector() {
  conversionType.value = conversionTypes[currentTypeIndex];
}

function populateUnits() {
  const units = unitTypes[conversionTypes[currentTypeIndex]];
  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";
  units.forEach((unit, index) => {
    fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
  });
  // Set default units for Length conversion
  if (conversionType.value === "Length") {
    fromUnit.value = "Meter";
    toUnit.value = "Centimeter";
  } else {
    toUnit.selectedIndex = 1;
  }
  convert();
}

function convert() {
  const from = fromUnit.value;
  const to = toUnit.value;
  const value = parseFloat(fromValue.value);

  if (isNaN(value)) {
    toValue.value = "";
    return;
  }

  const conversionFactors = {
    Length: {
      Meter: 1,
      Kilometer: 1000,
      Centimeter: 0.01,
      Millimeter: 0.001,
      Mile: 1609.34,
      Yard: 0.9144,
      Foot: 0.3048,
      Inch: 0.0254,
    },
    Area: {
      "Square Meter": 1,
      "Square Kilometer": 1e6,
      "Square Centimeter": 0.0001,
      "Square Millimeter": 1e-6,
      Hectare: 10000,
      Acre: 4046.86,
      "Square Mile": 2.59e6,
      "Square Yard": 0.836127,
      "Square Foot": 0.092903,
      "Square Inch": 0.00064516,
    },
    Volume: {
      "Cubic Meter": 1,
      "Cubic Kilometer": 1e9,
      "Cubic Centimeter": 1e-6,
      "Cubic Millimeter": 1e-9,
      Liter: 0.001,
      Milliliter: 1e-6,
      Gallon: 0.00378541,
      Quart: 0.000946353,
      Pint: 0.000473176,
      Cup: 0.00024,
    },
    Weight: {
      Kilogram: 1,
      Gram: 0.001,
      Milligram: 1e-6,
      "Metric Ton": 1000,
      Pound: 0.453592,
      Ounce: 0.0283495,
      Carat: 0.0002,
      Stone: 6.35029,
    },
    Temperature: {
      Celsius: (val, to) =>
        to === "Fahrenheit" ? (val * 9) / 5 + 32 : val + 273.15,
      Fahrenheit: (val, to) =>
        to === "Celsius" ? ((val - 32) * 5) / 9 : ((val - 32) * 5) / 9 + 273.15,
      Kelvin: (val, to) =>
        to === "Celsius" ? val - 273.15 : ((val - 273.15) * 9) / 5 + 32,
    },
    Time: {
      Second: 1,
      Minute: 60,
      Hour: 3600,
      Day: 86400,
      Week: 604800,
      Month: 2.628e6,
      Year: 3.154e7,
      Decade: 3.154e8,
      Century: 3.154e9,
    },
    Speed: {
      "Meter per Second": 1,
      "Kilometer per Hour": 0.277778,
      "Mile per Hour": 0.44704,
      "Foot per Second": 0.3048,
      Knot: 0.514444,
    },
  };

  const conversionType = conversionTypes[currentTypeIndex];

  if (conversionType === "Temperature") {
    toValue.value = conversionFactors[conversionType][from](value, to);
  } else {
    const factorFrom = conversionFactors[conversionType][from];
    const factorTo = conversionFactors[conversionType][to];
    const result = (value * factorFrom) / factorTo;
    toValue.value = result.toFixed(6); // Change 6 to the number of decimal places you want
  }
}

function swapUnits() {
  [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
  convert();
}

swapBtn.addEventListener("click", swapUnits);
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);
fromValue.addEventListener("input", convert);

updateTypeSelector();
populateUnits();
