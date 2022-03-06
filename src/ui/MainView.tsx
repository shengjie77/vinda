import * as React from 'react'
import { AppContext } from 'src/app/Context'

import './style.css'

export function MainView() {
  return (
    <div>
      <Toolbar />
    </div>
  )
}

function Toolbar() {
  const app = React.useContext(AppContext)

  const onSelectBtnClick = () => {
    console.log('onArrwoBtnClick')
    app.switchToSelect()
  }

  const onDrawBtnClick = () => {
    console.log('onDrawBtnClick')
    app.switchToDraw()
  }

  return (
    <div className="toolbar">
      <button onClick={onSelectBtnClick}>Select</button>
      <button onClick={onDrawBtnClick}>Draw</button>
    </div>
  )
}
