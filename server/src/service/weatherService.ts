import dotenv from 'dotenv';
dotenv.config();


// Define a class for the Weather object
class Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  cityName: string;
  date: Date;
  icon: string;
  iconDescription: string;

  constructor(temperature: number, description: string, humidity: number, windSpeed: number, cityName: string, date: Date, icon: string, iconDescription: string) {
    this.temperature = temperature;
    this.description = description;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.cityName = cityName;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName = '';

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

  // Fetch and destructure location data
  private async fetchAndDestructureLocationData(): Promise<{ lat: number; lon: number }> {
    // Example implementation for fetching and destructuring location data
    const response = await fetch(`${this.baseURL}/location?city=${this.cityName}&apiKey=${this.apiKey}`);
    const data = await response.json();
    return { lat: data.coord.lat, lon: data.coord.lon };
  }

  // Fetch weather data using coordinates
  private async fetchWeatherData(coordinates: { lat: number; lon: number }): Promise<any> {
    const response = await fetch(`${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&apiKey=${this.apiKey}`);
    const data = await response.json();
    return data;
  }

  // Parse the current weather from the weather data
  private parseCurrentWeather(data: any): Weather {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    return new Weather(temperature, description, humidity, windSpeed, this.cityName, new Date(), data.weather[0].icon, data.weather[0].description);
  }

  // Build an array of Weather objects from the forecast data
  private buildForecastArray(_currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = weatherData.map((data) => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const dateTime = new Date(data.dt_txt); // Extract date and time from the data
      return new Weather(temperature, description, humidity, windSpeed, this.cityName, dateTime, data.weather[0].icon, data.weather[0].description);
    });
    // Add the current weather to the beginning of the forecast array
    return forecastArray;
  }

  // Get the weather for a specific city
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    // Fetch the coordinates for the city
    const coordinates = await this.fetchAndDestructureLocationData();
    // Fetch the weather data using the coordinates
    const weatherData = await this.fetchWeatherData(coordinates);
    // Parse the current weather from the weather data
    const currentWeather = this.parseCurrentWeather(weatherData.list[0]);
    // Build the forecast array from the weather data
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
    return forecastArray;
  }
}

export default new WeatherService();
