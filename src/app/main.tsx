import * as React from 'react'
import * as ReactDom from 'react-dom'

import { Application } from 'src/app/Application'
import { MainView } from 'src/ui/MainView'
import { AppContext } from './Context'

main()

function main() {
  const app = Application.create()
  app.run()

  ReactDom.render(
    <AppContext.Provider value={app}>
      <MainView />
    </AppContext.Provider>,
    document.getElementById('container')
  )
}
