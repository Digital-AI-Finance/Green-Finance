import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const LearningGoalTitle = ({ slide }) => {
  const goalColors = {
    1: { bg: '#C1C1E8', text: '#3333B2' },
    2: { bg: '#ADADE0', text: '#3333B2' },
    3: { bg: '#3333B2', text: '#FFFFFF' }
  };

  const colors = goalColors[slide.goalNumber] || goalColors[1];

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#FFFFFF',
      borderRadius: 2,
      p: 6,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <Chip
        label={`Learning Goal ${slide.goalNumber}`}
        sx={{
          mb: 4,
          bgcolor: colors.bg,
          color: colors.text,
          fontSize: '1rem',
          fontWeight: 600,
          px: 3,
          py: 2.5,
          height: 'auto'
        }}
      />

      <Typography
        variant="h3"
        sx={{
          color: '#3333B2',
          textAlign: 'center',
          mb: 4,
          maxWidth: '800px',
          fontWeight: 700
        }}
      >
        {slide.goalStatement}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Chip
          label={slide.goalType}
          variant="outlined"
          sx={{
            borderColor: '#3333B2',
            color: '#3333B2',
            fontWeight: 500
          }}
        />
      </Box>

      {slide.narrativeRole && (
        <Typography
          variant="body1"
          sx={{
            color: '#666',
            textAlign: 'center',
            fontStyle: 'italic',
            maxWidth: '600px'
          }}
        >
          {slide.narrativeRole}
        </Typography>
      )}
    </Box>
  );
};

export default LearningGoalTitle;
