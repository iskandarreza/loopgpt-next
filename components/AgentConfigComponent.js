import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

export function AgentConfigComponent({ handleDrawerOpen }) {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.agentStates)
  return (
    <Box>
      <p>
        <Button variant="outlined" onClick={handleDrawerOpen}>
          Configure Agent
        </Button>
      </p>

      <Typography variant="h5" component="h3">
        Current Configuration
      </Typography>
      <p>Model</p>
      <p>Agent Name</p>
      <p>Agent Description</p>
      <p>Goals</p>
      <p>Constraints</p>
      <p>Init Prompt</p>
      <p>Next Prompt</p>
      <p>Tools</p>
      <p>Staged Tools</p>
    </Box>
  )
}
