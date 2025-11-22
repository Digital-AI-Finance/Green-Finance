# Chart Components Quick Reference Guide

## How to Use Charts in Slides

To add a chart to a slide in `week1Slides.js`, use this format:

```javascript
{
  id: X,
  type: 'interactive_chart',
  title: 'Your Chart Title Here',
  chartType: 'chart_type_name',  // See list below
  bottomNote: '[Goal X] Your annotation here',
  goalReference: X
}
```

---

## Available Chart Types

### Goal 1: Market Microstructure Theory

| chartType | Component | Description | Interactivity |
|-----------|-----------|-------------|---------------|
| `information_flow_network` | InformationFlowNetwork | D3 force-directed network showing information flows between issuers, verifiers, investors, and standards | Drag nodes, hover for details |
| `green_finance_timeline` | GreenFinanceTimeline | Horizontal timeline of key milestones 2007-2024 | Click events for detailed modals |
| `regulatory_hierarchy` | RegulatoryHierarchy | Tree diagram showing international/regional/national regulatory frameworks | Hover for details, animated tree |

### Goal 2: Quantitative Market Analysis

| chartType | Component | Description | Interactivity |
|-----------|-----------|-------------|---------------|
| `market_growth` | MarketGrowthChart | Line chart showing market growth 2015-2024 | Hover tooltips |
| `world_map_choropleth` | WorldMapChoropleth | World map colored by green finance market size (top 20 countries) | Click countries, toggle absolute/per-capita |
| `issuance_stacked_area` | IssuanceStackedArea | Stacked area chart showing growth by instrument type (5 layers) | Click legend to show/hide layers |
| `top_issuers_bar` | TopIssuersBar | Horizontal bar chart of top 15 issuers | Click bars for detailed modals |
| `risk_return` | RiskReturnScatter | Scatter plot comparing green vs. conventional asset risk-return profiles | Hover tooltips |
| `market_forecast` | MarketForecast | Line chart with 3 forecast scenarios to 2030 | Toggle scenarios with checkboxes |

### Goal 3: Mathematical Modeling

| chartType | Component | Description | Interactivity |
|-----------|-----------|-------------|---------------|
| `yield_curve_surface` | YieldCurveSurface | Contour plot showing yield surface across maturity and greenium dimensions | Hover for exact values |
| `price_sensitivity_calculator` | PriceSensitivityCalculator | Interactive calculator with 4 sliders for bond pricing analysis | Adjust 4 parameters, real-time calculations |
| `efficient_frontier` | EfficientFrontier | Scatter plot with portfolio optimization curve | Slider for allocation, click points for breakdown |

---

## Chart Features Matrix

| Chart | Export | Animations | Modals | Sliders | Drag | Click | Hover |
|-------|--------|-----------|--------|---------|------|-------|-------|
| InformationFlowNetwork | Y | Y | N | N | Y | N | Y |
| GreenFinanceTimeline | Y | Y | Y | N | N | Y | Y |
| RegulatoryHierarchy | Y | Y | Y | N | N | N | Y |
| WorldMapChoropleth | Y | Y | Y | N | N | Y | Y |
| MarketGrowthChart | N | Y | N | N | N | N | Y |
| IssuanceStackedArea | Y | Y | N | N | N | Y | Y |
| TopIssuersBar | Y | Y | Y | N | N | Y | Y |
| RiskReturnScatter | N | Y | N | N | N | N | Y |
| MarketForecast | Y | Y | N | N | N | N | Y |
| YieldCurveSurface | Y | Y | N | N | N | N | Y |
| PriceSensitivityCalculator | Y | Y | N | Y | N | N | Y |
| EfficientFrontier | Y | Y | Y | Y | N | Y | Y |

---

## Chart Data Summary

### InformationFlowNetwork
- 4 nodes: Issuers, Verifiers, Investors, Standards
- 4 directional links showing flows

### GreenFinanceTimeline
- 6 milestones: 2007, 2014, 2015, 2020, 2021, 2024
- Each with title, description, and impact

### RegulatoryHierarchy
- 3-tier hierarchy: International (3), Regional (2), National (2)
- 8 total regulatory frameworks

### WorldMapChoropleth
- 20 countries with market data
- Range: $22B (Poland) to $450B (China)
- Per-capita range: $0.03K (India) to $6.29K (Sweden)

### MarketGrowthChart
- 10 data points: 2015-2024
- Range: $300B to $2.1T

### IssuanceStackedArea
- 5 instrument types
- 10 years of data (2015-2024)
- Total market: $300B to $3T across all instruments

### TopIssuersBar
- 15 issuers
- 4 issuer types: Supranational, Sovereign, Corporate, Financial
- Range: $20B to $85B

### RiskReturnScatter
- 8 green assets
- 8 conventional assets
- Risk range: 3-6.5%, Return range: 5-7.5%

### MarketForecast
- Historical: 2015-2024
- Forecast: 2025-2030
- 3 scenarios: Pessimistic ($5.1T), Base ($5.9T), Optimistic ($8.5T) by 2030

### YieldCurveSurface
- Maturity: 1-30 years (10 points)
- Greenium: 0-10 bps (11 points)
- 110 total data points
- Yield range: ~2% to ~3.5%

### PriceSensitivityCalculator
- Discount rate: 0-10%
- Greenium: 0-10 bps
- Maturity: 1-30 years
- Coupon rate: 0-8%
- Calculates: Price, Duration, Modified Duration, Convexity

### EfficientFrontier
- 11 portfolio points (0-100% green allocation)
- Risk range: 5-10%
- Return range: 4.5-7%
- Sharpe ratio range: 0.70-0.90

---

## Color Coding Guide

### By Chart Type

**Network/Tree Charts:**
- Primary nodes: `#3333B2` (mlpurple)
- Secondary nodes: `#ADADE0` (mllavender)
- Tertiary nodes: `#C1C1E8` (light)
- Links: `#ADADE0` with transparency

**Geographic Charts:**
- Low values: `#D6D6EF` (lightest)
- High values: `#3333B2` (primary)
- No data: `#E0E0E0` (gray)

**Time Series Charts:**
- Primary line: `#3333B2` (mlpurple)
- Historical: solid line
- Forecast: dashed line
- Optimistic scenario: `#2CA02C` (success/green)
- Pessimistic scenario: `#FF7F0E` (warning/orange)

**Comparison Charts:**
- Green bonds/assets: `#3333B2` or `#2CA02C`
- Conventional bonds/assets: `#ADADE0` or `#FF7F0E`
- Supranational: `#3333B2`
- Sovereign: `#ADADE0`
- Corporate: `#2CA02C`
- Financial: `#FF7F0E`

**Interactive Elements:**
- Selected/Active: `#2CA02C` (success)
- Hover: Lighter shade of base color
- Background: `#FFFFFF` or `#C1C1E840` (light with transparency)

---

## Performance Notes

### Fast Rendering (<100ms)
- MarketGrowthChart
- RiskReturnScatter
- IssuanceStackedArea
- MarketForecast

### Medium Rendering (100-500ms)
- TopIssuersBar
- YieldCurveSurface
- PriceSensitivityCalculator
- EfficientFrontier

### Slower Rendering (500ms-1s)
- InformationFlowNetwork (D3 force simulation)
- RegulatoryHierarchy (D3 tree layout)
- WorldMapChoropleth (map rendering + data join)
- GreenFinanceTimeline (animation sequences)

---

## Accessibility Features

All charts include:
- Proper ARIA labels
- Keyboard navigation (where applicable)
- High contrast colors (WCAG AA compliant)
- Screen reader friendly tooltips
- Alternative text for visual elements

---

## Export Functionality

Charts with export buttons generate PNG files with naming format:
```
{chart_name}_{YYYY-MM-DD}.png
```

Example: `efficient_frontier_2025-11-20.png`

Export settings:
- Format: PNG
- Scale: 2x (high resolution)
- Background: White
- Quality: Maximum

---

## Common Customization Patterns

### Adding a New Chart

1. Create chart component in `src/charts/`
2. Import in `src/components/slides/ChartSlide.js`
3. Add case to switch statement with unique `chartType` name
4. Add slide object to `src/data/week1Slides.js`
5. Test rendering and interactivity

### Modifying Colors

All charts use the `COLORS` constant:
```javascript
const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  lighter: '#CCCCEB',
  lightest: '#D6D6EF',
  success: '#2CA02C',
  warning: '#FF7F0E',
  neutral: '#7F7F7F'
};
```

### Adding Export to Chart

```javascript
import ChartExportButton from '../components/ChartExportButton';

// In component:
const containerRef = useRef();

// In JSX:
<div ref={containerRef}>
  <ChartExportButton chartRef={containerRef} filename="my_chart" />
  {/* Chart content */}
</div>
```

### Adding Interactive Slider

```javascript
import SliderControl from '../components/SliderControl';

<SliderControl
  label="Parameter Name"
  value={paramValue}
  onChange={setParamValue}
  min={0}
  max={100}
  step={1}
  unit="%"
  valueLabelFormat={(v) => v.toFixed(1)}
/>
```

---

## Troubleshooting

### Chart Not Rendering
1. Check console for errors
2. Verify chartType matches exactly (case-sensitive)
3. Ensure all imports in ChartSlide.js are correct
4. Check data array is not empty

### Export Not Working
1. Verify html2canvas is installed
2. Check containerRef is properly attached
3. Ensure chart is fully rendered before export
4. Check browser permissions for downloads

### Animations Laggy
1. Reduce data points if possible
2. Disable animations for complex charts
3. Use CSS transforms instead of repaints
4. Implement virtualization for large datasets

### Colors Not Matching
1. Verify COLORS constant is imported
2. Check for hardcoded color values
3. Use color variables consistently
4. Test in different browsers for rendering differences

---

This quick reference provides all necessary information to work with the chart components effectively.
