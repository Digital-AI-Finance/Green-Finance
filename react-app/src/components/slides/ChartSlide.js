import React from 'react';
import { Box, Typography } from '@mui/material';
import MarketGrowthChart from '../../charts/MarketGrowthChart';
import RiskReturnScatter from '../../charts/RiskReturnScatter';
// SIMPLIFIED VERSIONS (error-proof, no D3 simulations)
import NetworkDiagramSimple from '../../charts/simple/NetworkDiagramSimple';
import TimelineUltraSimple from '../../charts/simple/TimelineUltraSimple';
import HierarchyUltraSimple from '../../charts/simple/HierarchyUltraSimple';
// Keep Recharts charts (already simple and error-proof)
import WorldMapChoropleth from '../../charts/WorldMapChoropleth';
import IssuanceStackedArea from '../../charts/IssuanceStackedArea';
import TopIssuersBar from '../../charts/TopIssuersBar';
import MarketForecast from '../../charts/MarketForecast';
import YieldCurveSurface from '../../charts/YieldCurveSurface';
import PriceSensitivityCalculator from '../../charts/PriceSensitivityCalculator';
import EfficientFrontier from '../../charts/EfficientFrontier';

const ChartSlide = ({ slide }) => {
  const renderChart = () => {
    switch (slide.chartType) {
      case 'market_growth':
        return <MarketGrowthChart />;
      case 'risk_return':
        return <RiskReturnScatter />;
      // SIMPLIFIED VERSIONS (no D3 simulation errors)
      case 'information_flow_network':
        return <NetworkDiagramSimple />;
      case 'green_finance_timeline':
        return <TimelineUltraSimple />;
      case 'regulatory_hierarchy':
        return <HierarchyUltraSimple />;
      case 'world_map_choropleth':
        return <WorldMapChoropleth />;
      case 'issuance_stacked_area':
        return <IssuanceStackedArea />;
      case 'top_issuers_bar':
        return <TopIssuersBar />;
      case 'market_forecast':
        return <MarketForecast />;
      case 'yield_curve_surface':
        return <YieldCurveSurface />;
      case 'price_sensitivity_calculator':
        return <PriceSensitivityCalculator />;
      case 'efficient_frontier':
        return <EfficientFrontier />;
      default:
        return <Typography>Chart type not implemented</Typography>;
    }
  };

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#FFFFFF',
      borderRadius: 2,
      p: 4,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <Typography variant="h4" sx={{ color: '#3333B2', mb: 3, fontWeight: 600 }}>
        {slide.title}
      </Typography>

      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0
      }}>
        {renderChart()}
      </Box>

      {slide.bottomNote && (
        <Box sx={{
          mt: 3,
          pt: 2,
          borderTop: '2px solid #E0E0E0'
        }}>
          <Typography variant="body2" sx={{ color: '#B4B4B4', fontSize: '0.875rem' }}>
            {slide.bottomNote}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChartSlide;
