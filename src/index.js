'use strict'

const { app, BrowserWindow } = require('electron')

app.on('before-quit', () => {
  console.log('Saliendo..')
})

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hola Mundo',
    center: true,
    maximizable: false
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('move', () => {
    const position = win.getPosition()
    console.log(`la posicion es ${position}`)
  })

  win.on('closed', () => {
    win = null
    app.quit()
  })

  win.loadFile('../dist/index.html')
})
