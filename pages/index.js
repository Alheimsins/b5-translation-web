import ListItem from '../components/list-item'
const modules = require('../lib/data/modules.json')

const HomePage = () => {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-mono'>b5 translations</h1>
        {modules.map(module => <ListItem {...module} key={module.id} />)}
      </div>
    </>
  )
}

export default HomePage
