import Item from './inventory-item'

const Questions = props => {
  const { questions } = props
  return (
    <div>
      <h2 className='text-2xl font-mono mt-2 mb-2'>Questions</h2>
      <div>
        {questions.map(item => <Item {...item} dataType='question' id={item.id} key={item.id} />)}
      </div>
    </div>
  )
}

export default Questions
