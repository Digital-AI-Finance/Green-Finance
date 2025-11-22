import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MathDerivation = ({ slide }) => {
  // Helper to render LaTeX-like equations as formatted text
  const renderEquation = (equation) => {
    return (
      <Box sx={{
        fontFamily: 'Courier New, monospace',
        fontSize: '1.1rem',
        color: '#3333B2',
        bgcolor: '#F5F5F5',
        p: 2,
        borderRadius: 1,
        overflowX: 'auto',
        my: 1
      }}>
        {equation}
      </Box>
    );
  };

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
      <Typography variant="h4" sx={{ color: '#3333B2', mb: 3, fontWeight: 600 }}>
        {slide.title}
      </Typography>

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

          {slide.startingEquation && renderEquation(slide.startingEquation)}

          {slide.assumptions && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 1, fontWeight: 600 }}>
                Assumptions:
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {slide.assumptions.map((assumption, idx) => (
                  <Typography
                    key={idx}
                    component="li"
                    variant="body2"
                    sx={{ color: '#404040', mb: 0.5 }}
                  >
                    {assumption}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ color: '#3333B2', mb: 2, fontWeight: 600 }}>
            {slide.rightHeader}
          </Typography>

          {slide.steps && slide.steps.map((step, idx) => (
            <Paper key={idx} elevation={0} sx={{
              mb: 2,
              p: 2,
              bgcolor: '#FAFAFA',
              border: '1px solid #E0E0E0'
            }}>
              <Typography variant="body2" sx={{
                color: '#3333B2',
                fontWeight: 600,
                mb: 1
              }}>
                Step {step.number}: {step.explanation}
              </Typography>
              {renderEquation(step.equation)}
            </Paper>
          ))}
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

export default MathDerivation;
