import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const cityName = req.body.cityName;

  try {
    // Get weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    console.log(weatherData);
    // Save city to search history
    await HistoryService.addCity(cityName);

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET search history
router.get('/history', async (_: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
