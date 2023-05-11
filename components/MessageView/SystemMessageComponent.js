import React from 'react'
import { Box, ListItemIcon, ListItemText } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { IconListLine } from './shared/IconListLine'

export function SystemMessageComponent(message) {
  return (
    <IconListLine icon={<NotificationsIcon />}>
      {message.message.content}
    </IconListLine>
  )
}
