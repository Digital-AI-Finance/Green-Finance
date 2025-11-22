import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import InformationFlowNetwork from '../InformationFlowNetwork';

// Mock ChartExportButton to avoid dependencies
jest.mock('../../components/ChartExportButton', () => {
  return function MockChartExportButton() {
    return <div data-testid="export-button">Export</div>;
  };
});

describe('InformationFlowNetwork', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders without crashing', () => {
    const { container } = render(<InformationFlowNetwork />);
    expect(container).toBeInTheDocument();
  });

  test('creates SVG element', () => {
    const { container } = render(<InformationFlowNetwork />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders export button', () => {
    render(<InformationFlowNetwork />);
    expect(screen.getByTestId('export-button')).toBeInTheDocument();
  });

  // CRITICAL TEST: Catches the D3 "too late; already running" error
  test('properly cleans up D3 simulation on unmount', async () => {
    const { unmount } = render(<InformationFlowNetwork />);

    // Wait for simulation to start
    await waitFor(() => {
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    }, { timeout: 1000 });

    // Unmount component (should stop simulation and transitions)
    expect(() => unmount()).not.toThrow();

    // Wait a bit to ensure no delayed errors
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  // Test rapid mount/unmount (stress test)
  test('handles rapid mount/unmount without errors', async () => {
    for (let i = 0; i < 5; i++) {
      const { unmount } = render(<InformationFlowNetwork />);
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(() => unmount()).not.toThrow();
    }
  });

  // Test that simulation stops on cleanup
  test('D3 simulation stops when component unmounts', async () => {
    const { unmount } = render(<InformationFlowNetwork />);

    await waitFor(() => {
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    // Spy on console.error to catch D3 errors
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    unmount();

    // Wait for any delayed errors
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Should have no D3 errors
    expect(consoleErrorSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('too late; already running')
    );

    consoleErrorSpy.mockRestore();
  });

  // Test that nodes render with correct data
  test('renders all 4 nodes', async () => {
    const { container } = render(<InformationFlowNetwork />);

    await waitFor(() => {
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBe(4);  // 4 nodes: issuers, verifiers, investors, standards
    }, { timeout: 2000 });
  });

  // Test that links render
  test('renders all 4 links between nodes', async () => {
    const { container } = render(<InformationFlowNetwork />);

    await waitFor(() => {
      const lines = container.querySelectorAll('line');
      expect(lines.length).toBe(4);  // 4 connections
    }, { timeout: 2000 });
  });
});
