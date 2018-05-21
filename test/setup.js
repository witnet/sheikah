const Adapter = require('enzyme-adapter-react-16')
const { configure } = require('enzyme')
require('jest-enzyme')

configure({
  adapter: new Adapter()
})

// For async tests, catch all errors here so we don't have to try / catch
// everywhere for safety
process.on('unhandledRejection', (error) => {
  console.log(error)
})
