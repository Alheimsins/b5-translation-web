import ListItem from '../components/list-item'
const modules = [
  {
    id: 'b5-johnson-120-ipip-neo-pi-r',
    name: 'b5-johnson-120-ipip-neo-pi-r',
    description: 'Big Five Johnson 120 IPIP-NEO-PI-R inventory'
  }
]

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
