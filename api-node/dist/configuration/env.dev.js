"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientOriginUrl = exports.serverPort = exports.domain = exports.audience = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.audience = process.env.AUTH0_AUDIENCE;
exports.domain = process.env.AUTH0_DOMAIN;
exports.serverPort = process.env.SERVER_PORT;
exports.clientOriginUrl = process.env.CLIENT_ORIGIN_URL;
