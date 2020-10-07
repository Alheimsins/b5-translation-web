import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { getInfo, getChoices, getQuestions } from '@alheimsins/b5-costa-mccrae-300-ipip-neo-pi-r'
import Instructions from '../components/instructions'
import Item from '../components/inventory-item'
const FileSaver = require('file-saver')
const name = 'b5-costa-mccrae-300-ipip-neo-pi-r'
const description = 'Big Five Costa and McCrae\'s 300 IPIP-NEO-PI-R items'

const Details = () => {
  const info = getInfo()
  const { languages } = info
  const [language, setLanguage] = useState()
  const [questions, setQuestions] = useState()
  const [choices, setChoices] = useState()

  useEffect(() => {
    if (language) {
      setChoices(getChoices(language))
      setQuestions(getQuestions(language))
    }
  }, [language])

  const Dropdown = () => {
    return (
      <div className='inline-block relative w-64'>
        <select
          value={language}
          onChange={event => setLanguage(event.target.value)}
          className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
        >
          <option value='' key='first-option'>Choose language</option>
          {languages.map(lang => (
            <option value={lang.id} key={lang.id}>{lang.text}</option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </div>
    )
  }

  const handleTranslation = () => {
    const { plus, minus } = choices
    const inputNodes = window.document.querySelectorAll('input')
    const inputs = Array.prototype.slice.call(inputNodes)
    const translatedChoices = inputs.filter(input => input.dataset.type === 'choice')
    const translatedQuestions = inputs.filter(input => input.dataset.type === 'question')
    const translation = {
      meta: {
        name,
        description
      },
      choices: {}
    }
    const mergedPlus = plus.map((item, index) => Object.assign({}, item, { text: translatedChoices[index].value }))
    const mergedMinus = minus.map((item, index) => Object.assign({}, item, { text: translatedChoices[index].value }))
    const mergedQuestions = questions.map((item, index) => Object.assign({}, item, { text: translatedQuestions[index].value }))
    translation.choices.plus = mergedPlus
    translation.choices.minus = mergedMinus
    translation.questions = mergedQuestions
    const fileName = `b5-translation-${name}.json`
    const file = new window.File([JSON.stringify(translation, null, 2)], fileName, { type: 'text/json;charset=utf-8' })
    FileSaver.saveAs(file)
  }

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

  const Button = () => {
    return (
      <button onClick={handleTranslation} className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Generate translation
      </button>
    )
  }

  return (
    <>
      <div className='flex flex-col items-center mb-4'>
        <h1 className='text-4xl font-mono'>{name}</h1>
        <div className='w-1/2 rounded overflow-hidden shadow-lg'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>
              {description}
            </p>
            <h2 className='text-2xl font-mono mb-2'>Choose language to translate from</h2>
            <Dropdown />
            {choices && <Choices choices={choices} />}
            {questions && <Questions questions={questions} />}
            {questions && choices && <Button />}
          </div>
        </div>
      </div>
      <Instructions />
    </>
  )
}

export default Details
