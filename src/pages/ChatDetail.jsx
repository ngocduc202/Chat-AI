import React, { useEffect, useRef, useState } from 'react'
import BoxContent from '../components/BoxContent'
import IconTemp from '../assets/temp.jpeg'
import { IoMdMenu } from "react-icons/io";
import { BiSend } from "react-icons/bi";
import SideBar from '../components/SideBar'
import Start from '../assets/gemini.svg'
import { useParams } from 'react-router-dom'
import UserIcon from '../assets/user.jpg'
import Gemini from '../gemini'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setNameChat } from '../store/chatSlice'
import { PulseLoader } from 'react-spinners'
import Typewriter from '../components/TypeWriter';


const ChatDetail = () => {
  const [menuToggle, setMenuToggle] = useState(false)
  const [dataDetail, setDataDetail] = useState([])
  const [messageDetail, setMessageDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputChat, setInputChat] = useState('')
  const { id } = useParams()
  const { data } = useSelector((state) => state.chat)
  const dispatch = useDispatch()
  const bottomRef = useRef(null);

  useEffect(() => {
    if (data?.length > 0) {
      const chat = data.find(chat => chat.id === id)
      if (chat) {
        setDataDetail(chat)
        setMessageDetail(chat.messages)
      }
    }
  }, [data, id])

  const handleChatDetail = async () => {
    if (inputChat.trim() === '') return;
    setLoading(true);
    if (id) {
      const chatText = await Gemini(inputChat, messageDetail)
      if (dataDetail.title === 'Chat') {
        const promptName = `This is a new chat, and user ask about ${inputChat}. No rely and comment just give me a name for this chat, Max length is 10 characters`;
        const newTitle = await Gemini(promptName)
        dispatch(setNameChat({ newTitle, chatId: id }))
      }
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
    setLoading(false);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Trì hoãn một chút, ví dụ 100ms
    return () => clearTimeout(timer);
  }, [messageDetail]);

  return (
    <div className='text-white xl:w-[80%] w-full relative'>
      <div className='flex items-center space-x-2 p-4'>
        <button onClick={() => setMenuToggle(!menuToggle)}>
          <IoMdMenu size={30} className='xl:hidden' />
        </button>
        <h1 className='text-3xl font-medium'>Gemini</h1>
      </div>
      {menuToggle && <div className='absolute h-full top-0 left-0 xl:hidden'>
        <SideBar onToggle={() => setMenuToggle(!menuToggle)} />
      </div>}
      <div className='max-w-[90%] w-full mx-auto mt-20 space-y-10'>
        {id ? <div className='flex flex-col space-y-4 p-4 h-[500px] overflow-x-hidden '>
          {Array.isArray(messageDetail) && messageDetail.map((item, index) => (
            <div className='flex space-y-6 flex-col' key={index}>
              <div className='flex space-x-6 items-baseline'>
                {item?.isBot ?
                  <>
                    <div className='flex justify-center gap-5 mt-5'>
                      <img src={Start} alt="" className='w-8 h-8' />
                      <Typewriter text={item?.text} speed={20} onComplete={() => bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })} />
                    </div>

                  </>
                  :
                  <>
                    <div className='flex items-center justify-center gap-5'>
                      <img src={UserIcon} alt="" className='w-8 h-8 rounded-full' />
                      <p>{item?.text}</p>
                    </div>
                  </>
                }

              </div>

            </div>
          ))}
          {loading && (
            <div className='flex space-x-6 items-baseline'>
              <img src={Start} alt="" className='w-8 h-8' />
              <PulseLoader color="white" size={14} />
            </div>
          )}
          <div ref={bottomRef}></div>
        </div> :
          <div className='flex flex-col space-y-5'>
            <div className='space-y-1'>
              <h2 className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-[80px] font-bold inline-block text-transparent bg-clip-text'>Xin Chào</h2>
              <p className='text-3xl text-gray-300 opacity-30'>Hôm nay tôi có thể giúp gì cho bạn</p>
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
        <div className='flex items-center w-full'>
          <input
            type="text"
            value={inputChat}
            placeholder='Nhập câu lệnh tại đây'
            className='w-[90%] border-none p-5 rounded-l-3xl bg-primaryBg-sideBar'
            onChange={(e) => setInputChat(e.target.value)}
          />
          <button className='p-5 rounded-r-3xl bg-primaryBg-sideBar text-white' onClick={handleChatDetail}>
            <BiSend size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatDetail