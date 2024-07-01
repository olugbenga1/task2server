import { Injectable, Req } from '@nestjs/common';
import { config } from 'dotenv';
import axios from 'axios';
import * as geoip from 'geoip-lite';

config();
console.log(process.env.weatherApiKey);

@Injectable()
export class AppService {
  async getClientInfo(name: string, request): Promise<any> {
    // Get the client IP address
    const ip =
      request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    // const ip = '2601:246:5900:bf10::6e0a';

    // Get location information from IP address
    const locationResponse = geoip.lookup(ip);
    const city = locationResponse.city;
    const lat = locationResponse.ll[0];
    const lon = locationResponse.ll[1];

    // Get weather information from city name
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.weatherApiKey}&units=metric`,
    );
    const temperature = weatherData.data.main.temp;

    // Create greetings message
    const greetingMessage = `Hello, ${name}!, the temperature is ${temperature} degrees celsius in ${city}`;

    return {
      client_ip: ip,
      location: city,
      greeting: greetingMessage,
    };
  }
}
