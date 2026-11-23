/**
 * Expand news / chronicle / glossary with longer educational bodies.
 * Writes content/en + content/zh, then other locales should run translate-fast.
 */
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

const newsEn = [
  {
    id: "n1",
    date: "2026-03-12",
    title: "L2 fee compression continues",
    summary:
      "Blob markets and better batching keep major-rollup transfers near cents. Micropayments get easier—security education must keep up.",
    body: [
      "Over the past year, data-availability upgrades and tighter batching have pushed typical transfers on major rollups toward cent-level fees. What used to feel like a luxury network for large trades is becoming usable for game actions, tips, and small DeFi adjustments.",
      "Cheaper blockspace changes user behavior. People bridge more often, try more contracts, and click through wallet prompts faster. That convenience is real progress—and it also widens the blast radius of phishing sites, unlimited approvals, and lookalike tokens.",
      "For builders, fee compression is a product unlock: onboarding flows no longer die on gas sticker shock. For learners, the checklist stays old-school: verify domains, simulate transactions, prefer limited allowances, and treat bridges as a separate risk class even when the L2 itself is cheap.",
      "Practical takeaway: celebrate lower fees, but pair every new habit with a security habit. The cheapest transfer is still expensive if it sends funds to the wrong address or an unlimited spender.",
    ].join("\n\n"),
  },
  {
    id: "n2",
    date: "2026-02-28",
    title: "Smart accounts reach consumer wallets",
    summary:
      "Session keys and sponsored gas hit mainstream mobile UX. Guardians and modules become new safety surfaces.",
    body: [
      "Account abstraction is no longer only a research topic. Consumer wallets increasingly ship smart accounts with session keys, social recovery, and gas sponsorship so newcomers can act without first hunting for a gas token.",
      "That UX leap creates a new mental model. Instead of one seed controlling one EOA forever, users may rely on guardians, modules, paymasters, and temporary permissions. Misconfigured recovery or a malicious module can lock or drain an account without a classic seed leak.",
      "Teams should document recovery drills the way banks document lost-card flows. Users should know who the guardians are, what a session key can spend, and how to revoke modules. “Seedless” does not mean “riskless.”",
      "If you adopt smart accounts: start with small balances, test recovery on a spare wallet, and read module permissions before enabling convenience features.",
    ].join("\n\n"),
  },
  {
    id: "n3",
    date: "2026-02-10",
    title: "RWA funds report record on-chain AUM",
    summary:
      "Tokenized T-bills bring familiar yield curves on-chain. Redemption and legal custody remain the real stress test.",
    body: [
      "Tokenized treasury and cash-equivalent products continue to attract on-chain AUM because they map to cashflows people already understand. Settlement can happen on crypto rails while the economic story looks closer to traditional money-market exposure.",
      "The hard parts are off-chain. Who holds the underlying? How fast can you redeem in a panic? What happens if banking partners fail, or if transfer restrictions freeze your wallet? On-chain balance ≠ instant cash in hand.",
      "Readers should separate protocol risk from issuer and custody risk. A clean smart contract does not repair a weak legal wrapper. APR screenshots without redemption rules are marketing, not diligence.",
      "Use RWAs as a learning surface for reserves, attestation, and jurisdiction—not only as a yield line in a portfolio app.",
    ].join("\n\n"),
  },
  {
    id: "n4",
    date: "2026-01-22",
    title: "Intent solvers expand coverage",
    summary:
      "Cross-chain swaps hide routes behind one signature while solvers compete. Know refund and worst-slippage rules.",
    body: [
      "Intent-based trading lets users sign what they want—“swap A for at least B by time T”—while solvers compete to fill the route. The interface feels closer to checkout than to manual bridge-hopping.",
      "Under the hood, multi-hop bridges, DEX pools, and solver inventories may still execute the path. Failures, partial fills, and refund conditions matter as much as the happy path. A pretty quote can hide thin liquidity or aggressive intermediate hops.",
      "Before signing, check deadline, minimum output, which chains are touched, and what happens if a solver cannot complete. Prefer venues that simulate and explain the route in plain language.",
      "Intents reduce clicking; they do not remove market structure. Treat them as powerful automation with explicit worst-case settings.",
    ].join("\n\n"),
  },
  {
    id: "n5",
    date: "2026-01-05",
    title: "Restaking risk frameworks mature",
    summary:
      "Operators publish clearer slashing matrices as shared security grows. Compare yield only with slash scenarios included.",
    body: [
      "Restaking reuses staked capital to secure extra services. Efficiency is attractive: the same bond underwrites more work. Correlation is the cost—one operator failure or ambiguous slash condition can hit many layered yields at once.",
      "Clearer operator disclosures and slash matrices help, but readers still need to map who can slash whom, under what evidence, and with what social-process overrides. “Additional yield” without a failure story is incomplete.",
      "If you restake, size positions for correlated drawdowns, diversify operators when possible, and prefer services with transparent monitoring. Leverage on consensus security is still leverage.",
      "Framework maturity is progress; personal risk limits remain your job.",
    ].join("\n\n"),
  },
  {
    id: "n6",
    date: "2025-12-18",
    title: "Exchange PoR dashboards widen",
    summary:
      "More venues ship continuous attestations after CeFi failures. Transparency helps; self-custody still matters for size.",
    body: [
      "Proof-of-reserves dashboards became a trust product after several CeFi collapses. Continuous attestations and public wallet pages make it harder to hide crude fractional schemes—at least for the assets they choose to show.",
      "PoR is not a full audit of liabilities, legal entities, or operational controls. A green dashboard can coexist with frozen withdrawals, hidden debt, or compromised hot wallets. Treat it as one signal among many.",
      "For balances you cannot afford to strand, schedule periodic withdrawals to self-custody. Keep exchange accounts for liquidity and fiat ramps, not as permanent vaults.",
      "Transparency tools improve the market; they do not replace personal custody hygiene.",
    ].join("\n\n"),
  },
  {
    id: "n7",
    date: "2025-11-30",
    title: "ZK prover costs drop again",
    summary:
      "Hardware and algorithms cheapen validity proofs. “ZK” branding still needs sequencer and bridge scrutiny.",
    body: [
      "Prover hardware and algorithm improvements keep cutting the cost of validity proofs, making ZK-style rollups more practical for general computation. Lower proving cost supports broader L2 designs and faster finality narratives.",
      "Marketing often collapses many trust questions into the word “ZK.” Users still depend on sequencers, bridges, upgrade keys, and data availability. A cheap proof of a malicious batch policy does not help you.",
      "When evaluating a ZK product, ask what is proven, who can upgrade, how forced inclusion works, and how exits behave under stress. Proof systems are one layer in a stack.",
      "Cheaper proofs are excellent infrastructure news—pair them with the same operational skepticism you apply elsewhere.",
    ].join("\n\n"),
  },
  {
    id: "n8",
    date: "2025-11-08",
    title: "Wallet simulation becomes default",
    summary:
      "Preflight simulation cuts blind-approval drains. Complex paths can still be under-explained—reject what you don’t understand.",
    body: [
      "Transaction simulation and clearer signing UIs are becoming table stakes. Showing asset diffs before confirmation prevents many classic blind-approval drains that once looked like routine “confirm” clicks.",
      "Simulation is only as good as decoding and the assumed chain state. Unusual contracts, custom modules, or multi-step intents may still render poorly. If the preview is empty or contradictory, that is a stop sign—not a minor glitch.",
      "Combine simulation with allowlist habits: bookmark apps, verify contract addresses, and revoke stale allowances. Tools reduce error rates; they do not invent intent for you.",
      "Default rule: if you cannot explain the state change in one sentence, do not sign.",
    ].join("\n\n"),
  },
  {
    id: "n9",
    date: "2025-10-21",
    title: "Stablecoin settlement volumes climb",
    summary:
      "On-chain dollars remain the workhorse for pairs and remittances. Diversify issuers and learn reserve risk.",
    body: [
      "Stablecoins continue to dominate settlement volume because they offer dollar-like units with crypto rails. Trading pairs, remittance corridors, and payroll experiments all lean on them as the practical unit of account.",
      "Product-market fit concentrates risk on issuers, banks, and freeze policies. A depeg or compliance action can halt strategies that assumed perfect 1:1 forever. Diversifying issuers and understanding attestation quality is part of literacy, not paranoia.",
      "For everyday use, prefer well-documented reserves and clear redemption paths. For learning, compare fiat-backed, crypto-backed, and algorithmic designs by their failure modes—not their logos.",
      "Volume growth means stables are infrastructure. Infrastructure deserves boring, repeated risk review.",
    ].join("\n\n"),
  },
  {
    id: "n10",
    date: "2025-10-02",
    title: "DAO tooling improves veto UX",
    summary:
      "Timelock dashboards and guardian roles help catch malicious proposals. Governance is part of the security model.",
    body: [
      "DAO interfaces increasingly surface timelocks, guardian vetoes, and readable proposal diffs. That matters because governance attacks can empty treasuries as effectively as a contract bug—only with a voting UI instead of an exploit script.",
      "Better tooling helps delegates spot parameter changes, token grants, and upgrade calls before execution. It does not fix low turnout, hidden vote buying, or rushed emergency processes.",
      "If you hold governance power, treat voting like production access: verify the payload, wait through timelocks, and prefer narrow permissions. Spectators should track whether guardians are public and accountable.",
      "Security for DAOs includes social process. Dashboards are necessary; skepticism remains required.",
    ].join("\n\n"),
  },
  {
    id: "n11",
    date: "2025-09-14",
    title: "Studios ship hybrid inventories",
    summary:
      "Scarce items settle on-chain while realtime combat stays off-chain. Shutdown policy defines how far “own” goes.",
    body: [
      "Game studios keep splitting systems: authoritative combat and matchmaking on low-latency servers, scarce cosmetics or currencies as on-chain inventory. Players get tradability without forcing every action through a mempool.",
      "Hybrid design means hybrid trust. You may own a tokenized sword while still depending on servers to make it useful. If the studio shuts down, marketplace bids cannot restore game logic by themselves.",
      "Read item policies: Can assets migrate? Are metadata mutable? Who can freeze inventories? “On-chain” is not a full warranty of utility.",
      "Hybrid games are a realistic path—just measure ownership claims against server dependency honestly.",
    ].join("\n\n"),
  },
  {
    id: "n12",
    date: "2025-08-29",
    title: "Education hubs lead with security",
    summary:
      "Learning products teach phishing and approvals before yield tourism. Surviving first is the real maturity signal.",
    body: [
      "More education platforms now open with phishing, approvals, and seed hygiene before farming tutorials. That ordering reflects hard-won industry experience: knowledge that does not keep you solvent is incomplete.",
      "Security-first curricula still need depth on markets, protocols, and history—but the sequence matters. Users who learn to reject fake support DMs will still be around to learn AMMs later.",
      "Web3Atlas follows the same bias: maps and glossaries are paired with defense habits. Treat safety drills as core content, not an appendix.",
      "Maturity is compounding survival. Yield screenshots are optional; custody discipline is not.",
    ].join("\n\n"),
  },
];

const newsZh = [
  {
    id: "n1",
    date: "2026-03-12",
    title: "L2 费用继续压缩",
    summary: "Blob 市场与更好的批处理让主流卷叠转账接近几分钱。微支付更易用——安全教育必须跟上。",
    body: [
      "过去一年，数据可用性升级和更紧的批处理，把主流卷叠上的典型转账费推向“几分钱”量级。过去更像大额交易专用的网络，正在变得适合游戏操作、打赏和小型 DeFi 调整。",
      "更便宜的区块空间会改变用户行为：人们更频繁跨链、尝试更多合约，也更快点过钱包提示。这是真实进步，同时也放大了钓鱼站、无限授权和仿盘代币的杀伤面。",
      "对建设者，费用压缩是产品解锁：入门流程不再死在 Gas 贴纸价上。对学习者，清单仍很“古典”：核对域名、模拟交易、偏好有限授权，并把跨链桥当成单独风险类别——即便 L2 本身很便宜。",
      "实用结论：为低费用高兴，但让每个新习惯配上一个安全习惯。最便宜的转账，如果打错地址或签了无限 spender，仍然极其昂贵。",
    ].join("\n\n"),
  },
  {
    id: "n2",
    date: "2026-02-28",
    title: "智能账户进入消费级钱包",
    summary: "会话密钥与代付 Gas 进入主流移动体验。守护人与模块成为新的安全面。",
    body: [
      "账户抽象不再只是研究话题。消费级钱包越来越多地提供智能账户：会话密钥、社交恢复、Gas 代付，让新人不必先去找 Gas 币才能行动。",
      "体验跃迁也带来新心智模型。用户可能依赖守护人、模块、Paymaster 与临时权限，而不再是“一枚助记词管一个 EOA 到永远”。恢复配置错误或恶意模块，可以在没有传统助记词泄露的情况下锁死或抽空账户。",
      "团队应像银行写挂失流程一样写清恢复演练。用户要知道守护人是谁、会话密钥能花什么、如何撤销模块。“无助记词”不等于“无风险”。",
      "若采用智能账户：先用小额、在备用钱包测试恢复，并在开启便利功能前读完模块权限。",
    ].join("\n\n"),
  },
  {
    id: "n3",
    date: "2026-02-10",
    title: "RWA 基金报告创纪录链上 AUM",
    summary: "代币化国债把熟悉的收益曲线带到链上结算。赎回与法律托管才是压力测试。",
    body: [
      "代币化国债与类现金产品持续吸引链上 AUM，因为它们映射到人们已经理解的现金流。结算可以走加密轨道，经济故事却更接近传统货币市场敞口。",
      "难点在链下：底层由谁托管？恐慌时多快能赎回？银行伙伴出问题或转账限制冻结钱包时怎么办？链上余额≠手里立刻能用的现金。",
      "读者应区分协议风险与发行人/托管风险。干净的智能合约修不好薄弱的法律包装。没有赎回规则的 APR 截图是营销，不是尽职调查。",
      "把 RWA 当作学习储备、证明与司法辖区的场景——而不只是组合应用里的一行收益。",
    ].join("\n\n"),
  },
  {
    id: "n4",
    date: "2026-01-22",
    title: "意图求解器扩大覆盖",
    summary: "跨链兑换越来越多用一次签名隐藏路径。弄清退款与最差滑点规则。",
    body: [
      "基于意图的交易让用户签署目标——“在时间 T 前把 A 换成至少 B”——由求解器竞争成交。界面更接近结账，而不是手动跨桥跳转。",
      "底层仍可能经过多跳桥、DEX 池与求解器库存。失败、部分成交与退款条件同快乐路径一样重要。漂亮报价可能藏着浅流动或激进中继跳。",
      "签名前检查截止时间、最小输出、触及哪些链、求解器无法完成时怎么办。优先选择能模拟并用白话解释路径的平台。",
      "意图减少点击，并不消灭市场结构。把它当作带明确最坏情况设置的强力自动化。",
    ].join("\n\n"),
  },
  {
    id: "n5",
    date: "2026-01-05",
    title: "再质押风险框架走向成熟",
    summary: "运营方公布更清晰的罚没矩阵。比较收益时必须带上罚没情景。",
    body: [
      "再质押把已质押资本复用到更多服务。效率诱人：同一份保证金承担更多工作。代价是相关性——一次运营失败或模糊罚没条件，可能同时击中多层收益。",
      "更清晰的披露有帮助，但读者仍需弄清谁能罚谁、依据什么证据、有无社会过程覆盖。“额外收益”若没有失败故事，就是不完整的。",
      "若参与再质押：按相关性回撤给仓位定上限，尽量分散运营方，并偏好监控透明的服务。叠在共识安全上的杠杆，仍是杠杆。",
      "框架成熟是进步；个人风险限额仍是你的责任。",
    ].join("\n\n"),
  },
  {
    id: "n6",
    date: "2025-12-18",
    title: "交易所 PoR 看板更普及",
    summary: "更多平台提供持续证明。透明度有帮助；大额仍宜定期自托管。",
    body: [
      "在多起 CeFi 爆雷后，储备证明看板成为信任产品。持续证明与公开钱包页至少让粗糙的拆分储备更难藏——对它们选择展示的资产而言。",
      "PoR 不是对负债、法律实体或运营控制的完整审计。绿色看板可以与提现冻结、隐性债务或热钱包失陷并存。把它当作众多信号之一。",
      "对你无法承受被困住的余额，安排定期提到自托管。把交易所账户留给流动性与法币通道，而不是永久金库。",
      "透明工具改善市场；它们不能替代个人托管卫生。",
    ].join("\n\n"),
  },
  {
    id: "n7",
    date: "2025-11-30",
    title: "ZK 证明成本再次下降",
    summary: "硬件与算法让有效性证明更便宜。“ZK”品牌仍需审视排序器与桥。",
    body: [
      "证明硬件与算法改进持续压低有效性证明成本，使 ZK 风格卷叠更适合通用计算。更低成本支撑更广的 L2 设计与更快的最终性叙事。",
      "营销常把许多信任问题折叠进“ZK”一词。用户仍依赖排序器、桥、升级密钥与数据可用性。对恶意批处理策略的便宜证明帮不了你。",
      "评估 ZK 产品时，问清证明了什么、谁能升级、强制纳入如何工作、压力下退出怎样。证明系统只是栈中一层。",
      "更便宜的证明是好基础设施新闻——请配上你在别处同样的运营怀疑。",
    ].join("\n\n"),
  },
  {
    id: "n8",
    date: "2025-11-08",
    title: "钱包模拟成为默认",
    summary: "预演模拟减少盲签被掏空。复杂路径仍可能解释不清——不懂就拒绝。",
    body: [
      "交易模拟与更清晰的签名 UI 正成为标配。确认前展示资产差额，能挡住许多曾经像例行“确认”的盲签授权盗刷。",
      "模拟好坏取决于解码与假定链状态。异常合约、自定义模块或多步意图仍可能渲染得很差。若预览空白或自相矛盾，那是停车信号，不是小瑕疵。",
      "把模拟与白名单习惯结合：收藏应用、核对合约地址、撤销过期授权。工具降低出错率，不会替你产生意图。",
      "默认规则：若你不能一句话说清状态变化，就不要签名。",
    ].join("\n\n"),
  },
  {
    id: "n9",
    date: "2025-10-21",
    title: "稳定币结算量继续攀升",
    summary: "链上美元仍是交易对与汇款走廊主力。分散发行人并了解储备风险。",
    body: [
      "稳定币继续主导结算量，因为它们在加密轨道上提供类美元单位。交易对、汇款走廊与薪酬实验都把它当作实用记账单位。",
      "产品市场契合也把风险集中到发行人、银行与冻结政策。脱锚或合规动作可以打断假设永远 1:1 的策略。分散发行人、理解证明质量属于素养，不是偏执。",
      "日常使用优先选择储备披露清楚、赎回路径明确的品种。学习时按失败模式比较法币储备、加密抵押与算法设计——而不是比 Logo。",
      "量增意味着稳定币是基础设施。基础设施值得反复、无聊的风险复查。",
    ].join("\n\n"),
  },
  {
    id: "n10",
    date: "2025-10-02",
    title: "DAO 工具改善否决体验",
    summary: "时间锁看板与守护角色帮助发现恶意提案。治理是安全模型的一部分。",
    body: [
      "DAO 界面越来越多展示时间锁、守护否决与可读提案差异。这很重要，因为治理攻击可以像合约漏洞一样掏空金库——只是换成投票 UI。",
      "更好工具帮助代表在执行前发现参数变更、代币赠与与升级调用。它修不好低投票率、隐性买票或仓促紧急流程。",
      "若你握有治理权，把投票当作生产权限：核对载荷、走完时间锁、偏好窄权限。旁观者应关注守护人是否公开且可问责。",
      "DAO 安全包含社会过程。看板必要，怀疑精神仍不可少。",
    ].join("\n\n"),
  },
  {
    id: "n11",
    date: "2025-09-14",
    title: "工作室推出混合库存",
    summary: "稀缺道具上链结算，实时战斗留在低延迟服务器。“拥有”能走多远取决于关服政策。",
    body: [
      "游戏工作室持续拆分系统：权威战斗与匹配在低延迟服务器，稀缺外观或货币作为链上库存。玩家获得可交易性，又不必让每个动作都走内存池。",
      "混合设计意味着混合信任。你可能拥有一把代币化的剑，却仍依赖服务器让它有用。工作室关服时，市场买单本身恢复不了游戏逻辑。",
      "阅读道具政策：资产能否迁移？元数据是否可变？谁能冻结库存？“上链”不是效用的完整质保。",
      "混合游戏是现实路径——只是要把所有权主张与服务器依赖诚实地对照。",
    ].join("\n\n"),
  },
  {
    id: "n12",
    date: "2025-08-29",
    title: "教育平台以安全开场",
    summary: "更多学习产品先讲钓鱼与授权，再讲收益旅游。先活下来才是成熟信号。",
    body: [
      "更多教育平台现在以钓鱼、授权与助记词卫生开场，然后再进入农耕教程。这个顺序反映了行业学费：不能让你存活的知识是不完整的。",
      "安全优先课程仍需要对市场、协议与历史有深度——但顺序重要。会拒绝假客服私信的人，才赶得上以后学 AMM。",
      "Web3Atlas 也持同样偏见：地图与词库配上防御习惯。把安全演练当核心内容，而不是附录。",
      "成熟是复利式的存活。收益截图可选；托管纪律不可选。",
    ].join("\n\n"),
  },
];

/** Longer chronicle blurbs keyed by id */
const chronicleExtraEn = {
  "2008-wp":
    "The paper reframes money as a broadcast ledger with economic incentives. Nodes validate rules locally; miners expend work to make history expensive to rewrite. That combination—open verification plus costly writing—still anchors most “why blockchain” explanations.\n\nFor learners, the takeaway is architectural: reduce trusted third parties for issuance and settlement, accept probabilistic confirmation, and encode scarcity in protocol rules. Later systems borrow the narrative even when they change the engine.",
  "2009-genesis":
    "Embedding a newspaper headline was both timestamp and political signal. Early participants ran full nodes by default because there was little else to do; culture valued verification over convenience.\n\nThe genesis era reminds newcomers that networks start social and sparse. Liquidity, exchanges, and polished wallets came later. Understanding Bitcoin still starts with reading what the first block chose to say about the financial system it sought to exit.",
  "2010-pizza":
    "The pizza trade is remembered as a punchline, but it was a liquidity and UX experiment: can electronic cash clear a real-world purchase without a card network? Price discovery was informal; custody was experimental; the meme outlived the receipt.\n\nToday the story teaches two lessons. First, early markets are thin and anecdotes dominate. Second, spending versus holding is a personal policy choice—protocol rules do not dictate your opportunity cost.",
  "2013-eth":
    "The Ethereum vision shifted the question from “digital cash” to “programmable settlement.” If scripts can custody assets and compose, finance and games become software on a shared machine.\n\nThat ambition created new failure modes—reentrancy, oracle reliance, governance capture—but also the application surface most newcomers meet first. Reading this moment clarifies why gas, ABIs, and contract risk entered the vocabulary.",
  "2015-eth-launch":
    "Frontier was intentionally rough: prove the virtual machine in the wild, accept incidents, iterate tooling. Developers learned that deploying code is easy; reasoning about adversarial callers is hard.\n\nThe launch locked in the EVM as a magnet for tooling and later for “EVM-compatible” chains. Compatibility is not identical security—but shared mental models lowered the cost of experimentation worldwide.",
  "2016-dao":
    "The DAO hack forced a community to choose between immutability theater and social recovery of funds. The resulting ETH/ETC split is a permanent case study in how “code is law” collides with rough consensus.\n\nStudents should study both the technical exploit pattern and the governance process that followed. Smart contracts need audits and pause designs; communities need explicit fork norms before crises.",
  "2017-ico":
    "Token sales compressed global fundraising into a browser wallet. Capital formation sped up; disclosure often did not. Retail learned that a whitepaper PDF is not diligence, and regulators learned the same lesson from the other direction.\n\nThe wave left standards debates, exchange listing politics, and a lasting allergy to unbounded promises. Healthy skepticism about token launches is part of literacy, not anti-innovation.",
  "2018-bear":
    "The winter culled narrative-only tokens while quietly funding client diversity, wallet UX, and research that later cycles reused. Builders who stayed treated price as weather, not climate.\n\nFor learners: bear markets are when you can study mechanics without FOMO noise. Charts go quiet; documentation and source repos get more honest attention.",
  "2020-defi":
    "Liquidity mining turned AMMs and money markets into growth loops. Composability meant a lending position could become collateral elsewhere within minutes—and so could cascading liquidations.\n\nDeFi summer taught oracle design, incentive sustainability, and the difference between APY screenshots and extractable fees. Wallet security became mainstream because the account was now a brokerage.",
  "2021-nft":
    "NFTs brought creators, brands, and speculative crowds onto the same rails. Metadata permanence, royalty enforcement, and wash trading debates followed the headlines.\n\nAfter the boom, durable questions remain: what exactly is owned, where does media live, and which communities survive without nonstop price appreciation? Culture and contracts intertwined permanently.",
  "2021-l2":
    "Users fleeing mainnet fees made rollups a daily path. Bridges and sequencers became the new support tickets: funds stuck mid-hop, downtime, and confusing finality clocks.\n\nScaling success is measured in safe exits and understandable trust assumptions, not only TPS slides. L2 literacy is now baseline Web3 literacy.",
  "2022-merge":
    "Switching consensus without breaking execution was a rare large-system cutover. Energy narratives changed overnight; staking economics and MEV research moved to center stage.\n\nThe Merge shows that blockchains can evolve major subsystems with coordination. It also shows that “done” is never done—client diversity and censorship resistance remain ongoing work.",
  "2022-contagion":
    "When CeFi lenders and funds failed, users rediscovered that IOUs are not UTXOs. Proof-of-reserves marketing rose alongside withdrawals queues.\n\nThe practical curriculum: know where keys live, size exchange balances deliberately, and treat yield that requires locking assets on a platform as credit risk.",
  "2023-blobs":
    "Blob space reframed L2 costs and made everyday transactions feel plausible again. Attention shifted to sequencer decentralization, shared bridges, and intent-based UX.\n\nCheap data availability is necessary but not sufficient for a safe multi-chain world. Users still need clear exit paths and honest risk labels.",
  "2024-etf":
    "Brokerage-wrapped Bitcoin changed who can allocate and how flows hit price discovery. Macro desks entered conversations that once lived only on crypto Twitter.\n\nETFs do not replace self-custody education; they add a parallel access path with traditional intermediaries. Both rails now shape the market.",
  "2024-halving":
    "The subsidy schedule again demonstrated issuance is political only inside the protocol rules—miners and markets adapt around a known calendar.\n\nHalvings are useful teaching tools for scarcity narratives, fee markets, and why security budgets eventually rely more on transaction demand.",
  "2024-restake":
    "Restaking packed more work onto the same economic bond. Shared security can be efficient; correlated slashing can be brutal.\n\nTreat restaking like leveraged infrastructure exposure: read operator set, slash conditions, and oracle/attestation assumptions before chasing points.",
  "2025-aa":
    "Account abstraction brought sponsored gas and social recovery into consumer wallets. Newcomers face fewer seed-phrase cliffs—and more module permission screens.\n\nThe next literacy wave is recovery drills, session-key scopes, and recognizing that convenience features are still authorization surfaces.",
  "2025-rwa":
    "Tokenized treasuries made on-chain yield look familiar to traditional allocators. Legal wrappers and redemption desks became as important as Solidity.\n\nRWAs teach that “on-chain” can mean settlement fashion, not full disintermediation. Read custody and freeze policies with the same care as contract code.",
  "2026-intents":
    "Intent solvers abstract routes into outcomes. Users sign goals; competition fills paths across bridges and pools.\n\nThe educational focus moves to deadlines, minimum outputs, and refund semantics. Abstraction is powerful when worst cases are explicit.",
};

const chronicleExtraZh = {
  "2008-wp":
    "白皮书把货币重述为带经济激励的广播账本。节点本地校验规则；矿工付出工作让改写历史变贵。开放验证 + 昂贵写入，仍是多数“为什么需要区块链”解释的锚点。\n\n对学习者，要点是架构性的：减少发行与结算上的可信第三方，接受概率确认，并把稀缺写进协议规则。后来的系统即使换引擎，也常借用这套叙事。",
  "2009-genesis":
    "把报纸标题写进创世块，既是时间戳也是政治信号。早期参与者默认跑全节点，因为几乎没有别的事可做；文化重视验证胜过便利。\n\n创世时代提醒新人：网络起步时又社交又稀疏。流动性、交易所与精致钱包是后来的事。理解比特币，仍可从第一块选择对金融体系说了什么开始。",
  "2010-pizza":
    "披萨交易常被当笑话，但它是一次流动性与 UX 实验：电子现金能否不经卡组织完成真实购买？价格发现很不正规；托管很实验；梗比收据活得更久。\n\n今天这个故事教两课。其一，早期市场很浅，轶事主导。其二，花还是留是个人政策——协议规则不规定你的机会成本。",
  "2013-eth":
    "以太坊愿景把问题从“数字现金”推进到“可编程结算”。若脚本能托管资产并组合，金融与游戏就变成共享机器上的软件。\n\n野心也带来新失败模式——重入、预言机依赖、治理俘获——以及多数新人最先碰到的应用面。读懂这一刻，就能明白 Gas、ABI 与合约风险为何进入词汇表。",
  "2015-eth-launch":
    "Frontier 有意粗糙：在野外证明虚拟机，接受事故，迭代工具。开发者学到部署容易，推理对抗性调用者很难。\n\n上线把 EVM 锁成工具磁极，也锁成后来“EVM 兼容”链的吸引子。兼容不等于相同安全——但共享心智模型降低了全球试验成本。",
  "2016-dao":
    "The DAO 被黑迫使社区在“不可变剧场”与“社会性挽回资金”之间选择。ETH/ETC 分裂成为“代码即法律”撞上粗糙共识的永久案例。\n\n学生应同时研究技术利用模式与随后的治理过程。智能合约需要审计与暂停设计；社区需要在危机前明确分叉规范。",
  "2017-ico":
    "代币销售把全球募资压进浏览器钱包。资本形成加速，信息披露往往没有。散户学到白皮书 PDF 不是尽调；监管从另一边学到同一课。\n\n浪潮留下标准争论、上所政治，以及对无界承诺的长期过敏。对代币发行保持健康怀疑属于素养，不是反创新。",
  "2018-bear":
    "寒冬淘汰了只剩叙事的代币，同时安静资助了客户端多样性、钱包体验与后续周期复用的研究。留下的建设者把价格当天气，不当气候。\n\n对学习者：熊市是你能在没有 FOMO 噪音下研究机制的时候。图表安静，文档与源码仓得到更诚实的注意力。",
  "2020-defi":
    "流动性挖矿把 AMM 与货币市场变成增长飞轮。可组合意味着借贷仓位几分钟内可成别处抵押——级联清算也一样。\n\nDeFi 之夏教会预言机设计、激励可持续性，以及 APY 截图与可抽取费用的差别。钱包安全变主流，因为账户变成了券商。",
  "2021-nft":
    "NFT 把创作者、品牌与投机人群拉到同一轨道。元数据持久性、版税执行与对倒交易争论跟着头条而来。\n\n高潮之后，耐久问题仍在：究竟拥有什么、媒体存在哪、哪些社区能在没有持续涨价下存活？文化与合约永久交织。",
  "2021-l2":
    "逃离主网费用的用户让卷叠成为日常路径。桥与排序器变成新工单：半路卡住、宕机、令人困惑的最终性时钟。\n\n扩容成功用安全退出与可理解信任假设衡量，而不只看 TPS 幻灯片。L2 素养现已成为 Web3 基线素养。",
  "2022-merge":
    "在不打断执行的情况下切换共识，是罕见的大系统切换。能源叙事一夜改变；质押经济与 MEV 研究走向中央舞台。\n\n合并表明区块链能协调演进重大子系统。也表明“完成”永不完成——客户端多样性与抗审查仍是进行中的工作。",
  "2022-contagion":
    "当 CeFi 借贷与基金倒下，用户重新发现 IOU 不是 UTXO。储备证明营销与提现排队一同升起。\n\n实用课程：知道密钥在哪，有意控制交易所余额，并把需要把资产锁在平台上的收益当作信用风险。",
  "2023-blobs":
    "Blob 空间重写了 L2 成本，让日常交易再次显得可行。注意力转向排序器去中心化、共享桥与意图式 UX。\n\n便宜的数据可用性对安全的多链世界必要但不充分。用户仍需要清晰退出路径与诚实风险标签。",
  "2024-etf":
    "券商包装的比特币改变了谁能配置以及资金流如何冲击价格发现。宏观交易台进入曾经只活在加密推特的对话。\n\nETF 不替代自托管教育；它增加一条带传统中介的并行通道。两条轨道现在都在塑造市场。",
  "2024-halving":
    "补贴日程再次证明：发行只在协议规则内是“政治”的——矿工与市场围绕已知日历适应。\n\n减半是稀缺叙事、费用市场，以及安全预算最终更多依赖交易需求的好教材。",
  "2024-restake":
    "再质押把更多工作压到同一经济保证金上。共享安全可以高效；相关罚没可以残酷。\n\n把再质押当杠杆化基础设施敞口：在追积分前读运营集合、罚没条件与预言机/证明假设。",
  "2025-aa":
    "账户抽象把代付 Gas 与社交恢复带进消费钱包。新人少了助记词悬崖——多了模块权限屏幕。\n\n下一波素养是恢复演练、会话密钥范围，以及认识到便利功能仍是授权面。",
  "2025-rwa":
    "代币化国债让链上收益对传统配置者显得熟悉。法律包装与赎回柜台变得和 Solidity 一样重要。\n\nRWA 教会：“上链”可以指结算形态，而非完全去中介。用读合约代码同样的细心读托管与冻结政策。",
  "2026-intents":
    "意图求解器把路径抽象成结果。用户签目标；竞争在桥与池之间填路径。\n\n教育重点转向截止时间、最小输出与退款语义。当最坏情况被写清时，抽象才有力量。",
};

const glossaryLongEn = {
  gas: "Gas measures how much computation and storage a transaction asks the network to perform. Without metering, a public chain could be stalled by infinite loops or spam. Your fee is roughly usage × unit price; congestion raises the unit price as blockspace demand spikes.\n\nFailed transactions can still cost gas because validators already executed the work. Practical habit: estimate fees, prefer off-peak when learning, and never confuse a failed UX message with a free retry.",
  gwei: "Gwei is a denomination of ether used to quote gas prices in human-scale numbers. One ETH equals 1e9 Gwei. Wallets often show max fee and priority fee in Gwei so you can compare urgency without counting eighteen decimals.\n\nWhen reading tutorials or mempool screenshots, check units carefully. Mixing Gwei quotes with ETH transfer amounts is a classic beginner mistake that leads to overpaying or underpaying.",
  evm: "The Ethereum Virtual Machine is the shared runtime that executes smart-contract bytecode. Most “EVM-compatible” chains reuse opcodes and tooling so developers can deploy similar contracts elsewhere.\n\nCompatibility is about developer experience, not identical security or economics. Always verify which chain you are on, which explorer you trust, and whether proxy upgrade patterns are involved before assuming code behaves forever.",
  amm: "An automated market maker prices trades with pool formulas instead of a classic order book. Liquidity providers deposit assets and earn fees while taking inventory risk known as impermanent loss.\n\nFake pools and lookalike tokens are common traps. Check contract addresses, pool depth, and fee tiers. AMMs are powerful primitives—treat them as markets with transparent math and adversarial flow.",
  tvl: "Total value locked sums assets deposited in a protocol’s contracts. High TVL can signal usage and trust—or simply inflated recursively counted deposits and a fatter hack target.\n\nRead TVL beside audit quality, admin keys, oracle design, and real fee revenue. A headline number without those contexts is a marketing metric, not a safety rating.",
  apy: "APY annualizes yield including compounding assumptions. Short incentive campaigns annualized into triple-digit APYs often mislead because emissions, token price, and sustainability are unstable.\n\nCompare like with like: lasting fee APY versus temporary reward APY. Ask what happens when incentives end, and whether you can exit without wrecking the position.",
  apr: "APR quotes an annualized rate without compounding. Lending interfaces often show supply APR and borrow APR side by side; definitions differ across products.\n\nWhen comparing APR and APY, confirm compounding frequency and whether rewards tokens are included. Precision in definitions prevents false “better rate” conclusions.",
  slippage: "Slippage is the gap between the price you expect and the price you receive. Thin pools, large size, and volatile moments widen that gap.\n\nToo-wide slippage settings invite sandwiching; too-tight settings fail and may still spend gas. Set consciously per trade size and pool depth, and prefer private submission when available for large swaps.",
  mev: "Maximal extractable value is profit from controlling transaction ordering, inclusion, or censorship. Public mempools let searchers detect large swaps and compete to capture the edge.\n\nMitigations include tighter slippage, private orderflow, batch auctions, and simply splitting size. Understanding MEV explains why “same trade, worse fill” happens even without a UI bug.",
  oracle: "Oracles bring off-chain facts—especially prices—on-chain so contracts can react. Lending liquidations and perpetual mark prices depend on feed integrity.\n\nThin markets are easier to manipulate into bad oracle prints. Prefer protocols with robust aggregation, circuit breakers, and clear failure behavior when feeds stall.",
  rollup: "A rollup executes off the base chain and posts data or proofs back so L1 can secure the results. Optimistic designs rely on challenge windows; validity rollups rely on proofs.\n\nUser fees fall because many transactions share L1 costs. Your risk checklist still includes bridges, sequencers, upgrade keys, and how forced exits work.",
  sequencer: "The sequencer orders L2 transactions and often provides fast soft confirmations. Many sequencers remain centralized today, which affects downtime and censorship resistance.\n\nDecentralizing sequencers is a major roadmap theme. Until then, treat soft confirmation as convenience, and understand the path to L1-enforced inclusion when operators misbehave.",
  finality: "Finality describes when a transaction is practically irreversible. Some protocols have explicit finality gadgets; others are probabilistic and strengthen with depth.\n\nExchanges pick confirmation counts from these assumptions. For large transfers, wait for the finality your counterparty actually requires—not the first “success” toast.",
  utxo: "Unspent transaction outputs are how Bitcoin-like systems track spendable coins. Your balance is the sum of UTXOs you can sign for; spending consumes outputs and may create change.\n\nUTXO accounting differs from account balances and affects fees, privacy, and coin selection. Light wallets hide the details—full nodes reveal why consolidation matters.",
  eoa: "An externally owned account is controlled directly by a private key with no contract code. Most classic wallets are EOAs: signature equals authorization.\n\nThere is no password reset. Seed loss is asset loss. Smart accounts change this model; if you stay on EOAs, offline backups and phishing resistance are everything.",
  multisig: "Multisignature accounts require M-of-N approvals before funds move. Treasuries and teams use them to remove single-key failure.\n\nDesign trade-offs include threshold choice, signer geographic diversity, and recovery drills. A multisig you never rehearse can fail at the worst moment.",
  "seed-phrase":
    "A seed phrase regenerates wallet keys. Anyone who sees the words can recreate the wallet elsewhere—support agents never need it to “verify” you.\n\nKeep seeds offline, never type them into websites, and assume a photographed seed is compromised. If leaked, migrate immediately to a fresh seed on a clean device.",
  allowance:
    "An allowance caps how much of a token a spender contract may transferFrom your balance. Unlimited allowances are convenient for frequent traders and dangerous for everyone else.\n\nReview and revoke unused allowances regularly. Prefer exact or modest allowances when learning a new app.",
  approve:
    "Approve transactions set or change allowances. They do not move tokens by themselves, but they unlock later spending by the spender address.\n\nRead the spender carefully, simulate the effect, and beware phishing that asks for approvals to unknown contracts. Approvals are a top drain vector.",
  rug: "A rug pull is when insiders drain liquidity or abandon a project after raising funds. Warning signs include unreachable liquidity, opaque admins, and yield-only marketing.\n\nDue diligence is social and technical: team accountability, contract permissions, and whether liquidity is locked. If you cannot explain the exit, do not size large.",
  phishing:
    "Phishing uses fake sites, ads, and identities to harvest keys or signatures. Homograph domains and fake support DMs are perennial hits.\n\nUse bookmarks, ignore search ads for wallet brands, and never share seeds. When unsure, verify on a second channel before signing anything.",
  bridge:
    "Bridges move assets or messages across chains. Canonical bridges inherit more of the home rollup’s security model; fast bridges often add extra trust assumptions for speed.\n\nAlways test with tiny amounts, verify official URLs, and understand refund behavior. Bridge risk is historically concentrated and unforgiving.",
  stablecoin:
    "Stablecoins aim to track a stable reference such as USD. Designs include fiat reserves, crypto collateral, and algorithmic mechanisms—each fails differently.\n\nLearn issuer attestation quality, freeze policy, and redemption paths. Diversify when stables are core to your workflow.",
  liquidity:
    "Liquidity is the ability to trade size without moving price too much. Deep pools reduce slippage; removable or illusory liquidity can fake safety.\n\nCheck who can withdraw LP tokens and how quickly. Liquidity that vanishes in stress is not liquidity when you need it.",
  "impermanent-loss":
    "Impermanent loss is LP underperformance versus simply holding the assets when prices diverge. Fees may or may not compensate.\n\nExiting crystallizes the gap. Model scenarios before providing liquidity, especially in volatile pairs with thin fee income.",
  liquidation:
    "Liquidation forcibly sells collateral when a loan’s health factor fails. Oracles set the trigger price; cascades amplify crashes.\n\nKeep buffers, avoid max leverage while learning, and understand whether liquidations are auction-based or keeper-bot based.",
  staking:
    "Staking locks assets to secure a network or earn protocol rewards. Designs differ on lockups, slashing, and whether you run a validator or delegate.\n\nDelegation adds operator risk. Read unbonding times before treating staked assets as liquid rainy-day funds.",
  validator:
    "Validators propose and attest blocks in proof-of-stake systems. Poor performance or malice can be slashed.\n\nSolo validating needs ops discipline; liquid staking and restaking add layers of smart-contract and operator risk on top of consensus duties.",
  dao: "A DAO coordinates via on-chain rules and votes over treasuries and parameters. Turnout, whale concentration, and proposal quality shape outcomes.\n\nGovernance is a security surface: malicious upgrades can drain funds with a “successful” vote. Read payloads, not only titles.",
  nft: "Non-fungible tokens represent unique items. Ownership of the token is on-chain; media and traits often live off-chain and depend on pinning or servers.\n\nVerify contract addresses, royalty policies, and metadata mutability. Same artwork, different contract, is a classic trap.",
  ipfs: "IPFS addresses content by hash so integrity can be checked. Permanence still depends on someone pinning the data.\n\nWhen NFTs or docs cite IPFS, ask who pins and what happens if gateways vanish. Content addressing ≠ automatic forever hosting.",
  ens: "ENS maps human-readable names to addresses and records. It reduces typos but names expire and resolution can be hijacked if you skip checks.\n\nAlways re-check the resolved address on a trusted path before sending size.",
  layer1:
    "A layer-1 chain provides its own consensus and settlement security. Fees and throughput reflect that base-layer scarcity.\n\nL1s are where final dispute resolution often lives for rollups. Understanding L1 fees and finality helps you interpret L2 promises.",
  layer2:
    "Layer-2 systems scale execution while aiming to inherit security from an L1. Rollups dominate the current design space.\n\nUsers should learn bridge trust, sequencer assumptions, and exit windows. “Cheaper Ethereum” still has its own operational map.",
  "zk-proof":
    "Validity proofs convince a verifier that a batch is correct without re-executing everything. ZK rollups use them to settle succinctly on L1.\n\n“ZK” branding does not answer who sequences, who upgrades, or how bridges work. Ask what is proven and what remains trusted.",
  "fraud-proof":
    "Fraud proofs challenge invalid optimistic batches during a window. Watchers must be able to access data and submit evidence.\n\nIf data is missing or watchers fail, security assumptions weaken. Optimistic systems trade latency to finality for simpler proving.",
  blob: "Blobs provide cheaper temporary data space for rollups to post transaction data. Lower DA cost is a major reason L2 fees fell.\n\nBlobs are infrastructure, not a user product by themselves. They enable applications; they do not remove bridge or signing risk.",
  wallet:
    "A wallet manages keys and constructs signatures. Coins live on-chain; the wallet holds control, not a custodial balance unless it is an exchange account.\n\nChoose hot versus cold based on size and frequency. Backup discipline matters more than brand aesthetics.",
  "cold-storage":
    "Cold storage keeps keys offline to shrink remote attack surface. It fits long-term holdings better than high-frequency trading.\n\nTest receive and small send flows before parking size. Operational mistakes (wrong chain, wrong address) still apply offline.",
  kyc: "KYC is identity verification on platforms for compliance. It is distinct from blockchain addresses and creates privacy and data-breach trade-offs.\n\nUnderstand what you give up for fiat ramps. Self-custody does not erase KYC history at on-ramps you already used.",
  dex: "Decentralized exchanges settle trades via smart contracts, usually non-custodially. Users keep keys and bear signature and MEV risk.\n\nVerify router contracts and token addresses. A DEX UI can still be phishing even when the underlying protocol is reputable.",
  cex: "Centralized exchanges offer fast matching and fiat ramps with custody risk. You hold an IOU until you withdraw.\n\nUse them as tools, not vaults. Withdraw size you care about, enable strong account security, and watch for lookalike apps.",
  dapp: "A dapp places critical logic on-chain while the frontend may still be centralized. Domain takeover can point users at malicious contract calls.\n\nBookmark official URLs, prefer verified contract interactions, and treat frontend trust as part of the threat model.",
  hash: "A cryptographic hash maps data to a fixed digest. Tiny input changes flip the output; finding collisions is designed to be hard.\n\nHashes link blocks, address content, and commit to messages. They are the glue of integrity checks across crypto systems.",
  block:
    "A block batches transactions into a linked history. Size and time targets shape throughput and fee markets.\n\nExplorers show height, proposer, and included txs. Understanding blocks helps you interpret confirmations and reorg risk.",
  "private-key":
    "A private key authorizes spends. Sharing it—or a seed that derives it—is equivalent to sharing the funds.\n\nNever type keys into websites, chat apps, or “support” forms. Hardware isolation helps; operational caution still decides outcomes.",
  "public-key":
    "A public key verifies signatures corresponding to a private key. Addresses are usually derived from hashing the public key.\n\nPublic keys and addresses are shareable for receiving. Privacy practices still matter if you reuse them widely.",
  address:
    "An address is the identifier used to receive funds on a network. Sending to the wrong chain or a typo address is often irreversible.\n\nCopy carefully, verify a few characters at start and end, and send a test when moving size to a new destination.",
  confirmation:
    "Confirmations count how many blocks have been built on top of your transaction. More depth makes reorgs harder.\n\nServices pick different thresholds for different sizes. Patience is a security control for large settlement.",
  "smart-contract":
    "A smart contract is a program deployed to a chain address. It can custody assets and enforce rules without a traditional intermediary.\n\nBugs, admin keys, and unexpected integrations create risk. Prefer audited, time-tested code paths when learning with real funds.",
  token:
    "Tokens are asset units accounted by contracts. Names and tickers can be cloned; contract addresses identify the real asset.\n\nAlways verify the address from a trusted source before swapping or adding liquidity.",
  "erc-20":
    "ERC-20 is the dominant fungible token interface on Ethereum-like chains. It standardizes transfer and approval behaviors for wallets and DEXs.\n\nApprovals are part of the standard—and part of the risk. Understand allowance mechanics before farming new tokens.",
  permissionless:
    "Permissionless systems allow anyone to use or deploy without allowlists. Open access fuels innovation and scams together.\n\nYour filter becomes personal: verify contracts, prefer reputation with evidence, and size experiments small.",
  custody:
    "Custody means a third party holds keys or assets for you. Convenience trades against counterparty and operational risk.\n\nSelf-custody shifts ops to you. Hybrid approaches—exchange for trading, cold storage for savings—are common literate patterns.",
  "yield-farming":
    "Yield farming allocates liquidity across protocols to earn rewards. High APRs are often temporary and paid in volatile reward tokens.\n\nModel exit liquidity and smart-contract risk. Farming is a strategy, not a savings account.",
  airdrop:
    "Airdrops distribute tokens for growth or community rewards. Claiming can involve signatures that are safer—or much less safe—than they look.\n\nWatch for phishing claim sites and tax surprises. If a claim asks for your seed, it is not an airdrop.",
  whitepaper:
    "A whitepaper explains design goals and mechanisms. Prefer concrete rules, threat models, and parameters over vibe decks.\n\nTreat papers as starting claims to verify in code and production behavior, not as guarantees.",
  halving:
    "Bitcoin’s halving periodically cuts the block subsidy. New supply issuance slows on a known schedule.\n\nIt does not guarantee price rises. It does illustrate how security budgets and fee markets evolve as subsidies decline.",
  "merkle-tree":
    "Merkle trees hash data into a root so inclusion can be proven efficiently. Light clients and many proof systems rely on them.\n\nThey let you verify a piece belongs to a committed set without downloading everything—core to scalable verification.",
  nonce:
    "An account nonce sequences transactions so each is processed once in order. Stuck transactions are often replaced by resending the same nonce with a higher fee.\n\nUnderstanding nonces demystifies “pending forever” wallets and replacement flows.",
  blockchain:
    "A blockchain is a replicated ledger secured by cryptography and consensus. Participants verify history instead of trusting a single database operator.\n\nIt is infrastructure for settlement and programmable custody—not automatically a good investment or a scam-free zone.",
  lending:
    "On-chain lending markets let users supply assets to earn interest or borrow against collateral. Overcollateralization and liquidations manage risk without traditional credit checks.\n\nWatch oracle design, interest curves, and isolation modes. Borrowing is a tool; max leverage while learning is usually a trap.",
};

const glossaryLongZh = {
  gas: "Gas 计量一笔交易要求网络执行多少计算与存储。没有计量，公共链可能被无限循环或垃圾交易拖垮。手续费大致是用量×单价；拥堵时单价随区块空间需求上升。\n\n失败交易仍可能扣 Gas，因为验证者已经执行过。实用习惯：预估费用，学习阶段可避开高峰，也不要把失败提示当成免费重试。",
  gwei: "Gwei 是用来报价 Gas 的以太小数单位。1 ETH = 10^9 Gwei。钱包常用 Gwei 显示最高费用与优先费，方便比较紧急程度。\n\n看教程或内存池截图时务必核对单位。把 Gwei 报价和 ETH 转账数量搞混，是导致多付或少付的经典新手错误。",
  evm: "以太坊虚拟机是执行智能合约字节码的共享运行时。多数“EVM 兼容”链复用操作码与工具，便于部署相似合约。\n\n兼容关乎开发体验，不等于相同安全或经济。部署前确认所在链、可信浏览器，以及是否涉及代理升级模式。",
  amm: "自动做市商用资金池公式定价，而不是经典订单簿。流动性提供者存入资产赚手续费，并承担称为无常损失的库存风险。\n\n假池与仿盘代币是常见陷阱。核对合约地址、池深与费率档。AMM 是强原语——把它当作数学透明、流向敌对的市场。",
  tvl: "TVL 汇总协议合约中锁定的资产。高 TVL 可能代表使用与信任——也可能只是循环计算的注水与更大的攻击目标。\n\n把 TVL 与审计质量、管理员密钥、预言机设计与真实费用收入一起看。没有上下文的头条数字是营销指标，不是安全评级。",
  apy: "APY 按含复利假设年化收益。把短期激励年化成三位数 APY 常常误导，因为排放、币价与可持续性不稳定。\n\n同类比较：持久手续费 APY 对比临时奖励 APY。问激励结束后会发生什么，以及退出是否会毁掉仓位。",
  apr: "APR 是不含复利的年化利率。借贷界面常并排展示供应 APR 与借贷 APR；产品口径不同。\n\n比较 APR 与 APY 时，确认复利频率以及是否计入奖励币。定义精确，才能避免错误的“更好利率”结论。",
  slippage: "滑点是预期价与成交价的差距。浅池、大额与波动时刻会拉大差距。\n\n滑点设太宽易被夹心；太严会失败且可能仍耗 Gas。按交易规模与池深有意设置，大额兑换可优先私有提交。",
  mev: "MEV 是通过控制交易排序、纳入或审查可提取的价值。公开内存池让搜寻者发现大额兑换并竞争捕获。\n\n缓解包括更严滑点、私有订单流、批量拍卖，以及拆单。理解 MEV，就能解释为何“同一笔交易、更差成交”不一定是 UI bug。",
  oracle: "预言机把链下事实——尤其是价格——送到链上，供合约反应。借贷清算与永续标记价依赖喂价完整性。\n\n低流动性市场更容易被操纵出坏预言机印记。优先选择聚合稳健、有熔断、喂价停摆时行为清晰的协议。",
  rollup: "卷叠在基链之外执行，并把数据或证明交回，使 L1 能保障结果。乐观设计靠挑战期；有效性卷叠靠证明。\n\n用户费用下降是因为许多交易分摊 L1 成本。风险清单仍包括桥、排序器、升级密钥与强制退出如何工作。",
  sequencer: "排序器排列 L2 交易，并常提供快速软确认。今天许多排序器仍较中心化，影响宕机与抗审查。\n\n去中心化排序是重要路线图。在此之前，把软确认当便利，并理解运营方作恶时通往 L1 强制纳入的路径。",
  finality: "最终性描述交易何时实际上不可逆。有的协议有明确最终性装置；有的是概率最终，随深度增强。\n\n交易所按这些假设选择确认数。大额转账请等待对手方真正要求的最终性——而不是第一声“成功”提示。",
  utxo: "未花费交易输出是比特币类系统追踪可花费币的方式。余额是你能签名的 UTXO 之和；花费会消费输出并可能产生找零。\n\nUTXO 记账不同于账户余额，影响费用、隐私与选币。轻钱包隐藏细节——全节点能让你看清为何合并有意义。",
  eoa: "外部账户由私钥直接控制，没有合约代码。多数经典钱包是 EOA：签名即授权。\n\n没有密码重置。助记词丢失即资产丢失。智能账户改变模型；若仍用 EOA，离线备份与防钓鱼就是一切。",
  multisig: "多重签名账户在资金移动前需要 M-of-N 批准。金库与团队用它消除单钥失败。\n\n设计权衡包括阈值、签名人地理多样性与恢复演练。从不演练的多签，可能在最糟时刻失败。",
  "seed-phrase":
    "助记词可重建钱包密钥。任何看到单词的人都能在别处重建钱包——客服从不需要它来“验证”你。\n\n离线保存，永不输入网站，并假设被拍照的助记词已泄露。若泄露，立即在干净设备迁移到新助记词。",
  allowance:
    "授权额度限制 spender 合约可通过 transferFrom 花费你代币的上限。无限授权对频繁交易者方便，对其他人危险。\n\n定期检查并撤销不用的授权。学习新应用时偏好精确或适度额度。",
  approve:
    "Approve 交易设置或修改授权。它本身不转移代币，却为 spender 地址之后的花费开门。\n\n仔细阅读 spender，模拟效果，警惕要求向未知合约授权的钓鱼。授权是顶级盗刷向量。",
  rug: "跑路指内部人抽走流动性或募资后弃项目。预警包括流动性不可撤、管理员不透明、只喊收益。\n\n尽调既社交也技术：团队可问责性、合约权限、流动性是否锁定。若说不清退出，就不要上大仓。",
  phishing:
    "钓鱼用假站、广告与身份骗取密钥或签名。同形域名与假客服私信是常客。\n\n用书签，忽略钱包品牌的搜索广告，永不分享助记词。不确定时，在第二渠道核实再签名。",
  bridge:
    "桥跨链移动资产或消息。官方桥更多继承本卷叠安全模型；快速桥常为速度增加额外信任假设。\n\n总是先小额试，核对方官网 URL，并理解退款行为。桥风险历史上集中且不容错。",
  stablecoin:
    "稳定币试图锚定如美元的稳定参照。设计包括法币储备、加密抵押与算法机制——失败方式各异。\n\n了解发行人证明质量、冻结政策与赎回路径。当稳定币是工作流核心时，注意分散。",
  liquidity:
    "流动性是在不太移动价格的情况下成交规模的能力。深池降低滑点；可撤或虚高的流动性会伪造安全感。\n\n检查谁能抽走 LP，以及多快。压力下消失的流动性，不是你需要时的流动性。",
  "impermanent-loss":
    "无常损失是相对简单持有而言，价格偏离时 LP 的表现落后。手续费未必补得回来。\n\n退出会把差距变“常”。提供流动性前先建模，尤其在费用收入薄的波动对上。",
  liquidation:
    "当贷款健康度不足时，清算强制出售抵押品。预言机设定触发价；级联会放大崩盘。\n\n留缓冲，学习阶段避免拉满杠杆，并弄清清算是拍卖还是 keeper 机器人。",
  staking:
    "质押锁定资产以保障网络或赚取协议奖励。锁定期、罚没以及自营验证人或委托各不相同。\n\n委托增加运营方风险。在把质押资产当雨天流动性之前，先读解锁时间。",
  validator:
    "验证者在 PoS 中提议并证明区块。表现差或作恶可能被罚没。\n\n独自验证需要运维纪律；流动质押与再质押在共识职责之上再叠合约与运营方风险。",
  dao: "DAO 通过链上规则与投票协调金库与参数。投票率、巨鲸集中度与提案质量塑造结果。\n\n治理是安全面：恶意升级可以靠“成功”投票掏空资金。读载荷，而不只读标题。",
  nft: "非同质代币代表独特物品。代币所有权在链上；媒体与性状常在链下，依赖固定或服务器。\n\n核对合约地址、版税政策与元数据可变性。同图不同合约是经典陷阱。",
  ipfs: "IPFS 按哈希寻址内容以便校验完整性。持久性仍取决于有没有人固定数据。\n\n当 NFT 或文档引用 IPFS，问谁在固定、网关消失会怎样。内容寻址≠自动永久托管。",
  ens: "ENS 把可读名称映射到地址与记录。它减少拼写错误，但名称会过期，若跳过检查解析也可能被劫持。\n\n大额发送前，始终在可信路径上复核解析地址。",
  layer1:
    "一层链提供自有共识与结算安全。费用与吞吐反映基层稀缺。\n\n对卷叠而言，最终争议解决往往落在 L1。理解 L1 费用与最终性，有助于解读 L2 承诺。",
  layer2:
    "二层系统扩展执行，并力求继承 L1 安全。卷叠主导当前设计空间。\n\n用户应学习桥信任、排序器假设与退出窗口。“更便宜的以太坊”仍有自己的运营地图。",
  "zk-proof":
    "有效性证明让验证者相信批次正确而无需重放全部执行。ZK 卷叠用它在 L1 简洁结算。\n\n“ZK”品牌不回答谁排序、谁升级或桥如何工作。问清证明了什么、仍信任什么。",
  "fraud-proof":
    "欺诈证明在窗口期内挑战无效的乐观批次。观察者必须能获取数据并提交证据。\n\n若数据缺失或观察者失败，安全假设变弱。乐观系统用最终性延迟换更简单的证明。",
  blob: "Blob 为卷叠提供更便宜的临时数据空间以发布交易数据。更低 DA 成本是 L2 费用下降的主因之一。\n\nBlob 是基础设施，本身不是用户产品。它使应用可行；它不消除桥或签名风险。",
  wallet:
    "钱包管理密钥并构造签名。币在链上；钱包持有控制权，除非它是交易所账户那样的托管余额。\n\n按金额与频率选择热/冷。备份纪律比品牌美学更重要。",
  "cold-storage":
    "冷存储让密钥离线以缩小远程攻击面。它更适合长期持有，而非高频交易。\n\n在停放大额前测试收款与小额发送。运维错误（错链、错地址）在离线时同样适用。",
  kyc: "KYC 是平台为合规做的身份核验。它不同于区块链地址，并带来隐私与数据泄露权衡。\n\n弄清为法币通道放弃了什么。自托管抹不掉你已在入金通道留下的 KYC 历史。",
  dex: "去中心化交易所通过智能合约结算，通常非托管。用户自持密钥，并承担签名与 MEV 风险。\n\n核对路由合约与代币地址。即便底层协议有口碑，DEX 前端仍可能是钓鱼。",
  cex: "中心化交易所提供快速撮合与法币通道，伴随托管风险。提现前你持有的是 IOU。\n\n把它们当工具，不当金库。提出你在意的额度，开启强账户安全，并提防仿盘应用。",
  dapp: "DApp 把关键逻辑放在链上，前端仍可能中心化。域名被夺可把用户指向恶意合约调用。\n\n收藏官方 URL，优先经验证的合约交互，并把前端信任纳入威胁模型。",
  hash: "加密哈希把数据映射为固定摘要。输入微小变化会翻转输出；找碰撞被设计为困难。\n\n哈希链接区块、寻址内容并承诺消息。它们是加密系统完整性检查的胶水。",
  block:
    "区块把交易批进链接的历史。大小与出块时间目标塑造吞吐与费用市场。\n\n浏览器显示高度、提议者与包含交易。理解区块有助于解读确认与重组风险。",
  "private-key":
    "私钥授权花费。分享它——或派生它的助记词——等于分享资金。\n\n永不把密钥输入网站、聊天或“客服”表单。硬件隔离有帮助；运维谨慎仍决定结果。",
  "public-key":
    "公钥验证与私钥对应的签名。地址通常由哈希公钥派生。\n\n公钥与地址可分享用于收款。若广泛复用，隐私实践仍重要。",
  address:
    "地址是在网络上收款的标识。发错链或拼写错误地址通常不可逆。\n\n仔细复制，核对首尾若干字符，向新目的地转移大额时先测试。",
  confirmation:
    "确认数计算在你的交易之上又建造了多少区块。更深使重组更难。\n\n服务按金额选择不同阈值。耐心是大额结算的安全控制。",
  "smart-contract":
    "智能合约是部署到链上地址的程序。它可以托管资产并在没有传统中介的情况下执行规则。\n\n漏洞、管理员密钥与意外集成带来风险。用真金学习时，优先审计充分、时间验证的路径。",
  token:
    "代币是由合约记账的资产单位。名称与代号可被克隆；合约地址才识别真实资产。\n\n兑换或加流动性前，始终从可信来源核对地址。",
  "erc-20":
    "ERC-20 是以太坊类链上主导的同质代币接口。它标准化转账与授权行为，方便钱包与 DEX。\n\n授权是标准的一部分——也是风险的一部分。农新币前先理解额度机制。",
  permissionless:
    "无许可系统允许任何人使用或部署而无需白名单。开放接入同时助燃创新与诈骗。\n\n过滤器变成个人的：核对合约，偏好有证据的声誉，小额试验。",
  custody:
    "托管意味着第三方为你持有密钥或资产。便利与对手方/运营风险对换。\n\n自托管把运维交给你。混合做法——交易用交易所、储蓄用冷存储——是常见素养模式。",
  "yield-farming":
    "收益农耕把流动性配置到各协议以赚奖励。高 APR 往往短暂，并以波动奖励币支付。\n\n建模退出流动性与合约风险。农耕是策略，不是储蓄账户。",
  airdrop:
    "空投为增长或社区奖励分发代币。领取可能涉及看起来更安全——或危险得多——的签名。\n\n提防钓鱼领取站与税务意外。若领取要助记词，那就不是空投。",
  whitepaper:
    "白皮书解释设计目标与机制。相对氛围幻灯片，更偏好具体规则、威胁模型与参数。\n\n把论文当起始主张，要在代码与生产行为中核实，而不是当保证。",
  halving:
    "比特币减半周期性削减区块补贴。新供给按已知日程变慢。\n\n它不保证涨价。它确实说明安全预算与费用市场如何随补贴下降而演变。",
  "merkle-tree":
    "默克尔树把数据哈希成根，以便高效证明包含。轻客户端与许多证明系统依赖它。\n\n它让你在不下载一切的情况下验证某片属于已承诺集合——可扩展验证的核心。",
  nonce:
    "账户 nonce 为交易排序，使每笔按序只处理一次。卡住的交易常用同一 nonce 配更高费用替换。\n\n理解 nonce，就能看懂“永远 pending”的钱包与替换流程。",
  blockchain:
    "区块链是由密码学与共识保护的复制账本。参与者验证历史，而不是信任单一数据库运营方。\n\n它是结算与可编程托管的基础设施——不自动等于好投资或无骗局区。",
  lending:
    "链上借贷市场让用户供给资产赚利息，或以抵押借款。超额抵押与清算在没有传统征信的情况下管理风险。\n\n关注预言机设计、利率曲线与隔离模式。借款是工具；学习阶段拉满杠杆通常是陷阱。",
};

function expandChronicle(locale) {
  const base = JSON.parse(fs.readFileSync(path.join(root, locale, "chronicle.json"), "utf8"));
  const extra = locale === "zh" ? chronicleExtraZh : chronicleExtraEn;
  return base.map((e) => {
    const more = extra[e.id];
    if (!more) return e;
    // avoid double-append if re-run
    if (e.body.includes(more.slice(0, 40))) return e;
    return { ...e, body: `${e.body}\n\n${more}` };
  });
}

function expandGlossary(locale) {
  const base = JSON.parse(fs.readFileSync(path.join(root, locale, "glossary.json"), "utf8"));
  const long = locale === "zh" ? glossaryLongZh : glossaryLongEn;
  return base.map((t) => {
    const explain = long[t.id] || t.explain;
    return { ...t, explain };
  });
}

write("en", "news", newsEn);
write("zh", "news", newsZh);
write("en", "chronicle", expandChronicle("en"));
write("zh", "chronicle", expandChronicle("zh"));
write("en", "glossary", expandGlossary("en"));
write("zh", "glossary", expandGlossary("zh"));

console.log(
  "Enriched news",
  newsEn.length,
  "avg body",
  Math.round(newsEn.reduce((a, n) => a + n.body.length, 0) / newsEn.length),
);
console.log("Chronicle/glossary expanded for en+zh");
