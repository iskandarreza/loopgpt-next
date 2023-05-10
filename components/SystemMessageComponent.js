import React from 'react'
import { Alert } from '@mui/material'

export function SystemMessageComponent(message) {
  return (
    <>
      <Alert severity="info">{message.message.content}</Alert>
    </>
  )
}
