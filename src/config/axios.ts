import axios from "axios";

import { env } from "@/utils/env";

export const axiosInstance = axios.create({
  baseURL: env.API_ENDPOINT,
  timeout: 2000,
});

export const nextApiInstance = axios.create({
  baseURL: env.API_NEXT_ENDPOINT,
  timeout: 2000,
});
