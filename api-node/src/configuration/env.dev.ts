import dotenv from "dotenv";

dotenv.config();

export const audience = process.env.AUTH0_AUDIENCE;
export const domain = process.env.AUTH0_DOMAIN;
export const serverPort = process.env.SERVER_PORT;
export const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;