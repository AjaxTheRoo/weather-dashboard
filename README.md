# Weather Dashboard

## Description
The Weather Dashboard is a full-stack web application that allows users to view the current weather and a 5-day forecast for multiple cities. Users can search for a city to retrieve its weather data and maintain a history of their searches. The application leverages the OpenWeather API for weather data and provides an intuitive user interface to enhance the user experience.

---

## Features
- **Search for Weather:** Users can search for any city to view its current weather and 5-day forecast.
- **Search History:** Automatically saves searched cities and allows users to revisit their weather data.
- **Detailed Forecast:** Displays the following information:
  - City name
  - Date
  - Weather icon and description
  - Temperature
  - Humidity
  - Wind speed
- **Search History Management:** Includes functionality to delete saved cities from the search history (bonus feature).

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your OpenWeather API key:
     ```env
     API_KEY=<your_openweather_api_key>
     ```

---

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. Open the application in your browser:
   ```
   http://localhost:3000
   ```
3. Search for a city using the input form and view its weather data and forecast.

---

## API Endpoints
### HTML Routes
- `GET *`
  - Returns the `index.html` file.

### API Routes
- `GET /api/weather/history`
  - Retrieves all saved cities from the `searchHistory.json` file.
- `POST /api/weather`
  - Receives a city name, saves it to the `searchHistory.json` file, and returns weather data.
  - Assigns a unique ID to each city for identification.
- `DELETE /api/weather/history/:id` (Bonus)
  - Deletes a city from the search history based on its unique ID.

---

## Technology Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **API:** OpenWeather 5-day Weather Forecast API
- **Storage:** JSON file (`searchHistory.json`) for persisting search history
- **Deployment:** Render

---

## Future Enhancements
- Add more detailed weather parameters (e.g., sunrise/sunset times).
- Implement user authentication for personalized search histories.
- Improve error handling for API requests.

---

## License
This project is licensed under the MIT License.

---

## Contributors
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---
