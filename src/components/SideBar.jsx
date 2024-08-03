import React from 'react'
import PropTypes from 'prop-types';
import IconPlus from "../assets/plusIcon.png"
import IconChat from "../assets/chat.png"
import IconTrash from "../assets/remove.png"
import IconMenu from "../assets/menu.png"
const SideBar = ({ onToggle }) => {
  return (
    <div className='bg-primaryBg-sideBar w-[280px] h-screen text-white p-8'>
      <button className='flex ml-auto xl:hidden' onClick={onToggle}>
        <img src={IconMenu} alt="" className='w-10 h-10' />
      </button>
      <div className='mt-20'>
        <button className='px-4 py-2 flex items-center space-x-4 bg-gray-600 mb-10'>
          <img src={IconPlus} alt="" className='w-4 h-4' />
          <p>Cuộc trò chuyện mới</p>
        </button>
        <div className='space-y-4'>
          <p>Gần đây:</p>
          <div className='flex flex-col space-y-6'>
            <div className='flex items-center justify-between p-4 bg-gray-800'>
              <div className='flex items-center space-x-4'>
                <img src={IconChat} alt="" className='w-8 h-8' />
                <p>Chat</p>
              </div>
              <img src={IconTrash} alt="" className='w-5 h-5' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SideBar.propTypes = {
  onToggle: PropTypes.func
}

export default SideBar