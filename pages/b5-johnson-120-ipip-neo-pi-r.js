import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { getInfo, getChoices, getQuestions } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r'
const FileSaver = require('file-saver')
const name = 'b5-johnson-120-ipip-neo-pi-r'
const description = 'Big Five Johnson 120 IPIP-NEO-PI-R inventory'

const languageSort = (a, b) => {
  if (a.text < b.text) {
    return -1
  }
  if (a.text > b.text) {
    return 1
  }
  return 0
}

const Details = () => {
  const info = getInfo()
  const { languages } = info
  const [language, setLanguage] = useState()
  const [questions, setQuestions] = useState()
  const [choices, setChoices] = useState()
  languages.sort(languageSort)

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
      choices: {}
    }
    const mergedPlus = plus.map((item, index) => Object.assign({}, item, { text: translatedChoices[index].value }))
    const mergedMinus = minus.map((item, index) => Object.assign({}, item, { text: translatedChoices[index].value }))
    const mergedQuestions = questions.map((item, index) => Object.assign({}, item, { text: translatedQuestions[index].value }))
    translation.choices.plus = mergedPlus
    translation.choices.minus = mergedMinus
    translation.questions = mergedQuestions
    const file = new window.File([JSON.stringify(translation, null, 2)], 'b5-translation.json', { type: 'text/json;charset=utf-8' })
    FileSaver.saveAs(file)
  }

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

  const Instructions = () => {
    return (
      <>
        <div className='flex flex-col items-center mb-4'>
          <h2 className='text-2xl font-mono'>How to translate</h2>
          <div className='w-1/2 rounded overflow-hidden shadow-lg'>
            <div className='px-6 py-4'>
              <p className='text-gray-700 text-base'>
                <ul className='list-disc'>
                  <li>Select the language you want to translate from</li>
                  <li>Enter your translation below each sentense</li>
                  <li>When you are finished push the "Generate translation" button. This will generate a file and download it to your computer</li>
                  <li>Send the downloaded file to <a href='mailto:bigfive-test@rubynor.com' className='text-pink-500'>bigfive-test@rubynor.com</a> and tell us which language you have translated</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </>
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
