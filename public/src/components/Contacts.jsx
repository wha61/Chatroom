import React, { memo, useState } from "react"
import styled from "styled-components"
import { Modal } from "antd"
import logo from "../assets/loading.gif"

const Contacts = memo(({ contacts, currentUser, changeChat, handleReturnWelcome }) => {
  const [selectedUser, setSelectedUser] = useState(undefined)
  const [isOpen, setIsOpen] = useState(false)

  const changeCurrentChat = (index, contact) => {
    setSelectedUser(index)
    changeChat(contact)
  }

  const handleLogoClick = () => {
    setSelectedUser(undefined)
    handleReturnWelcome()
  }

  return (
    currentUser && (
      <>
        <Container>
          <div className="logo" onClick={handleLogoClick}>
            <img src={logo} alt="logo" />
            <h2>Chat</h2>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              const img = contact.avatarImg
              return (
                <div
                  className={`contact ${selectedUser === index ? "selected" : ""}`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact)
                  }}
                >
                  <img src={`data:image/svg+xml;base64,${img}`} alt="avatar" />
                  <span>{contact.name}</span>
                </div>
              )
            })}
          </div>
          <div className="current">
            <img
              src={`data:image/svg+xml;base64,${currentUser.avatarImg}`}
              alt="avatar"
              onClick={() => {
                setIsOpen(true)
              }}
            />
            <span>{currentUser.name}</span>
          </div>
          <Modal
            open={isOpen}
            title={"点击头像进行修改"}
            onCancel={() => {
              setIsOpen(false)
            }}
            wrapClassName={"changeAvatar"}
          >
            <img src={`data:image/svg+xml;base64,${currentUser.avatarImg}`} alt="avatar" />
          </Modal>
        </Container>
      </>
    )
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  overflow: hidden;
  background-color: #080420;
  color: white;

  .logo {
    flex: 0.01;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
  }
  .contacts {
    flex: 0.9;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        width: 0.1rem;
        border-radius: 1rem;
        background-color: #ffffff39;
      }
    }

    .contact {
      display: flex;
      min-height: 5rem;
      align-items: center;
      gap: 1rem;
      width: 90%;
      gap: 1rem;
      border-radius: 0.2rem;
      padding: 0.4rem;
      transition: 0.5s ease-in-out;
      background-color: #2d2d5b;

      img {
        height: 3rem;
      }

      span {
        font-size: 1.5rem;
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current {
    background-color: #292687;
    min-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    border-radius: 0.2rem;
    margin: 0 0.7rem;
    img {
      height: 4rem;
      max-inline-size: 100%;
    }

    span {
      font-size: 1.5rem;
      text-align: center;
    }
  }
`

export default Contacts
