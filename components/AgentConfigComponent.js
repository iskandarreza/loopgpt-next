import React from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

export function AgentConfigComponent() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.agentStates)
  return (
    <Box>
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
