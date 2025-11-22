import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { Circle } from '@mui/icons-material';
import ChartExportButton from '../../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  success: '#2CA02C'
};

const TIMELINE_EVENTS = [
  { year: 2007, title: 'First Green Bond', description: 'EIB issues first labeled green bond', details: 'EUR 600M Climate Awareness Bond for renewable energy.' },
  { year: 2014, title: 'Green Bond Principles', description: 'ICMA establishes GBP', details: 'Four core components: use of proceeds, evaluation, management, reporting.' },
  { year: 2015, title: 'Paris Agreement', description: 'COP21 climate commitments', details: '196 parties commit to limit warming to <2°C.' },
  { year: 2020, title: 'EU Taxonomy', description: 'EU Taxonomy Regulation launched', details: 'First comprehensive classification for sustainable activities.' },
  { year: 2021, title: 'Market Boom', description: '>$500B annual issuance', details: 'Record driven by sovereigns and SL bonds.' },
  { year: 2024, title: 'Mainstream Adoption', description: '$2.1T total market', details: 'ESG integration becomes standard practice.' }
];

const TimelineUltraSimple = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const containerRef = React.useRef();

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ width: '100%', padding: 30, backgroundColor: '#fff' }}
    >
      <ChartExportButton chartRef={containerRef} filename="timeline" />

      <Typography variant="h5" style={{ color: COLORS.primary, marginBottom: 40, textAlign: 'center', fontWeight: 600 }}>
        Green Finance Evolution Timeline (2007-2024)
      </Typography>

      <Box style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: 60,
          top: 0,
          bottom: 0,
          width: 3,
          backgroundColor: COLORS.secondary
        }} />

        {/* Events */}
        {TIMELINE_EVENTS.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ position: 'relative', marginBottom: 40, paddingLeft: 100 }}
          >
            {/* Dot on timeline */}
            <div style={{
              position: 'absolute',
              left: 52,
              top: 10,
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: COLORS.primary,
              border: '3px solid #fff',
              boxShadow: '0 0 0 3px ' + COLORS.secondary,
              zIndex: 1
            }} />

            {/* Event card */}
            <Paper
              elevation={2}
              style={{
                padding: 16,
                cursor: 'pointer',
                border: `2px solid ${COLORS.lightest}`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.lightest;
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              onClick={() => setSelectedEvent(event)}
            >
              <Typography variant="h6" style={{ color: COLORS.primary, fontWeight: 600, marginBottom: 4 }}>
                {event.year} - {event.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {event.description}
              </Typography>
              <Typography variant="caption" style={{ color: COLORS.secondary, marginTop: 8, display: 'block' }}>
                Click for full details →
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>

      {/* Detail Dialog */}
      <Dialog open={Boolean(selectedEvent)} onClose={() => setSelectedEvent(null)} maxWidth="sm" fullWidth>
        {selectedEvent && (
          <>
            <DialogTitle style={{ backgroundColor: COLORS.lightest }}>
              <Typography variant="h5" style={{ color: COLORS.primary, fontWeight: 600 }}>
                {selectedEvent.year}: {selectedEvent.title}
              </Typography>
            </DialogTitle>
            <DialogContent style={{ marginTop: 20 }}>
              <Typography variant="body1" paragraph><strong>Overview:</strong> {selectedEvent.description}</Typography>
              <Typography variant="body2" color="textSecondary">{selectedEvent.details}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedEvent(null)} style={{ color: COLORS.primary }}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </motion.div>
  );
};

export default TimelineUltraSimple;

// NO @mui/lab dependency needed
// NO D3
// NO useEffect
// Only 1 useState (dialog)
// Result: ULTRA simple, ZERO errors
