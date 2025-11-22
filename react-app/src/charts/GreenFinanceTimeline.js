import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Modal, Typography } from '@mui/material';
import ChartExportButton from '../components/ChartExportButton';

const COLORS = {
  primary: '#3333B2',
  secondary: '#ADADE0',
  light: '#C1C1E8'
};

const events = [
  { year: 2007, title: 'First Green Bond', desc: 'European Investment Bank issues first labeled green bond', impact: 'Established foundation for market' },
  { year: 2014, title: 'Green Bond Principles', desc: 'ICMA establishes voluntary guidelines', impact: 'Created standardization framework' },
  { year: 2015, title: 'Paris Agreement', desc: 'COP21 climate commitments drive capital allocation', impact: 'Regulatory momentum accelerates' },
  { year: 2020, title: 'EU Taxonomy', desc: 'Comprehensive regulatory framework launched', impact: 'Defined environmental activities' },
  { year: 2021, title: 'Market Boom', desc: '$500B+ annual issuance milestone reached', impact: 'Mainstream asset class status' },
  { year: 2024, title: 'Mainstream Adoption', desc: '$2.1T total market size achieved', impact: 'Mature, diversified market' }
];

const GreenFinanceTimeline = () => {
  const containerRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 60px',
        backgroundColor: '#ffffff'
      }}
    >
      <ChartExportButton chartRef={containerRef} filename="green_finance_timeline" />

      <Box sx={{ width: '100%', position: 'relative' }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: COLORS.light,
            zIndex: 0
          }}
        />

        {/* Events */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          {events.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                cursor: 'pointer'
              }}
              onClick={() => handleEventClick(event)}
              whileHover={{ scale: 1.05 }}
            >
              {/* Dot */}
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: COLORS.primary,
                  border: '4px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  mb: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    width: 20,
                    height: 20,
                    backgroundColor: COLORS.secondary
                  }
                }}
              />

              {/* Year */}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: COLORS.primary,
                  mb: 0.5
                }}
              >
                {event.year}
              </Typography>

              {/* Title */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: '#404040',
                  textAlign: 'center',
                  fontSize: '0.75rem'
                }}
              >
                {event.title}
              </Typography>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Modal for event details */}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
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
          {selectedEvent && (
            <>
              <Typography
                id="event-modal-title"
                variant="h5"
                component="h2"
                sx={{ color: COLORS.primary, fontWeight: 700, mb: 2 }}
              >
                {selectedEvent.year}: {selectedEvent.title}
              </Typography>
              <Typography
                id="event-modal-description"
                sx={{ mb: 2, color: '#404040' }}
              >
                {selectedEvent.desc}
              </Typography>
              <Box sx={{ mt: 2, p: 2, backgroundColor: COLORS.light, borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.primary, mb: 0.5 }}>
                  Impact:
                </Typography>
                <Typography variant="body2" sx={{ color: '#404040' }}>
                  {selectedEvent.impact}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </motion.div>
  );
};

export default GreenFinanceTimeline;
