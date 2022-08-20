"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
log4js_1.default.configure({
    appenders: {
        file: { type: "file", filename: "logs/logs.log" },
        out: { type: "stdout" },
    },
    categories: { default: { appenders: ["file", "out"], level: "error" } },
});
const logger = log4js_1.default.getLogger("logger");
logger.level = "debug";
exports.default = logger;
