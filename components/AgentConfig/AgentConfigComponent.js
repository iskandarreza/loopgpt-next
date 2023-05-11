import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { DynamicReactJson } from '@/pages/chat'
import { RESTORE_AGENT_STATE } from '@/store/types'

export function AgentConfigComponent() {
  const dispatch = useDispatch()
  const config = useSelector((state) => state.agentState.config)
  const initState = useSelector((state) => state.agentState.initState)
  const currentCycleState = useSelector(
    (state) => state.cycleState.agentCycleState
  )
  const [lastHistoryEntry] = useSelector(
    (state) => state.agentState.stateHistory
  ).slice(-1)
  const lastReportedConfig = lastHistoryEntry
    ? lastHistoryEntry.agent_state
    : false

  useEffect(() => {
    if (!config.goals && !!initState) {
      dispatch({ type: RESTORE_AGENT_STATE, payload: initState })
    }
  }, [config, initState])

  return (
    <Box sx={{ paddingBottom: '1em' }}>
      <Typography variant="h6" component="strong">
        Start Config
      </Typography>

      <Box>
        <DynamicReactJson
          name={'agent_config'}
          src={config}
          theme={'harmonic'}
          collapsed
        />
      </Box>

      <p>Model: {config?.model?.model}</p>
      <p>Agent Name: {config?.name}</p>
      <p>Agent Description: {config?.description}</p>
      <p>Goals: {config?.goals}</p>
      <p>Constraints: {config?.constraints}</p>
      <p>Init Prompt</p>
      <p>Next Prompt</p>
      <p>Tools</p>
      {!!currentCycleState && (
        <p>Staging Tool: {currentCycleState.command?.name}</p>
      )}
      {!!currentCycleState && (
        <p>Args: {JSON.stringify(currentCycleState.command?.args)}</p>
      )}

      <Typography variant="h6" component="strong">
        Last Reported Config
      </Typography>

      <Box>
        <DynamicReactJson
          name={'last_config'}
          src={lastReportedConfig ? lastReportedConfig : {}}
          theme={'harmonic'}
          collapsed
        />
      </Box>
      {!!lastReportedConfig && (
        <p>Staging Tool: {lastReportedConfig.staging_tool?.name}</p>
      )}
      {!!lastReportedConfig && (
        <p>Args: {JSON.stringify(lastReportedConfig.staging_tool?.args)}</p>
      )}
    </Box>
  )
}
