import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8',
  lighter: '#CCCCEB',
  lightest: '#D6D6EF'
};

const nodes = [
  { id: 'issuers', label: 'Issuers', group: 1, info: 'Private information about projects' },
  { id: 'verifiers', label: 'Verifiers', group: 2, info: 'Reduce information asymmetry' },
  { id: 'investors', label: 'Investors', group: 3, info: 'ESG preferences drive demand' },
  { id: 'standards', label: 'Standards', group: 4, info: 'Define credible signals' }
];

const links = [
  { source: 'issuers', target: 'verifiers', type: 'claims', label: 'Green claims' },
  { source: 'verifiers', target: 'investors', type: 'verified_signal', label: 'Verified signals' },
  { source: 'standards', target: 'verifiers', type: 'standards', label: 'Standards' },
  { source: 'investors', target: 'issuers', type: 'capital', label: 'Capital flows' }
];

const InformationFlowNetwork = () => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;

    let isMounted = true;  // Track component mount state

    const width = 800;
    const height = 600;

    // Clear previous and interrupt any ongoing transitions
    d3.select(svgRef.current).selectAll('*').interrupt();  // Stop all transitions first
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Define arrow markers
    svg.append('defs').selectAll('marker')
      .data(['end'])
      .enter().append('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 30)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', COLORS.secondary);

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', COLORS.secondary)
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrow-end)')
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200)
      .attr('opacity', 0.6);

    // Create link labels
    const linkLabel = svg.append('g')
      .selectAll('text')
      .data(links)
      .enter().append('text')
      .attr('font-size', 11)
      .attr('fill', '#666')
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .text(d => d.label)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 200)
      .attr('opacity', 0.7);

    // Create node groups
    const nodeGroup = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('cursor', 'pointer')
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded));

    // Create node circles
    const nodeColors = [COLORS.primary, COLORS.secondary, COLORS.light, COLORS.lighter];

    nodeGroup.append('circle')
      .attr('r', 0)
      .attr('fill', (d, i) => nodeColors[i])
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .transition()
      .duration(800)
      .delay((d, i) => i * 300)
      .attr('r', 40);

    // Add node labels
    nodeGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('font-size', 14)
      .attr('font-weight', 600)
      .attr('fill', '#fff')
      .text(d => d.label)
      .attr('opacity', 0)
      .transition()
      .duration(800)
      .delay((d, i) => i * 300)
      .attr('opacity', 1);

    // Hover effects
    nodeGroup
      .on('mouseenter', function(event, d) {
        setSelectedNode(d);
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', 50)
          .attr('stroke-width', 4);
      })
      .on('mouseleave', function() {
        setSelectedNode(null);
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', 40)
          .attr('stroke-width', 3);
      });

    // Update positions on simulation tick (with mount check)
    simulation.on('tick', () => {
      if (!isMounted) return;  // Don't update if component unmounted

      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      linkLabel
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);

      nodeGroup
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragStarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      isMounted = false;  // Mark as unmounted
      simulation.stop();  // Stop simulation
      svg.selectAll('*').interrupt();  // Interrupt all ongoing transitions
    };
  }, []);

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
        justifyContent: 'center',
        backgroundColor: '#ffffff'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="information_flow_network" />

      <svg ref={svgRef} style={{ maxWidth: '100%', height: 'auto' }} />

      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#ffffff',
            border: `2px solid ${COLORS.primary}`,
            borderRadius: 8,
            padding: '12px 20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            maxWidth: '80%',
            textAlign: 'center'
          }}
        >
          <div style={{ fontWeight: 600, color: COLORS.primary, marginBottom: 4 }}>
            {selectedNode.label}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            {selectedNode.info}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InformationFlowNetwork;
