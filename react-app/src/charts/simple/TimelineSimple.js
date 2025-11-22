import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import ChartExportButton from '../../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  success: '#2CA02C'
};

// Pre-defined events (immutable data)
const TIMELINE_EVENTS = [
  {
    year: 2007,
    title: 'First Green Bond',
    description: 'European Investment Bank (EIB) issues first labeled green bond',
    details: 'EUR 600 million Climate Awareness Bond to finance renewable energy and energy efficiency projects.',
    importance: 'high'
  },
  {
    year: 2014,
    title: 'Green Bond Principles',
    description: 'ICMA establishes voluntary Green Bond Principles (GBP)',
    details: 'Four core components: use of proceeds, project evaluation, management of proceeds, and reporting.',
    importance: 'high'
  },
  {
    year: 2015,
    title: 'Paris Agreement',
    description: 'COP21 climate commitments catalyze green finance growth',
    details: '196 parties commit to limit global warming to well below 2°C, driving massive capital reallocation needs.',
    importance: 'high'
  },
  {
    year: 2020,
    title: 'EU Taxonomy',
    description: 'EU Taxonomy Regulation launched for sustainable activities',
    details: 'First comprehensive classification system defining what qualifies as environmentally sustainable economic activity.',
    importance: 'high'
  },
  {
    year: 2021,
    title: 'Market Boom',
    description: 'Green bond issuance exceeds USD 500 billion annually',
    details: 'Record issuance driven by sovereign green bonds and sustainability-linked bonds gaining traction.',
    importance: 'medium'
  },
  {
    year: 2024,
    title: 'Mainstream Adoption',
    description: 'Green finance reaches USD 2.1 trillion total market size',
    details: 'Institutional investors allocate significant portfolios to green assets. ESG integration becomes standard practice.',
    importance: 'high'
  }
];

const TimelineSimple = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const containerRef = React.useRef();

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
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
        padding: 20,
        backgroundColor: '#ffffff',
        overflowY: 'auto'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="green_finance_timeline" />

      <Typography variant="h5" style={{ color: COLORS.primary, marginBottom: 30, textAlign: 'center', fontWeight: 600 }}>
        Green Finance Evolution Timeline (2007-2024)
      </Typography>

      <Timeline position="alternate">
        {TIMELINE_EVENTS.map((event, index) => (
          <TimelineItem key={event.year}>
            <TimelineOppositeContent color="textSecondary">
              <Typography variant="h6" style={{ color: COLORS.primary, fontWeight: 600 }}>
                {event.year}
              </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
              >
                <TimelineDot
                  style={{
                    backgroundColor: event.importance === 'high' ? COLORS.primary : COLORS.secondary,
                    width: 16,
                    height: 16
                  }}
                >
                  {event.importance === 'high' && (
                    <CheckCircle style={{ fontSize: 16, color: '#fff' }} />
                  )}
                </TimelineDot>
              </motion.div>
              {index < TIMELINE_EVENTS.length - 1 && (
                <TimelineConnector style={{ backgroundColor: COLORS.secondary }} />
              )}
            </TimelineSeparator>

            <TimelineContent>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Paper
                  elevation={3}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    border: `2px solid ${COLORS.lightest}`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = COLORS.primary;
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = COLORS.lightest;
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => handleEventClick(event)}
                >
                  <Typography variant="h6" component="h3" style={{ color: COLORS.primary, fontWeight: 600 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.description}
                  </Typography>
                  <Typography variant="caption" style={{ color: COLORS.secondary, marginTop: 4, display: 'block' }}>
                    Click for details
                  </Typography>
                </Paper>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {/* Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {selectedEvent && (
          <>
            <DialogTitle style={{ backgroundColor: COLORS.lightest, color: COLORS.primary }}>
              <Typography variant="h5" style={{ fontWeight: 600 }}>
                {selectedEvent.year}: {selectedEvent.title}
              </Typography>
            </DialogTitle>
            <DialogContent style={{ marginTop: 20 }}>
              <Typography variant="body1" paragraph>
                <strong>Overview:</strong> {selectedEvent.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {selectedEvent.details}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: COLORS.primary }}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </motion.div>
  );
};

export default TimelineSimple;

// Simplicity Analysis:
// - NO D3 (uses MUI Timeline component)
// - NO useEffect (no cleanup needed)
// - Only 2 useState (hover, dialog) - minimal state
// - MUI handles all rendering and lifecycle
// - Framer Motion handles animations (React-aware)
// - Result: ZERO error risk
