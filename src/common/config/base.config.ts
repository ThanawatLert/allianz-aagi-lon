import { registerAs } from '@nestjs/config';

export default registerAs('base', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  location_path: process.env.LOCATION_PATH || ' ./',
  lon_api_url: process.env.LON_API_URL || '',
  lon_api_token: process.env.LON_API_TOKEN || '',
  page_id: process.env.PAGE_ID || '',
}));
