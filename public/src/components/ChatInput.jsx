import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from "react"
import Picker from "emoji-picker-react"
import { IoMdSend } from "react-icons/io"
import { BsEmojiSmileFill } from "react-icons/bs"
import styled from "styled-components"

const ChatInput = memo(
  forwardRef(({ submitMsg }, ref) => {
    const [showEmojiPicker, setshowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState("")
    const inputRef = useRef()

    useImperativeHandle(ref, () => ({
      closeEmojiPicker: closeEmojiPicker
    }))

    const handleEmojiPickerHideShow = () => {
      setshowEmojiPicker(!showEmojiPicker)
    }

    const closeEmojiPicker = () => {
      setshowEmojiPicker(false)
    }

    const handleEmojiClick = event => {
      inputRef.current.value += event.emoji
      setMsg(inputRef.current.value)
    }

    const handleInputChange = e => {
      const value = e.target.value
      setMsg(value)
    }

    const sendMsg = e => {
      e.preventDefault()
      if (msg.length > 0) {
        submitMsg(msg)
        setMsg("")
      }
    }

    return (
      <Container>
        <div className="button-container">
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
        <form className="input-container" onSubmit={sendMsg}>
          <input
            ref={inputRef}
            type="text"
            placeholder="type your message here"
            onChange={handleInputChange}
            value={msg}
          />
          <button name="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    )
  })
)

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -480px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-body::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .epr-emoji-category-label {
          background-color: transparent;
          color: white;
          backdrop-filter: blur(10px);
        }
        .epr-search {
          border-color: #9a86f3;
          background-color: transparent;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    height: 50%;
    border-radius: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    overflow: hidden;

    input {
      flex: 70%;
      height: 100%;
      width: 60%;
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1.5rem;
      padding-left: 1rem;
      &:focus {
        outline: none;
      }
    }

    button {
      flex: 1;
      height: 100%;
      width: 60%;
      border-radius: 2rem;
      background-color: #9a86f3;

      svg {
        padding-left: 0.5rem;
        color: white;
        height: 60%;
        width: 100%;
      }
    }
  }
`

export default ChatInput
