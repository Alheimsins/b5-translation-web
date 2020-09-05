import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { getInfo, getChoices, getQuestions } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r'
const repoUrl = 'https://github.com/Alheimsins/b5-johnson-120-ipip-neo-pi-r'
const name = 'b5'
const description = 'jabba'

const Details = () => {
  const info = getInfo()
  const { languages } = info
  const [language, setLanguage] = useState()
  const [questions, setQuestions] = useState()
  const [choices, setChoices] = useState()
  console.log(choices)

  useEffect(() => {
    (async () => {
      if (language) {
        setChoices(getChoices(language))
        setQuestions(getQuestions(language))
      }
    })()
  }, [language])

  const Language = props => {
    const { id, text } = props
    return (
      <p key={id} onClick={() => setLanguage(id)} className='cursor-pointer hover:bg-red-400'>
        {text}
      </p>
    )
  }

  const Item = props => {
    const { text } = props
    return (
      <div>
        {text}
      </div>
    )
  }

  const Choices = props => {
    const { choices } = props
    const { plus, minus } = choices
    return (
      <div>
        {plus.map(item => <Item {...item} key={nanoid()} />)}
        {minus.map(item => <Item {...item} key={nanoid()} />)}
      </div>
    )
  }

  const Questions = props => {
    const { questions } = props
    return (
      <div>
        {questions.map(item => <Item {...item} key={item.id} />)}
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col items-center mb-4'>
        <h1 className='text-4xl font-mono'>{name}</h1>
        <div className='max-w-sm rounded overflow-hidden shadow-lg'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>
              {description}
            </p>
            <h2>Choose language to translate from</h2>
            {languages.map((lang, index) => <Language {...lang} key={index} />)}
            {choices && <Choices choices={choices} />}
            {choices && <Questions questions={questions} />}
          </div>
          <div className='flex justify-end px-6 py-4'>
            <a href={repoUrl}>Visit repo</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Details
