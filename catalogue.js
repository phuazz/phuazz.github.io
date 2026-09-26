// Shared public catalogue. Task describes purpose, never freshness or execution authority.
const CATS=[
  {
    "id": "trend",
    "label": "Trend & Momentum",
    "icon": "<polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"/><polyline points=\"17 6 23 6 23 12\"/>",
    "kind": "g"
  },
  {
    "id": "stock",
    "label": "Stock Selection & Timing",
    "icon": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/>",
    "kind": "g"
  },
  {
    "id": "crypto",
    "label": "Crypto",
    "icon": "<circle cx=\"8\" cy=\"8\" r=\"6\"/><path d=\"M18.09 10.37A6 6 0 1 1 10.34 18\"/><path d=\"M7 6v4M6 8h2\"/>",
    "kind": "g"
  },
  {
    "id": "regime",
    "label": "Market Regime, Breadth & Risk",
    "icon": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/>",
    "kind": "o"
  },
  {
    "id": "portfolio",
    "label": "Portfolio Construction & Defence",
    "icon": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/>",
    "kind": "o"
  },
  {
    "id": "regional",
    "label": "Regional & Case Studies",
    "icon": "<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/>",
    "kind": "g"
  }
];
const TASKS=[
  {
    "id": "monitor",
    "label": "Monitor markets"
  },
  {
    "id": "research",
    "label": "Review research"
  },
  {
    "id": "plan",
    "label": "Plan & learn"
  }
];
const DASH=[
  {
    "c": "trend",
    "t": "Momentum Rotation",
    "u": "https://phuazz.github.io/momentum-rotation/",
    "tags": [
      "Cross-Asset",
      "Replication",
      "Monthly"
    ],
    "d": "Monthly cross-asset momentum replication with trend filtering, allocation variants and universe-sensitivity checks. Compare the rules and benchmarks in the research view.",
    "task": "research"
  },
  {
    "c": "trend",
    "t": "12-Month SMA Trend Following",
    "u": "https://phuazz.github.io/12M-SMA-Trend-Following/",
    "tags": [
      "Trend Following",
      "Monthly"
    ],
    "d": "Explore a monthly moving-average trend filter and its historical comparison with buy and hold.",
    "task": "research"
  },
  {
    "c": "trend",
    "t": "SAA Trend-Overlay Lab",
    "u": "https://phuazz.github.io/saa-trend-overlay-lab/",
    "tags": [
      "Trend Following",
      "Asset Allocation",
      "Faber",
      "Monthly"
    ],
    "d": "Research on trend overlays for strategic asset allocation. Compare per-asset and portfolio-level rules, weighting choices and historical outcomes.",
    "task": "research"
  },
  {
    "c": "trend",
    "t": "Supertrend vs MACD",
    "u": "https://phuazz.github.io/supertrend-vs-macd/",
    "tags": [
      "Trend Following"
    ],
    "d": "Compare breakout, pullback and MACD-confirmation entry rules within a Supertrend exit framework.",
    "task": "research"
  },
  {
    "c": "trend",
    "t": "Global ETF Trend Scanner",
    "u": "https://phuazz.github.io/Global-ETF-Trend-Scanner/",
    "tags": [
      "Cross-Asset",
      "Backtest Engine"
    ],
    "d": "Cross-asset ETF trend and momentum screening, with a backtest engine and an event-study view.",
    "task": "monitor"
  },
  {
    "c": "trend",
    "t": "Trend Replication Lab",
    "u": "https://phuazz.github.io/trend-replication-lab/",
    "tags": [
      "Trend Following",
      "CTA Replication",
      "ETF-Native",
      "Weekly"
    ],
    "d": "An ETF-native replication of a diversified trend-following methodology. Examine signal construction, volatility targeting, rebalancing and costs. Research replication, not a deployed strategy.",
    "task": "research"
  },
  {
    "c": "stock",
    "t": "Darvas Box Scanner",
    "u": "https://phuazz.github.io/darvas-box-scanner/",
    "tags": [
      "Breakout"
    ],
    "d": "Price-channel breakout screening with volume confirmation and trailing box-bottom stops.",
    "task": "monitor"
  },
  {
    "c": "stock",
    "t": "VCP Screener",
    "u": "https://phuazz.github.io/vcp-screener/",
    "tags": [
      "VCP",
      "Trend Template",
      "Watchlist + Sleeve"
    ],
    "d": "Volatility-contraction and trend-template screening for stock ideas, with research on watchlist and portfolio-sleeve use.",
    "task": "monitor"
  },
  {
    "c": "stock",
    "t": "Parabolic Scale-Out Monitor",
    "u": "https://phuazz.github.io/parabolic-scale-out/",
    "tags": [
      "Scale-Out",
      "Tranche State"
    ],
    "d": "Track daily-close scale-out conditions for a selected list of extended equities and ETFs.",
    "task": "monitor"
  },
  {
    "c": "stock",
    "t": "Buy the Dip",
    "u": "https://phuazz.github.io/buy-the-dip/",
    "tags": [
      "Mean Reversion",
      "Point-in-Time"
    ],
    "d": "Stock-level dip-buying research using a point-in-time universe. Inspect the trend filter, short-term reversal trigger and exit mechanics.",
    "task": "research"
  },
  {
    "c": "crypto",
    "t": "Crypto MAV Strategy",
    "u": "https://phuazz.github.io/Crypto-MAV-Strategy/",
    "tags": [
      "Regime-Based",
      "Crypto",
      "Weekly"
    ],
    "d": "Research a weekly moving-average regime strategy across selected major crypto assets.",
    "task": "research"
  },
  {
    "c": "crypto",
    "t": "Crypto Breadth & Momentum",
    "u": "https://phuazz.github.io/crypto-breadth/",
    "tags": [
      "Cross-Sectional Momentum",
      "Breadth-Gated"
    ],
    "d": "Crypto momentum research combining market breadth, rolling liquidity, individual trend filters and portfolio sizing. Research, not a deployed strategy.",
    "task": "research"
  },
  {
    "c": "crypto",
    "t": "Perp Funding Scanner",
    "u": "https://phuazz.github.io/Perp-Funding-Scanner/",
    "tags": [
      "Crypto Perps",
      "Funding + Trend"
    ],
    "d": "Screen crypto perpetuals using funding conditions and multi-timeframe trend readings.",
    "task": "monitor"
  },
  {
    "c": "regime",
    "t": "Equity Defence Dashboard",
    "u": "https://phuazz.github.io/equity-defense-dashboard/",
    "tags": [
      "Defence",
      "Risk Monitoring",
      "Drawdown Control"
    ],
    "d": "Monitor tail-risk indicators, volatility conditions and protective-overlay signals. Check each indicator’s data date and interpretation.",
    "task": "monitor"
  },
  {
    "c": "regime",
    "t": "Breadth-Thrust Signal",
    "u": "https://phuazz.github.io/breadth-thrust-signal/",
    "tags": [
      "Breadth",
      "Forward-Return Study"
    ],
    "d": "Breadth-based conviction readings alongside a conditional forward-return study and its comparison baseline.",
    "task": "monitor"
  },
  {
    "c": "regime",
    "t": "Market Regime Dashboard",
    "u": "https://phuazz.github.io/market-regime-dashboard/",
    "tags": [
      "Macro",
      "Recession + Froth"
    ],
    "d": "Read recession risk, market froth and price-trend confirmation in separate views built from public data.",
    "task": "monitor"
  },
  {
    "c": "regime",
    "t": "Scenario Analysis Tracker",
    "u": "https://phuazz.github.io/scenario-analysis-tracker/",
    "tags": [
      "Signal Tracker",
      "Credibility Gate",
      "Actual vs Expected"
    ],
    "d": "Record research signals and scenarios, then compare observed outcomes with the original expectations and credibility assessment.",
    "task": "monitor"
  },
  {
    "c": "regime",
    "t": "Event Studies",
    "u": "https://phuazz.github.io/event-studies/",
    "tags": [
      "Event Study",
      "Pre-Registered"
    ],
    "d": "Pre-registered event research: historical triggers, independent episodes and forward-return distributions compared with a baseline.",
    "task": "research"
  },
  {
    "c": "regime",
    "t": "Crowd Sentiment Composite",
    "u": "https://phuazz.github.io/crowd-sentiment/",
    "tags": [
      "Sentiment",
      "Contrarian",
      "Daily"
    ],
    "d": "Review crowd sentiment across surveys, positioning, options and breadth, with the associated research and published negative results.",
    "task": "monitor"
  },
  {
    "c": "portfolio",
    "t": "Portfolio Command Centre",
    "u": "https://phuazz.github.io/Portfolio-Command-Centre/",
    "tags": [
      "Multi-Strategy"
    ],
    "d": "Portfolio monitoring, equity curves, drawdowns and strategy attribution across the strategies represented in the tool.",
    "task": "monitor"
  },
  {
    "c": "portfolio",
    "t": "Long-Term Portfolio Construction",
    "u": "https://phuazz.github.io/Long-Term-Portfolio-Construction/",
    "tags": [
      "Allocation",
      "Multi-Asset",
      "Strategic",
      "Mandate-First"
    ],
    "d": "Set a portfolio mandate, compare strategic allocations and examine stress scenarios. The allocation layer complements ETF Starter’s instrument selection. Educational.",
    "task": "plan"
  },
  {
    "c": "portfolio",
    "t": "ETF Starter · Singapore",
    "u": "https://phuazz.github.io/etf-starter-sg/",
    "tags": [
      "ETFs",
      "Core-Satellite",
      "Beginner",
      "Singapore"
    ],
    "d": "An educational ETF selector and core-satellite portfolio builder for Singapore investors, covering costs, domicile and portfolio structure.",
    "task": "plan"
  },
  {
    "c": "portfolio",
    "t": "Property Decision · Singapore",
    "u": "https://phuazz.github.io/sg-property-decision/",
    "tags": [
      "Property",
      "Buy vs Rent",
      "Singapore"
    ],
    "d": "Explore home affordability, financing, buy-versus-rent choices and property segments. Educational; check current assumptions in the tool.",
    "task": "plan"
  },
  {
    "c": "portfolio",
    "t": "Money Snowball · for Kids",
    "u": "https://phuazz.github.io/money-snowball/",
    "tags": [
      "Compounding",
      "Kids",
      "Education",
      "Interactive"
    ],
    "d": "Interactive explanations of compounding, saving, inflation and investment uncertainty, with age-appropriate examples and a parent guide.",
    "task": "plan"
  },
  {
    "c": "portfolio",
    "t": "Multi-Strategy Portfolio",
    "u": "https://phuazz.github.io/multi-strategy-portfolio/",
    "tags": [
      "Model Portfolio",
      "Multi-Sleeve",
      "Daily",
      "Paper"
    ],
    "d": "Detailed paper-portfolio monitoring: performance, allocation, attribution and data health. A read-only consumer of the Breadth-Thrust ETF research engine.",
    "task": "monitor"
  },
  {
    "c": "regional",
    "t": "STI–SMID Vol Rotation",
    "u": "https://phuazz.github.io/sti-smid-rotation/",
    "tags": [
      "Singapore",
      "STI vs SMID"
    ],
    "d": "Monitor a volatility-based rotation rule between Singapore large-cap and small/mid-cap equity exposures.",
    "task": "monitor"
  },
  {
    "c": "regional",
    "t": "COPX Trade Plan",
    "u": "https://phuazz.github.io/COPX-Trade-Plan/",
    "tags": [
      "Case Study",
      "Copper Miners",
      "COPX"
    ],
    "d": "A copper-miner ETF case study covering the thesis, trend, breadth, position sizing and trade-management rules.",
    "task": "plan"
  },
  {
    "c": "portfolio",
    "t": "Portfolio Overview",
    "u": "https://phuazz.github.io/portfolio/",
    "tags": [
      "Portfolio",
      "Overview",
      "Simulated record"
    ],
    "d": "Plain-language view of holdings, allocation and simulated historical performance. Published from the Breadth-Thrust ETF engine; not a separate strategy or a live track record.",
    "task": "monitor"
  },
  {
    "c": "trend",
    "t": "Breadth-Thrust ETF Research",
    "u": "https://phuazz.github.io/breadth-thrust-etf/",
    "tags": [
      "Research engine",
      "Breadth",
      "Portfolio source"
    ],
    "d": "Detailed breadth-thrust ETF methodology and portfolio research. Source engine for the Multi-Strategy Portfolio monitor and Portfolio Overview.",
    "task": "research"
  }
];
document.querySelectorAll("[data-dashboard-count]").forEach(el=>{el.textContent=DASH.length;});
document.querySelectorAll("[data-theme-count]").forEach(el=>{el.textContent=CATS.length;});
