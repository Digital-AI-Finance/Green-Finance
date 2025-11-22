import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { School, Analytics, Functions, CheckCircle, RadioButtonUnchecked, Circle } from '@mui/icons-material';

const goals = [
  {
    id: 1,
    title: "Market Microstructure Theory",
    type: "Theoretical",
    icon: School,
    slides: [0, 9],
    color: '#C1C1E8'
  },
  {
    id: 2,
    title: "Quantify Market Size & Growth",
    type: "Quantitative",
    icon: Analytics,
    slides: [10, 19],
    color: '#ADADE0'
  },
  {
    id: 3,
    title: "Derive Pricing Models",
    type: "Mathematical",
    icon: Functions,
    slides: [20, 29],
    color: '#3333B2'
  }
];

const Sidebar = ({ currentSlide, completedGoals, onSlideChange }) => {
  const getGoalStatus = (goal) => {
    if (completedGoals.includes(goal.id)) return 'completed';
    if (currentSlide >= goal.slides[0] && currentSlide <= goal.slides[1]) return 'current';
    return 'upcoming';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle sx={{ color: '#2CA02C' }} />;
      case 'current':
        return <Circle sx={{ color: '#3333B2' }} />;
      default:
        return <RadioButtonUnchecked sx={{ color: '#BDBDBD' }} />;
    }
  };

  return (
    <Box sx={{
      width: 280,
      height: '100vh',
      bgcolor: '#F5F5F5',
      borderRight: '2px solid #E0E0E0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      <Box sx={{ p: 3, borderBottom: '1px solid #E0E0E0' }}>
        <Typography variant="h6" sx={{ color: '#3333B2', fontWeight: 700, mb: 0.5 }}>
          Week 1
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Foundations of Green Finance
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{
          color: '#999',
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: 1
        }}>
          Learning Goals
        </Typography>
      </Box>

      <List sx={{ px: 2, flexGrow: 1 }}>
        {goals.map((goal) => {
          const status = getGoalStatus(goal);
          const Icon = goal.icon;
          const progress = completedGoals.includes(goal.id)
            ? 100
            : currentSlide >= goal.slides[0] && currentSlide <= goal.slides[1]
              ? ((currentSlide - goal.slides[0] + 1) / (goal.slides[1] - goal.slides[0] + 1)) * 100
              : 0;

          return (
            <ListItem
              key={goal.id}
              sx={{
                mb: 2,
                p: 2,
                bgcolor: status === 'current' ? '#FFFFFF' : 'transparent',
                borderRadius: 2,
                border: status === 'current' ? '2px solid #3333B2' : '1px solid transparent',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#FFFFFF',
                  border: '1px solid #ADADE0'
                }
              }}
              onClick={() => onSlideChange(goal.slides[0])}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Icon sx={{ color: goal.color === '#3333B2' ? '#3333B2' : '#ADADE0' }} />
                  </ListItemIcon>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
                      {goal.title}
                    </Typography>
                    <Chip
                      label={goal.type}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: goal.color,
                        color: goal.color === '#3333B2' ? '#FFF' : '#3333B2'
                      }}
                    />
                  </Box>
                  {getStatusIcon(status)}
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Slides {goal.slides[0] + 1}-{goal.slides[1] + 1}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {Math.round(progress)}%
                    </Typography>
                  </Box>
                  <Box sx={{
                    height: 4,
                    bgcolor: '#E0E0E0',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <Box sx={{
                      width: `${progress}%`,
                      height: '100%',
                      bgcolor: completedGoals.includes(goal.id) ? '#2CA02C' : '#3333B2',
                      transition: 'width 0.3s ease'
                    }} />
                  </Box>
                </Box>
              </Box>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid #E0E0E0' }}>
        <Typography variant="caption" sx={{ color: '#999' }}>
          Use arrow keys to navigate
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
