# 🌍 Country and Capital Weather Explorer 
A simple **web app** to explore any country and check the **live weather** of its capital city. Built with **HTML, CSS, and JavaScript**,

 using the [REST Countries API](https://restcountries.com/) and [OpenWeatherMap API](https://openweathermap.org/api).
 
  --- ## ✨ Features - 
🔎 Search for any country by name - 
🏳️ View **flag, capital city, and population** -
🌡 Get **live weather** of the capital city (temperature, description, and icon) -
🌗 Toggle between **Light Mode** and **Dark Mode** -
📱 Fully responsive design for all devices - 
📍 Geolocation button to auto-detect your country

  --- ## 📂 Project Structure country-and-capital-weather-explorer/ 
      │── index.html # Main HTML file 
      │── style.css # Styling 
      │── script.js # Main JavaScript logic 
      │── config.js # API key (not pushed to GitHub) 
      │── config.example.js# Example template for API key 
      │── .gitignore # Ensures config.js is ignored 
      │── README.md # Documentation 
      
      ---## ⚙️ Setup Instructions
       1. **Clone the Repository**
        Run this command in your terminal:
bash
   git clone https://github.com/poushalimukherjee01/Country-Capital-Weather-Explorer.git
   cd Country-Capital-Weather-Explorer
   
## 🔑 API Key Setup (Important)

1.Go to OpenWeatherMap
 and create a free account.

2.Copy your API key from the "API Keys" section in your OpenWeatherMap    dashboard.

3.In your project folder, you will see a file named config.example.js.

4.Make a copy of this file and rename it to config.js.

5.Open config.js and replace:

const API_KEY = "your_api_key_here";
with your own API key.

6.Save the file.

⚠️ Note:

config.js is listed in .gitignore, so it will never be pushed to GitHub (this keeps your key safe).

Only config.example.js is shared in the repo as a template.


---


▶️ Run the Project Locally

1.Open the folder in VS Code.

2.Install the Live Server extension (if not installed).

3.Right-click index.html → Open with Live Server.

4.Or simply double-click index.html to open in your browser 


🛠 Tech Stack

1.Frontend: HTML, CSS, JavaScript

2.APIs: REST Countries API, OpenWeatherMap API

3.Deployment: GitHub Pages

🚀 Deployment (GitHub Pages)

1.Push the project to a public GitHub repository.

2.Go to the repository → Settings → Pages.

3.Under Branch, select main and / (root).

4.Click Save.

5.The live site will be available at : https://poushalimukherjee01.github.io/Country-Capital-Weather-Explorer/

---

## 🧪 API Testing (For Recruiters/Testers)

The backend API is **publicly accessible** and **requires NO authentication token**. You can test it directly using the following endpoints:

> **⚠️ Important:** If recruiters are getting authentication errors, check your Vercel dashboard settings. See [`VERCEL_SETTINGS_GUIDE.md`](./VERCEL_SETTINGS_GUIDE.md) for detailed instructions on making your deployment public.

### Base URL
Replace `YOUR_VERCEL_URL` with your actual Vercel deployment URL (e.g., `https://your-app.vercel.app`)

### Test Endpoint
Quick test to verify the API is working:
```
GET YOUR_VERCEL_URL/api/test
```

**Example Response:**
```json
{
  "success": true,
  "message": "API is working correctly! No authentication required.",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "endpoints": {
    "weather": "/api/weather?q=London",
    "test": "/api/test"
  }
}
```

### Weather Endpoint
Get weather data for any city:
```
GET YOUR_VERCEL_URL/api/weather?q=London
GET YOUR_VERCEL_URL/api/weather?lat=51.5074&lon=-0.1278
```

**Example Requests:**
- Weather by city: `https://your-app.vercel.app/api/weather?q=Paris`
- Weather by coordinates: `https://your-app.vercel.app/api/weather?lat=48.8566&lon=2.3522`

**Example Response:**
```json
{
  "coord": { "lon": -0.1278, "lat": 51.5074 },
  "weather": [{ "main": "Clear", "description": "clear sky" }],
  "main": { "temp": 15.5, "feels_like": 14.2 },
  "name": "London"
}
```

### Testing in Browser
Simply open these URLs directly in your browser:
- Test endpoint: `YOUR_VERCEL_URL/api/test`
- Weather endpoint: `YOUR_VERCEL_URL/api/weather?q=Tokyo`

### Testing with cURL
```bash
# Test endpoint
curl https://your-app.vercel.app/api/test

# Weather endpoint
curl https://your-app.vercel.app/api/weather?q=New%20York
```

### Testing with JavaScript/Fetch
```javascript
// Test endpoint
fetch('https://your-app.vercel.app/api/test')
  .then(res => res.json())
  .then(data => console.log(data));

// Weather endpoint
fetch('https://your-app.vercel.app/api/weather?q=London')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Note:** All endpoints are CORS-enabled and require **NO authentication tokens or API keys** for testing purposes.

---

## 🔗 Project Links

Repository: https://github.com/poushalimukherjee01/Country-Capital-Weather-Explorer

Live Demo: https://poushalimukherjee01.github.io/Country-Capital-Weather-Explorer/

👩‍💻 **Author**  
Built with ❤️ by **Poushali Mukherjee**

📫 **Contact Me**  
- ✉️ Email:(mailto:mukherjeepoushali05@gmail.com)  
- 🔗 LinkedIn: (http://www.linkedin.com/in/poushali-mukherjee-644aa4362)
