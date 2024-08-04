import React, { useEffect, useState } from 'react'
import BoxContent from '../components/BoxContent'
import IconTemp from '../assets/temp.jpeg'
import IconMenu from "../assets/menu.png"
import SideBar from '../components/SideBar'
import IconStar from "../assets/star.png"
import { useParams } from 'react-router-dom'
import Gemini from '../gemini'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../store/chatSlice'


const ChatDetail = () => {
  const [menuToggle, setMenuToggle] = useState(false)
  const [dataDetail, setDataDetail] = useState([])
  const [inputChat, setInputChat] = useState('')
  const { id } = useParams()
  const { data } = useSelector((state) => state.chat)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data?.length > 0) {
      const chat = data.find(chat => chat.id === id)
      if (chat) {
        setDataDetail(chat.messages)
      }
    }
  }, [data, id])

  const handleChatDetail = async () => {
    if (id) {
      const chatText = await Gemini(inputChat, dataDetail)
      if (chatText) {
        const dataMessage = {
          idChat: id,
          userMess: inputChat,
          botMess: chatText
        }
        dispatch(addMessage(dataMessage))
        setInputChat('')
      }
    }
  }

  return (
    <div className='text-white xl:w-[80%] w-full relative'>
      <div className='flex items-center space-x-2 p-4'>
        <button onClick={() => setMenuToggle(!menuToggle)}>
          <img src={IconMenu} alt="" className='w-8 h-8 xl:hidden' />
        </button>
        <h1 className='text-xl uppercase font-bold'>Gemini</h1>
      </div>
      {menuToggle && <div className='absolute h-full top-0 left-0 transition-transform ease-in-out'>
        <SideBar onToggle={() => setMenuToggle(!menuToggle)} />
      </div>}
      <div className='max-w-[90%] w-full mx-auto mt-20 space-y-10'>
        {id ? <div className='flex flex-col space-y-4 p-4 h-[400px] overflow-x-hidden overflow-y-auto '>
          {Array.isArray(dataDetail) && dataDetail.map((item, index) => (
            <div className='flex space-y-6 flex-col' key={index}>
              <div className='flex space-x-6 items-baseline'>
                {item?.isBot ?
                  <>
                    <img src={IconStar} alt="" className='w-8 h-8' />
                    <p dangerouslySetInnerHTML={{ __html: item?.text }} />
                  </>
                  :
                  <>
                    <p>User</p>
                    <p>{item?.text}</p>
                  </>
                }

              </div>
            </div>
          ))}
        </div> :
          <div className='flex flex-col space-y-5'>
            <div className='space-y-1'>
              <h2 className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-[30px] font-bold inline-block text-transparent bg-clip-text'>Xin Chào</h2>
              <p className='text-3xl'>Hôm nay tôi có thể giúp gì cho bạn</p>
            </div>
            <div className='flex items-center space-x-3'>
              <BoxContent text='Lên kế hoạch bữa ăn' />
              <BoxContent text='Cụm từ mới' />
              <BoxContent text='Viết thư xin việc' />
              <BoxContent
                text='Tạo hình với AI'
                cols={true}
                img={IconTemp}
              />
            </div>
          </div>
        }
        <div className='flex items-center space-x-4 w-full'>
          <input
            type="text"
            value={inputChat}
            placeholder='Nhập câu lệnh tại đây'
            className='w-[90%] border p-4 rounded-lg bg-primaryBg-default'
            onChange={(e) => setInputChat(e.target.value)}
          />
          <button className='p-4 rounded-lg bg-green-500 text-white' onClick={handleChatDetail}>Gửi</button>
        </div>
      </div>

    </div>
  )
}

export default ChatDetail