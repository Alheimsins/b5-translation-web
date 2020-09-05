import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { getInfo, getChoices, getQuestions } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r'
const FileSaver = require('file-saver')
const repoUrl = 'https://github.com/Alheimsins/b5-johnson-120-ipip-neo-pi-r'
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
    (async () => {
      if (language) {
        setChoices(getChoices(language))
        setQuestions(getQuestions(language))
      }
    })()
  }, [language])

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

  const Language = props => {
    const { id, text } = props
    return (
      <p key={id} onClick={() => setLanguage(id)} className='cursor-pointer hover:bg-red-400'>
        {text}
      </p>
    )
  }

  const Item = props => {
    const { text, dataType } = props
    return (
      <div className='mt-2'>
        <p>{text}</p>
        <p><input type='text' data-type={dataType} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' /></p>
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

  const Button = props => {
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
        <div className='max-w-m rounded overflow-hidden shadow-lg'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>
              {description}
            </p>
            <h2 className='text-2xl font-mono mb-2'>Choose language to translate from</h2>
            {languages.map((lang, index) => <Language {...lang} key={index} />)}
            {choices && <Choices choices={choices} />}
            {questions && <Questions questions={questions} />}
            {questions && choices && <Button />}
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
