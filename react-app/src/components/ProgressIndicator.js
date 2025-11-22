import React from 'react';
import { Box, Tooltip } from '@mui/material';

const stages = [
  { id: 0, label: 'Problem', slides: [0, 2], color: '#FF7F0E' },
  { id: 1, label: 'L1', slides: [3, 13], color: '#C1C1E8' },
  { id: 2, label: 'L2', slides: [14, 27], color: '#ADADE0' },
  { id: 3, label: 'L3', slides: [28, 37], color: '#3333B2' },
  { id: 4, label: 'L4', slides: [38, 46], color: '#2CA02C' }
];

const ProgressIndicator = ({ currentSlide }) => {
  const getStage = (slideNum) => {
    if (slideNum <= 2) return 0;  // Problem framing
    if (slideNum <= 13) return 1; // Lecture 1
    if (slideNum <= 27) return 2; // Lecture 2
    if (slideNum <= 37) return 3; // Lecture 3
    return 4; // Lecture 4
  };

  const currentStage = getStage(currentSlide);

  const getStageStatus = (stageId) => {
    if (stageId < currentStage) return 'completed';
    if (stageId === currentStage) return 'current';
    return 'upcoming';
  };

  const getTooltipText = (stage) => {
    const slideRange = `Slides ${stage.slides[0] + 1}-${stage.slides[1] + 1}`;
    const labels = {
      0: 'Problem Framing',
      1: 'Lecture 1: Foundations (Goal 1)',
      2: 'Lecture 2: Measurement (Goal 2)',
      3: 'Lecture 3: Valuation (Goal 3)',
      4: 'Lecture 4: Applications'
    };
    return `${labels[stage.id]}\n${slideRange}`;
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      py: 2,
      px: 3
    }}>
      {stages.map((stage, index) => {
        const status = getStageStatus(stage.id);

        return (
          <React.Fragment key={stage.id}>
            <Tooltip
              title={getTooltipText(stage)}
              arrow
              placement="top"
            >
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5
              }}>
                <Box sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: status === 'completed'
                    ? '#2CA02C'
                    : status === 'current'
                      ? stage.color
                      : '#E0E0E0',
                  border: status === 'current' ? '3px solid #3333B2' : 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.2)'
                  }
                }} />
                <Box sx={{
                  fontSize: '0.65rem',
                  color: status === 'current' ? '#3333B2' : '#999',
                  fontWeight: status === 'current' ? 600 : 400
                }}>
                  {stage.label}
                </Box>
              </Box>
            </Tooltip>

            {index < stages.length - 1 && (
              <Box sx={{
                width: 40,
                height: 2,
                bgcolor: getStageStatus(stages[index + 1].id) === 'completed'
                  ? '#2CA02C'
                  : '#E0E0E0',
                transition: 'background-color 0.3s ease',
                mb: 2
              }} />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default ProgressIndicator;
