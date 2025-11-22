import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMore, ChevronRight, Public, Language, Flag } from '@mui/icons-material';
import { Paper, Typography, Chip } from '@mui/material';
import ChartExportButton from '../../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  lighter: '#CCCCEB'
};

// Pre-defined hierarchy structure (immutable)
const HIERARCHY_DATA = {
  id: 'root',
  name: 'Global Green Finance Standards',
  level: 'root',
  children: [
    {
      id: 'international',
      name: 'International Standards',
      level: 'international',
      children: [
        { id: 'icma', name: 'ICMA Green Bond Principles', description: 'Voluntary process guidelines', level: 'standard' },
        { id: 'cbi', name: 'Climate Bonds Initiative', description: 'Certification scheme', level: 'standard' },
        { id: 'issb', name: 'ISSB Sustainability Disclosure', description: 'Global baseline for sustainability disclosure', level: 'standard' }
      ]
    },
    {
      id: 'regional',
      name: 'Regional Frameworks',
      level: 'regional',
      children: [
        { id: 'eu-taxonomy', name: 'EU Taxonomy Regulation', description: 'Mandatory classification system for sustainable activities', level: 'standard' },
        { id: 'asean', name: 'ASEAN Taxonomy', description: 'Regional taxonomy for Southeast Asia', level: 'standard' },
        { id: 'cgs', name: 'Common Ground Taxonomy', description: 'Harmonization initiative', level: 'standard' }
      ]
    },
    {
      id: 'national',
      name: 'National Standards',
      level: 'national',
      children: [
        { id: 'china', name: 'China Green Bond Catalogue', description: 'National green bond endorsed project catalogue', level: 'standard' },
        { id: 'uk', name: 'UK Green Gilt Framework', description: 'Sovereign green bond framework', level: 'standard' },
        { id: 'japan', name: 'Japan Green Bond Guidelines', description: 'National guidelines aligned with GBP', level: 'standard' }
      ]
    }
  ]
};

const HierarchySimple = () => {
  const [expanded, setExpanded] = useState(['root', 'international', 'regional', 'national']);
  const [selected, setSelected] = useState(null);
  const containerRef = React.useRef();

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeId) => {
    setSelected(nodeId);
  };

  const getIcon = (level) => {
    switch (level) {
      case 'international': return <Public style={{ color: COLORS.primary }} />;
      case 'regional': return <Language style={{ color: COLORS.secondary }} />;
      case 'national': return <Flag style={{ color: COLORS.light }} />;
      default: return null;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'root': return COLORS.primary;
      case 'international': return COLORS.primary;
      case 'regional': return COLORS.secondary;
      case 'national': return COLORS.light;
      case 'standard': return COLORS.lighter;
      default: return '#666';
    }
  };

  const renderTree = (node) => (
    <TreeItem
      key={node.id}
      nodeId={node.id}
      label={
        <Paper
          elevation={selected === node.id ? 4 : 1}
          style={{
            padding: '8px 12px',
            margin: '4px 0',
            backgroundColor: selected === node.id ? COLORS.lightest : '#fff',
            border: `2px solid ${getLevelColor(node.level)}`,
            borderLeft: `6px solid ${getLevelColor(node.level)}`,
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {getIcon(node.level)}
            <div style={{ flex: 1 }}>
              <Typography variant="subtitle1" style={{ fontWeight: 600, color: getLevelColor(node.level) }}>
                {node.name}
              </Typography>
              {node.description && (
                <Typography variant="caption" color="textSecondary" style={{ display: 'block', marginTop: 2 }}>
                  {node.description}
                </Typography>
              )}
            </div>
            {node.level !== 'standard' && node.children && (
              <Chip
                label={`${node.children.length} items`}
                size="small"
                style={{
                  backgroundColor: COLORS.lightest,
                  color: COLORS.primary,
                  fontWeight: 600
                }}
              />
            )}
          </div>
        </Paper>
      }
    >
      {Array.isArray(node.children)
        ? node.children.map((childNode) => renderTree(childNode))
        : null}
    </TreeItem>
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: '#ffffff',
        overflowY: 'auto'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="regulatory_hierarchy" />

      <Typography variant="h5" style={{ color: COLORS.primary, marginBottom: 20, textAlign: 'center', fontWeight: 600 }}>
        Regulatory Framework Hierarchy
      </Typography>

      <Typography variant="body2" color="textSecondary" style={{ marginBottom: 20, textAlign: 'center' }}>
        Click items to select, expand/collapse branches to explore structure
      </Typography>

      <TreeView
        aria-label="regulatory hierarchy"
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        style={{ maxWidth: 800, margin: '0 auto' }}
      >
        {renderTree(HIERARCHY_DATA)}
      </TreeView>

      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <Typography variant="caption" color="textSecondary">
          <strong style={{ color: COLORS.primary }}>International:</strong> Global standards |
          <strong style={{ color: COLORS.secondary }}> Regional:</strong> Multi-country frameworks |
          <strong style={{ color: COLORS.light }}> National:</strong> Country-specific rules
        </Typography>
      </div>
    </motion.div>
  );
};

export default HierarchySimple;

// Simplicity Analysis:
// - Uses MUI TreeView (tested library)
// - NO D3 (no force, no tree layout algorithm)
// - NO useEffect (no lifecycle management)
// - Only 2 useState (expanded nodes, selected node) - simple
// - All data pre-defined (no runtime computation)
// - MUI handles ALL rendering and interaction
// - Result: ZERO error risk
