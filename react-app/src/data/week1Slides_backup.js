export const week1Slides = [
  // LEARNING GOAL 1: Market Microstructure Theory (Slides 1-10)

  // Slide 0 (Slide 1): Learning Goal 1 Title
  {
    id: 0,
    type: 'learning_goal_title',
    goalNumber: 1,
    goalStatement: 'Understand the market microstructure theory explaining why green finance markets exist and how they function',
    goalType: 'Theoretical',
    narrativeRole: 'Foundation - Establishes theoretical basis'
  },

  // Slide 1 (Slide 2): Framework Overview
  {
    id: 1,
    type: 'framework_overview',
    title: 'Market Microstructure Framework for Green Finance',
    frameworkName: 'Information Asymmetry and Signaling Theory',
    leftHeader: 'Core Theoretical Principles',
    leftBullets: [
      'Information asymmetry: Issuers know true environmental impact better than investors',
      'Verification as credible signaling mechanism reduces information gap',
      'Market segmentation by investor ESG preferences creates distinct demand',
      'Adverse selection risk without credible signals drives need for standards'
    ],
    rightHeader: 'Market Equilibrium Predictions',
    rightBullets: [
      'Greenium emerges from excess demand by ESG-focused investors',
      'Verification costs create quality differentiation across instruments',
      'Liquidity premium for standardized instruments vs. bespoke structures',
      'Reputation effects for repeat issuers reduce cost of capital over time'
    ],
    bottomNote: '[Goal 1] Theory predicts observable phenomena we will quantify',
    goalReference: 1
  },

  // Slide 2 (Slide 3): Why Green Finance Markets Exist
  {
    id: 2,
    type: 'two_column',
    title: 'Why Do Green Finance Markets Exist?',
    leftHeader: 'Market Failure in Conventional Finance',
    leftBullets: [
      'Environmental externalities not priced in standard financial instruments',
      'Climate risks systemically underpriced due to long time horizons',
      'Information asymmetry about true environmental impact of projects',
      'Misalignment between financial returns and societal environmental goals'
    ],
    rightHeader: 'Green Finance as Market Solution',
    rightBullets: [
      'Explicitly links capital allocation to environmental outcomes',
      'Creates price signals for environmental performance via greenium',
      'Reduces search costs for ESG-focused investors through labeling',
      'Enables regulatory compliance and reporting standardization'
    ],
    bottomNote: '[Goal 1] Market exists to correct information and pricing failures',
    goalReference: 1
  },

  // Slide 3 (Slide 4): Information Asymmetry Problem
  {
    id: 3,
    type: 'two_column',
    title: 'Information Asymmetry in Green Finance',
    leftHeader: 'The Core Problem',
    leftBullets: [
      'Issuers possess private information about project environmental credentials',
      'Investors cannot directly observe true environmental impact ex-ante',
      'Risk of greenwashing: Non-green projects labeled as green',
      'Adverse selection: Market for green assets may unravel without credible signals'
    ],
    rightHeader: 'Signaling Mechanisms',
    rightBullets: [
      'Third-party verification as costly signal (screening prevents greenwashing)',
      'Adherence to taxonomies and standards (EU Taxonomy, Climate Bonds Standard)',
      'Impact reporting and disclosure requirements post-issuance',
      'Reputation effects: Repeat issuers build credibility capital'
    ],
    bottomNote: '[Goal 1] Verification costs create separating equilibrium between green and non-green',
    goalReference: 1
  },

  // Slide 4 (Slide 5): Market Segmentation
  {
    id: 4,
    type: 'two_column',
    title: 'Market Segmentation by Investor Preferences',
    leftHeader: 'Investor Heterogeneity',
    leftBullets: [
      'ESG-dedicated investors: Mandate to invest in green assets only',
      'ESG-integrated investors: Consider environmental factors alongside financial metrics',
      'Conventional investors: Primarily financial return focus',
      'Preference heterogeneity creates distinct demand curves for green vs. conventional assets'
    ],
    rightHeader: 'Segmentation Effects',
    rightBullets: [
      'Green assets trade in partially segmented market with ESG investor base',
      'Lower required returns for green assets due to excess demand (greenium)',
      'Liquidity differences: Green bonds may have lower liquidity premium',
      'Price discovery differs between green and conventional bond markets'
    ],
    bottomNote: '[Goal 1] Segmentation predicts pricing differential we observe as greenium',
    goalReference: 1
  },

  // Slide 5 (Slide 6): Greenium Theory
  {
    id: 5,
    type: 'two_column',
    title: 'Theoretical Foundations of the Greenium',
    leftHeader: 'Supply-Demand Framework',
    leftBullets: [
      'Limited supply of verified green assets relative to ESG investor demand',
      'ESG investors willing to accept lower yields for green label (preference premium)',
      'Non-pecuniary benefits: Alignment with sustainability mandates and values',
      'Regulatory drivers: Green assets help meet climate disclosure requirements'
    ],
    rightHeader: 'Equilibrium Pricing Implications',
    rightBullets: [
      'Greenium = Yield on conventional bond - Yield on equivalent green bond',
      'Positive greenium when ESG demand exceeds green supply at parity pricing',
      'Greenium varies by issuer type, verification quality, and market conditions',
      'Dynamic equilibrium: Greenium may compress as green supply increases'
    ],
    bottomNote: '[Goal 1] Greenium is testable prediction of market microstructure theory',
    goalReference: 1
  },

  // Slide 6 (Slide 7): Verification and Standards
  {
    id: 6,
    type: 'two_column',
    title: 'Role of Verification and Standards',
    leftHeader: 'Verification as Quality Signal',
    leftBullets: [
      'Second-party opinion from specialized verifiers (e.g., Sustainalytics, Moody\'s ESG)',
      'Certification against standards (Climate Bonds Initiative, ICMA Green Bond Principles)',
      'Verification cost is sunk cost credibly separating genuine green issuers',
      'External review reduces information asymmetry and investor due diligence costs'
    ],
    rightHeader: 'Standardization Benefits',
    rightBullets: [
      'Comparability across instruments and issuers enhances market efficiency',
      'Reduced transaction costs through standardized documentation and processes',
      'Enables index construction and passive investment strategies',
      'Facilitates regulatory compliance and reporting automation'
    ],
    bottomNote: '[Goal 1] Standards create network effects and economies of scale in green market',
    goalReference: 1
  },

  // Slide 7 (Slide 8): Liquidity Considerations
  {
    id: 7,
    type: 'two_column',
    title: 'Liquidity in Green vs. Conventional Markets',
    leftHeader: 'Liquidity Drivers',
    leftBullets: [
      'Trading volume and market depth determine liquidity',
      'Green bond market historically less liquid due to smaller size',
      'Buy-and-hold behavior by ESG investors reduces secondary trading',
      'Standardization increases liquidity through fungibility'
    ],
    rightHeader: 'Liquidity Premium Dynamics',
    rightBullets: [
      'Lower liquidity may require higher yields (liquidity premium)',
      'Greenium can offset or be offset by liquidity premium',
      'Net pricing effect depends on relative magnitudes of preference and liquidity premia',
      'As green market matures, liquidity premium expected to decline'
    ],
    bottomNote: '[Goal 1] Observed yields reflect combination of greenium and liquidity effects',
    goalReference: 1
  },

  // Slide 8 (Slide 9): Reputation and Repeat Issuance
  {
    id: 8,
    type: 'two_column',
    title: 'Reputation Effects in Green Finance',
    leftHeader: 'Building Credibility Capital',
    leftBullets: [
      'Repeat green issuers develop reputation for environmental credibility',
      'Track record of impact reporting and transparency builds investor trust',
      'Greenwashing incidents destroy reputation capital and increase future costs',
      'Reputation as intangible asset with real economic value'
    ],
    rightHeader: 'Cost of Capital Implications',
    rightBullets: [
      'Established green issuers may pay smaller verification costs',
      'Stronger greenium for issuers with proven environmental track record',
      'Learning curve effects: Issuance costs decline with experience',
      'First-mover advantages for pioneering issuers in new green asset classes'
    ],
    bottomNote: '[Goal 1] Reputation creates dynamic pricing advantages for consistent performers',
    goalReference: 1
  },

  // Slide 9 (Slide 10): Goal 1 Summary
  {
    id: 9,
    type: 'goal_summary',
    goalNumber: 1,
    title: 'Learning Goal 1 Achievement Check',
    subtitle: 'Assess your understanding of market microstructure theory',
    questions: [
      'Explain why information asymmetry creates demand for green finance verification',
      'Describe how market segmentation by investor preferences drives the greenium',
      'Articulate the role of standards and verification in market efficiency',
      'Analyze how liquidity and reputation effects interact with greenium pricing'
    ],
    bottomNote: '[Goal 1] Complete - Ready to quantify these theoretical predictions',
    goalReference: 1
  },

  // LEARNING GOAL 2: Quantify Market Size & Growth (Slides 11-20)

  // Slide 10 (Slide 11): Learning Goal 2 Title
  {
    id: 10,
    type: 'learning_goal_title',
    goalNumber: 2,
    goalStatement: 'Quantify the size, growth trajectory, and composition of global green finance markets using empirical data',
    goalType: 'Quantitative',
    narrativeRole: 'Empirical Evidence - Tests theoretical predictions with market data'
  },

  // Slide 11 (Slide 12): Market Size Overview
  {
    id: 11,
    type: 'two_column',
    title: 'Global Green Finance Market Size (2024)',
    leftHeader: 'Market Composition',
    leftBullets: [
      'Total green finance market: $2.1 trillion outstanding (2024)',
      'Green bonds: $1.5 trillion (71% of market)',
      'Green loans: $400 billion (19% of market)',
      'Other instruments: $200 billion (10% - equity, funds, derivatives)'
    ],
    rightHeader: 'Geographic Distribution',
    rightBullets: [
      'Europe: $950 billion (45% of global market)',
      'Asia-Pacific: $630 billion (30% - China largest single issuer)',
      'North America: $420 billion (20%)',
      'Rest of World: $100 billion (5%)'
    ],
    bottomNote: '[Goal 2] Market data from Climate Bonds Initiative, World Bank, OECD databases',
    goalReference: 2
  },

  // Slide 12 (Slide 13): Interactive Market Growth Chart
  {
    id: 12,
    type: 'interactive_chart',
    title: 'Global Green Finance Market Growth 2015-2024',
    chartType: 'market_growth',
    bottomNote: '[Goal 2] Market grew from $300B to $2.1T: 24.9% CAGR over decade',
    goalReference: 2
  },

  // Slide 13 (Slide 14): Growth Drivers
  {
    id: 13,
    type: 'two_column',
    title: 'Quantifying Growth Drivers (2015-2024)',
    leftHeader: 'Regulatory Catalysts',
    leftBullets: [
      'EU Sustainable Finance Action Plan (2018): 180% increase in EU green issuance 2018-2021',
      'China green bond guidelines (2015): Market grew from $1B to $150B by 2024',
      'Central bank climate stress tests: 45% of global central banks now conduct (BIS survey)',
      'Mandatory climate disclosure rules: 60+ jurisdictions by 2024'
    ],
    rightHeader: 'Investor Demand Metrics',
    rightBullets: [
      'ESG fund AUM: $35 trillion globally (2024), up from $23 trillion (2020)',
      'Institutional ESG mandates: 75% of pension funds have ESG integration (Global Pension Survey)',
      'Green bond oversubscription: Average 3.2x oversubscribed vs. 2.1x for conventional',
      'Negative screening prevalence: 48% of institutional investors exclude fossil fuels'
    ],
    bottomNote: '[Goal 2] Growth driven by both supply (regulation) and demand (investor mandates)',
    goalReference: 2
  },

  // Slide 14 (Slide 15): Issuer Composition
  {
    id: 14,
    type: 'two_column',
    title: 'Issuer Breakdown: Who Issues Green Instruments?',
    leftHeader: 'By Issuer Type (2024 Outstanding)',
    leftBullets: [
      'Corporates: $750 billion (36% - utilities, real estate, industrials)',
      'Sovereign/Supranational: $630 billion (30% - 45 sovereign green bond programs)',
      'Financial institutions: $525 billion (25% - green covered bonds, green RMBS)',
      'Municipalities: $195 billion (9% - green municipal bonds)'
    ],
    rightHeader: 'By Sector (Use of Proceeds)',
    rightBullets: [
      'Energy: $840 billion (40% - renewable energy projects)',
      'Buildings: $420 billion (20% - green buildings, energy efficiency)',
      'Transport: $315 billion (15% - electric vehicles, public transit)',
      'Other: $525 billion (25% - water, waste, adaptation, land use)'
    ],
    bottomNote: '[Goal 2] Energy transition dominates green finance allocation',
    goalReference: 2
  },

  // Slide 15 (Slide 16): Greenium Empirical Evidence
  {
    id: 15,
    type: 'two_column',
    title: 'Measuring the Greenium: Empirical Findings',
    leftHeader: 'Meta-Analysis Results',
    leftBullets: [
      'Average greenium: -2 to -5 basis points (green bonds yield less than conventional)',
      'Eurozone green sovereigns: -5 to -8 bps greenium (Barclays, 2023)',
      'US municipal green bonds: -3 to -6 bps (Municipal Market Data, 2024)',
      'Corporate green bonds: -1 to -4 bps, varies by sector and credit quality'
    ],
    rightHeader: 'Greenium Variation Factors',
    rightBullets: [
      'Stronger greenium for highly-rated issuers and sovereigns',
      'Greenium larger in Eurozone than US (deeper ESG investor base)',
      'New issuance greenium stronger than secondary market (primary demand spike)',
      'Greenium compressed 2020-2024 as green supply increased (supply-demand rebalancing)'
    ],
    bottomNote: '[Goal 2] Greenium exists but is small, confirming segmentation theory with caveats',
    goalReference: 2
  },

  // Slide 16 (Slide 17): Verification Market
  {
    id: 16,
    type: 'two_column',
    title: 'Quantifying the Verification Industry',
    leftHeader: 'Market Size and Structure',
    leftBullets: [
      'Second-party opinion market: $500 million annual revenue (2024)',
      'Top 5 verifiers (Sustainalytics, Moody\'s ESG, S&P Global, ISS, Vigeo Eiris): 80% market share',
      'Average verification cost: $30,000-$150,000 per bond issuance',
      'Certification market growing 25% CAGR as standards proliferate'
    ],
    rightHeader: 'Verification Penetration',
    rightBullets: [
      '85% of green bonds have second-party opinion (Climate Bonds Initiative)',
      '60% certified against Climate Bonds Standard or ICMA Principles',
      'Verification rate higher for first-time issuers (95%) vs. repeat (75%)',
      'Regional variation: 90% in Europe, 70% in Asia, 80% in North America'
    ],
    bottomNote: '[Goal 2] High verification rates confirm information asymmetry theory',
    goalReference: 2
  },

  // Slide 17 (Slide 18): Risk-Return Profile
  {
    id: 17,
    type: 'interactive_chart',
    title: 'Risk-Return Positioning: Green vs. Conventional Assets',
    chartType: 'risk_return',
    bottomNote: '[Goal 2] Green assets cluster at lower risk for given return levels',
    goalReference: 2
  },

  // Slide 18 (Slide 19): Forecast to 2030
  {
    id: 18,
    type: 'two_column',
    title: 'Market Growth Projections: 2024-2030',
    leftHeader: 'Base Case Scenario',
    leftBullets: [
      'Total green finance market projected: $5.5 trillion by 2030 (OECD)',
      'Implied CAGR 2024-2030: 17.4% (slower than 2015-2024 as base grows)',
      'Green bonds expected: $3.5 trillion (maintaining 64% market share)',
      'Emerging markets growth: 30% CAGR driven by climate finance needs'
    ],
    rightHeader: 'Key Assumptions and Risks',
    rightBullets: [
      'Continued regulatory momentum (EU, US, China climate policies)',
      'ESG fund flows sustained at 15% annual growth',
      'Downside risk: Greenwashing scandals erode investor confidence',
      'Upside risk: Carbon pricing acceleration increases green project profitability'
    ],
    bottomNote: '[Goal 2] Growth expected to continue but moderate from historical pace',
    goalReference: 2
  },

  // Slide 19 (Slide 20): Goal 2 Summary
  {
    id: 19,
    type: 'goal_summary',
    goalNumber: 2,
    title: 'Learning Goal 2 Achievement Check',
    subtitle: 'Verify your quantitative market knowledge',
    questions: [
      'State the current size and historical growth rate of global green finance markets',
      'Identify the major issuer types and sectoral allocation of green finance',
      'Quantify the average greenium and explain factors causing variation',
      'Describe market growth projections and underlying assumptions'
    ],
    bottomNote: '[Goal 2] Complete - Ready to derive mathematical pricing models',
    goalReference: 2
  },

  // LEARNING GOAL 3: Derive Pricing Models (Slides 21-30)

  // Slide 20 (Slide 21): Learning Goal 3 Title
  {
    id: 20,
    type: 'learning_goal_title',
    goalNumber: 3,
    goalStatement: 'Derive and apply mathematical models for pricing green financial instruments, incorporating greenium and ESG factors',
    goalType: 'Mathematical',
    narrativeRole: 'Technical Application - Builds tools for practical valuation'
  },

  // Slide 21 (Slide 22): Classical Bond Pricing Foundation
  {
    id: 21,
    type: 'math_derivation',
    title: 'Classical Bond Pricing: Derivation from First Principles',
    leftHeader: 'Starting Point',
    startingEquation: 'P_0 = sum_{t=1}^{T} C/(1+r)^t + F/(1+r)^T',
    assumptions: [
      'Constant discount rate r (risk-free or appropriate risk-adjusted)',
      'Fixed annual coupon C paid at end of each period',
      'Face value F repaid at maturity T',
      'No default risk, liquidity costs, or taxes'
    ],
    rightHeader: 'Algebraic Simplification',
    steps: [
      {
        number: 1,
        explanation: 'Separate coupon annuity from principal repayment',
        equation: 'P_0 = C * sum_{t=1}^{T} (1+r)^{-t} + F(1+r)^{-T}'
      },
      {
        number: 2,
        explanation: 'Apply geometric series formula: sum_{t=1}^{T} x^t = (1-x^{T+1})/(1-x)',
        equation: 'P_0 = C * [1 - (1+r)^{-T}]/r + F(1+r)^{-T}'
      }
    ],
    bottomNote: '[Goal 3] Classical formula forms foundation for green bond extensions',
    goalReference: 3
  },

  // Slide 22 (Slide 23): Green Bond Pricing with Greenium
  {
    id: 22,
    type: 'math_derivation',
    title: 'Green Bond Pricing: Incorporating the Greenium',
    leftHeader: 'Modified Discount Rate',
    startingEquation: 'r_green = r_conventional - g',
    assumptions: [
      'g = greenium in basis points (yield reduction for green label)',
      'r_conventional = yield on equivalent conventional bond',
      'g > 0 implies ESG preference premium exists',
      'All other bond characteristics identical (duration, credit, liquidity)'
    ],
    rightHeader: 'Green Bond Price Derivation',
    steps: [
      {
        number: 1,
        explanation: 'Substitute modified discount rate into classical formula',
        equation: 'P_green = C * [1 - (1+r_conventional-g)^{-T}]/(r_conventional-g) + F(1+r_conventional-g)^{-T}'
      },
      {
        number: 2,
        explanation: 'Price difference equals present value of greenium savings',
        equation: 'P_green - P_conventional = PV(greenium effect)'
      }
    ],
    bottomNote: '[Goal 3] Greenium increases bond price by reducing discount rate',
    goalReference: 3
  },

  // Slide 23 (Slide 24): Multi-Factor Green Pricing Model
  {
    id: 23,
    type: 'math_derivation',
    title: 'Multi-Factor Green Bond Pricing Model',
    leftHeader: 'Decomposition of Green Yield',
    startingEquation: 'r_green = r_f + s_credit + s_liquidity + s_ESG - g',
    assumptions: [
      'r_f = risk-free rate',
      's_credit = credit spread over risk-free',
      's_liquidity = liquidity premium',
      's_ESG = ESG-specific risk factor',
      'g = greenium (demand-driven yield reduction)'
    ],
    rightHeader: 'Pricing Implications',
    steps: [
      {
        number: 1,
        explanation: 'ESG factor may increase or decrease depending on issuer ESG risk',
        equation: 's_ESG > 0 if high transition risk; s_ESG < 0 if ESG leader'
      },
      {
        number: 2,
        explanation: 'Net green effect combines ESG risk adjustment and preference premium',
        equation: 'Net effect = -g + s_ESG (may be positive or negative)'
      }
    ],
    bottomNote: '[Goal 3] Comprehensive model separates preference from risk effects',
    goalReference: 3
  },

  // Slide 24 (Slide 25): Duration and Convexity
  {
    id: 24,
    type: 'math_derivation',
    title: 'Duration and Convexity for Green Bonds',
    leftHeader: 'Modified Duration',
    startingEquation: 'D_mod = -1/P * dP/dr',
    assumptions: [
      'Measures price sensitivity to yield changes',
      'Green bonds have same duration as conventional for same cash flows',
      'But yield curve positioning differs due to greenium'
    ],
    rightHeader: 'Green-Specific Considerations',
    steps: [
      {
        number: 1,
        explanation: 'Duration calculation identical in form',
        equation: 'D_mod,green = sum_{t=1}^{T} [t * C/(1+r_green)^t] / P_green'
      },
      {
        number: 2,
        explanation: 'Green bonds positioned at lower yield, slightly higher duration',
        equation: 'D_mod,green > D_mod,conv for same coupon/maturity (convexity effect)'
      }
    ],
    bottomNote: '[Goal 3] Green bonds have marginally higher interest rate sensitivity',
    goalReference: 3
  },

  // Slide 25 (Slide 26): Stochastic Greenium Model
  {
    id: 25,
    type: 'math_derivation',
    title: 'Modeling Greenium as Stochastic Process',
    leftHeader: 'Random Walk Specification',
    startingEquation: 'dg_t = mu * dt + sigma * dW_t',
    assumptions: [
      'g_t = greenium at time t',
      'mu = drift (trend in greenium over time)',
      'sigma = volatility of greenium',
      'W_t = Wiener process (standard Brownian motion)'
    ],
    rightHeader: 'Calibration and Application',
    steps: [
      {
        number: 1,
        explanation: 'Estimate mu and sigma from historical greenium time series',
        equation: 'mu = -0.5 bps/year, sigma = 2 bps (example parameters)'
      },
      {
        number: 2,
        explanation: 'Monte Carlo simulation for greenium path-dependent valuation',
        equation: 'E[P_green(T)] = E[integral_0^T exp(-r_t + g_t) CF_t dt]'
      }
    ],
    bottomNote: '[Goal 3] Stochastic model captures greenium uncertainty for risk management',
    goalReference: 3
  },

  // Slide 26 (Slide 27): ESG Score Integration
  {
    id: 26,
    type: 'two_column',
    title: 'Integrating ESG Scores into Pricing Models',
    leftHeader: 'ESG Score Mapping',
    leftBullets: [
      'ESG score S ranges 0-100 (composite of Environmental, Social, Governance)',
      'Empirical relationship: g = alpha + beta * S (greenium increases with ESG score)',
      'Estimated beta = 0.08 bps per ESG point (meta-analysis of studies)',
      'Alpha = -2 bps (baseline greenium for average ESG score of 50)'
    ],
    rightHeader: 'Pricing Application',
    rightBullets: [
      'High ESG issuer (S=80): g = -2 + 0.08*80 = 4.4 bps greenium',
      'Low ESG issuer (S=30): g = -2 + 0.08*30 = 0.4 bps greenium',
      'Allows quantitative adjustment of greenium by issuer ESG quality',
      'Dynamic: ESG scores update quarterly, repricing greenium continuously'
    ],
    bottomNote: '[Goal 3] ESG scores provide quantitative input for greenium estimation',
    goalReference: 3
  },

  // Slide 27 (Slide 28): Credit Risk and Green Bonds
  {
    id: 27,
    type: 'two_column',
    title: 'Credit Risk Modeling for Green Bonds',
    leftHeader: 'Default Probability Framework',
    leftBullets: [
      'Probability of default (PD) may differ if green projects have different risk profiles',
      'Loss given default (LGD) potentially lower for green assets (higher collateral value)',
      'Credit spread s_credit = PD * LGD / (1 - PD) (simplified structural model)',
      'ESG factors may reduce PD through better risk management and regulatory favor'
    ],
    rightHeader: 'Green Credit Adjustment',
    rightBullets: [
      'Empirical evidence: Green bonds have 10-15% lower default rates (Moody\'s, 2023)',
      'Possible mechanisms: Higher scrutiny, better governance, regulatory support',
      'Credit spread reduction: 5-10 bps for investment-grade green bonds',
      'Combined with greenium: Total yield advantage 7-15 bps for green over conventional'
    ],
    bottomNote: '[Goal 3] Green label may reduce both cost of capital and credit risk',
    goalReference: 3
  },

  // Slide 28 (Slide 29): Portfolio Optimization with Green Assets
  {
    id: 28,
    type: 'math_derivation',
    title: 'Portfolio Optimization: Including Green Constraints',
    leftHeader: 'Modified Mean-Variance Framework',
    startingEquation: 'max_w E[R_p] - (lambda/2) * Var(R_p) s.t. sum w_i = 1, w_green >= g_min',
    assumptions: [
      'w = portfolio weights',
      'lambda = risk aversion parameter',
      'g_min = minimum green allocation constraint (e.g., ESG mandate)',
      'E[R_p] and Var(R_p) include greenium in expected returns'
    ],
    rightHeader: 'Lagrangian Solution',
    steps: [
      {
        number: 1,
        explanation: 'Form Lagrangian with green constraint',
        equation: 'L = E[R_p] - (lambda/2)Var(R_p) + mu(sum w_i - 1) + theta(w_green - g_min)'
      },
      {
        number: 2,
        explanation: 'First-order conditions yield constrained optimal weights',
        equation: 'w* = (1/lambda) Sigma^{-1} [E[R] + mu*1 + theta*I_green]'
      }
    ],
    bottomNote: '[Goal 3] ESG constraints alter efficient frontier and optimal allocations',
    goalReference: 3
  },

  // Slide 29 (Slide 30): Goal 3 Summary
  {
    id: 29,
    type: 'goal_summary',
    goalNumber: 3,
    title: 'Learning Goal 3 Achievement Check',
    subtitle: 'Confirm your mathematical modeling capabilities',
    questions: [
      'Derive the price of a green bond incorporating the greenium into the discount rate',
      'Explain how to decompose green bond yields into risk-free, credit, liquidity, ESG, and greenium components',
      'Apply duration and convexity calculations to assess interest rate risk for green bonds',
      'Integrate ESG scores quantitatively into greenium estimation and portfolio optimization'
    ],
    bottomNote: '[Goal 3] Complete - You have mastered Week 1 foundations of green finance',
    goalReference: 3
  }
];
