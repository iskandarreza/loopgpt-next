import React from 'react'
import { Container } from '@mui/material'

export function RowPanelContainer({ children }) {
  return (
    <Container
      sx={{
        border: 'grey.500 solid 1px',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-evenly',
      }}
    >
      {children}
    </Container>
  )
}
