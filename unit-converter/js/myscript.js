const conversionType = document.getElementById('conversionType');
        const fromUnit = document.getElementById('fromUnit');
        const toUnit = document.getElementById('toUnit');
        const fromValue = document.getElementById('fromValue');
        const toValue = document.getElementById('toValue');
        const swapBtn = document.getElementById('swapBtn');

        const conversionTypes = ['Length', 'Area', 'Volume', 'Weight', 'Temperature', 'Time', 'Speed'];
        let currentTypeIndex = 0;

        const unitTypes = {
            Length: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
            Area: ['Square Meter', 'Square Kilometer', 'Square Centimeter', 'Square Millimeter', 'Hectare', 'Acre', 'Square Mile', 'Square Yard', 'Square Foot', 'Square Inch'],
            Volume: ['Cubic Meter', 'Cubic Kilometer', 'Cubic Centimeter', 'Cubic Millimeter', 'Liter', 'Milliliter', 'Gallon', 'Quart', 'Pint', 'Cup'],
            Weight: ['Kilogram', 'Gram', 'Milligram', 'Metric Ton', 'Pound', 'Ounce', 'Carat', 'Stone'],
            Temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
            Time: ['Second', 'Minute', 'Hour', 'Day', 'Week', 'Month', 'Year', 'Decade', 'Century'],
            Speed: ['Meter per Second', 'Kilometer per Hour', 'Mile per Hour', 'Foot per Second', 'Knot']
        };

        conversionType.addEventListener('change', () => {
            currentTypeIndex = conversionTypes.indexOf(conversionType.value);
            updateTypeSelector();
            populateUnits();
        });

        function updateTypeSelector() {
            conversionType.value = conversionTypes[currentTypeIndex];
        }

        function populateUnits() {
            const units = unitTypes[conversionTypes[currentTypeIndex]];
            fromUnit.innerHTML = '';
            toUnit.innerHTML = '';
            units.forEach((unit, index) => {
                fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
                toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            });
            // Set default units for Length conversion
            if (conversionType.value === 'Length') {
                fromUnit.value = 'Meter';
                toUnit.value = 'Centimeter';
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
                toValue.value = '';
                return;
            }

            if (from === to) {
                toValue.value = value;
                return;
            }

            // Placeholder conversion logic for now
            toValue.value = (value * 2).toFixed(2);
        }

        function swapUnits() {
            [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
            convert();
        }

        swapBtn.addEventListener('click', swapUnits);
        fromUnit.addEventListener('change', convert);
        toUnit.addEventListener('change', convert);
        fromValue.addEventListener('input', convert);

        updateTypeSelector();
        populateUnits();