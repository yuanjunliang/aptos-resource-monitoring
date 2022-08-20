import { AptosClient } from "aptos";
import logger from "./logger";

const sleep = (time = 500) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export interface IOptions {
  account: string;
  resourceType: string;
  client: AptosClient;
  start: number; // start ledger version. Default latest ledger version
  callback: Function;
}

export const addListener = async (options: IOptions): Promise<void> => {
  const { client, account, resourceType, start, callback } = options;
  let ledgerVersion = start;
  logger.info(`ledgerVersion: ${ledgerVersion}`);
  try {
    if (start === 0) {
      const ledgerInfo = await client.getLedgerInfo();
      ledgerVersion = Number(ledgerInfo.ledger_version);
    }

    const transactions: any[] = await client.getTransactions({
      start: ledgerVersion,
    });
    if (transactions.length > 0) {
      for (const transaction of transactions) {
        const { changes } = transaction;
        if (Array.isArray(changes)) {
          for (const change of changes) {
            if (
              change.address === account &&
              change.type === "write_resource"
            ) {
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

    await sleep();
    addListener(
      Object.assign({}, options, {
        start: ledgerVersion,
      })
    );
  } catch (error) {
    await sleep();
    addListener(options);
  }
};
