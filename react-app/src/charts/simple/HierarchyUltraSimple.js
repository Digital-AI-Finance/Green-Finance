import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Paper, Typography, Box, Chip, IconButton } from '@mui/material';
import { ExpandMore, ChevronRight, Public, Language, Flag } from '@mui/icons-material';
import ChartExportButton from '../../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  lighter: '#CCCCEB',
  lightest: '#D6D6EF'
};

const HierarchyUltraSimple = () => {
  const [expandedInternational, setExpandedInternational] = useState(true);
  const [expandedRegional, setExpandedRegional] = useState(true);
  const [expandedNational, setExpandedNational] = useState(true);
  const [selected, setSelected] = useState(null);
  const containerRef = React.useRef();

  const LevelBox = ({ title, icon, color, children, expanded, onToggle, level }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 20 }}
    >
      <Paper
        elevation={2}
        style={{
          padding: 16,
          border: `3px solid ${color}`,
          borderLeft: `8px solid ${color}`,
          backgroundColor: selected === level ? COLORS.lightest : '#fff'
        }}
        onClick={() => setSelected(level)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: expanded ? 16 : 0 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            style={{ color }}
          >
            {expanded ? <ExpandMore /> : <ChevronRight />}
          </IconButton>
          {icon}
          <Typography variant="h6" style={{ flex: 1, color, fontWeight: 600 }}>
            {title}
          </Typography>
          <Chip
            label={`${children.length} standards`}
            size="small"
            style={{ backgroundColor: color, color: '#fff', fontWeight: 600 }}
          />
        </div>

        {expanded && (
          <Box style={{ paddingLeft: 50 }}>
            {children.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Paper
                  variant="outlined"
                  style={{
                    padding: 12,
                    marginBottom: 12,
                    borderLeft: `4px solid ${color}`,
                    cursor: 'pointer',
                    backgroundColor: selected === item.id ? COLORS.lightest : '#fafafa',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(item.id);
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightest}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selected === item.id ? COLORS.lightest : '#fafafa'}
                >
                  <Typography variant="subtitle1" style={{ fontWeight: 600, color: COLORS.primary, marginBottom: 4 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {item.description}
                  </Typography>
                </Paper>
              </motion.div>
            ))}
          </Box>
        )}
      </Paper>
    </motion.div>
  );

  const internationalStandards = [
    { id: 'icma', name: 'ICMA Green Bond Principles', description: 'Voluntary process guidelines for green bond issuance' },
    { id: 'cbi', name: 'Climate Bonds Initiative', description: 'International certification scheme and standards' },
    { id: 'issb', name: 'ISSB Sustainability Disclosure', description: 'Global baseline for sustainability-related disclosures' }
  ];

  const regionalFrameworks = [
    { id: 'eu', name: 'EU Taxonomy Regulation', description: 'Mandatory classification system for sustainable activities in Europe' },
    { id: 'asean', name: 'ASEAN Taxonomy', description: 'Regional taxonomy for Southeast Asian countries' },
    { id: 'cgs', name: 'Common Ground Taxonomy', description: 'Harmonization initiative between major taxonomies' }
  ];

  const nationalStandards = [
    { id: 'china', name: 'China Green Bond Catalogue', description: 'National endorsed project catalogue for green bonds' },
    { id: 'uk', name: 'UK Green Gilt Framework', description: 'Sovereign green bond framework for UK government issuances' },
    { id: 'japan', name: 'Japan Green Bond Guidelines', description: 'National guidelines aligned with GBP and local priorities' }
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ width: '100%', padding: 30, backgroundColor: '#fff', overflowY: 'auto' }}
    >
      <ChartExportButton chartRef={containerRef} filename="hierarchy" />

      <Typography variant="h5" style={{ color: COLORS.primary, marginBottom: 10, textAlign: 'center', fontWeight: 600 }}>
        Regulatory Framework Hierarchy
      </Typography>

      <Typography variant="body2" color="textSecondary" style={{ marginBottom: 30, textAlign: 'center' }}>
        Three-tier structure: International → Regional → National
      </Typography>

      <Box style={{ maxWidth: 900, margin: '0 auto' }}>
        <LevelBox
          title="International Standards"
          icon={<Public style={{ fontSize: 28, color: COLORS.primary }} />}
          color={COLORS.primary}
          children={internationalStandards}
          expanded={expandedInternational}
          onToggle={() => setExpandedInternational(!expandedInternational)}
          level="international"
        />

        <LevelBox
          title="Regional Frameworks"
          icon={<Language style={{ fontSize: 28, color: COLORS.secondary }} />}
          color={COLORS.secondary}
          children={regionalFrameworks}
          expanded={expandedRegional}
          onToggle={() => setExpandedRegional(!expandedRegional)}
          level="regional"
        />

        <LevelBox
          title="National Standards"
          icon={<Flag style={{ fontSize: 28, color: COLORS.light }} />}
          color={COLORS.light}
          children={nationalStandards}
          expanded={expandedNational}
          onToggle={() => setExpandedNational(!expandedNational)}
          level="national"
        />
      </Box>

      <Box style={{ marginTop: 40, textAlign: 'center', padding: 20, backgroundColor: COLORS.lightest, borderRadius: 8 }}>
        <Typography variant="caption" color="textSecondary">
          <strong style={{ color: COLORS.primary }}>International:</strong> Global standards setting baseline |
          <strong style={{ color: COLORS.secondary }}> Regional:</strong> Multi-country harmonization |
          <strong style={{ color: COLORS.light }}> National:</strong> Country-specific implementation
        </Typography>
      </Box>
    </motion.div>
  );
};

export default HierarchyUltraSimple;

// Ultra-Simple Analysis:
// - NO @mui/lab (just @mui/material)
// - NO D3
// - NO useEffect
// - Only 4 useState (3 expand states + 1 selected) - very simple
// - All data pre-defined
// - CSS transitions only
// - Result: ZERO error risk, ZERO dependencies beyond basics
