import React from 'react'
import { Card, CardContent, CardHeader } from '@mui/material'

export const ThoughtsMessage = ({ thoughts }) => {
  const { text, reasoning, progress, plan, speak, id, cycle } = thoughts
  // let thoughtsKV = Object.keys(testObj)
  // .map((key) => [key, testObj[key]])
  // .map((v,i) => {
  //   if (v[0] !== "id") return {[v[0]]: v[1]}
  // })
  // .map((key) => [key, message.init_thoughts[key]])
  const thoughtForms = Object.assign({}, thoughts)
  delete thoughtForms.id
  delete thoughtForms.cycle

  console.log(Object.keys(thoughts).map((key) => thoughts[key]))
  console.log(thoughtForms)

  // console.log(Object.keys(thoughts).map((key) => {
  //   <div key={`${thoughts.id}-${key}`}>
  //     {/* {key === "id" ? "" : */}
  //       <div>
  //         <p>
  //           <strong>{key}</strong>: <span>{key}</span>
  //         </p>
  //       </div>
  //     {/* } */}
  //   </div>
  // }))
  // return ThoughtBox()
  return Object.keys(thoughtForms).map((key, index) => (
    <Card key={`${id}-${key}-${index}`}>
      <CardHeader title={key.toUpperCase()} />
      {/* <strong>{key}</strong> */}
      {/* </CardHeader> */}
      <CardContent>
        <pre style={{ whiteSpace: 'normal' }}>{thoughtForms[key]}</pre>
      </CardContent>
      {/* <p key={`${id}-${key}-${index}`}><strong>{key}:</strong><span>{thoughtForms[key]}</span></p> */}
    </Card>
  ))
}
