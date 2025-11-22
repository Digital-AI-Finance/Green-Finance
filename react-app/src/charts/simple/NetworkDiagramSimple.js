import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChartExportButton from '../../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  lighter: '#CCCCEB',
  lightest: '#D6D6EF'
};

// Pre-calculated positions (NO simulation needed)
const nodes = [
  { id: 'issuers', label: 'Issuers', x: 150, y: 200, info: 'Private information about environmental impact' },
  { id: 'verifiers', label: 'Verifiers', x: 400, y: 200, info: 'Reduce information asymmetry through independent assessment' },
  { id: 'investors', label: 'Investors', x: 650, y: 200, info: 'ESG preferences, limited information on true impact' },
  { id: 'standards', label: 'Standards', x: 400, y: 400, info: 'Define credible signals (GBP, CBI, EU Taxonomy)' }
];

const links = [
  { from: 'issuers', to: 'verifiers', label: 'Claims + Evidence',
    x1: 150, y1: 200, x2: 400, y2: 200 },
  { from: 'verifiers', to: 'investors', label: 'Verified Signal',
    x1: 400, y1: 200, x2: 650, y2: 200 },
  { from: 'standards', to: 'verifiers', label: 'Standards',
    x1: 400, y1: 400, x2: 400, y2: 200, dashed: true },
  { from: 'investors', to: 'issuers', label: 'Capital',
    x1: 650, y1: 200, x2: 150, y2: 200, curved: true }
];

const NetworkDiagramSimple = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = React.useRef();

  const nodeColors = [COLORS.primary, COLORS.secondary, COLORS.light, COLORS.lighter];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 20
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="network_diagram" />

      <svg width="800" height="500" viewBox="0 0 800 500">
        {/* Links with animations */}
        {links.map((link, i) => (
          <motion.g key={i}>
            <motion.line
              x1={link.x1}
              y1={link.y1}
              x2={link.x2}
              y2={link.y2}
              stroke={COLORS.secondary}
              strokeWidth={2}
              strokeDasharray={link.dashed ? "5,5" : "0"}
              opacity={0.6}
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            />
            <motion.text
              x={(link.x1 + link.x2) / 2}
              y={(link.y1 + link.y2) / 2 - 10}
              textAnchor="middle"
              fontSize={11}
              fill="#666"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
            >
              {link.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrow"
            viewBox="0 -5 10 10"
            refX={8}
            refY={0}
            markerWidth={6}
            markerHeight={6}
            orient="auto"
          >
            <path d="M0,-5L10,0L0,5" fill={COLORS.secondary} />
          </marker>
        </defs>

        {/* Nodes with simple hover (NO drag, NO simulation) */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ cursor: 'pointer' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={hoveredNode?.id === node.id ? 45 : 40}
              fill={nodeColors[i]}
              stroke="#fff"
              strokeWidth={3}
              style={{
                transition: 'r 0.2s ease, stroke-width 0.2s ease'  // CSS transition
              }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy={5}
              fontSize={14}
              fontWeight={600}
              fill="#fff"
              pointerEvents="none"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Info box on hover */}
      {hoveredNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            marginTop: 20,
            backgroundColor: '#ffffff',
            border: `2px solid ${COLORS.primary}`,
            borderRadius: 8,
            padding: '12px 20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            maxWidth: 600,
            textAlign: 'center'
          }}
        >
          <div style={{ fontWeight: 600, color: COLORS.primary, marginBottom: 4 }}>
            {hoveredNode.label}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            {hoveredNode.info}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default NetworkDiagramSimple;

// NO useEffect = NO cleanup = NO errors
// NO D3 simulation = NO "too late" errors
// Only useState for hover = SIMPLE
// CSS transitions = NO D3 transition conflicts
// Result: 100% error-proof
