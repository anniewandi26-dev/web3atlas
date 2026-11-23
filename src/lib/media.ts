export const sectionCovers = {
  explore: "/covers/cover-explore.jpg",
  ecosystem: "/covers/cover-ecosystem.jpg",
  news: "/covers/cover-news.jpg",
  chronicle: "/covers/cover-chronicle.jpg",
  security: "/covers/cover-security.jpg",
  glossary: "/covers/cover-glossary.jpg",
} as const;

export const categoryThumbs: Record<string, string> = {
  blockchain: "/covers/thumb-chain.jpg",
  defi: "/covers/thumb-defi.jpg",
  nfts: "/covers/thumb-nft.jpg",
  layer2: "/covers/thumb-l2.jpg",
  infra: "/covers/thumb-wallet.jpg",
  wallets: "/covers/thumb-wallet.jpg",
  gaming: "/covers/thumb-game.jpg",
  daos: "/covers/thumb-dao.jpg",
};

const newsThumbs = [
  "/covers/thumb-l2.jpg",
  "/covers/thumb-wallet.jpg",
  "/covers/thumb-defi.jpg",
  "/covers/thumb-secure.jpg",
  "/covers/thumb-chain.jpg",
  "/covers/thumb-dao.jpg",
  "/covers/thumb-nft.jpg",
  "/covers/thumb-game.jpg",
];

export function newsThumb(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash + id.charCodeAt(i) * (i + 1)) % newsThumbs.length;
  return newsThumbs[hash];
}

export function securityThumb(id: string): string {
  if (id.includes("seed") || id.includes("device")) return "/covers/thumb-wallet.jpg";
  if (id.includes("bridge")) return "/covers/thumb-l2.jpg";
  return "/covers/thumb-secure.jpg";
}

export function chronicleThumb(index: number): string {
  return newsThumbs[index % newsThumbs.length];
}

/** Stable thumb for a glossary term id */
export function glossaryThumb(id: string): string {
  const map: Record<string, string> = {
    gas: "/covers/thumb-l2.jpg",
    gwei: "/covers/thumb-l2.jpg",
    evm: "/covers/thumb-chain.jpg",
    amm: "/covers/thumb-defi.jpg",
    tvl: "/covers/thumb-defi.jpg",
    apy: "/covers/thumb-defi.jpg",
    apr: "/covers/thumb-defi.jpg",
    slippage: "/covers/thumb-defi.jpg",
    mev: "/covers/thumb-secure.jpg",
    oracle: "/covers/thumb-wallet.jpg",
    rollup: "/covers/thumb-l2.jpg",
    sequencer: "/covers/thumb-l2.jpg",
    finality: "/covers/thumb-chain.jpg",
    utxo: "/covers/thumb-chain.jpg",
    eoa: "/covers/thumb-wallet.jpg",
    multisig: "/covers/thumb-secure.jpg",
    "seed-phrase": "/covers/thumb-wallet.jpg",
    allowance: "/covers/thumb-secure.jpg",
    approve: "/covers/thumb-secure.jpg",
    rug: "/covers/thumb-secure.jpg",
    phishing: "/covers/thumb-secure.jpg",
    bridge: "/covers/thumb-l2.jpg",
    stablecoin: "/covers/thumb-defi.jpg",
    liquidity: "/covers/thumb-defi.jpg",
    "impermanent-loss": "/covers/thumb-defi.jpg",
    liquidation: "/covers/thumb-defi.jpg",
    staking: "/covers/thumb-dao.jpg",
    validator: "/covers/thumb-chain.jpg",
    dao: "/covers/thumb-dao.jpg",
    nft: "/covers/thumb-nft.jpg",
    ipfs: "/covers/thumb-nft.jpg",
    ens: "/covers/thumb-wallet.jpg",
    layer1: "/covers/thumb-chain.jpg",
    layer2: "/covers/thumb-l2.jpg",
    "zk-proof": "/covers/thumb-l2.jpg",
    "fraud-proof": "/covers/thumb-l2.jpg",
    blob: "/covers/thumb-l2.jpg",
    wallet: "/covers/thumb-wallet.jpg",
    "cold-storage": "/covers/thumb-wallet.jpg",
    kyc: "/covers/thumb-secure.jpg",
    dex: "/covers/thumb-defi.jpg",
    cex: "/covers/thumb-defi.jpg",
    dapp: "/covers/thumb-game.jpg",
    hash: "/covers/thumb-chain.jpg",
    block: "/covers/thumb-chain.jpg",
    "private-key": "/covers/thumb-wallet.jpg",
    "public-key": "/covers/thumb-wallet.jpg",
    address: "/covers/thumb-wallet.jpg",
    confirmation: "/covers/thumb-chain.jpg",
    "smart-contract": "/covers/thumb-chain.jpg",
    token: "/covers/thumb-defi.jpg",
    "erc-20": "/covers/thumb-defi.jpg",
    permissionless: "/covers/thumb-dao.jpg",
    custody: "/covers/thumb-secure.jpg",
    "yield-farming": "/covers/thumb-defi.jpg",
    airdrop: "/covers/thumb-nft.jpg",
    whitepaper: "/covers/thumb-dao.jpg",
    halving: "/covers/thumb-chain.jpg",
    "merkle-tree": "/covers/thumb-chain.jpg",
    nonce: "/covers/thumb-wallet.jpg",
    blockchain: "/covers/thumb-chain.jpg",
    lending: "/covers/thumb-defi.jpg",
  };
  if (map[id]) return map[id];
  return newsThumb(id);
}

export const glossaryGroups = [
  {
    id: "base",
    titleZh: "底层与账户",
    titleEn: "Base & Accounts",
    image: "/covers/thumb-chain.jpg",
    ids: ["blockchain", "block", "hash", "layer1", "layer2", "eoa", "address", "private-key", "public-key", "wallet", "seed-phrase", "nonce", "confirmation"],
  },
  {
    id: "defi",
    titleZh: "DeFi 与市场",
    titleEn: "DeFi & Markets",
    image: "/covers/thumb-defi.jpg",
    ids: ["amm", "dex", "cex", "tvl", "apy", "apr", "slippage", "liquidity", "impermanent-loss", "liquidation", "lending", "stablecoin", "yield-farming", "mev"],
  },
  {
    id: "scale",
    titleZh: "扩容与数据",
    titleEn: "Scaling & Data",
    image: "/covers/thumb-l2.jpg",
    ids: ["rollup", "sequencer", "blob", "zk-proof", "fraud-proof", "oracle", "bridge", "finality", "gas", "gwei", "evm"],
  },
  {
    id: "secure",
    titleZh: "安全与治理",
    titleEn: "Security & Governance",
    image: "/covers/thumb-secure.jpg",
    ids: ["phishing", "approve", "allowance", "rug", "cold-storage", "multisig", "custody", "kyc", "dao", "airdrop"],
  },
] as const;
