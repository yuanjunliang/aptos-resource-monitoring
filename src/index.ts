import { AptosClient } from "aptos";
import { addListener } from "./scaner";

export class AptosStateSubscriptionClient {
  fullNode: string;
  constructor(fullNode: string) {
    this.fullNode = fullNode;
  }

  subscribeResource(
    account: string,
    resourceType: string,
    startLedgerVersion: number,
    callback: Function
  ): void {
    const client = new AptosClient(this.fullNode);
    const options = {
      client,
      account,
      resourceType,
      start: startLedgerVersion,
      callback,
    };
    addListener(options);
  }
}
