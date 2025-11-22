import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock all chart components to test App logic independently
jest.mock('./charts/MarketGrowthChart', () => () => <div data-testid="market-growth-chart">Market Growth Chart</div>);
jest.mock('./charts/RiskReturnScatter', () => () => <div data-testid="risk-return-chart">Risk Return Chart</div>);
jest.mock('./charts/InformationFlowNetwork', () => () => <div data-testid="info-network">Info Network</div>);
jest.mock('./charts/GreenFinanceTimeline', () => () => <div>Timeline</div>);
jest.mock('./charts/RegulatoryHierarchy', () => () => <div>Hierarchy</div>);
jest.mock('./charts/WorldMapChoropleth', () => () => <div>World Map</div>);
jest.mock('./charts/IssuanceStackedArea', () => () => <div>Stacked Area</div>);
jest.mock('./charts/TopIssuersBar', () => () => <div>Top Issuers</div>);
jest.mock('./charts/MarketForecast', () => () => <div>Forecast</div>);
jest.mock('./charts/YieldCurveSurface', () => () => <div>Yield Surface</div>);
jest.mock('./charts/PriceSensitivityCalculator', () => () => <div>Calculator</div>);
jest.mock('./charts/EfficientFrontier', () => () => <div>Efficient Frontier</div>);

describe('App Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('shows sidebar with 3 learning goals', () => {
    render(<App />);
    expect(screen.getByText(/Market Microstructure Theory/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantify Market Size/i)).toBeInTheDocument();
    expect(screen.getByText(/Derive Pricing Models/i)).toBeInTheDocument();
  });

  test('starts on slide 1 (index 0)', () => {
    render(<App />);
    expect(screen.getByText(/Slide 1 of/)).toBeInTheDocument();
  });

  test('next button advances to next slide', () => {
    render(<App />);
    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);

    expect(screen.getByText(/Slide 2 of/)).toBeInTheDocument();
  });

  test('previous button goes back', () => {
    render(<App />);
    const nextButton = screen.getByText('Next');
    const prevButton = screen.getByText('Previous');

    // Go to slide 2
    fireEvent.click(nextButton);
    expect(screen.getByText(/Slide 2 of/)).toBeInTheDocument();

    // Go back to slide 1
    fireEvent.click(prevButton);
    expect(screen.getByText(/Slide 1 of/)).toBeInTheDocument();
  });

  test('previous button disabled on first slide', () => {
    render(<App />);
    const prevButton = screen.getByText('Previous').closest('button');
    expect(prevButton).toBeDisabled();
  });

  test('next button disabled on last slide', async () => {
    render(<App />);
    const nextButton = screen.getByText('Next').closest('button');

    // Navigate to last slide (slide 30, index 29)
    for (let i = 0; i < 29; i++) {
      fireEvent.click(nextButton);
    }

    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });

  test('saves progress to localStorage', () => {
    render(<App />);
    const nextButton = screen.getByText('Next');

    // Navigate to slide 5
    for (let i = 0; i < 4; i++) {
      fireEvent.click(nextButton);
    }

    // Check localStorage was updated
    const saved = localStorage.getItem('greenFinanceProgress');
    expect(saved).toBeTruthy();

    const progress = JSON.parse(saved);
    expect(progress.currentSlide).toBe(4);  // 0-indexed
  });

  test('restores progress from localStorage', () => {
    // Set saved progress
    localStorage.setItem('greenFinanceProgress', JSON.stringify({
      currentSlide: 10,
      completedGoals: [1]
    }));

    render(<App />);

    // Should start on slide 11 (index 10)
    expect(screen.getByText(/Slide 11 of/)).toBeInTheDocument();
  });

  test('keyboard navigation works - arrow right', () => {
    render(<App />);

    fireEvent.keyDown(window, { key: 'ArrowRight' });

    expect(screen.getByText(/Slide 2 of/)).toBeInTheDocument();
  });

  test('keyboard navigation works - arrow left', () => {
    render(<App />);

    // Go to slide 2 first
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText(/Slide 2 of/)).toBeInTheDocument();

    // Go back to slide 1
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText(/Slide 1 of/)).toBeInTheDocument();
  });

  test('clicking sidebar goal jumps to that section', () => {
    render(<App />);

    // Click on Goal 2 (should jump to slide 11)
    const goal2Button = screen.getByText(/Quantify Market Size/i).closest('button');
    fireEvent.click(goal2Button);

    expect(screen.getByText(/Slide 11 of/)).toBeInTheDocument();
  });

  // CRITICAL: Test that unmounting doesn't cause errors
  test('unmounting app does not throw errors', async () => {
    const { unmount } = render(<App />);

    // Navigate through a few slides to activate components
    const nextButton = screen.getByText('Next');
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Unmount should not throw
    expect(() => unmount()).not.toThrow();

    // Wait for any delayed errors
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  // Test navigating through all 30 slides
  test('can navigate through all slides without errors', async () => {
    const { container } = render(<App />);
    const nextButton = screen.getByText('Next').closest('button');

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Navigate through all slides
    for (let i = 0; i < 29; i++) {
      fireEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Should reach last slide
    expect(screen.getByText(/Slide 30 of/)).toBeInTheDocument();

    // Should have no console errors
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
