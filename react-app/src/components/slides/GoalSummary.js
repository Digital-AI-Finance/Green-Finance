import React, { useState, useEffect } from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Button, Paper } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const GoalSummary = ({ slide, onGoalComplete, completedGoals }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const isGoalCompleted = completedGoals.includes(slide.goalNumber);

  useEffect(() => {
    if (isGoalCompleted) {
      const allChecked = {};
      slide.questions.forEach((_, idx) => {
        allChecked[idx] = true;
      });
      setCheckedItems(allChecked);
    }
  }, [isGoalCompleted, slide.questions]);

  const handleCheck = (index) => {
    setCheckedItems({
      ...checkedItems,
      [index]: !checkedItems[index]
    });
  };

  const allChecked = slide.questions.every((_, idx) => checkedItems[idx]);

  const handleComplete = () => {
    onGoalComplete(slide.goalNumber);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
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
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      position: 'relative',
      overflow: 'auto'
    }}>
      {showConfetti && (
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          fontSize: '4rem'
        }}>
          <CheckCircle sx={{ fontSize: '8rem', color: '#2CA02C' }} />
        </Box>
      )}

      <Typography variant="h4" sx={{ color: '#3333B2', mb: 1, fontWeight: 600 }}>
        {slide.title}
      </Typography>

      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        {slide.subtitle}
      </Typography>

      <Paper elevation={0} sx={{
        p: 3,
        bgcolor: '#F5F5F5',
        border: '2px solid #E0E0E0',
        borderRadius: 2,
        flexGrow: 1
      }}>
        <Typography variant="h6" sx={{ color: '#3333B2', mb: 3, fontWeight: 600 }}>
          Can you now...
        </Typography>

        {slide.questions.map((question, idx) => (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox
                checked={checkedItems[idx] || false}
                onChange={() => handleCheck(idx)}
                disabled={isGoalCompleted}
                sx={{
                  color: '#3333B2',
                  '&.Mui-checked': {
                    color: '#2CA02C'
                  }
                }}
              />
            }
            label={
              <Typography variant="body1" sx={{ color: '#404040' }}>
                {question}
              </Typography>
            }
            sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}
          />
        ))}

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          {isGoalCompleted ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle sx={{ color: '#2CA02C', fontSize: '2rem' }} />
              <Typography variant="h6" sx={{ color: '#2CA02C', fontWeight: 600 }}>
                Goal Completed
              </Typography>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={handleComplete}
              disabled={!allChecked}
              sx={{
                bgcolor: '#3333B2',
                color: '#FFF',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#2A2A8F'
                },
                '&:disabled': {
                  bgcolor: '#BDBDBD'
                }
              }}
            >
              Mark Goal {slide.goalNumber} Complete
            </Button>
          )}
        </Box>
      </Paper>

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

export default GoalSummary;
