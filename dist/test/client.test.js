"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const logger_1 = __importDefault(require("../src/logger"));
const NODE_URL = "https://rosetta.aptosdev.com";
// const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const client = new src_1.AptosStateSubscriptionClient(NODE_URL);
client.subscribeResource("0x89316a4f6525b441f4c6e84f364087067dcd31a88acfc6f7ef4f878cd5ed3755", "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>", 90515935, // start ledger version
(changeInfo) => {
    // console.log({ changeInfo: JSON.stringify(changeInfo) });
    logger_1.default.info(`changeInfo: ${JSON.stringify(changeInfo)}`);
});
