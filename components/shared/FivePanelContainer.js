import React from 'react'
import { Container } from '@mui/material'

export function FivePanelContainer(props) {
  return (
    <Container
      sx={{
        border: 'grey.500 solid 1px',
        borderRadius: '16px',
        padding: '16px',
        display: 'grid',
        gap: '8px',
        gridTemplateColumns: 'repeat(5, 1fr)',
        justifyContent: 'space-evenly',
      }}
    >
      {props.children}
    </Container>
  )
}
