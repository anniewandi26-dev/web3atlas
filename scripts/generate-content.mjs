import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "content");

function write(locale, name, data) {
  const dir = path.join(root, locale);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(data, null, 2));
}

const categoriesEn = [
  {
    id: "blockchain",
    name: "Blockchain",
    summary: "Networks that record and secure transactions",
    blurb: "Shared ledgers with consensus rules — the settlement layer everything else sits on.",
    items: [
      { id: "bitcoin", title: "Bitcoin", summary: "The first digital cash system with fixed supply rules.", body: "Bitcoin introduced peer-to-peer electronic cash secured by proof-of-work. Its design prioritizes censorship resistance and predictable monetary policy over programmability. Understanding Bitcoin helps you grasp UTXOs, mining incentives, and why scarcity narratives matter." },
      { id: "ethereum", title: "Ethereum", summary: "A general-purpose world computer for smart contracts.", body: "Ethereum extended blockchains from payments into programmable state. Developers deploy contracts that custody assets, vote, and compose into applications. After the Merge, consensus shifted to proof-of-stake while keeping the EVM as the execution engine." },
      { id: "consensus", title: "Consensus", summary: "How nodes agree on a single history.", body: "Consensus protocols decide which block is canonical. Proof-of-work burns energy for Sybil resistance; proof-of-stake bonds capital. Finality, reorg risk, and validator economics shape how safe a confirmation feels." },
      { id: "accounts", title: "Accounts & Keys", summary: "Identity on-chain is cryptography, not usernames.", body: "EOAs are keypairs. Contracts are code at an address. Signing proves control without revealing the private key. Losing keys means losing assets — there is no bank reset button." },
      { id: "gas", title: "Gas & Fees", summary: "Why every state change costs something.", body: "Gas meters computation and storage. When block space is scarce, fees spike. Users learn to batch actions, use L2s, or wait for quieter periods. Fee markets are a core UX and security surface." },
      { id: "bridges", title: "Bridges", summary: "Moving value between chains — carefully.", body: "Bridges lock assets on one chain and mint representations on another. They expand liquidity but concentrate risk; many historic hacks targeted bridge custody and message verification." },
    ],
  },
  {
    id: "defi",
    name: "DeFi",
    summary: "Lending, swapping and staking via smart contracts",
    blurb: "Open financial primitives that anyone with a wallet can compose.",
    items: [
      { id: "amm", title: "AMMs", summary: "Automated market makers replace order books with pools.", body: "Constant-product and concentrated-liquidity AMMs let anyone provide liquidity. Impermanent loss, fee tiers, and routing quality determine trader and LP outcomes." },
      { id: "lending", title: "Lending Protocols", summary: "Borrow against collateral without a bank desk.", body: "Overcollateralized lending markets price risk with oracles and liquidation bots. Health factors, interest curves, and isolation modes matter more than headline APYs." },
      { id: "stablecoins", title: "Stablecoins", summary: "On-chain dollars and euro-like instruments.", body: "Fiat-backed, crypto-backed, and algorithmic designs trade different risks. Settlement speed and issuer transparency drive real usage in trading and remittances." },
      { id: "staking", title: "Staking & Restaking", summary: "Securing networks and sharing yield.", body: "Staking aligns validators with chain security. Liquid staking tokens unlock composability; restaking reuses stake for additional services — and stacks correlated risk." },
      { id: "perps", title: "Perps & Derivatives", summary: "Leverage markets living fully on-chain.", body: "Perpetual futures use funding rates instead of expiry. Liquidations, oracle latency, and insurance funds define whether a venue survives volatility." },
      { id: "rwa", title: "RWA Tokens", summary: "Bringing off-chain cashflows on-chain.", body: "Tokenized treasuries and credit bring familiar yield into crypto rails. Legal wrappers and redemption processes are as important as the smart contracts." },
    ],
  },
  {
    id: "nfts",
    name: "NFTs",
    summary: "Unique tokens and the marketplaces for them",
    blurb: "Non-fungible tokens encode ownership of distinct digital (and sometimes physical) items.",
    items: [
      { id: "erc721", title: "ERC-721 & 1155", summary: "Standard interfaces for unique and semi-fungible assets.", body: "Standards make marketplaces and wallets interoperable. Metadata usually lives off-chain; permanence depends on storage choices like IPFS or on-chain SVG." },
      { id: "markets", title: "Marketplaces", summary: "Where listings, bids and royalties meet.", body: "Aggregators route liquidity across venues. Royalty enforcement shifted from protocol guarantees to marketplace policy — know what you are buying into." },
      { id: "pfp", title: "Culture & PFPs", summary: "Identity layers that traveled beyond art.", body: "Profile pictures became social signals and community membership. Value can be narrative-driven; treat liquidity as optional, not promised." },
      { id: "gaming-assets", title: "Game Assets", summary: "Items players can truly own.", body: "Portable skins and land parcels need sustainable game economies. Ownership without demand is just an unused token." },
      { id: "tickets", title: "Tickets & Credentials", summary: "Proofs of access beyond speculation.", body: "Event tickets, memberships, and certificates can reduce fraud when redemption UX is solid. Privacy and transfer rules still matter." },
      { id: "dynamic", title: "Dynamic NFTs", summary: "Assets that change with state or oracles.", body: "Traits can update from game results or real-world data. Design carefully so mutability does not break collector expectations." },
    ],
  },
  {
    id: "layer2",
    name: "Layer 2",
    summary: "Scaling networks built on top of Ethereum",
    blurb: "Rollups and related designs move execution off the base layer while inheriting security.",
    items: [
      { id: "optimistic", title: "Optimistic Rollups", summary: "Assume validity, challenge with fraud proofs.", body: "Transactions settle cheaply on L2; withdrawals wait through a challenge window. Sequencer uptime and data availability are key trust assumptions." },
      { id: "zk", title: "ZK Rollups", summary: "Validity proofs compress correctness.", body: "Zero-knowledge proofs let the L1 verify batches without re-executing everything. Prover cost and EVM equivalence define developer experience." },
      { id: "data", title: "Data Availability", summary: "Can anyone reconstruct the chain state?", body: "If data is missing, users cannot exit safely. Blob space and DA layers expand throughput while keeping verification possible." },
      { id: "bridges-l2", title: "L2 Bridges", summary: "Canonical vs third-party bridges.", body: "Official bridges inherit rollup security models; fast bridges trade speed for extra trust. Always verify the domain and contract." },
      { id: "accounts-aa", title: "Account Abstraction", summary: "Smarter wallets on L2-first UX.", body: "Sponsored gas, social recovery, and session keys reduce seed-phrase friction — when implemented carefully." },
      { id: "multi-chain", title: "Multi-chain Reality", summary: "Liquidity and users fragment across L2s.", body: "Intent-based bridging and shared sequencers aim to hide complexity. Until then, know which chain holds your funds." },
      { id: "costs", title: "Why Fees Drop", summary: "Batching turns cents into a product feature.", body: "Amortizing L1 data cost across many users is why L2 transfers can cost pennies compared with mainnet peaks." },
    ],
  },
  {
    id: "infra",
    name: "Infrastructure",
    summary: "Oracles, storage, indexing and developer tools",
    blurb: "Invisible pipes that make apps reliable: data feeds, RPCs, indexers and storage.",
    items: [
      { id: "oracles", title: "Oracles", summary: "Bringing off-chain facts on-chain.", body: "Price feeds and randomness need robust aggregation. Oracle failure modes cascade into liquidations and bad settlements." },
      { id: "rpc", title: "RPC & Nodes", summary: "How wallets talk to the network.", body: "Public RPCs are convenient; private or self-hosted nodes improve privacy and reliability. Rate limits shape product UX." },
      { id: "indexers", title: "Indexers", summary: "Querying history without scanning every block.", body: "Subgraphs and custom indexers turn raw logs into APIs. Stale indexes can look like protocol bugs." },
      { id: "storage", title: "Decentralized Storage", summary: "Files that outlive a single server.", body: "IPFS, Arweave and similar systems pin content. NFT metadata durability depends on pinning and payment for permanence." },
      { id: "mev", title: "MEV", summary: "Value extracted from transaction ordering.", body: "Searchers and builders compete for profitable order flow. Users feel MEV as slippage; protocols mitigate with auctions and private relays." },
      { id: "sdks", title: "Dev Tooling", summary: "From Foundry to account kits.", body: "Faster testing, better type safety, and audited libraries raise the baseline. Tooling quality is security infrastructure." },
      { id: "identity", title: "On-chain Identity", summary: "Names, attestations and reputation.", body: "ENS-like names and attestation protocols help humans find each other without central directories — privacy tradeoffs included." },
      { id: "aa-infra", title: "Bundlers & Paymasters", summary: "The backend of smart accounts.", body: "Account abstraction needs reliable bundlers and sponsored gas policies. Misconfigured paymasters become attack surface." },
    ],
  },
  {
    id: "wallets",
    name: "Wallets",
    summary: "Apps and devices that hold your keys",
    blurb: "A wallet is a key manager and signing UX — the real bank vault is cryptography.",
    items: [
      { id: "hot", title: "Hot Wallets", summary: "Convenient software for daily use.", body: "Browser and mobile wallets balance UX with malware risk. Use separate accounts for experiments vs savings." },
      { id: "hardware", title: "Hardware Wallets", summary: "Keys that never leave a secure chip.", body: "Confirm addresses on-device. Firmware authenticity and supply-chain trust matter as much as the brand name." },
      { id: "seed", title: "Seed Phrases", summary: "The master backup — treat like cash.", body: "Anyone with the phrase controls the funds. Never type it into a website. Prefer metal backups offline." },
      { id: "multisig", title: "Multisig", summary: "Shared control for teams and treasuries.", body: "M-of-N approvals reduce single-key failure. Signer devices and recovery policies need rehearsal." },
      { id: "smart-accounts", title: "Smart Accounts", summary: "Programmable wallets with policies.", body: "Spending limits, guardians, and batching improve safety when correctly configured — complexity can also hide bugs." },
      { id: "custody", title: "Custodial vs Self-custody", summary: "Trade convenience for control.", body: "Exchanges hold keys for you. Self-custody means you are the operations team. Match the model to the risk." },
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    summary: "Games and virtual worlds with owned assets",
    blurb: "On-chain ownership meets game loops — sustainability beats speculative seasons.",
    items: [
      { id: "play", title: "Play & Own", summary: "Assets that persist outside a single studio.", body: "True ownership enables secondary markets. Games still need fun loops; tokens cannot replace design." },
      { id: "economies", title: "In-game Economies", summary: "Inflation, sinks and player labor.", body: "Unbalanced issuance collapses prices. Look for sinks, progression, and off-chain demand — not just emissions." },
      { id: "worlds", title: "Virtual Worlds", summary: "Land, identity and social spaces.", body: "Interoperability promises often lag. Evaluate actual player activity over roadmap slides." },
      { id: "infra-game", title: "Game Infrastructure", summary: "Low latency, high throughput needs.", body: "Many games use hybrid architectures: fast servers with on-chain settlement for scarce assets." },
      { id: "modding", title: "User-generated Content", summary: "Creators as economic participants.", body: "When creators earn from mods and maps, ecosystems grow. Clear IP and royalty rules prevent conflicts." },
      { id: "risks", title: "Speculation Risks", summary: "When the game becomes a market only.", body: "If fun depends on rising prices, the loop breaks in bear markets. Play first, finance second." },
    ],
  },
  {
    id: "daos",
    name: "DAOs",
    summary: "Communities that govern with on-chain votes",
    blurb: "Shared treasuries and proposals — coordination technology with very human politics.",
    items: [
      { id: "governance", title: "Token Governance", summary: "Voting power tied to holdings or reputation.", body: "One-token-one-vote concentrates power. Delegation and quadratic ideas try to rebalance influence." },
      { id: "treasury", title: "Treasuries", summary: "On-chain capital for missions.", body: "Diversification, runway, and spending transparency matter. Multisig or governor contracts execute decisions." },
      { id: "proposals", title: "Proposal Lifecycle", summary: "From forum draft to on-chain execution.", body: "Healthy DAOs debate off-chain then bind on-chain. Timelocks give the community time to exit or veto." },
      { id: "legal", title: "Legal Wrappers", summary: "Bridging code and jurisdiction.", body: "Foundations and LLCs interact with DAOs differently by country. Contributors should know who can be liable." },
      { id: "ops", title: "Ops & Contributors", summary: "Work still needs humans.", body: "Working groups, grants, and payroll tooling turn votes into shipped products. Burnout is a real failure mode." },
      { id: "attacks", title: "Governance Attacks", summary: "Vote buying and hostile takeovers.", body: "Flash-loan votes and low-turnout captures are known risks. Quorums and vetoes are defenses." },
    ],
  },
];

const categoriesZh = categoriesEn.map((cat) => {
  const map = {
    blockchain: ["区块链", "记录并保护交易的网络", "带共识规则的共享账本——其他一切的结算层。"],
    defi: ["DeFi", "通过智能合约借贷、兑换与质押", "任何人只要有钱包就能组合的开放金融原语。"],
    nfts: ["NFT", "独特代币及其市场", "非同质化代币编码独特数字（有时是实物）资产的所有权。"],
    layer2: ["Layer 2", "构建在以太坊之上的扩容网络", "将执行移出主网同时继承安全性的卷叠等设计。"],
    infra: ["基础设施", "预言机、存储、索引与开发工具", "让应用可靠的隐形管道：数据源、RPC、索引与存储。"],
    wallets: ["钱包", "保管密钥的应用与设备", "钱包是密钥管理与签名体验——真正的金库是密码学。"],
    gaming: ["链游", "可拥有资产的游戏与虚拟世界", "链上所有权遇上游戏循环——可持续性胜过投机赛季。"],
    daos: ["DAO", "用链上投票治理的社区", "共享金库与提案——协调技术，政治仍然很人类。"],
  };
  const [name, summary, blurb] = map[cat.id];
  const itemZh = {
    bitcoin: ["比特币", "首个固定供给规则的电子现金系统", "比特币用工作量证明保护点对点电子现金。它优先抗审查与可预期货币政策，而非可编程性。理解比特币有助于掌握 UTXO、挖矿激励与稀缺叙事。"],
    ethereum: ["以太坊", "面向智能合约的通用世界计算机", "以太坊把区块链从支付扩展到可编程状态。开发者部署可托管资产、投票并组合的合约。合并后共识转为权益证明，执行层仍是 EVM。"],
    consensus: ["共识", "节点如何对单一历史达成一致", "共识协议决定哪条链为正统。工作量证明用能量抗女巫；权益证明用质押绑定资本。最终性、重组风险与验证者经济决定确认有多安全。"],
    accounts: ["账户与密钥", "链上身份是密码学，不是用户名", "外部账户是密钥对，合约是地址上的代码。签名证明控制权而不泄露私钥。丢钥即丢资产——没有银行重置。"],
    gas: ["Gas 与手续费", "为何每次状态变更都有成本", "Gas 计量计算与存储。区块空间稀缺时费用飙升。用户可合并操作、使用 L2 或等待低峰。费用市场是核心体验与安全面。"],
    bridges: ["跨链桥", "在链之间迁移价值——务必谨慎", "桥在一条链锁定资产并在另一条铸造映射。它们扩展流动性也集中风险；许多重大黑客事件瞄准桥托管与消息验证。"],
    amm: ["自动做市商", "用资金池替代订单簿", "恒定乘积与集中流动性 AMM 让任何人提供流动性。无常损失、费率档位与路由质量决定交易者与 LP 结果。"],
    lending: ["借贷协议", "无需银行柜面即可抵押借出", "超额抵押市场用预言机与清算机器人定价风险。健康因子、利率曲线与隔离模式比标题年化更重要。"],
    stablecoins: ["稳定币", "链上的美元与类欧元工具", "法币储备、加密抵押与算法设计对应不同风险。结算速度与发行方透明度驱动交易与汇款真实用量。"],
    staking: ["质押与再质押", "保护网络安全并分享收益", "质押让验证者与链安全对齐。流动性质押代币解锁可组合性；再质押把同一质押用于更多服务——也叠加相关风险。"],
    perps: ["永续与衍生品", "完全链上的杠杆市场", "永续合约用资金费率代替到期。清算、预言机延迟与保险基金决定平台能否扛住波动。"],
    rwa: ["RWA 代币", "把链下现金流带到链上", "代币化国债与信贷把熟悉的收益接入加密轨道。法律包装与赎回流程与合约同等重要。"],
    erc721: ["ERC-721 与 1155", "独特与半同质化资产的标准接口", "标准让市场与钱包互通。元数据通常在链下；持久性取决于 IPFS 或链上 SVG 等存储选择。"],
    markets: ["交易市场", "挂单、竞价与版税交汇处", "聚合器跨平台路由流动性。版税执行从协议保证转向平台政策——买前要看清规则。"],
    pfp: ["文化与头像", "走出艺术圈的身份层", "头像成为社交信号与社群身份。价值可被叙事驱动；把流动性当作可选，而非承诺。"],
    "gaming-assets": ["游戏资产", "玩家真正拥有的道具", "可携带皮肤与地块需要可持续经济。没有需求的所有权只是闲置代币。"],
    tickets: ["票务与凭证", "超越投机的准入证明", "活动票、会员与证书在兑换体验扎实时可减少欺诈。隐私与转让规则仍然关键。"],
    dynamic: ["动态 NFT", "随状态或预言机变化的资产", "特质可随比赛结果或现实数据更新。需谨慎设计，以免可变性破坏收藏预期。"],
    optimistic: ["乐观卷叠", "默认有效，用欺诈证明挑战", "交易在 L2 便宜结算；提款需经过挑战窗口。排序器可用性与数据可用性是关键信任假设。"],
    zk: ["ZK 卷叠", "有效性证明压缩正确性", "零知识证明让 L1 无需重放即可验证批次。证明成本与 EVM 等价性决定开发体验。"],
    data: ["数据可用性", "任何人能否重建链状态？", "数据缺失则用户无法安全退出。Blob 与 DA 层在保持可验证的同时扩展吞吐。"],
    "bridges-l2": ["L2 桥", "官方桥与第三方桥", "官方桥继承卷叠安全模型；快速桥用额外信任换速度。务必核验域名与合约。"],
    "accounts-aa": ["账户抽象", "更聪明的 L2 优先钱包体验", "代付 Gas、社交恢复与会话密钥降低助记词摩擦——前提是实现谨慎。"],
    "multi-chain": ["多链现实", "流动性与用户在 L2 间碎片化", "基于意图的跨链与共享排序器试图隐藏复杂度。在此之前，弄清资金在哪条链。"],
    costs: ["费用为何下降", "批处理把几分钱变成产品特性", "把 L1 数据成本摊到大量用户上，正是 L2 转账可比主网高峰便宜得多的原因。"],
    oracles: ["预言机", "把链下事实带上链", "价格与随机数需要稳健聚合。预言机故障会传导到清算与错误结算。"],
    rpc: ["RPC 与节点", "钱包如何与网络对话", "公共 RPC 方便；私有或自建节点提升隐私与可靠性。限流塑造产品体验。"],
    indexers: ["索引器", "无需扫完全部区块即可查询历史", "子图与自定义索引把日志变成 API。过期索引可能看起来像协议故障。"],
    storage: ["去中心化存储", "比单台服务器活得更久的文件", "IPFS、Arweave 等系统固定内容。NFT 元数据耐久取决于 pinning 与持久付费。"],
    mev: ["MEV", "从交易排序中抽取的价值", "搜寻者与建造者争夺有利可图的顺序流。用户感受到的是滑点；协议用拍卖与私有中继缓解。"],
    sdks: ["开发工具", "从 Foundry 到账户套件", "更快测试、更好类型与审计库抬高基线。工具质量就是安全基础设施。"],
    identity: ["链上身份", "名称、证明与声誉", "类 ENS 名称与证明协议帮助人们在没有中心目录时找到彼此——含隐私权衡。"],
    "aa-infra": ["Bundler 与 Paymaster", "智能账户的后端", "账户抽象需要可靠 bundler 与代付策略。配置失误的 paymaster 会变成攻击面。"],
    hot: ["热钱包", "日常使用的便捷软件", "浏览器与手机钱包在体验与恶意软件风险间权衡。试验账户与储蓄账户应分开。"],
    hardware: ["硬件钱包", "密钥永不离开安全芯片", "在设备上确认地址。固件真实性与供应链信任与品牌名同样重要。"],
    seed: ["助记词", "主备份——当现金对待", "任何人拿到助记词就控制资金。永远不要输入网站。优先离线金属备份。"],
    multisig: ["多重签名", "团队与金库的共享控制", "M-of-N 审批降低单钥失败。签名设备与恢复策略需要演练。"],
    "smart-accounts": ["智能账户", "带策略的可编程钱包", "消费限额、监护人与批处理在正确配置时可提升安全——复杂度也会藏 bug。"],
    custody: ["托管与自托管", "用便利换控制", "交易所替你持钥。自托管意味着你是运维团队。按风险匹配模式。"],
    play: ["边玩边拥有", "可跨越单一工作室存续的资产", "真正所有权开启二级市场。游戏仍需好玩；代币替代不了设计。"],
    economies: ["游戏内经济", "通胀、消耗与玩家劳动", "发行失衡会砸价。寻找消耗、成长与链下需求——而不只是排放。"],
    worlds: ["虚拟世界", "土地、身份与社交空间", "互操作承诺常常滞后。用真实活跃度而非路线图评估。"],
    "infra-game": ["游戏基础设施", "低延迟高吞吐需求", "许多游戏用混合架构：快速服务器 + 稀缺资产的链上结算。"],
    modding: ["用户生成内容", "创作者成为经济参与者", "创作者从模组与地图获利时生态会成长。清晰 IP 与分成规则可避免冲突。"],
    risks: ["投机风险", "当游戏只剩市场", "若乐趣依赖涨价，熊市循环会断裂。先玩，后谈金融。"],
    governance: ["代币治理", "投票权绑定持仓或声誉", "一币一票会集中权力。委托与二次方等想法试图再平衡影响。"],
    treasury: ["金库", "服务使命的链上资本", "分散、跑道与支出透明度很重要。多重签名或治理合约执行决策。"],
    proposals: ["提案生命周期", "从论坛草案到链上执行", "健康 DAO 先链下讨论再链上绑定。时间锁给社区退出或否决的时间。"],
    legal: ["法律包装", "连接代码与司法辖区", "基金会与 LLC 在不同国家与 DAO 互动方式不同。贡献者应了解谁可能担责。"],
    ops: ["运营与贡献者", "工作仍需要人类", "工作组、资助与发薪工具把投票变成交付。倦怠是真实失败模式。"],
    attacks: ["治理攻击", "贿选与恶意收购", "闪电贷投票与低投票率俘获是已知风险。法定人数与否决权是防御。"],
  };
  return {
    id: cat.id,
    name,
    summary,
    blurb,
    items: cat.items.map((it) => {
      const [title, summary, body] = itemZh[it.id];
      return { id: it.id, title, summary, body };
    }),
  };
});

const glossaryEn = [
  ["gas", "Gas", "Unit measuring computation and storage cost of a transaction."],
  ["gwei", "Gwei", "A denomination of ether used to quote gas prices."],
  ["evm", "EVM", "Ethereum Virtual Machine — the runtime for smart contracts."],
  ["amm", "AMM", "Automated Market Maker that prices assets via liquidity pools."],
  ["tvl", "TVL", "Total Value Locked in a protocol's contracts."],
  ["apy", "APY", "Annual Percentage Yield — compounded return rate."],
  ["apr", "APR", "Annual Percentage Rate — simple annualized rate."],
  ["slippage", "Slippage", "Difference between expected and executed trade price."],
  ["mev", "MEV", "Maximal Extractable Value from transaction ordering."],
  ["oracle", "Oracle", "Service that brings external data on-chain."],
  ["rollup", "Rollup", "L2 that posts data/proofs to L1 for security."],
  ["sequencer", "Sequencer", "Entity that orders L2 transactions before settlement."],
  ["finality", "Finality", "Point after which a block is practically irreversible."],
  ["utxo", "UTXO", "Unspent transaction output model used by Bitcoin."],
  ["eoa", "EOA", "Externally Owned Account controlled by a private key."],
  ["multisig", "Multisig", "Account requiring multiple signatures to act."],
  ["seed-phrase", "Seed Phrase", "Mnemonic backup that regenerates wallet keys."],
  ["allowance", "Allowance", "Permission for a contract to spend your tokens."],
  ["approve", "Approve", "Transaction granting or changing an allowance."],
  ["rug", "Rug Pull", "Insiders drain liquidity or abandon a project."],
  ["phishing", "Phishing", "Tricking users into revealing keys or signing malice."],
  ["bridge", "Bridge", "System moving assets or messages across chains."],
  ["stablecoin", "Stablecoin", "Token designed to track a stable reference value."],
  ["liquidity", "Liquidity", "Ease of trading without moving the price much."],
  ["impermanent-loss", "Impermanent Loss", "LP underperformance vs holding when prices diverge."],
  ["liquidation", "Liquidation", "Forced sale of collateral when a loan goes unhealthy."],
  ["staking", "Staking", "Locking assets to secure a network or earn yield."],
  ["validator", "Validator", "Node that proposes/attests blocks in PoS systems."],
  ["dao", "DAO", "Organization coordinating via on-chain rules and votes."],
  ["nft", "NFT", "Non-fungible token representing a unique item."],
  ["ipfs", "IPFS", "Content-addressed peer-to-peer file network."],
  ["ens", "ENS", "Ethereum Name Service for human-readable names."],
  ["layer1", "Layer 1", "Base blockchain that settles transactions."],
  ["layer2", "Layer 2", "Scaling system built atop a Layer 1."],
  ["zk-proof", "ZK Proof", "Proof of correctness without revealing all inputs."],
  ["fraud-proof", "Fraud Proof", "Evidence used to challenge an invalid rollup batch."],
  ["blob", "Blob", "Cheap data space introduced for rollup scaling."],
  ["wallet", "Wallet", "Software/hardware that manages keys and signatures."],
  ["cold-storage", "Cold Storage", "Keys kept offline to reduce attack surface."],
  ["kyc", "KYC", "Know Your Customer identity checks on platforms."],
];

const glossaryZh = [
  ["gas", "Gas", "计量交易计算与存储成本的单位。"],
  ["gwei", "Gwei", "以太计价的常用小数单位，用于报价 Gas。"],
  ["evm", "EVM", "以太坊虚拟机——智能合约运行时。"],
  ["amm", "AMM", "通过流动性池定价的自动做市商。"],
  ["tvl", "TVL", "协议合约中锁定的总价值。"],
  ["apy", "APY", "年化收益率（含复利）。"],
  ["apr", "APR", "年化利率（不含复利）。"],
  ["slippage", "滑点", "预期成交价与实际成交价的差距。"],
  ["mev", "MEV", "通过对交易排序可抽取的最大价值。"],
  ["oracle", "预言机", "把外部数据带上链的服务。"],
  ["rollup", "卷叠", "向 L1 提交数据/证明以继承安全的 L2。"],
  ["sequencer", "排序器", "在结算前排列 L2 交易的实体。"],
  ["finality", "最终性", "区块实际上不可逆的时间点。"],
  ["utxo", "UTXO", "比特币使用的未花费输出模型。"],
  ["eoa", "EOA", "由私钥控制的外部账户。"],
  ["multisig", "多重签名", "需要多个签名才能执行的账户。"],
  ["seed-phrase", "助记词", "可重建钱包密钥的助记备份。"],
  ["allowance", "授权额度", "允许某合约花费你代币的额度。"],
  ["approve", "Approve", "授予或更改授权额度的交易。"],
  ["rug", "跑路", "内部人抽走流动性或抛弃项目。"],
  ["phishing", "钓鱼", "诱骗用户泄露密钥或签署恶意操作。"],
  ["bridge", "跨链桥", "跨链转移资产或消息的系统。"],
  ["stablecoin", "稳定币", "设计为锚定稳定参考价值的代币。"],
  ["liquidity", "流动性", "在不大幅改价的情况下完成交易的难易度。"],
  ["impermanent-loss", "无常损失", "价格偏离时 LP 相对单纯持有的落后。"],
  ["liquidation", "清算", "贷款不健康时强制出售抵押品。"],
  ["staking", "质押", "锁定资产以保护网络或获取收益。"],
  ["validator", "验证者", "在 PoS 中提议/见证区块的节点。"],
  ["dao", "DAO", "通过链上规则与投票协调的组织。"],
  ["nft", "NFT", "代表独特物品的非同质化代币。"],
  ["ipfs", "IPFS", "内容寻址的点对点文件网络。"],
  ["ens", "ENS", "以太坊域名服务，提供可读名称。"],
  ["layer1", "Layer 1", "结算交易的底层区块链。"],
  ["layer2", "Layer 2", "构建在 Layer 1 之上的扩容系统。"],
  ["zk-proof", "零知识证明", "不暴露全部输入即可证明正确性。"],
  ["fraud-proof", "欺诈证明", "用于挑战无效卷叠批次的证据。"],
  ["blob", "Blob", "为卷叠扩容引入的廉价数据空间。"],
  ["wallet", "钱包", "管理密钥与签名的软硬件。"],
  ["cold-storage", "冷存储", "离线保存密钥以缩小攻击面。"],
  ["kyc", "KYC", "平台上的客户身份核验。"],
];

function toGlossary(rows) {
  return rows.map(([id, term, definition]) => ({ id, term, definition }));
}

const chronicleEn = [
  { id: "2008-wp", date: "2008-10", title: "Bitcoin whitepaper", body: "Satoshi Nakamoto publishes a peer-to-peer electronic cash design to a cryptography mailing list." },
  { id: "2009-genesis", date: "2009-01", title: "Genesis block", body: "The Bitcoin network starts; the genesis block encodes a headline about bank bailouts." },
  { id: "2010-pizza", date: "2010-05", title: "Bitcoin pizza day", body: "10,000 BTC buys two pizzas — an early reminder that price discovery is social." },
  { id: "2013-eth", date: "2013-11", title: "Ethereum idea", body: "Vitalik Buterin outlines a general-purpose blockchain for smart contracts." },
  { id: "2015-eth-launch", date: "2015-07", title: "Ethereum launch", body: "Frontier goes live, opening programmable money experiments." },
  { id: "2016-dao", date: "2016-06", title: "The DAO incident", body: "A major early smart-contract failure leads to a contentious hard fork." },
  { id: "2017-ico", date: "2017", title: "ICO wave", body: "Token sales boom and bust; regulators and users learn costly lessons." },
  { id: "2018-bear", date: "2018", title: "Crypto winter", body: "Builders keep shipping quietly while prices collapse from the prior cycle." },
  { id: "2020-defi", date: "2020", title: "DeFi summer", body: "Composable lending and AMMs explode in usage and experimentation." },
  { id: "2021-nft", date: "2021-03", title: "NFT mainstream moment", body: "Digital art auctions push NFTs into global headlines." },
  { id: "2021-l2", date: "2021", title: "Rollup acceleration", body: "Optimistic and ZK roadmaps move from theory to production traffic." },
  { id: "2022-merge", date: "2022-09", title: "The Merge", body: "Ethereum switches to proof-of-stake, cutting energy use dramatically." },
  { id: "2022-contagion", date: "2022", title: "CeFi contagion", body: "Centralized lenders and funds fail; self-custody narratives strengthen." },
  { id: "2023-blobs", date: "2024-03", title: "Blob-carrying scale", body: "Proto-danksharding style data blobs make L2 posting cheaper." },
  { id: "2024-etf", date: "2024-01", title: "Spot Bitcoin ETFs", body: "US approvals open a familiar brokerage path to BTC exposure." },
  { id: "2024-halving", date: "2024-04", title: "Fourth Bitcoin halving", body: "Block rewards drop from 6.25 to 3.125 BTC, tightening new supply." },
  { id: "2024-restake", date: "2024", title: "Restaking era", body: "Shared security experiments expand — along with correlated risk debates." },
  { id: "2025-aa", date: "2025", title: "Smart-account UX push", body: "Account abstraction tooling aims to hide seed phrases behind safer defaults." },
  { id: "2025-rwa", date: "2025", title: "RWA expansion", body: "Tokenized cash and credit products deepen links between TradFi and chains." },
  { id: "2026-intent", date: "2026", title: "Intent-centric flows", body: "Users express outcomes; solvers compete to fill cross-chain actions." },
];

const chronicleZh = [
  { id: "2008-wp", date: "2008-10", title: "比特币白皮书", body: "中本聪在密码学邮件列表发表点对点电子现金设计。" },
  { id: "2009-genesis", date: "2009-01", title: "创世区块", body: "比特币网络启动；创世区块嵌入银行救助相关新闻标题。" },
  { id: "2010-pizza", date: "2010-05", title: "比特币披萨日", body: "1 万枚 BTC 买了两份披萨——价格发现是社会过程的早期提醒。" },
  { id: "2013-eth", date: "2013-11", title: "以太坊构想", body: "Vitalik Buterin 勾勒面向智能合约的通用区块链。" },
  { id: "2015-eth-launch", date: "2015-07", title: "以太坊上线", body: "Frontier 启动，可编程货币实验正式开场。" },
  { id: "2016-dao", date: "2016-06", title: "The DAO 事件", body: "早期重大智能合约失败引发争议性硬分叉。" },
  { id: "2017-ico", date: "2017", title: "ICO 浪潮", body: "代币发行盛极而衰；监管与用户付出昂贵学费。" },
  { id: "2018-bear", date: "2018", title: "加密寒冬", body: "价格从上一周期崩塌，建设者安静交付。" },
  { id: "2020-defi", date: "2020", title: "DeFi 之夏", body: "可组合借贷与 AMM 的用量与实验爆发。" },
  { id: "2021-nft", date: "2021-03", title: "NFT 出圈时刻", body: "数字艺术拍卖把 NFT 推上全球头条。" },
  { id: "2021-l2", date: "2021", title: "卷叠加速", body: "乐观与 ZK 路线从理论走向生产流量。" },
  { id: "2022-merge", date: "2022-09", title: "合并（The Merge）", body: "以太坊切换到权益证明，能耗大幅下降。" },
  { id: "2022-contagion", date: "2022", title: "中心化金融传染", body: "中心化借贷与基金倒下；自托管叙事走强。" },
  { id: "2023-blobs", date: "2024-03", title: "Blob 扩容", body: "类 Proto-danksharding 的数据 Blob 让 L2 提交更便宜。" },
  { id: "2024-etf", date: "2024-01", title: "现货比特币 ETF", body: "美国批准打开熟悉的券商路径接触 BTC。" },
  { id: "2024-halving", date: "2024-04", title: "第四次减半", body: "区块奖励从 6.25 降至 3.125 BTC，新供给收紧。" },
  { id: "2024-restake", date: "2024", title: "再质押时代", body: "共享安全实验扩展——相关风险争论同步升温。" },
  { id: "2025-aa", date: "2025", title: "智能账户体验推进", body: "账户抽象工具试图用更安全默认隐藏助记词。" },
  { id: "2025-rwa", date: "2025", title: "RWA 扩张", body: "代币化现金与信贷加深 TradFi 与链的连接。" },
  { id: "2026-intent", date: "2026", title: "意图中心流程", body: "用户表达结果；求解器竞争完成跨链动作。" },
];

const securityEn = [
  { id: "homograph", tag: "Alert", title: "Homograph phishing defense", minutes: 2, body: "Lookalike domains swap characters that look identical. Prefer bookmarks over search ads. Verify HTTPS certificate owners when stakes are high, and never paste a seed phrase into a page that 'validates' your wallet." },
  { id: "seed", tag: "Keys", title: "Seed phrases are cash", minutes: 2, body: "Anyone who sees your 12/24 words can empty the wallet forever. Store offline. Hardware wallets help, but the phrase still needs physical security. No legitimate support will ask for it." },
  { id: "approve", tag: "DeFi", title: "Approve / allowance traps", minutes: 3, body: "Unlimited approvals let a malicious or compromised contract drain tokens later. Prefer exact allowances, revoke unused approvals regularly, and read the spender address before signing." },
  { id: "fake-apps", tag: "Mobile", title: "Fake wallet apps", minutes: 2, body: "App stores and sideloaded APKs can host clones. Check publisher history, download counts carefully, and cross-verify official links from multiple trusted sources." },
  { id: "drainer", tag: "Signing", title: "Signature drainers", minutes: 3, body: "Blind signing can authorize transfers you did not intend. Use wallets that decode clear intent, simulate transactions, and warn on setApprovalForAll or suspicious permit messages." },
  { id: "support", tag: "Social", title: "Fake support DMs", minutes: 2, body: "Scammers impersonate mods in Discord/Telegram after you post an error. Real teams do not DM first asking for seeds, remote desktop, or 'verification' sites." },
  { id: "bridges", tag: "Cross-chain", title: "Bridge hygiene", minutes: 2, body: "Confirm you are on the canonical bridge UI. Bookmark it. Prefer smaller test transfers before moving size, and understand exit windows on rollups." },
  { id: "devices", tag: "Ops", title: "Device hygiene", minutes: 2, body: "Keep OS and browser extensions minimal. Separate a clean browser profile for high-value signing. Malware that scrapes clipboards still catches people swapping addresses." },
];

const securityZh = [
  { id: "homograph", tag: "警报", title: "同形异义钓鱼防御", minutes: 2, body: "仿冒域名替换看起来一样的字符。优先用书签而非搜索广告。高风险时核验证书主体，永远不要把助记词粘贴到「验证钱包」的网页。" },
  { id: "seed", tag: "密钥", title: "助记词就是现金", minutes: 2, body: "任何人看到你的 12/24 个词就能永久清空钱包。离线保存。硬件钱包有帮助，但助记词仍需物理安全。没有正规客服会索要它。" },
  { id: "approve", tag: "DeFi", title: "Approve / 授权陷阱", minutes: 3, body: "无限授权让恶意或被攻破的合约日后抽干代币。优先精确额度，定期撤销不用的授权，签名前读清 spender 地址。" },
  { id: "fake-apps", tag: "移动", title: "假钱包 App", minutes: 2, body: "应用商店与侧载 APK 都可能有克隆。核查发布者历史，谨慎看待下载量，并用多个可信来源交叉验证官方链接。" },
  { id: "drainer", tag: "签名", title: "签名盗刷器", minutes: 3, body: "盲目签名可能授权你本无意的转账。使用能解码意图、模拟交易并警告 setApprovalForAll 或可疑 permit 的钱包。" },
  { id: "support", tag: "社交", title: "假客服私信", minutes: 2, body: "你在 Discord/Telegram 报错后，骗子会冒充管理员私信。真团队不会先私信索要助记词、远程桌面或「验证」网站。" },
  { id: "bridges", tag: "跨链", title: "跨链卫生", minutes: 2, body: "确认你在官方桥界面，并收藏。大额前先小额试转，并理解卷叠退出窗口。" },
  { id: "devices", tag: "运维", title: "设备卫生", minutes: 2, body: "保持系统与浏览器扩展精简。高价值签名用干净的浏览器配置。剪贴板木马仍在盯着换地址的人。" },
];

const newsEn = [
  { id: "n1", date: "2026-03-12", title: "L2 fee compression continues", summary: "Blob markets and better batching keep average transfer costs near cents on major rollups." },
  { id: "n2", date: "2026-02-28", title: "Smart accounts reach consumer wallets", summary: "Session keys and sponsored gas land in mainstream mobile UX without exposing seed rituals." },
  { id: "n3", date: "2026-02-10", title: "RWA funds report record on-chain AUM", summary: "Tokenized T-bills deepen the bridge between brokerage rails and DeFi collateral." },
  { id: "n4", date: "2026-01-22", title: "Intent solvers expand coverage", summary: "Cross-chain swaps increasingly hide bridge hops behind a single user signature." },
  { id: "n5", date: "2026-01-05", title: "Restaking risk frameworks mature", summary: "Operators publish clearer slashing matrices as shared security products grow." },
  { id: "n6", date: "2025-12-18", title: "Exchange proof-of-reserves audits widen", summary: "More venues publish continuous attestation dashboards after prior CeFi failures." },
  { id: "n7", date: "2025-11-30", title: "ZK prover costs drop again", summary: "Hardware and algorithm gains make validity proofs cheaper for general-purpose L2s." },
  { id: "n8", date: "2025-11-08", title: "Wallet simulation becomes default", summary: "Clear-signing and preflight simulation reduce blind-signature drainers." },
  { id: "n9", date: "2025-10-21", title: "Stablecoin settlement volumes climb", summary: "On-chain dollars remain the workhorse for trading pairs and remittance corridors." },
  { id: "n10", date: "2025-10-02", title: "DAO toolkits add better veto UX", summary: "Timelock dashboards and guardian roles aim to blunt low-turnout governance attacks." },
  { id: "n11", date: "2025-09-14", title: "Gaming studios ship hybrid inventories", summary: "Scarce items settle on-chain while realtime combat stays off-chain for latency." },
  { id: "n12", date: "2025-08-29", title: "Educational hubs prioritize security first", summary: "Knowledge platforms lead with phishing defense before yield tourism." },
];

const newsZh = [
  { id: "n1", date: "2026-03-12", title: "L2 费用继续压缩", summary: "Blob 市场与更好的批处理让主流卷叠平均转账成本接近几分钱。" },
  { id: "n2", date: "2026-02-28", title: "智能账户进入消费级钱包", summary: "会话密钥与代付 Gas 进入主流移动体验，无需反复上演助记词仪式。" },
  { id: "n3", date: "2026-02-10", title: "RWA 基金报告创纪录链上规模", summary: "代币化国债加深券商轨道与 DeFi 抵押之间的桥梁。" },
  { id: "n4", date: "2026-01-22", title: "意图求解器覆盖扩大", summary: "跨链兑换越来越多地用一次用户签名隐藏桥接跳转。" },
  { id: "n5", date: "2026-01-05", title: "再质押风险框架成熟", summary: "随着共享安全产品增长，运营方公布更清晰的罚没矩阵。" },
  { id: "n6", date: "2025-12-18", title: "交易所储备证明审计扩大", summary: "在先前 CeFi 失败后，更多平台发布持续证明看板。" },
  { id: "n7", date: "2025-11-30", title: "ZK 证明成本再降", summary: "硬件与算法进步让通用 L2 的有效性证明更便宜。" },
  { id: "n8", date: "2025-11-08", title: "钱包模拟成为默认", summary: "清晰签名与预演模拟减少盲目签名盗刷。" },
  { id: "n9", date: "2025-10-21", title: "稳定币结算量攀升", summary: "链上美元仍是交易对与汇款走廊的主力。" },
  { id: "n10", date: "2025-10-02", title: "DAO 工具改进否决体验", summary: "时间锁看板与监护角色旨在削弱低投票率治理攻击。" },
  { id: "n11", date: "2025-09-14", title: "游戏工作室交付混合库存", summary: "稀缺道具链上结算，实时战斗留在链下以保证延迟。" },
  { id: "n12", date: "2025-08-29", title: "教育平台优先安全", summary: "知识站在收益观光之前先讲钓鱼防御。" },
];

const quizEn = [
  { id: "q1", question: "Why did BTC become the mainstream crypto reference?", choices: ["Celebrity endorsements alone", "First credible scarce digital cash narrative + network effects", "Guaranteed government backing", "Unlimited supply"], answer: 1 },
  { id: "q2", question: "Why is Ethereum called a 'world computer'?", choices: ["It only stores files", "It runs general-purpose smart contracts", "It mines Bitcoin faster", "It replaces DNS globally"], answer: 1 },
  { id: "q3", question: "Bitcoin halves roughly every 4 years — what is cut?", choices: ["Total supply instantly", "Miner block reward", "Wallet fees forever", "Validator count"], answer: 1 },
  { id: "q4", question: "What did US spot Bitcoin ETFs primarily change?", choices: ["BTC code", "Brokerage access path for traditional investors", "Mining algorithm", "Seed phrase length"], answer: 1 },
  { id: "q5", question: "After the Merge, Ethereum energy use…", choices: ["Increased 10x", "Dropped dramatically with proof-of-stake", "Became coal-only", "Unchanged"], answer: 1 },
  { id: "q6", question: "Why can Layer 2 transfers cost cents?", choices: ["They ignore security", "They batch many txs and amortize L1 data cost", "Banks subsidize them", "Gas is free by law"], answer: 1 },
  { id: "q7", question: "Why are major stablecoins called 'on-chain dollars'?", choices: ["They are FDIC insured wallets", "They aim to track USD for settlement and trading", "They are gold coins", "They cannot transfer"], answer: 1 },
  { id: "q8", question: "Borrow and earn without a bank desk — which category?", choices: ["Only NFTs", "DeFi lending and AMMs", "Hardware manufacturing", "Satellite internet"], answer: 1 },
  { id: "q9", question: "2010: 10,000 BTC bought two pizzas — lesson?", choices: ["BTC was always expensive", "Early price discovery was experimental and social", "Pizza is a protocol", "Mining was illegal"], answer: 1 },
  { id: "q10", question: "One careless Approve can…", choices: ["Improve APY automatically", "Let a contract drain tokens later", "Delete the blockchain", "Upgrade your hardware"], answer: 1 },
];

const quizZh = [
  { id: "q1", question: "为何 BTC 成为主流加密参考？", choices: ["仅靠明星代言", "首个可信稀缺数字现金叙事 + 网络效应", "政府担保", "无限供给"], answer: 1 },
  { id: "q2", question: "为何称以太坊为「世界计算机」？", choices: ["只存文件", "运行通用智能合约", "挖比特币更快", "全球取代 DNS"], answer: 1 },
  { id: "q3", question: "比特币约每 4 年减半——减的是什么？", choices: ["瞬间总供给", "矿工区块奖励", "永久钱包费", "验证者数量"], answer: 1 },
  { id: "q4", question: "美国现货比特币 ETF 主要改变了什么？", choices: ["BTC 代码", "传统投资者的券商接触路径", "挖矿算法", "助记词长度"], answer: 1 },
  { id: "q5", question: "合并后以太坊能耗……", choices: ["增加 10 倍", "随权益证明大幅下降", "只能烧煤", "不变"], answer: 1 },
  { id: "q6", question: "为何 Layer 2 转账只要几分钱？", choices: ["不顾安全", "批量交易并摊薄 L1 数据成本", "银行补贴", "法律规定 Gas 免费"], answer: 1 },
  { id: "q7", question: "为何主流稳定币被称为「链上美元」？", choices: ["是 FDIC 保险钱包", "旨在锚定美元用于结算与交易", "是金币", "不能转账"], answer: 1 },
  { id: "q8", question: "没有银行柜面也能借与赚——属于哪类？", choices: ["仅 NFT", "DeFi 借贷与 AMM", "硬件制造", "卫星互联网"], answer: 1 },
  { id: "q9", question: "2010：1 万 BTC 买两份披萨——启示？", choices: ["BTC 一直很贵", "早期价格发现是实验性的社会过程", "披萨是一种协议", "挖矿违法"], answer: 1 },
  { id: "q10", question: "一次不谨慎的 Approve 可能……", choices: ["自动提高 APY", "让合约日后抽干代币", "删除区块链", "升级硬件"], answer: 1 },
];

const highlightsEn = [
  { id: "gas-fees", label: "# Gas fees" },
  { id: "seed-phrase", label: "# Seed-phrase scams" },
  { id: "layer2", label: "# Layer 2" },
  { id: "approve", label: "# Approve / allowance" },
];

const highlightsZh = [
  { id: "gas-fees", label: "# Gas 费" },
  { id: "seed-phrase", label: "# 助记词骗局" },
  { id: "layer2", label: "# Layer 2" },
  { id: "approve", label: "# Approve / 授权" },
];

write("en", "categories", categoriesEn);
write("zh", "categories", categoriesZh);
write("en", "glossary", toGlossary(glossaryEn));
write("zh", "glossary", toGlossary(glossaryZh));
write("en", "chronicle", chronicleEn);
write("zh", "chronicle", chronicleZh);
write("en", "security", securityEn);
write("zh", "security", securityZh);
write("en", "news", newsEn);
write("zh", "news", newsZh);
write("en", "quiz", quizEn);
write("zh", "quiz", quizZh);
write("en", "highlights", highlightsEn);
write("zh", "highlights", highlightsZh);

console.log("Content written for zh + en");
