import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { ErrorOutline, School, Analytics, Functions, IntegrationInstructions, CheckCircle, RadioButtonUnchecked, Circle } from '@mui/icons-material';

const sections = [
  {
    id: 0,
    title: "Problem Framing",
    type: "Context",
    icon: ErrorOutline,
    slides: [0, 2],
    color: '#FF7F0E',
    lecture: 0
  },
  {
    id: 1,
    title: "Lecture 1: Foundations",
    subtitle: "Goal 1 - Theory",
    type: "Theoretical",
    icon: School,
    slides: [3, 13],
    color: '#C1C1E8',
    lecture: 1
  },
  {
    id: 2,
    title: "Lecture 2: Measurement",
    subtitle: "Goal 2 - Data",
    type: "Quantitative",
    icon: Analytics,
    slides: [14, 27],
    color: '#ADADE0',
    lecture: 2
  },
  {
    id: 3,
    title: "Lecture 3: Valuation",
    subtitle: "Goal 3 - Math",
    type: "Mathematical",
    icon: Functions,
    slides: [28, 37],
    color: '#3333B2',
    lecture: 3
  },
  {
    id: 4,
    title: "Lecture 4: Applications",
    subtitle: "Integration",
    type: "Applied",
    icon: IntegrationInstructions,
    slides: [38, 46],
    color: '#2CA02C',
    lecture: 4
  }
];

const Sidebar = ({ currentSlide, completedLectures = [], onSlideChange }) => {
  const getSectionStatus = (section) => {
    if (completedLectures.includes(section.id)) return 'completed';
    if (currentSlide >= section.slides[0] && currentSlide <= section.slides[1]) return 'current';
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
          Week 1 v3.0
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Green Finance Foundations
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{
          color: '#999',
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: 1
        }}>
          Course Structure
        </Typography>
      </Box>

      <List sx={{ px: 2, flexGrow: 1 }}>
        {sections.map((section) => {
          const status = getSectionStatus(section);
          const Icon = section.icon;
          const progress = completedLectures.includes(section.id)
            ? 100
            : currentSlide >= section.slides[0] && currentSlide <= section.slides[1]
              ? ((currentSlide - section.slides[0] + 1) / (section.slides[1] - section.slides[0] + 1)) * 100
              : 0;

          return (
            <ListItem
              key={section.id}
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
              onClick={() => onSlideChange(section.slides[0])}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Icon sx={{ color: section.color }} />
                  </ListItemIcon>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#333', mb: 0.5 }}>
                      {section.title}
                    </Typography>
                    {section.subtitle && (
                      <Typography variant="caption" sx={{ display: 'block', color: '#666', mb: 0.5 }}>
                        {section.subtitle}
                      </Typography>
                    )}
                    <Chip
                      label={section.type}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: section.color,
                        color: ['#3333B2', '#2CA02C'].includes(section.color) ? '#FFF' : '#3333B2'
                      }}
                    />
                  </Box>
                  {getStatusIcon(status)}
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Slides {section.slides[0] + 1}-{section.slides[1] + 1}
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
                      bgcolor: completedLectures.includes(section.id) ? '#2CA02C' : section.color,
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
