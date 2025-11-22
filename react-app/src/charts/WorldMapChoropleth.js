import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Box, Typography, Modal, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  lighter: '#CCCCEB',
  lightest: '#D6D6EF'
};

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

const countryData = [
  { code: 'USA', name: 'United States', value: 420, percapita: 1.27, rank: 2 },
  { code: 'CHN', name: 'China', value: 450, percapita: 0.32, rank: 1 },
  { code: 'DEU', name: 'Germany', value: 180, percapita: 2.14, rank: 3 },
  { code: 'FRA', name: 'France', value: 160, percapita: 2.39, rank: 4 },
  { code: 'GBR', name: 'United Kingdom', value: 140, percapita: 2.07, rank: 5 },
  { code: 'JPN', name: 'Japan', value: 120, percapita: 0.95, rank: 6 },
  { code: 'NLD', name: 'Netherlands', value: 85, percapita: 4.84, rank: 7 },
  { code: 'SWE', name: 'Sweden', value: 65, percapita: 6.29, rank: 8 },
  { code: 'ESP', name: 'Spain', value: 62, percapita: 1.31, rank: 9 },
  { code: 'ITA', name: 'Italy', value: 58, percapita: 0.97, rank: 10 },
  { code: 'CAN', name: 'Canada', value: 55, percapita: 1.44, rank: 11 },
  { code: 'AUS', name: 'Australia', value: 48, percapita: 1.87, rank: 12 },
  { code: 'KOR', name: 'South Korea', value: 45, percapita: 0.87, rank: 13 },
  { code: 'BEL', name: 'Belgium', value: 42, percapita: 3.61, rank: 14 },
  { code: 'CHE', name: 'Switzerland', value: 38, percapita: 4.38, rank: 15 },
  { code: 'IND', name: 'India', value: 35, percapita: 0.03, rank: 16 },
  { code: 'NOR', name: 'Norway', value: 32, percapita: 5.93, rank: 17 },
  { code: 'DNK', name: 'Denmark', value: 28, percapita: 4.76, rank: 18 },
  { code: 'BRA', name: 'Brazil', value: 25, percapita: 0.12, rank: 19 },
  { code: 'POL', name: 'Poland', value: 22, percapita: 0.58, rank: 20 }
];

const WorldMapChoropleth = () => {
  const containerRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('absolute');

  const colorScale = scaleLinear()
    .domain([0, viewMode === 'absolute' ? 450 : 7])
    .range([COLORS.lightest, COLORS.primary]);

  const getCountryValue = (countryCode) => {
    const country = countryData.find(c => c.code === countryCode);
    if (!country) return 0;
    return viewMode === 'absolute' ? country.value : country.percapita;
  };

  const getCountryData = (countryCode) => {
    return countryData.find(c => c.code === countryCode);
  };

  const handleCountryClick = (geo) => {
    const country = getCountryData(geo.properties.iso_a3);
    if (country) {
      setSelectedCountry(country);
      setModalOpen(true);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '20px'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="world_map_green_finance" />

      <Box sx={{ mb: 2 }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="absolute" sx={{ px: 2, color: COLORS.primary }}>
            Absolute ($B)
          </ToggleButton>
          <ToggleButton value="percapita" sx={{ px: 2, color: COLORS.primary }}>
            Per Capita ($K)
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140
        }}
        style={{ width: '100%', height: '500px' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const value = getCountryValue(geo.properties.iso_a3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={value > 0 ? colorScale(value) : '#E0E0E0'}
                  stroke="#FFFFFF"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      fill: COLORS.secondary,
                      outline: 'none',
                      cursor: value > 0 ? 'pointer' : 'default'
                    },
                    pressed: { outline: 'none' }
                  }}
                  onClick={() => handleCountryClick(geo)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Legend */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem' }}>
          Low
        </Typography>
        <Box
          sx={{
            width: 200,
            height: 20,
            background: `linear-gradient(to right, ${COLORS.lightest}, ${COLORS.primary})`,
            borderRadius: 1
          }}
        />
        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.75rem' }}>
          High
        </Typography>
      </Box>

      {/* Modal for country details */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="country-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: `3px solid ${COLORS.primary}`,
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          {selectedCountry && (
            <>
              <Typography variant="h5" sx={{ color: COLORS.primary, fontWeight: 700, mb: 2 }}>
                {selectedCountry.name}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Global Rank:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary }}>
                    #{selectedCountry.rank}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Market Size:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${selectedCountry.value}B
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Per Capita:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${selectedCountry.percapita.toFixed(2)}K
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </motion.div>
  );
};

export default WorldMapChoropleth;
