import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicReactJson } from '@/pages/chat'

export function AgentConfigComponent({ handleDrawerOpen }) {
  const config = useSelector((state) => state.agentState.config)
  const state = useSelector((state) => state)

  useEffect(() => {
    console.log(state)
  }, [state])
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
      <p>Model: {config?.model.model}</p>
      <p>Agent Name: {config?.name}</p>
      <p>Agent Description: {config?.description}</p>
      <p>Goals: {config?.goals}</p>
      <p>Constraints: {config?.constraints}</p>
      <p>Init Prompt</p>
      <p>Next Prompt</p>
      <p>Tools</p>
      <p>Staged Tools</p>

      <Box>
        <DynamicReactJson
          name={'agent_config'}
          src={config}
          theme={'harmonic'}
          collapsed
        />
      </Box>
    </Box>
  )
}
