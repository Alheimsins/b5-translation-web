import { useEffect, useState } from 'react'
import { getInfo, getChoices, getQuestions } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r'
import Instructions from '../components/instructions'
import Choices from '../components/choices'
import Dropdown from '../components/dropdown-menu'
import Questions from '../components/questions'
const FileSaver = require('file-saver')
const name = 'b5-johnson-120-ipip-neo-pi-r'
const description = 'Big Five Johnson 120 IPIP-NEO-PI-R inventory'

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

  const handleTranslation = () => {
    const { plus, minus } = choices
    const inputNodes = window.document.querySelectorAll('input')
    const inputs = Array.prototype.slice.call(inputNodes)
    const gotEmptyValues = inputs.map(item => item.value).filter(item => item === '').length > 0
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
    if (gotEmptyValues) {
      window.alert('Please translate everything before generating file')
    } else {
      const fileName = `b5-translation-${name}.json`
      const file = new window.File([JSON.stringify(translation, null, 2)], fileName, { type: 'text/json;charset=utf-8' })
      FileSaver.saveAs(file)
    }
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
            <Dropdown {...{ languages, language, setLanguage }} />
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
