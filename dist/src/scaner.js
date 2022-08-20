"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListener = void 0;
const logger_1 = __importDefault(require("./logger"));
const sleep = (time = 500) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};
const addListener = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { client, account, resourceType, start, callback } = options;
    let ledgerVersion = start;
    logger_1.default.info(`ledgerVersion: ${ledgerVersion}`);
    try {
        if (start === 0) {
            const ledgerInfo = yield client.getLedgerInfo();
            ledgerVersion = Number(ledgerInfo.ledger_version);
        }
        const transactions = yield client.getTransactions({
            start: ledgerVersion,
        });
        if (transactions.length > 0) {
            for (const transaction of transactions) {
                const { changes } = transaction;
                if (Array.isArray(changes)) {
                    for (const change of changes) {
                        if (change.address === account &&
                            change.type === "write_resource") {
                            const data = change.data;
                            if (data.type === resourceType) {
                                callback(change);
                            }
                        }
                    }
                }
            }
        }
        ledgerVersion = start + 1;
        yield sleep();
        (0, exports.addListener)(Object.assign({}, options, {
            start: ledgerVersion,
        }));
    }
    catch (error) {
        yield sleep();
        (0, exports.addListener)(options);
    }
});
exports.addListener = addListener;
