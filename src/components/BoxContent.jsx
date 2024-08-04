import React from 'react'

const BoxContent = ({ text, cols, img }) => {
  return (
    <div className={`w-[200px] h-[200px] bg-primaryBg-sideBar hover:bg-gray-500 cursor-pointer flex items-center justify-center rounded-xl ${cols && 'flex-col'}`}>
      <p>{text}</p>
      {img && <img src={img} alt="" className='w-[150px] h-[150px]' />}
    </div>
  )
}

export default BoxContent