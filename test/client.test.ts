import { AptosStateSubscriptionClient } from "../src";
import logger from "../src/logger";

const NODE_URL = "https://rosetta.aptosdev.com";
// const NODE_URL = "https://fullnode.devnet.aptoslabs.com";

const client = new AptosStateSubscriptionClient(NODE_URL);
client.subscribeResource(
  "0x89316a4f6525b441f4c6e84f364087067dcd31a88acfc6f7ef4f878cd5ed3755",
  "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
  90515935, // start ledger version
  (changeInfo: any) => {
    logger.info(`changeInfo: ${JSON.stringify(changeInfo)}`);
  }
);
