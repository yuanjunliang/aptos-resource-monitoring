# aptos-resource-monitoring

## 需求

监听 Aptos 账户资源变化。

## 需求分析

只有交易会引起账户资源的变化。所以只要同步监听链上交易，并过滤监听账户相关的资源变化信息即可

## 解决方案

实时同步链上所有交易信息，解析交易参数并过滤和设定账号资源相关的交易，即可得到账号资源变化的信息

由于 `Aptos` 没有提供 `WebSocket` 监听信息的功能(也可能提供了，我没找到),只提供了 `Restful` 查询接口，所以当前的解决方案是通过 `Restful` 接口遍历查询链上交易数据

**方案优点**: 可以实时同步链上所有信息，稍作延伸即可做成区块浏览器或者链上交易分析工具
**方案缺点**: 如果 Aptos 的出块速度很快并且交易量很大，那么很有可能扫块脚本的同步速度跟不上出块速度。(当前的同步脚本也有很多优化空间)

## 测试使用

```
git clone https://github.com/yuanjunliang/aptos-resource-monitoring.git
cd aptos-resource-monitoring/
yarn install
yarn test
```

**注:**目前只提供了`change`相关信息，其他信息暂未返回给监听者。如果有需要可以从`transaction`里提取这些信息。一个完整的`transaction`信息结构如下:

```
{
    "version": "90515958",
    "hash": "0x13e15184ae25f9fede616fc77a012a198b79c1ca7721c4b541441a3fd145a4a3",
    "state_root_hash": "0x6a9985cd500510e610c914ebefda657bcec7c7887aeee3290a639bc4cb27286b",
    "event_root_hash": "0x230a9ef9468b9a4a7425e93787389f3dc7401c808560f04dbe17a9ad7a2687e6",
    "gas_used": "4",
    "success": true,
    "vm_status": "Executed successfully",
    "accumulator_root_hash": "0x474ee9dfc87b121a78e5366737077cf4e93d81b8dc439df78251209a337a7d5c",
    "changes": [
        {
            "address": "0xa88767f95d92afc8b3c379729855102c930e453fa819ade05b295878dcf1a3e3",
            "state_key_hash": "0x889993e251b61957256602e4135b64c3d5a539adf580e6421c02ab6ee6df8b9f",
            "data": {
                "type": "0x1::account::Account",
                "data": {
                    "authentication_key": "0xa88767f95d92afc8b3c379729855102c930e453fa819ade05b295878dcf1a3e3",
                    "coin_register_events": {
                        "counter": "1",
                        "guid": {
                            "id": {
                                "addr": "0xa88767f95d92afc8b3c379729855102c930e453fa819ade05b295878dcf1a3e3",
                                "creation_num": "0"
                            }
                        }
                    },
                    "sequence_number": "1264"
                }
            },
            "type": "write_resource"
        },
        {
            "address": "0xa88767f95d92afc8b3c379729855102c930e453fa819ade05b295878dcf1a3e3",
            "state_key_hash": "0xc468df8a0bd37e5f6da79d32c71822f6d663f5cde8646d5d647a464e97d64ccd",
            "data": {
                "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
                "data": {
                    "coin": {
                        "value": "9994597"
                    },
                    "deposit_events": {
                        "counter": "918",
                        "guid": {
                            "id": {
                                "addr": "0xa88767f95d92afc8b3c379729855102c930e453fa819ade05b295878dcf1a3e3",
                                "creation_num": "1"
                            }
                        }
                    },
                    "withdraw_events": {
                        "counter": "1264",
                        "guid": {
                            "id": {
                                "addr": "0xa88767f95d92afc8b3c379729855102c930e453fa819ade05b295878dcf1a3e3",
                                "creation_num": "2"
                            }
                        }
                    }
                }
            },
            "type": "write_resource"
        },
        {
            "address": "0xd8a3fff501d4e4e4dc7bdbfc9af5235c0cfddedd66a485aede0612d4200752e2",
            "state_key_hash": "0x7b5dbc9a19fc7fc357501abc5ed4611e2d60bb259b2a49b9d671b9a36574b7a9",
            "data": {
                "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
                "data": {
                    "coin": {
                        "value": "9994603"
                    },
                    "deposit_events": {
                        "counter": "919",
                        "guid": {
                            "id": {
                                "addr": "0xd8a3fff501d4e4e4dc7bdbfc9af5235c0cfddedd66a485aede0612d4200752e2",
                                "creation_num": "1"
                            }
                        }
                    },
                    "withdraw_events": {
                        "counter": "1263",
                        "guid": {
                            "id": {
                                "addr": "0xd8a3fff501d4e4e4dc7bdbfc9af5235c0cfddedd66a485aede0612d4200752e2",
                                "creation_num": "2"
                            }
                        }
                    }
                }
            },
            "type": "write_resource"
        }
    ],
    "sender": "0xa88767f95d92afc8b3c379729855102c930e453fa819ade05b295878dcf1a3e3",
    "sequence_number": "1263",
    "max_gas_amount": "2000",
    "gas_unit_price": "1",
    "expiration_timestamp_secs": "1660979294",
    "payload": {
        "function": "0x1::coin::transfer",
        "type_arguments": [
            "0x1::aptos_coin::AptosCoin"
        ],
        "arguments": [
            "0xd8a3fff501d4e4e4dc7bdbfc9af5235c0cfddedd66a485aede0612d4200752e2",
            "1"
        ],
        "type": "script_function_payload"
    },
    "signature": {
        "public_key": "0xa5d5a5e53b97952fb9ced3829917c474b80c03d3fe885e8de55bf60e9c59af7f",
        "signature": "0x21d7c3c1917ec5fa453b2688d3155dbc84a6fff26222c13bd97b0154776846d5204a336bb4e67bd191a1bb28ec0e963ef5cd69382f3a04231facdd2ed309f10f",
        "type": "ed25519_signature"
    },
    "events": [
        {
            "key": "0x0200000000000000a88767f95d92afc8b3c379729855102c930e453fa819ade05b295878dcf1a3e3",
            "sequence_number": "1263",
            "type": "0x1::coin::WithdrawEvent",
            "data": {
                "amount": "1"
            }
        },
        {
            "key": "0x0100000000000000d8a3fff501d4e4e4dc7bdbfc9af5235c0cfddedd66a485aede0612d4200752e2",
            "sequence_number": "918",
            "type": "0x1::coin::DepositEvent",
            "data": {
                "amount": "1"
            }
        }
    ],
    "timestamp": "1660979234632173",
    "type": "user_transaction"
}
```
