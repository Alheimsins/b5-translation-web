import { nanoid } from 'nanoid'
import Item from './list-item'

const Choices = props => {
  const { choices } = props
  const { plus } = choices
  return (
    <div>
      <h2 className='text-2xl font-mono mt-2 mb-2'>Choices</h2>
      <div>
        {plus.map(item => <Item {...item} dataType='choice' key={nanoid()} />)}
      </div>
    </div>
  )
}

export default Choices
