document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const countryInput = document.getElementById("countryInput");
    const results = document.getElementById("results");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Dark Mode Toggle
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Show Loading
    function showLoading() {
        results.innerHTML = `<p>🔄 Fetching data, please wait...</p>`;
    }

    // Fetch Weather
    async function fetchWeather(capital, countryCode) {
        if (!capital) return null;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(capital)},${countryCode}&units=metric&appid=${API_KEY}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data.cod === 200 ? data : null;
        } catch {
            return null;
        }
    }

    // Fetch Country
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
                const countryCode = exactMatch.cca2;
                const weather = await fetchWeather(capital, countryCode);
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
    const geoBtn = document.getElementById("geoBtn");

    // Geolocation handler
    geoBtn.addEventListener("click", () => {
        if (navigator.geolocation) {
            showLoading();
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
                    const res = await fetch(url);
                    const data = await res.json();

                    if (data && data.sys && data.sys.country) {
                        // Fetch country details using ISO2 country code
                        const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${data.sys.country}`);
                        const countryData = await countryRes.json();
                        const country = countryData[0];

                        displayResults(country, data);
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
        <p><strong>Weather in ${country.capital[0]}:</strong> ${weather.main.temp}°C, ${weather.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="Weather icon">`
                : `<p>🌥️ Weather data not available</p>`}
    `;
    }

    // Event Listeners
    searchBtn.addEventListener("click", () => fetchCountry(countryInput.value.trim()));
    countryInput.addEventListener("keypress", e => {
        if (e.key === "Enter") searchBtn.click();
    });
});
