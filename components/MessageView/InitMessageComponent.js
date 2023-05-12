import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import { IconListLine } from './shared/IconListLine'
import { Box } from '@mui/material'
import { DynamicReactJson } from '@/pages/chat'
import { useSelector } from 'react-redux'

export function InitMessageComponent(message) {
  return (
    <Box sx={{ display: 'flex' }}>
      <IconListLine icon={<NotificationsIcon />}>
        <span>New run start: </span>
        <DynamicReactJson
          name={'init_state'}
          src={message}
          theme={'harmonic'}
          collapsed
        />
      </IconListLine>

      <IconListLine icon={<SettingsIcon />}>
        Cycles to run: {`${message.maxcycles}`}
      </IconListLine>
    </Box>
  )
}
