document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const countryInput = document.getElementById("countryInput");
    const results = document.getElementById("results");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const geoBtn = document.getElementById("geoBtn");

    // Dark Mode Toggle
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Show Loading
    function showLoading() {
        results.innerHTML = `<p>🔄 Fetching data, please wait...</p>`;
    }

    // Fetch Weather (Open-Meteo, no API key)
    async function fetchWeather(lat, lon) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data.current_weather || null;
        } catch {
            return null;
        }
    }

    // Fetch Country (RestCountries API)
    async function fetchCountry(countryName) {
        if (!countryName) {
            results.innerHTML = `<p>⚠️ Please enter a country name</p>`;
            return;
        }
        showLoading();
        const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (!data || data.status === 404) {
                results.innerHTML = `<p>❌ Country not found</p>`;
                return;
            }

            const exactMatch = data.find(
                c => c.name.common.toLowerCase() === countryName.toLowerCase()
            );

            if (exactMatch) {
                const capital = exactMatch.capital ? exactMatch.capital[0] : null;
                const lat = exactMatch.capitalInfo?.latlng?.[0];
                const lon = exactMatch.capitalInfo?.latlng?.[1];

                let weather = null;
                if (lat && lon) {
                    weather = await fetchWeather(lat, lon);
                }
                displayResults(exactMatch, weather);
            } else {
                const suggestions = data.slice(0, 5).map(c => c.name.common);
                results.innerHTML = `
                  <p>No exact match found. Did you mean:</p>
                  <ul>
                    ${suggestions.map(c => `<li><button class="suggestion">${c}</button></li>`).join("")}
                  </ul>
                `;
                document.querySelectorAll(".suggestion").forEach(btn => {
                    btn.addEventListener("click", () => fetchCountry(btn.textContent));
                });
            }
        } catch {
            results.innerHTML = `<p>⚠️ Error fetching country data. Please try again later.</p>`;
        }
    }

    // Geolocation handler
    geoBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            showLoading();
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const weather = await fetchWeather(latitude, longitude);

                    // Fetch country details using reverse lookup
                    const countryRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const countryData = await countryRes.json();

                    if (countryData && countryData.address && countryData.address.country_code) {
                        const countryAlpha2 = countryData.address.country_code.toUpperCase();
                        const countryInfoRes = await fetch(`https://restcountries.com/v3.1/alpha/${countryAlpha2}`);
                        const countryInfo = await countryInfoRes.json();
                        displayResults(countryInfo[0], weather);
                    } else {
                        results.innerHTML = "<p>Could not fetch location data.</p>";
                    }
                } catch {
                    results.innerHTML = "<p>Error fetching geolocation data.</p>";
                }
            }, () => {
                results.innerHTML = "<p>Permission denied or location unavailable.</p>";
            });
        } else {
            alert("Geolocation not supported in your browser.");
        }
    });

    // Display Results
    function displayResults(country, weather) {
        results.innerHTML = `
          <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
          <h2>${country.name.common}</h2>
          <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          ${weather ? `
            <p><strong>Weather in ${country.capital ? country.capital[0] : "your location"}:</strong> ${weather.temperature}°C, Windspeed ${weather.windspeed} km/h</p>
          ` : `<p>🌥️ Weather data not available</p>`}
        `;
    }

    // Event Listeners
    searchBtn.addEventListener("click", () => fetchCountry(countryInput.value.trim()));
    countryInput.addEventListener("keypress", e => {
        if (e.key === "Enter") searchBtn.click();
    });
});

