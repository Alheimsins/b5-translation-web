const Instructions = () => {
  return (
    <>
      <div className='flex flex-col items-center mb-4'>
        <h2 className='text-2xl font-mono'>How to translate</h2>
        <div className='w-1/2 rounded overflow-hidden shadow-lg'>
          <div className='px-6 py-4 text-gray-700 text-base'>
            <ul className='list-disc'>
              <li>Select the language you want to translate from</li>
              <li>Enter your translation below each sentense</li>
              <li>When you are finished push the "Generate translation" button. This will generate a file and download it to your computer</li>
              <li>Send the downloaded file to <a href='mailto:bigfive-test@rubynor.com' className='text-pink-500'>bigfive-test@rubynor.com</a> and tell us which language you have translated</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Instructions
