import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import ProgressIndicator from './ProgressIndicator';

const ProgressBar = ({ currentSlide, totalSlides }) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  // Determine current lecture and goal
  const getLectureInfo = (slideNum) => {
    if (slideNum <= 2) return { lecture: 0, label: 'Problem Framing', goal: null };
    if (slideNum <= 13) return { lecture: 1, label: 'Lecture 1: Foundations', goal: 1 };
    if (slideNum <= 27) return { lecture: 2, label: 'Lecture 2: Measurement', goal: 2 };
    if (slideNum <= 37) return { lecture: 3, label: 'Lecture 3: Valuation', goal: 3 };
    return { lecture: 4, label: 'Lecture 4: Applications', goal: null };
  };

  const { lecture, label, goal } = getLectureInfo(currentSlide);

  return (
    <Box sx={{
      width: '100%',
      bgcolor: '#FFFFFF',
      borderBottom: '1px solid #E0E0E0'
    }}>
      <Box sx={{ py: 1, px: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="body2" sx={{ color: '#3333B2', fontWeight: 600 }}>
            Slide {currentSlide + 1} of {totalSlides}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>
            {label} {goal && `(Goal ${goal})`}
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

      <ProgressIndicator currentSlide={currentSlide} />
    </Box>
  );
};

export default ProgressBar;
