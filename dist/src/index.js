"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AptosStateSubscriptionClient = void 0;
const aptos_1 = require("aptos");
const scaner_1 = require("./scaner");
class AptosStateSubscriptionClient {
    constructor(fullNode) {
        this.fullNode = fullNode;
    }
    subscribeResource(account, resourceType, startLedgerVersion, callback) {
        const client = new aptos_1.AptosClient(this.fullNode);
        let options = {
            client,
            account,
            resourceType,
            start: startLedgerVersion,
            callback,
        };
        (0, scaner_1.addListener)(options);
    }
}
exports.AptosStateSubscriptionClient = AptosStateSubscriptionClient;
