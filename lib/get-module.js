const modules = require('./data/modules.json')

export default id => {
  return modules.find(item => item.id === id)
}
