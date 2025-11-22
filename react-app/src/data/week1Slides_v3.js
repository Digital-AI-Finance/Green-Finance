export const week1Slides_v3 = [
  // ============================================================
  // PROBLEM FRAMING (Slides 0-2)
  // ============================================================

  // Slide 0: The Climate Challenge
  {
    id: 0,
    type: 'two_column',
    title: 'The Climate Challenge: Paris Agreement and 2°C Target',
    leftHeader: 'Paris Agreement Commitments (2015)',
    leftBullets: [
      'Limit global temperature increase to well below 2°C (preferably 1.5°C)',
      '197 countries signed legally binding climate treaty',
      'Requires net-zero CO₂ emissions by 2050-2070',
      'Current trajectory: 2.7°C warming by 2100 (UN 2024)'
    ],
    rightHeader: 'The Finance Gap Problem',
    rightBullets: [
      'Required annual climate investment: $4.0-6.0 trillion (McKinsey 2024)',
      'Current annual investment: ~$1.96 trillion (2024)',
      'Investment gap: $2.04 trillion per year',
      'Public finance insufficient - private capital essential'
    ],
    bottomNote: 'Context: Climate crisis creates massive investment demand but traditional finance lacks mechanisms to channel capital efficiently',
    goalReference: null,
    progressStage: 0
  },

  // Slide 1: Investment Gap Chart
  {
    id: 1,
    type: 'interactive_chart',
    title: 'The Green Finance Investment Gap: Data Puzzle',
    chartType: 'investment_gap',
    bottomNote: 'Problem: $2.04T annual shortfall - How do we mobilize this capital at scale?',
    goalReference: null,
    progressStage: 0
  },

  // Slide 2: Green Finance Solution Overview
  {
    id: 2,
    type: 'two_column',
    title: 'Green Finance: Linking Capital Markets to Climate Action',
    leftHeader: 'What is Green Finance?',
    leftBullets: [
      'Financial instruments explicitly linked to environmental projects',
      'Channels capital to climate mitigation and adaptation',
      'Combines market discipline with environmental impact',
      'Key innovation: Verification and transparency standards'
    ],
    rightHeader: 'How This Week Answers the Problem',
    rightBullets: [
      'Lecture 1: WHY it works (market theory - Goal 1)',
      'Lecture 2: HOW BIG it is (measurement - Goal 2)',
      'Lecture 3: HOW TO VALUE (pricing math - Goal 3)',
      'Lecture 4: REAL APPLICATIONS (integration and cases)'
    ],
    bottomNote: 'Solution: Green finance provides market-based mechanism to close investment gap - this week covers theory, data, and practice',
    goalReference: null,
    progressStage: 0
  },

  // ============================================================
  // LECTURE 1: Foundations (Slides 3-13) - Goal 1
  // ============================================================

  // Slide 3: Learning Goal 1 Title
  {
    id: 3,
    type: 'learning_goal_title',
    goalNumber: 1,
    goalStatement: 'Understand the market microstructure theory explaining why green finance markets exist and how they function',
    goalType: 'Theoretical',
    narrativeRole: 'Foundation - Establishes theoretical basis',
    progressStage: 1
  },

  // Slide 4: Framework Overview
  {
    id: 4,
    type: 'framework_overview',
    title: 'Market Microstructure Framework for Green Finance',
    frameworkName: 'Information Asymmetry and Signaling Theory',
    leftHeader: 'Core Theoretical Principles',
    leftBullets: [
      'Information asymmetry: Issuers know true environmental impact, investors cannot observe directly',
      'Verification as credible signaling mechanism reducing asymmetry',
      'Market segmentation by investor ESG preferences',
      'Adverse selection risk without credible signals'
    ],
    rightHeader: 'Market Equilibrium Predictions',
    rightBullets: [
      'Greenium emerges from excess demand in segmented market',
      'Verification costs create quality differentiation',
      'Liquidity premium for standardized green instruments',
      'Reputation effects for repeat issuers'
    ],
    bottomNote: '[Goal 1] Theory predicts observable phenomena: greenium, verification prevalence, standardization',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 5: Chart - Ecosystem
  {
    id: 5,
    type: 'interactive_chart',
    title: 'Green Finance Ecosystem: Theoretical Perspective',
    chartType: 'ecosystem_flow',
    bottomNote: '[Goal 1] Ecosystem structure reflects information asymmetry and signaling needs',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 6: Information Asymmetry Problem
  {
    id: 6,
    type: 'two_column',
    title: 'The Information Asymmetry Problem',
    leftHeader: 'Why Asymmetry Exists',
    leftBullets: [
      'Environmental impact not directly observable by investors',
      'Issuers possess private information about projects',
      'Ex-post verification costly and delayed',
      'Incentive for greenwashing (false green claims)',
      'Market failure: Good projects cannot distinguish themselves'
    ],
    rightHeader: 'Consequences Without Solution',
    rightBullets: [
      'Adverse selection: Bad drives out good (lemons market)',
      'Risk premium demanded by rational investors',
      'Socially optimal green projects underfunded',
      'Market inefficiency and suboptimal allocation'
    ],
    bottomNote: '[Goal 1] Classic asymmetric information problem from Akerlof (1970) applied to green finance',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 7: Verification as Solution
  {
    id: 7,
    type: 'two_column',
    title: 'Verification as Credible Signaling',
    leftHeader: 'How Verification Solves Asymmetry',
    leftBullets: [
      'Independent third-party assessment provides credible signal',
      'Costly signal (verification fees) separates true green from greenwashing',
      'Ongoing reporting creates reputation stakes for issuers',
      'Standards (GBP, CBI) define what constitutes credible signal'
    ],
    rightHeader: 'Evidence of Signaling at Work',
    rightBullets: [
      'Over 80% of green bonds obtain external review (OECD 2024)',
      'Verified bonds trade at tighter spreads (greenium)',
      'Repeat issuers face reputation costs if greenwashing',
      'Market rewards standardization and transparency'
    ],
    bottomNote: '[Goal 1] Signaling theory (Spence 1973) explains why verification is market standard',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 8: Market Segmentation
  {
    id: 8,
    type: 'two_column',
    title: 'Market Segmentation Hypothesis',
    leftHeader: 'Theory of Segmentation',
    leftBullets: [
      'Investors heterogeneous in ESG preferences (utility function)',
      'Dedicated ESG investors willing to accept lower returns for impact',
      'Conventional investors indifferent to green label',
      'Imperfect substitutability creates separate market segments',
      'Excess demand in green segment creates price premium (greenium)'
    ],
    rightHeader: 'Testable Predictions',
    rightBullets: [
      'Green bonds should trade at premium to identical conventional bonds',
      'Premium larger when ESG investor demand stronger',
      'Premium varies across geographies with different ESG adoption',
      'Limited arbitrage due to preference-based segmentation'
    ],
    bottomNote: '[Goal 1] Segmentation explains persistent greenium despite identical cash flows',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 9: Chart - Segmentation Model
  {
    id: 9,
    type: 'interactive_chart',
    title: 'Market Segmentation Diagram',
    chartType: 'market_segmentation',
    bottomNote: '[Goal 1] Separate demand curves in each segment lead to price differential (greenium)',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 10: Liquidity and Standardization
  {
    id: 10,
    type: 'two_column',
    title: 'Liquidity Benefits of Standardization',
    leftHeader: 'Theoretical Mechanism',
    leftBullets: [
      'Standardized products reduce search and information costs',
      'Common language (GBP) facilitates comparison across issuers',
      'Network effects: More standardized issuance creates deeper liquidity',
      'Liquidity premium reduces required yields'
    ],
    rightHeader: 'Empirical Implications',
    rightBullets: [
      'GBP-aligned bonds should have better liquidity',
      'Larger green bond programs trade more actively',
      'Green bond indices and ETFs emerge from standardization',
      'First-mover advantage for standard-setters (ICMA)'
    ],
    bottomNote: '[Goal 1] Standardization creates positive feedback loop improving market efficiency',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 11: Theoretical Predictions Summary
  {
    id: 11,
    type: 'two_column',
    title: 'Theory\'s Predictions for Empirical Testing',
    leftHeader: 'What Theory Predicts We Should Observe',
    leftBullets: [
      'Greenium: 0-10 bps price premium for green bonds',
      'Verification: Majority of bonds have external review',
      'Standardization: Market coalesces around common principles',
      'Repeat issuers: Reputation effects and learning curves',
      'Growth: Market expands as ESG demand increases'
    ],
    rightHeader: 'Preview of Empirical Evidence (Goal 2)',
    rightBullets: [
      'Observed greenium: 0-5 bps (validated in Lecture 3)',
      'External review rate: Over 80% (validated in Lecture 2)',
      'Standardization increasing (validated in Lecture 4)',
      'Frequent issuers dominate (validated in Lecture 2)',
      'Market grew 24.9% CAGR 2015-2024 (validated in Lecture 2)'
    ],
    bottomNote: '[Goal 1] Strong theoretical foundation with empirical support - all predictions validated in Lectures 2-4',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 12: Goal 1 Summary
  {
    id: 12,
    type: 'goal_summary',
    goalNumber: 1,
    title: 'Learning Goal 1: Summary',
    subtitle: 'Assess your understanding of market microstructure theory',
    questions: [
      'Explain why greenium exists using economic theory?',
      'Describe how verification solves information asymmetry?',
      'Predict which factors increase or decrease greenium?',
      'Apply this framework to analyze new green instruments?'
    ],
    bottomNote: '[Goal 1] Achieved - Theoretical foundation complete. Next: Quantitative measurement (Lecture 2)',
    goalReference: 1,
    progressStage: 1
  },

  // Slide 13: Concept Map for Goal 1
  {
    id: 13,
    type: 'interactive_chart',
    title: 'Lecture 1 Concept Map: Theoretical Foundations',
    chartType: 'concept_map_goal1',
    bottomNote: '[Goal 1] Visual integration: Information asymmetry → Verification → Segmentation → Greenium → Standardization',
    goalReference: 1,
    progressStage: 1
  },

  // ============================================================
  // LECTURE 2: Measurement (Slides 14-27) - Goal 2
  // ============================================================

  // Slide 14: Learning Goal 2 Title
  {
    id: 14,
    type: 'learning_goal_title',
    goalNumber: 2,
    goalStatement: 'Quantify and analyze global green finance market size, growth trajectories, and geographic distribution',
    goalType: 'Quantitative',
    narrativeRole: 'Build - Develops empirical measurement capabilities',
    progressStage: 2
  },

  // Slide 15: Measurement Methodology
  {
    id: 15,
    type: 'two_column',
    title: 'Measuring the Green Finance Market',
    leftHeader: 'Methodological Challenges',
    leftBullets: [
      'Definition: What qualifies as \'green\'? (Taxonomy dependence)',
      'Double counting: Issuance vs outstanding amounts',
      'Currency: Conversion to common denominator (USD)',
      'Coverage: Data availability varies by region and instrument'
    ],
    rightHeader: 'Standard Metrics',
    rightBullets: [
      'Total market size: Outstanding amount (stock)',
      'Annual issuance: New volume each year (flow)',
      'CAGR: Compound Annual Growth Rate',
      'Market share: By instrument, region, sector'
    ],
    bottomNote: '[Goal 2] Rigorous quantification requires clear methodology and consistent definitions',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 16: Chart - Market Growth
  {
    id: 16,
    type: 'interactive_chart',
    title: 'Global Green Finance Market Growth 2015-2024',
    chartType: 'market_growth',
    bottomNote: '[Goal 2] Market grew from $300B (2015) to $2.1T (2024): Validates theory of rising ESG demand',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 17: Growth Rate Calculation
  {
    id: 17,
    type: 'two_column',
    title: 'Growth Rate Analysis: CAGR Calculation',
    leftHeader: 'CAGR Formula and Application',
    leftBullets: [
      'Formula: CAGR = (V_final/V_initial)^(1/n) - 1',
      'Period: 2015-2024 (n = 9 years)',
      'Initial: $300B (2015)',
      'Final: $2,100B (2024)',
      'Calculation: (2100/300)^(1/9) - 1 = 24.9%'
    ],
    rightHeader: 'Interpretation and Context',
    rightBullets: [
      '24.9% CAGR indicates explosive growth phase',
      'Comparison: Global bond market ~5% CAGR same period',
      'Green finance growing 5x faster than conventional',
      '2022 dip ($1.45T) due to broader market volatility'
    ],
    bottomNote: '[Goal 2] Quantitative analysis confirms theoretical prediction of rapid market expansion',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 18: Chart - Regional Distribution
  {
    id: 18,
    type: 'interactive_chart',
    title: 'Geographic Distribution of Green Finance',
    chartType: 'regional_distribution',
    bottomNote: '[Goal 2] Europe 44%, Asia-Pacific 32%, Americas 20% - reflects regulatory push in EU',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 19: Regional Analysis
  {
    id: 19,
    type: 'two_column',
    title: 'Regional Patterns and Drivers',
    leftHeader: 'Europe: Market Leader',
    leftBullets: [
      '44% global market share ($920B annual issuance)',
      'Driver: EU Taxonomy mandatory disclosure',
      'SFDR regulation creates demand from asset managers',
      'Strong sovereign issuance (France, Germany, UK)'
    ],
    rightHeader: 'Asia-Pacific: Rapid Growth',
    rightBullets: [
      '32% market share ($680B), fastest growth region',
      'China dominates ($450B), policy-driven expansion',
      'Japan, South Korea increasing (net-zero commitments)',
      'Southeast Asia emerging (ASEAN Taxonomy)'
    ],
    bottomNote: '[Goal 2] Regional variation driven by policy frameworks and regulatory mandates',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 20: Chart - Instrument Breakdown
  {
    id: 20,
    type: 'interactive_chart',
    title: 'Market Composition by Instrument Type',
    chartType: 'instrument_breakdown',
    bottomNote: '[Goal 2] Green bonds $1.6T (76%), Sustainability-linked bonds $500B (24%) of total',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 21: Chart - Sector Allocation
  {
    id: 21,
    type: 'interactive_chart',
    title: 'Allocation Across Economic Sectors',
    chartType: 'sector_allocation',
    bottomNote: '[Goal 2] Energy 38%, Buildings 24%, Transport 18% - aligns with decarbonization priorities',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 22: Statistical Summary
  {
    id: 22,
    type: 'two_column',
    title: 'Quantitative Summary: Key Statistics',
    leftHeader: 'Market Size Metrics (2024)',
    leftBullets: [
      'Total outstanding: $2.1 trillion',
      'Annual issuance: $650 billion',
      'Green bonds outstanding: $1.6T (76%)',
      'Number of issuers: 1,200+ globally',
      'Average deal size: $540 million'
    ],
    rightHeader: 'Growth and Distribution',
    rightBullets: [
      '9-year CAGR: 24.9% (2015-2024)',
      'Regional: EU 44%, APAC 32%, Americas 20%',
      'Sectoral: Energy 38%, Buildings 24%, Transport 18%',
      'Forecasted 2030: $5.0-6.0 trillion'
    ],
    bottomNote: '[Goal 2] Comprehensive quantitative picture validates theoretical predictions from Goal 1',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 23: Chart - Verification Rates
  {
    id: 23,
    type: 'interactive_chart',
    title: 'External Verification Adoption Rates',
    chartType: 'verification_rates',
    bottomNote: '[Goal 2] Over 80% verification rate validates signaling theory prediction',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 24: Chart - Major Issuers
  {
    id: 24,
    type: 'interactive_chart',
    title: 'Top Green Bond Issuers 2024',
    chartType: 'major_issuers',
    bottomNote: '[Goal 2] Repeat issuers (EIB, France, Netherlands) demonstrate reputation effects predicted in theory',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 25: Chart - ESG Fund Flows
  {
    id: 25,
    type: 'interactive_chart',
    title: 'ESG Investment Fund Flows',
    chartType: 'esg_fund_flows',
    bottomNote: '[Goal 2] Rising ESG fund flows create segmented demand supporting greenium',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 26: Goal 2 Summary
  {
    id: 26,
    type: 'goal_summary',
    goalNumber: 2,
    title: 'Learning Goal 2: Summary',
    subtitle: 'Verify your quantitative market knowledge',
    questions: [
      'Calculate growth rates (CAGR) for market segments?',
      'Compare regional adoption and explain differences?',
      'Analyze sector allocation and investment priorities?',
      'Use empirical data to test theoretical hypotheses?'
    ],
    bottomNote: '[Goal 2] Achieved - Quantitative measurement complete. Next: Mathematical valuation models (Lecture 3)',
    goalReference: 2,
    progressStage: 2
  },

  // Slide 27: Concept Map for Goal 2
  {
    id: 27,
    type: 'interactive_chart',
    title: 'Lecture 2 Concept Map: Empirical Measurement',
    chartType: 'concept_map_goal2',
    bottomNote: '[Goal 2] Visual integration: Methodology → Market Size → Growth → Regional → Sectoral → Validation',
    goalReference: 2,
    progressStage: 2
  },

  // ============================================================
  // LECTURE 3: Valuation Basics (Slides 28-37) - Goal 3
  // ============================================================

  // Slide 28: Learning Goal 3 Title
  {
    id: 28,
    type: 'learning_goal_title',
    goalNumber: 3,
    goalStatement: 'Derive and apply bond pricing models incorporating greenium and environmental premium adjustments',
    goalType: 'Mathematical',
    narrativeRole: 'Apply - Demonstrates mathematical valuation methods',
    progressStage: 3
  },

  // Slide 29: Classical Pricing Derivation
  {
    id: 29,
    type: 'math_derivation',
    title: 'Classical Bond Pricing: Derivation from First Principles',
    leftHeader: 'Starting Point',
    startingEquation: 'P_0 = sum_{t=1}^{T} C/(1+r)^t + F/(1+r)^T',
    assumptions: [
      'Constant discount rate r (risk-free + credit spread)',
      'Fixed annual coupon C',
      'Face value F repaid at maturity T',
      'No embedded options or default'
    ],
    rightHeader: 'Algebraic Simplification',
    steps: [
      {
        number: 1,
        explanation: 'Separate coupon annuity from principal',
        equation: 'P_0 = C * sum_{t=1}^{T} (1+r)^{-t} + F(1+r)^{-T}'
      },
      {
        number: 2,
        explanation: 'Apply geometric series formula to annuity',
        equation: 'P_0 = C * [1 - (1+r)^{-T}]/r + F(1+r)^{-T}'
      },
      {
        number: 3,
        explanation: 'Standard decomposition for analysis',
        equation: 'P_0 = PV(Coupons) + PV(Principal)'
      }
    ],
    bottomNote: '[Goal 3] Classical formula forms mathematical foundation for all bond valuation',
    goalReference: 3,
    progressStage: 3
  },

  // Slide 30: Greenium Incorporation
  {
    id: 30,
    type: 'math_derivation',
    title: 'Green Bond Pricing: Incorporating Greenium',
    leftHeader: 'Theoretical Extension',
    startingEquation: 'P_G = sum_{t=1}^{T} C/(1+r-g)^t + F/(1+r-g)^T',
    assumptions: [
      'Greenium g > 0 (0-5 bps typically)',
      'Same cash flows as conventional bond',
      'Environmental premium priced via lower required return'
    ],
    rightHeader: 'Price Differential Analysis',
    steps: [
      {
        number: 1,
        explanation: 'Green bond trades at premium when greenium positive',
        equation: 'P_G > P_0 if g > 0'
      },
      {
        number: 2,
        explanation: 'Convert decimal to basis points for market convention',
        equation: 'Greenium (bps) = g * 10000'
      },
      {
        number: 3,
        explanation: 'Price difference approximation using duration D',
        equation: 'P_G - P_0 ≈ C * g * D'
      }
    ],
    bottomNote: '[Goal 3] Mathematical model quantifies greenium\'s impact on bond valuation',
    goalReference: 3,
    progressStage: 3
  },

  // Slide 31: Worked Example
  {
    id: 31,
    type: 'two_column',
    title: 'Numerical Example: Green vs Conventional Pricing',
    leftHeader: 'Bond Specifications',
    leftBullets: [
      'Face value: F = 1000 (EUR)',
      'Coupon rate: 3% annual (C = 30 EUR)',
      'Maturity: T = 10 years',
      'Risk-free rate: 2%',
      'Credit spread: 0.5%',
      'Greenium: g = 0.03% (3 bps)'
    ],
    rightHeader: 'Valuation Calculations',
    rightBullets: [
      'Conventional: r = 2.5%',
      'Price: P_0 = 1043.76 EUR',
      'Green: r_G = 2.47% (2.5% - 0.03%)',
      'Price: P_G = 1046.89 EUR',
      'Difference: 3.13 EUR (0.3% premium)'
    ],
    bottomNote: '[Goal 3] 3 bps greenium translates to €3.13 price premium on €1000 bond',
    goalReference: 3,
    progressStage: 3
  },

  // Slide 32: Chart - Yield Comparison
  {
    id: 32,
    type: 'interactive_chart',
    title: 'Yield Curves: Green vs Conventional Bonds',
    chartType: 'yield_comparison',
    bottomNote: '[Goal 3] Empirical greenium averages 2-4 bps (declining trend), consistent with theoretical prediction',
    goalReference: 3,
    progressStage: 3
  },

  // Slide 33: Duration and Sensitivity
  {
    id: 33,
    type: 'two_column',
    title: 'Duration Analysis and Price Sensitivity',
    leftHeader: 'Modified Duration',
    leftBullets: [
      'Duration D = (1/P) * (∂P/∂r)',
      'Measures price sensitivity to yield changes',
      'Higher duration leads to greater greenium impact',
      '10-year bond: D ≈ 8.5 years'
    ],
    rightHeader: 'Greenium Sensitivity',
    rightBullets: [
      'Price change: ΔP ≈ -P * D * Δr',
      '1 bp greenium on 10-yr bond: 0.085% price impact',
      'Longer maturity amplifies greenium effect',
      'Investor arbitrage limited by segmentation'
    ],
    bottomNote: '[Goal 3] Mathematical relationship between duration and greenium magnitude',
    goalReference: 3,
    progressStage: 3
  },

  // Slide 34: Chart - Greenium Time Series
  {
    id: 34,
    type: 'interactive_chart',
    title: 'Greenium Evolution Over Time',
    chartType: 'greenium_timeseries',
    bottomNote: '[Goal 3] Declining greenium (7 bps → 2 bps) reflects market maturation and increased supply',
    goalReference: 3,
    progressStage: 3
  },

  // Slide 35: Chart - Pricing Model
  {
    id: 35,
    type: 'interactive_chart',
    title: 'Pricing Model: Green Premium vs Duration',
    chartType: 'price_duration',
    bottomNote: '[Goal 3] Longer duration bonds show larger absolute price premium for given greenium',
    goalReference: 3,
    progressStage: 3
  },

  // Slide 36: Risk-Return Framework
  {
    id: 36,
    type: 'two_column',
    title: 'Risk-Return Analysis for Green Bonds',
    leftHeader: 'Return Components',
    leftBullets: [
      'Base return: Risk-free rate + credit spread',
      'Greenium effect: Lower required return (-2 to -4 bps)',
      'Liquidity premium: May offset greenium (varies)',
      'Total return: Comparable to conventional bonds'
    ],
    rightHeader: 'Risk Profile',
    rightBullets: [
      'Credit risk: Identical to conventional bonds (same issuer)',
      'Interest rate risk: Measured by duration (same as conventional)',
      'Greenwashing risk: Specific to green bonds (mitigated by verification)',
      'Regulatory risk: EU Taxonomy changes, standards evolution'
    ],
    bottomNote: '[Goal 3] Green bonds offer similar risk-return profile with additional ESG benefit',
    goalReference: 3,
    progressStage: 3
  },

  // Slide 37: Chart - Risk-Return Scatter
  {
    id: 37,
    type: 'interactive_chart',
    title: 'Risk-Return Profile: Green vs Conventional',
    chartType: 'risk_return_scatter',
    bottomNote: '[Goal 3] Empirical evidence: Competitive risk-adjusted returns with similar volatility',
    goalReference: 3,
    progressStage: 3
  },

  // ============================================================
  // LECTURE 4: Applications (Slides 38-46) - Integration
  // ============================================================

  // Slide 38: Goal 3 Summary
  {
    id: 38,
    type: 'goal_summary',
    goalNumber: 3,
    title: 'Learning Goal 3: Summary',
    subtitle: 'Confirm your mathematical modeling capabilities',
    questions: [
      'Derive bond pricing formulas from DCF principles?',
      'Calculate price impact of greenium for given duration?',
      'Analyze risk-return profiles of green vs conventional?',
      'Apply valuation models to real bond examples?'
    ],
    bottomNote: '[Goal 3] Achieved - Mathematical valuation complete. Next: Integration and practical applications',
    goalReference: 3,
    progressStage: 4
  },

  // Slide 39: Chart - Credit Ratings
  {
    id: 39,
    type: 'interactive_chart',
    title: 'Green Bond Credit Quality Distribution',
    chartType: 'credit_ratings',
    bottomNote: '[Goal 3] Predominantly investment-grade (over 85%) reduces credit risk in valuation models',
    goalReference: 3,
    progressStage: 4
  },

  // Slide 40: Chart - Standardization Metrics
  {
    id: 40,
    type: 'interactive_chart',
    title: 'Market Standardization Progress',
    chartType: 'standardization_progress',
    bottomNote: '[Goal 1] Increasing standardization (60% → 92% GBP compliance) validates liquidity theory',
    goalReference: 1,
    progressStage: 4
  },

  // Slide 41: Week Integration Summary
  {
    id: 41,
    type: 'two_column',
    title: 'Week 1 Integration: Theory → Data → Valuation',
    leftHeader: 'Three-Goal Narrative Complete',
    leftBullets: [
      'Goal 1 (Theory): WHY green finance exists (slides 3-13)',
      'Information asymmetry → verification → segmentation → greenium',
      'Goal 2 (Measurement): HOW MUCH (slides 14-27)',
      '$2.1T market, 24.9% CAGR, regional/sectoral patterns',
      'Goal 3 (Valuation): HOW TO PRICE (slides 28-38)',
      'Bond pricing models, greenium incorporation, risk-return'
    ],
    rightHeader: 'Empirical Validation Chain',
    rightBullets: [
      'Theory predicted verification over 80% → Data confirms 80%+',
      'Theory predicted greenium 0-10 bps → Data shows 2-4 bps',
      'Theory predicted growth from ESG demand → 24.9% CAGR',
      'Theory predicted standardization → 92% GBP compliance',
      'All theoretical predictions empirically validated'
    ],
    bottomNote: 'Integration: Problem (slides 0-2) → Theory (L1) → Evidence (L2) → Methods (L3) → Applications (L4)',
    goalReference: null,
    progressStage: 4
  },

  // Slide 42: Complete Concept Map
  {
    id: 42,
    type: 'interactive_chart',
    title: 'Week 1 Complete Concept Map',
    chartType: 'integration_concept_map',
    bottomNote: 'Complete narrative: Climate gap → Market theory → Empirical evidence → Valuation tools → Real applications',
    goalReference: null,
    progressStage: 4
  },

  // Slide 43: Portfolio Exercise
  {
    id: 43,
    type: 'two_column',
    title: 'Portfolio Exercise: Green Bond Selection',
    leftHeader: 'Scenario: ESG-Mandated Portfolio',
    leftBullets: [
      'Investment mandate: €500M green bond allocation',
      'Target duration: 7-8 years',
      'Minimum rating: A- (investment grade)',
      'ESG requirements: External verification, GBP compliance',
      'Yield target: 3.0-3.5%'
    ],
    rightHeader: 'Your Task (5 minutes)',
    rightBullets: [
      'Select 3 bonds from provided list meeting criteria',
      'Calculate portfolio-weighted duration',
      'Estimate greenium impact on portfolio yield',
      'Justify selection based on risk-return-impact trade-offs',
      'Use formulas from slides 29-30, data from slides 22-24'
    ],
    bottomNote: '[Goal 3] Interactive exercise applying valuation models to realistic portfolio construction',
    goalReference: 3,
    progressStage: 4
  },

  // Slide 44: Case Study - France
  {
    id: 44,
    type: 'two_column',
    title: 'Case Study: France\'s €53B Green OAT Program',
    leftHeader: 'Program Overview',
    leftBullets: [
      'Largest sovereign green bond program globally (2024)',
      'First issuance: January 2017 (€7B, oversubscribed 7x)',
      'Cumulative: €53B across 5 maturities (2039-2044)',
      'Use of proceeds: Energy transition, biodiversity, adaptation',
      'External verification: Third-party audit (Vigeo Eiris)'
    ],
    rightHeader: 'Applying Week 1 Frameworks',
    rightBullets: [
      'Theory (Goal 1): Verification solves asymmetry, repeat issuer reputation',
      'Data (Goal 2): Contributes 5.8% of Europe\'s €920B market',
      'Valuation (Goal 3): Observed greenium 2-3 bps, duration 12-15 years',
      'Integration: Demonstrates theory → practice at scale'
    ],
    bottomNote: 'Case study: Real-world application integrating all three learning goals - theory validated empirically',
    goalReference: null,
    progressStage: 4
  },

  // Slide 45: Self-Assessment
  {
    id: 45,
    type: 'two_column',
    title: 'Self-Assessment: Week 1 Mastery Check',
    leftHeader: 'Theoretical Understanding',
    leftBullets: [
      'Can you explain greenium using market microstructure theory?',
      'Can you describe how verification solves information asymmetry?',
      'Can you predict factors that increase/decrease greenium?',
      'Can you apply segmentation theory to new contexts?'
    ],
    rightHeader: 'Quantitative and Applied Skills',
    rightBullets: [
      'Can you calculate CAGR and interpret growth trajectories?',
      'Can you derive bond pricing from DCF first principles?',
      'Can you estimate greenium\'s price impact given duration?',
      'Can you construct a green bond portfolio meeting constraints?'
    ],
    bottomNote: 'Mastery check: If you answered \'yes\' to 6+/8, you\'ve achieved Week 1 learning goals - ready for Week 2',
    goalReference: null,
    progressStage: 4
  },

  // Slide 46: Preview Week 2
  {
    id: 46,
    type: 'two_column',
    title: 'Looking Ahead: Week 2 Deep Dive',
    leftHeader: 'What We Built This Week',
    leftBullets: [
      'Solid theoretical foundation (microstructure theory)',
      'Empirical measurement capabilities (market data)',
      'Mathematical valuation tools (pricing models)',
      'Integration skills (theory-data-application)'
    ],
    rightHeader: 'Where We\'re Going (Week 2)',
    rightBullets: [
      'Deep dive: Green bond structures and issuance processes',
      'Regulatory frameworks: EU Taxonomy, SFDR, national standards',
      'Advanced pricing: Embedded options, credit risk adjustments',
      'Impact measurement: How to quantify environmental outcomes'
    ],
    bottomNote: 'Week 1 complete: Climate problem → Green finance solution established. Week 2: Implementation details and advanced topics',
    goalReference: null,
    progressStage: 4
  }
];
