import React, { useState, memo } from "react"
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { registerRoute } from "../utils/APIRoutes"
import "react-toastify/dist/ReactToastify.css"

import Logo from "../assets/loading.gif"

const Register = memo(() => {
  const [values, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    const { name, email, password } = values
    if (handleValidation()) {
      let code, token
      await axios.post(registerRoute, { name, email, password }).then(res => {
        code = res.data.code
        token = res.data.token
      })
      switch (code) {
        case -1001:
          toast.error("用户名重复", toastOptions)
          break
        case -1002:
          toast.error("邮箱已使用", toastOptions)
          break
        default:
          toast.success("注册成功", toastOptions)
          localStorage.setItem("chat-token", token)
          setTimeout(() => {
            navigateTo("/setAvatar")
          }, 1500)
      }
    }
  }

  const handleChange = event => {
    setValue({ ...values, [event.target.name]: event.target.value })
  }

  const handleValidation = () => {
    const { name, email, password, confirmPassword } = values
    if (name.length < 3) {
      toast.error("用户名不得小于三位", toastOptions)
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      toast.error("邮箱格式错误", toastOptions)
    } else if (password.length < 8) {
      toast.error("密码不得小于八位", toastOptions)
    } else if (password !== confirmPassword) {
      toast.error("密码不匹配", toastOptions)
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
          <input type="email" placeholder="email" name="email" onChange={e => handleChange(e)} />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            onChange={e => handleChange(e)}
          />
          <button type="submit">Create Account</button>
          <span>
            Already have an account?
            <Link to="/login"> Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
      {/* <ToastContainer autoClose={isSuccess ? false : true} /> */}
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
export default Register
