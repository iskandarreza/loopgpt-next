import React from 'react'
import { Box, Chip } from '@mui/material'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining'

export const CycleNumberComponent = ({ cycleNumber }) => {
  return (
    <Box sx={{ width: '150px' }}>
      <Chip
        sx={{ marginBottom: '8px', marginLeft: '16px' }}
        variant="outlined"
        icon={<ModelTrainingIcon />}
        label={`Cycle #${cycleNumber}`}
      />
    </Box>
  )
}
