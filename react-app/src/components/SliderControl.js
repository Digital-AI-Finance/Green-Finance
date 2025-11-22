import React from 'react';
import { Box, Typography, Slider } from '@mui/material';

const SliderControl = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  valueLabelFormat = (v) => v
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: '#404040', fontWeight: 500 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#3333B2', fontWeight: 600 }}
        >
          {valueLabelFormat(value)}{unit}
        </Typography>
      </Box>
      <Slider
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        sx={{
          color: '#3333B2',
          '& .MuiSlider-thumb': {
            backgroundColor: '#3333B2',
            '&:hover': {
              boxShadow: '0 0 0 8px rgba(51, 51, 178, 0.16)'
            }
          },
          '& .MuiSlider-track': {
            backgroundColor: '#3333B2'
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#D6D6EF'
          }
        }}
      />
    </Box>
  );
};

export default SliderControl;
