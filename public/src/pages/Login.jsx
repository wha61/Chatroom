import React, { memo, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { loginRoute } from "../utils/APIRoutes"
import "react-toastify/dist/ReactToastify.css"
import Logo from "../assets/loading.gif"

const Login = memo(() => {
  const [value, setValue] = useState({
    name: "",
    password: ""
  })

  const toastOptions = {
    position: "top-center",
    hideProgressBar: true,
    autoClose: 2000
  }

  const navigate = useNavigate()
  const navigateTo = path => {
    navigate(path)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const { name, password } = value
    if (handleValidation()) {
      let code, token
      await axios.post(loginRoute, { name, password }).then(res => {
        code = res.data.code
        token = res.data.token
      })
      switch (code) {
        case -1003:
          toast.error("用户不存在", toastOptions)
          break
        case -1004:
          toast.error("密码错误", toastOptions)
          break
        default:
          localStorage.setItem("chat-token", token)
          toast.success("登录成功", toastOptions)
          setTimeout(() => {
            navigateTo("/chat")
          }, 1500)
      }
    }
  }

  const handleChange = event => {
    setValue({ ...value, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { name, password } = value
    if (!name || !password) {
      toast.error("用户名和密码不能为空", toastOptions)
    } else if (name.length < 3) {
      toast.error("用户名不得小于三位", toastOptions)
    } else if (password.length < 8) {
      toast.error("密码不得小于八位", toastOptions)
    } else {
      return true
    }
    return false
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>CHATROOM 1.0</h1>
          </div>
          <input type="text" placeholder="user name" name="name" onChange={e => handleChange(e)} />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={e => handleChange(e)}
          />

          <button type="submit">login</button>
          <span>
            Didn't have an account?
            <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
})

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: colum;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 100px;
    }
    h1 {
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 2rem;
    input {
      background-color: transparent;
      padding: 1rem;
      padding-right: 8rem;
      padding-left: 1.5rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 5rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      a {
        color: #4e0eff;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`
export default Login
