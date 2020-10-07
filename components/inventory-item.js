import { nanoid } from 'nanoid'

const Item = props => {
  const id = nanoid()
  const { text, dataType } = props
  const placeholder = `Your translation of: ${text}`
  return (
    <div className='mt-2'>
      <label for={id} className='mb-1 font-semibold'>{text}</label>
      <input id={id} type='text' data-type={dataType} placeholder={placeholder} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
    </div>
  )
}

export default Item
