import Link from 'next/link'

const ListItem = props => {
  const { id, name, description } = props
  return (
    <Link href={`/${id}`}>
      <a className='cursor-pointer'>
        <div className='w-full rounded overflow-hidden shadow-lg mb-2'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>
              {description}
            </p>
          </div>
          <div className='text-right p-2'>
            <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'>
              <span>Translate this</span>
              <svg viewBox='0 0 16 16' className='w-4 h-4 ml-2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                <path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z' />
                <path fill-rule='evenodd' d='M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z' />
              </svg>
            </button>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ListItem
