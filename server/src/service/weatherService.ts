import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

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
    this.windSpeed = windSpeed
    this.cityName = cityName;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription
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

  private async fetchLocationData(): Promise<any> {
    const url = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    return data[0];
  }

  private destructureLocationData(locationData: any): Coordinates {
    const { lat, lon } = locationData;
    return { latitude: lat, longitude: lon };
  }

  private buildWeatherQuery(coordinates: Coordinates): string {
   return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
   //https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key};
  }

  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData();
    return this.destructureLocationData(locationData);
  }

  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    console.log(response.json);
    return await response.json();
  }

  // Parse the current weather data from the API response
  private parseCurrentWeather(response: any): Weather {
    const temperature = response.main.temp;
    const description = response.weather[0].description;
    const humidity = response.main.humidity;
    const windSpeed = response.wind.speed;
    return new Weather(temperature, description, humidity, windSpeed, this.cityName, new Date(), response.weather[0].icon, response.weather[0].description);
  }

  // Build an array of Weather objects from the forecast data
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = weatherData.map((data) => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      return new Weather(temperature, description, humidity, windSpeed, this.cityName, new Date(data.dt_txt), data.weather[0].icon, data.weather[0].description);
    });
    // Add the current weather to the beginning of the forecast array
    forecastArray.unshift(currentWeather);
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
