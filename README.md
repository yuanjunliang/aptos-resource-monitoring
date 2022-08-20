# aptos-resource-monitoring

## 需求

监听 Aptos 账户资源变化。

## 需求分析

只有和交易会引起账户资源的变化。所以只要同步监听链上交易，并过滤和监听账户相关的资源变化信息即可

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
