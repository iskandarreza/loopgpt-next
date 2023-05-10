import React from 'react'
import { CycleProgress, DynamicReactJson } from './MessagesComponent'
import { CycleNumberComponent } from './CycleNumberComponent'
import { CycleStageContainer } from './CycleStageContainer'

export function CycleReportComponent(message) {
  return (
    <CycleStageContainer>
      <CycleNumberComponent cycleNumber={message.this_cycle.cycle} />
      {!!message.this_cycle.cycle_progress && (
        <CycleProgress progress={message.this_cycle.cycle_progress} />
      )}
      <DynamicReactJson
        name={'this_cycle'}
        src={message.this_cycle}
        theme={'harmonic'}
        collapsed
      />
    </CycleStageContainer>
  )
}
