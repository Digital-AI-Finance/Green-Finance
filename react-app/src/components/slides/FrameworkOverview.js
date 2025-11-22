import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const FrameworkOverview = ({ slide }) => {
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
      <Typography variant="h4" sx={{ color: '#3333B2', mb: 1, fontWeight: 600 }}>
        {slide.title}
      </Typography>

      {slide.frameworkName && (
        <Chip
          label={slide.frameworkName}
          sx={{
            mb: 3,
            bgcolor: '#E8E8F5',
            color: '#3333B2',
            fontWeight: 500,
            alignSelf: 'flex-start'
          }}
        />
      )}

      <Box sx={{
        display: 'flex',
        gap: 4,
        flexGrow: 1,
        overflow: 'auto'
      }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ color: '#3333B2', mb: 2, fontWeight: 600 }}>
            {slide.leftHeader}
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {slide.leftBullets.map((bullet, idx) => (
              <Typography
                key={idx}
                component="li"
                variant="body1"
                sx={{ color: '#404040', mb: 1.5, lineHeight: 1.6 }}
              >
                {bullet}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ color: '#3333B2', mb: 2, fontWeight: 600 }}>
            {slide.rightHeader}
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {slide.rightBullets.map((bullet, idx) => (
              <Typography
                key={idx}
                component="li"
                variant="body1"
                sx={{ color: '#404040', mb: 1.5, lineHeight: 1.6 }}
              >
                {bullet}
              </Typography>
            ))}
          </Box>
        </Box>
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

export default FrameworkOverview;
