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

const hierarchyData = {
  name: 'Global Standards',
  details: 'Framework for green finance regulation',
  children: [
    {
      name: 'International',
      details: 'Cross-border voluntary standards',
      children: [
        { name: 'ICMA GBP', details: 'Green Bond Principles - voluntary guidelines' },
        { name: 'CBI Standard', details: 'Climate Bonds Initiative certification' },
        { name: 'ISSB', details: 'International Sustainability Standards Board' }
      ]
    },
    {
      name: 'Regional',
      details: 'Multi-country regulatory frameworks',
      children: [
        { name: 'EU Taxonomy', details: 'Comprehensive classification system' },
        { name: 'ASEAN Taxonomy', details: 'Southeast Asian green standards' }
      ]
    },
    {
      name: 'National',
      details: 'Country-specific regulations',
      children: [
        { name: 'China Green Bond Catalogue', details: 'National green bond framework' },
        { name: 'UK Green Gilt Framework', details: 'Sovereign green bond standard' }
      ]
    }
  ]
};

const RegulatoryHierarchy = () => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 900;
    const height = 600;

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Create hierarchy
    const root = d3.hierarchy(hierarchyData);
    const treeLayout = d3.tree().size([width - 200, height - 200]);
    treeLayout(root);

    // Create links
    const linkGenerator = d3.linkVertical()
      .x(d => d.x + 100)
      .y(d => d.y + 100);

    svg.append('g')
      .selectAll('path')
      .data(root.links())
      .enter().append('path')
      .attr('d', linkGenerator)
      .attr('fill', 'none')
      .attr('stroke', COLORS.secondary)
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr('opacity', 0.6);

    // Create node groups
    const nodeGroup = svg.append('g')
      .selectAll('g')
      .data(root.descendants())
      .enter().append('g')
      .attr('transform', d => `translate(${d.x + 100},${d.y + 100})`)
      .attr('cursor', 'pointer')
      .on('mouseenter', function(event, d) {
        setSelectedNode(d.data);
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', d => d.depth === 0 ? 60 : (d.children ? 35 : 25));
      })
      .on('mouseleave', function(event, d) {
        setSelectedNode(null);
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', d => d.depth === 0 ? 50 : (d.children ? 30 : 20));
      });

    // Color scale based on depth
    const colorScale = d3.scaleOrdinal()
      .domain([0, 1, 2])
      .range([COLORS.primary, COLORS.secondary, COLORS.light]);

    // Add circles
    nodeGroup.append('circle')
      .attr('r', 0)
      .attr('fill', d => colorScale(d.depth))
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .transition()
      .duration(800)
      .delay((d, i) => i * 150)
      .attr('r', d => d.depth === 0 ? 50 : (d.children ? 30 : 20));

    // Add text labels
    nodeGroup.append('text')
      .attr('dy', d => d.depth === 0 ? 5 : 4)
      .attr('text-anchor', 'middle')
      .attr('font-size', d => d.depth === 0 ? 14 : (d.children ? 12 : 11))
      .attr('font-weight', d => d.depth === 0 ? 700 : 600)
      .attr('fill', '#fff')
      .text(d => d.data.name)
      .attr('opacity', 0)
      .transition()
      .duration(800)
      .delay((d, i) => i * 150)
      .attr('opacity', 1)
      .call(wrap, d => d.depth === 0 ? 80 : (d.children ? 50 : 35));

  }, []);

  // Text wrapping function
  function wrap(text, width) {
    text.each(function(d) {
      const maxWidth = typeof width === 'function' ? width(d) : width;
      const text = d3.select(this);
      const words = text.text().split(/\s+/).reverse();
      let word;
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1.1;
      const y = text.attr('y') || 0;
      const dy = parseFloat(text.attr('dy')) || 0;
      let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');

      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > maxWidth && line.length > 1) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
        }
      }
    });
  }

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
      <ChartExportButton chartRef={containerRef} filename="regulatory_hierarchy" />

      <svg ref={svgRef} style={{ maxWidth: '100%', height: 'auto' }} />

      {selectedNode && selectedNode.details && (
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
            {selectedNode.name}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            {selectedNode.details}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegulatoryHierarchy;
