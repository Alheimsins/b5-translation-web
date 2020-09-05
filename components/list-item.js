import Link from 'next/link'

const ListItem = props => {
  const { id, name, description } = props
  return (
    <Link href={`/${id}`}>
      <a className='cursor-pointer'>
        <div className='max-w-sm rounded overflow-hidden shadow-lg mb-2'>
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>
              {description}
            </p>
          </div>
          <div className='text-right p-2'>
            Translate this {'>'}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ListItem
