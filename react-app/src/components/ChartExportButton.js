import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas';

const ChartExportButton = ({ chartRef, filename = 'chart' }) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!chartRef.current) return;

    setLoading(true);
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false
      });

      const link = document.createElement('a');
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={loading ? <CircularProgress size={16} /> : <DownloadIcon />}
      onClick={handleExport}
      disabled={loading}
      sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        borderColor: '#3333B2',
        color: '#3333B2',
        '&:hover': {
          borderColor: '#3333B2',
          backgroundColor: 'rgba(51, 51, 178, 0.04)'
        },
        zIndex: 10
      }}
    >
      {loading ? 'Exporting...' : 'Export PNG'}
    </Button>
  );
};

export default ChartExportButton;
