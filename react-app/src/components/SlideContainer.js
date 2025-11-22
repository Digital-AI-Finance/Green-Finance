import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import LearningGoalTitle from './slides/LearningGoalTitle';
import TwoColumnSlide from './slides/TwoColumnSlide';
import FrameworkOverview from './slides/FrameworkOverview';
import MathDerivation from './slides/MathDerivation';
import GoalSummary from './slides/GoalSummary';
import ChartSlide from './slides/ChartSlide';

const SlideContainer = ({ slide, currentSlide, totalSlides, onNext, onPrev, onGoalComplete, completedGoals }) => {
  const renderSlide = () => {
    switch (slide.type) {
      case 'learning_goal_title':
        return <LearningGoalTitle slide={slide} />;
      case 'two_column':
        return <TwoColumnSlide slide={slide} />;
      case 'framework_overview':
        return <FrameworkOverview slide={slide} />;
      case 'math_derivation':
        return <MathDerivation slide={slide} />;
      case 'goal_summary':
        return <GoalSummary slide={slide} onGoalComplete={onGoalComplete} completedGoals={completedGoals} />;
      case 'interactive_chart':
        return <ChartSlide slide={slide} />;
      default:
        return <TwoColumnSlide slide={slide} />;
    }
  };

  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      bgcolor: '#FAFAFA',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%', display: 'flex' }}
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderTop: '1px solid #E0E0E0',
        bgcolor: '#FFFFFF'
      }}>
        <IconButton
          onClick={onPrev}
          disabled={currentSlide === 0}
          sx={{
            color: '#3333B2',
            '&:disabled': { color: '#BDBDBD' }
          }}
        >
          <ArrowBack />
        </IconButton>

        <Box sx={{
          display: 'flex',
          gap: 0.5,
          alignItems: 'center'
        }}>
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <Box
              key={idx}
              sx={{
                width: idx === currentSlide ? 24 : 8,
                height: 8,
                bgcolor: idx === currentSlide ? '#3333B2' : '#E0E0E0',
                borderRadius: 4,
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Box>

        <IconButton
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          sx={{
            color: '#3333B2',
            '&:disabled': { color: '#BDBDBD' }
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SlideContainer;
