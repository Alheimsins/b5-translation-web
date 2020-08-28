import { useEffect, useState } from 'react'
import getModule from '../lib/get-module'

const Language = props => {
  const { id, text } = props
  return (
    <p key={id}>
      {text}
    </p>
  )
}

const Details = ({ module }) => {
  const { name, description, languagesUrl, repoUrl } = module
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    (async () => {
      const data = await fetch(languagesUrl)
      const json = await data.json()
      setLanguages(json)
    })()
  }, [languagesUrl])

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
          </div>
          <div className='flex justify-end px-6 py-4'>
            <a href={repoUrl}>Visit repo</a>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths () {
  const modules = require('../lib/data/modules.json')
  const paths = modules.map(module => ({
    params: { id: module.id }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const module = getModule(params.id)

  return { props: { module } }
}

export default Details
