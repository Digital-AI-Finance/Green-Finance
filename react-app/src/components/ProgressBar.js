import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const ProgressBar = ({ currentSlide, totalSlides }) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  // Determine current goal
  let currentGoal = 1;
  if (currentSlide >= 20) currentGoal = 3;
  else if (currentSlide >= 10) currentGoal = 2;

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#FFFFFF',
      borderBottom: '1px solid #E0E0E0',
      py: 1,
      px: 3
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Typography variant="body2" sx={{ color: '#3333B2', fontWeight: 600 }}>
          Slide {currentSlide + 1} of {totalSlides}
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Learning Goal {currentGoal} of 3
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: '#E8E8F5',
          '& .MuiLinearProgress-bar': {
            bgcolor: '#3333B2',
            borderRadius: 4
          }
        }}
      />
    </Box>
  );
};

export default ProgressBar;
