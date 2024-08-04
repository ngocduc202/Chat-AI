import React from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, removeChat } from '../store/chatSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { BsChatLeftText } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
const SideBar = ({ onToggle }) => {

  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.chat)
  const navigate = useNavigate()

  const handleNewChat = () => {
    dispatch(addChat())
  }

  const handleRemoveChat = (id) => {
    dispatch(removeChat(id))
    navigate('/')
  }
  return (
    <div className='bg-primaryBg-sideBar w-[340px] h-screen text-white p-4 '>
      <button className='flex mr-auto' onClick={onToggle}>
        <IoMdMenu size={30} />
      </button>
      <div className='mt-16'>
        <button className='px-4 py-3 flex items-center justify-center space-x-4 bg-gray-950 opacity-30 mb-10 rounded-full w-[80%]' onClick={handleNewChat}>
          <FaPlus size={18} />
          <p>Cuộc trò chuyện mới</p>
        </button>
        <div className='space-y-4'>
          <p>Gần đây:</p>
          <div className='flex flex-col space-y-6'>
            {data.map(chat => (
              <Link to={`/chat/${chat?.id}`} className='flex items-center justify-between p-1 rounded-full hover:bg-gray-500 hover:text-gray-100 ' key={chat?.id}>
                <div className='flex items-center justify-center gap-5 p-1'>
                  <BsChatLeftText size={19} />
                  <p className='items-center text-sm mb-1'>{chat?.title}</p>
                </div>
                <button onClick={(e) => {
                  e.preventDefault()
                  handleRemoveChat(chat?.id)
                }}>
                  <FaRegTrashAlt size={20} />
                </button>
              </Link>
            ))}
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