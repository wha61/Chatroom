import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { io } from "socket.io-client"
import { allUsersRoute, host, userRoute } from "../utils/APIRoutes"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatContainer from "../components/ChatContainer"

export default function Chat() {
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)

  const navigate = useNavigate()
  const navigateTo = path => {
    navigate(path)
  }

  const socket = useRef()

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("chat-token")) {
        const result = await axios.get(`${allUsersRoute}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("chat-token") }
        })
        const user = await axios.get(`${userRoute}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("chat-token") }
        })
        setContacts(result.data.data)
        setCurrentUser(user.data.data[0])
        console.log(contacts)
        console.log(currentUser)
      } else {
        navigateTo("/login")
      }
    }
    fetchData()
  // eslint-disable-next-line
  }, [])


  useEffect(() => {
    if (currentUser) {
      socket.current = io(host)
      socket.current.emit("add-user", currentUser.name)
    }
  }, [currentUser])

  const handleChange = contact => {
    setCurrentChat(contact)
  }

  const handleReturnWelcome = () => {
    setCurrentChat(undefined)
  }

  return (
    <>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChange}
            handleReturnWelcome={handleReturnWelcome}
          />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
  }
`
