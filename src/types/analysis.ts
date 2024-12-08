export interface TransactionHistory {
  transaction_id: string;
  transaction_type: string;
  transaction_amount: string;
  transaction_time: string;
  transaction_status: string;
}

export interface VulnerableAsset {
  asset_name: string;
  asset_token_symbol: string;
  reason: string;
}

export interface MarketTrendAnalysis {
  top_gainer: {
    token_name: string;
    price_change: string;
  };
  top_loser: {
    token_name: string;
    price_change: string;
  };
}

export interface Token {
  name: string;
  symbol: string;
  balance: string;
  value: number;
  contract_address: string;
  category?: string;
}

export interface YieldOpportunity {
  protocol: string;
  apy: string;
  token: string;
  risk_level: string;
  min_deposit?: string;
}

export interface PortfolioAnalysis {
  unrealised_pnl: string;
  user_wallet_address: string;
  chain: string;
  tokens: Token[];
  transaction_history: TransactionHistory[];
  short_descriptive_analysis_of_portfolio: string;
  vulnerable_assets: VulnerableAsset[];
  yield_opportunities: YieldOpportunity[];
  market_trend_analysis: MarketTrendAnalysis;
  timestamp: number;
}

export interface CategorizedToken {
  name: string;
  symbol: string;
  balance: string;
  value: number;
}

export interface CategoryResponse {
  wallet_address: string;
  categories: {
    DeFi: CategorizedToken[];
    Stablecoins: CategorizedToken[];
    Memecoins: CategorizedToken[];
    L1s: CategorizedToken[];
    L2s: CategorizedToken[];
    Infrastructure: CategorizedToken[];
    Gaming: CategorizedToken[];
    DAOs: CategorizedToken[];
    Metaverse: CategorizedToken[];
    GovernanceTokens: CategorizedToken[];
    PrivacyCoins: CategorizedToken[];
    Others: CategorizedToken[];
  };
} 