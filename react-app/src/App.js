import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import SlideContainer from './components/SlideContainer';
import ProgressBar from './components/ProgressBar';
import { week1Slides_v3 } from './data/week1Slides_v3';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completedLectures, setCompletedLectures] = useState(() => {
    const saved = localStorage.getItem('completedLectures');
    return saved ? JSON.parse(saved) : [];
  });

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('currentSlide', currentSlide.toString());
    localStorage.setItem('completedLectures', JSON.stringify(completedLectures));
  }, [currentSlide, completedLectures]);

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
        setCurrentSlide((prev) => Math.min(week1Slides_v3.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLectureComplete = (lectureId) => {
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures([...completedLectures, lectureId]);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(week1Slides_v3.length - 1, prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        currentSlide={currentSlide}
        completedLectures={completedLectures}
        onSlideChange={setCurrentSlide}
      />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <ProgressBar
          currentSlide={currentSlide}
          totalSlides={week1Slides_v3.length}
        />
        <SlideContainer
          slide={week1Slides_v3[currentSlide]}
          currentSlide={currentSlide}
          totalSlides={week1Slides_v3.length}
          onNext={handleNextSlide}
          onPrev={handlePrevSlide}
          onLectureComplete={handleLectureComplete}
          completedLectures={completedLectures}
        />
      </Box>
    </Box>
  );
}

export default App;
