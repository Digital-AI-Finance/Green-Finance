import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import SlideContainer from './components/SlideContainer';
import ProgressBar from './components/ProgressBar';
import { week1Slides } from './data/week1Slides';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(() => {
    const saved = localStorage.getItem('completedGoals');
    return saved ? JSON.parse(saved) : [];
  });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('currentSlide', currentSlide.toString());
    localStorage.setItem('completedGoals', JSON.stringify(completedGoals));
  }, [currentSlide, completedGoals]);

  // Load saved progress on mount
  useEffect(() => {
    const savedSlide = localStorage.getItem('currentSlide');
    if (savedSlide) {
      setCurrentSlide(parseInt(savedSlide, 10));
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => Math.min(week1Slides.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGoalComplete = (goalId) => {
    if (!completedGoals.includes(goalId)) {
      setCompletedGoals([...completedGoals, goalId]);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(week1Slides.length - 1, prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        currentSlide={currentSlide}
        completedGoals={completedGoals}
        onSlideChange={setCurrentSlide}
      />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <ProgressBar
          currentSlide={currentSlide}
          totalSlides={week1Slides.length}
        />
        <SlideContainer
          slide={week1Slides[currentSlide]}
          currentSlide={currentSlide}
          totalSlides={week1Slides.length}
          onNext={handleNextSlide}
          onPrev={handlePrevSlide}
          onGoalComplete={handleGoalComplete}
          completedGoals={completedGoals}
        />
      </Box>
    </Box>
  );
}

export default App;
