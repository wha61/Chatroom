import React, { memo, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { insertmsgRoute } from "../utils/APIRoutes"
import Logout from "./Logout"
import ChatInput from "./ChatInput"
import { getAllmsgRoute } from "../utils/APIRoutes"

const ChatContainer = memo(({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  let ChatInputRef = useRef()

  console.log(currentChat, currentUser)

  useEffect(() => {
    if (currentChat) {
      async function fetchData() {
        const result = await axios.post(getAllmsgRoute, {
          user1: currentChat.name,
          user2: currentUser.name
        })
        const msg = result.data.data
        msg.sort((a, b) => new Date(a.time) - new Date(b.time))
        setMessages(msg)
      }
      fetchData()
    }
    // eslint-disable-next-line
  }, [currentChat.name])

  useEffect(() => {
    if (socket.current) {
      socket.current.off("msg-recieve")
      socket.current.on("msg-recieve", (message, sender) => {
        if (sender === currentChat.name) {
          const time = new Date()
          setArrivalMessage({ sender, message, time })
        }
      })
    }
    // eslint-disable-next-line
  }, [currentChat.name])

  useEffect(() => {
    arrivalMessage && setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages])

  const submitMsg = async message => {
    socket.current.emit("send-msg", {
      to: currentChat.name,
      from: currentUser.name,
      msg: message
    })

    const m = {
      message,
      sender: currentUser.id,
      receiver: currentChat.id,
      time: new Date()
    }

    await axios.post(insertmsgRoute, m)

    let msg = messages
    msg = [...msg, m]
    setMessages(msg)
  }

  const changeTime = time => {
    const date = new Date(time).toLocaleString()
    return date
  }

  const closeEmojiPicker = () => {
    ChatInputRef.current.closeEmojiPicker()
  }

  return (
    currentChat && (
      <>
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <img src={`data:image/svg+xml;base64,${currentChat.avatarImg}`} alt="avatar" />
              <h3>{currentChat.name}</h3>
            </div>
            <Logout />
          </div>
          <div
            className="messages"
            onClick={() => {
              closeEmojiPicker()
            }}
          >
            {messages.length !== 0 && (
              <>
                {messages.map(message =>
                  message.sender === currentChat.name ? (
                    <div ref={scrollRef} key={uuidv4()} className={`message receive`}>
                      <img
                        src={`data:image/svg+xml;base64,${currentChat.avatarImg}`}
                        alt="avatar"
                      />
                      <div className="msg">
                        <span className="time">{changeTime(message.time)}</span>
                        <span className="text">{message.message}</span>
                      </div>
                    </div>
                  ) : (
                    <div ref={scrollRef} key={uuidv4()} className={`message send`}>
                      <div className="msg">
                        <span className="time">{changeTime(message.time)}</span>
                        <span className="text">{message.message}</span>
                      </div>
                      <img
                        src={`data:image/svg+xml;base64,${currentUser.avatarImg}`}
                        alt="avatar"
                      />
                    </div>
                  )
                )}
              </>
            )}
          </div>
          <ChatInput submitMsg={submitMsg} ref={ChatInputRef} />
        </Container>
      </>
    )
  )
})

const Container = styled.div`
  display: grid;
  grid-template-rows: 13% 72% 15%;
  color: white;
  overflow: hidden;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      img {
        height: 3rem;
      }
    }
  }

  .messages {
    &::-webkit-scrollbar {
      width: 0rem;
    }
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      white-space: normal;
      img {
        height: 2.5rem;
      }
      .msg {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.2rem;

        span.text {
          display: block;
          font-size: 1.3rem;
          background-color: #5ea6dc;
          color: white;
          padding: 0.7rem 0.5rem;
          border-radius: 0.5rem;
        }
      }
    }
    .receive {
      justify-content: left;
      .msg {
        align-items: flex-start;
      }
    }
    .send {
      justify-content: right;
      .msg {
        align-items: flex-end;
      }
    }
  }

  .chat-message {
    background-color: blue;
  }
`

export default ChatContainer
