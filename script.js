// Replace with your actual OpenWeatherMap API key
const apiKey = "1e3f22934d58e069cf242dd3256ac7b9git";

// DOM elements
const darkModeToggle = document.getElementById("darkModeToggle");
const lightBg = document.querySelector(".light-bg");
const darkBg = document.querySelector(".dark-bg");

// Dark mode toggle handler
darkModeToggle.addEventListener("change", () => {
  const isDark = darkModeToggle.checked;

  document.body.classList.toggle("dark", isDark);

  // Toggle background images
  if (darkBg && lightBg) {
    darkBg.style.opacity = isDark ? "1" : "0";
    lightBg.style.opacity = isDark ? "0" : "1";
  }

  console.log("Dark mode toggled:", isDark);
});

// Weather fetch function
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const result = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].main}</p>
    `;

    resultDiv.innerHTML = result;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
