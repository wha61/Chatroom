import React, { useState, memo, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Buffer } from "buffer"
import { toast, ToastContainer } from "react-toastify"
import { setAvatarRoute } from "../utils/APIRoutes"
import loader from "../assets/loading.gif"
import "react-toastify/dist/ReactToastify.css"

const SetAvatar = memo(() => {
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setselectedAvatar] = useState(undefined)

  const api = "https://api.multiavatar.com"

  const toastOptions = {
    position: "top-center",
    hideProgressBar: true,
    autoClose: 2000
  }

  const navigate = useNavigate()
  const navigateTo = path => {
    navigate(path)
  }

  useEffect(() => {
    if (!localStorage.getItem("chat-token")) {
      navigateTo("/login")
    }
  })

  useEffect(() => {
    async function fetchData() {
      let data = []
      for (let i = 0; i < 4; i++) {
        const img = await axios.get(`${api}/${Math.round(Math.random() * 100000)}`)
        const buffer = new Buffer(img.data)
        data.push(buffer.toString("base64"))
      }
      setAvatars(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleSubmit = async () => {
    if (selectedAvatar === undefined) {
      return toast.error("请选择头像", toastOptions)
    } else {
      await axios.post(
        `${setAvatarRoute}`,
        {
          img: avatars[selectedAvatar]
        },
        { headers: { Authorization: "Bearer " + localStorage.getItem("chat-token") } }
      )
    }
    toast.success("头像选择成功", toastOptions)
    setTimeout(() => {
      navigateTo(`/chat`)
    }, 1500)
  }

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loading" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>请选择你的头像</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => {
                      setselectedAvatar(index)
                    }}
                  />
                </div>
              )
            })}
          </div>
          <button className="submit" onClick={handleSubmit}>
            提交头像
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      display: flex;
      border: 0.4rem solid transparent;
      border-radius: 50%;
      padding: 0.2rem;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`

export default SetAvatar
