import React, { memo } from "react"
import { ImSwitch } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
const Logout = memo(() => {
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <Button onClick={handleClick}>
      <ImSwitch />
    </Button>
  )
})

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.4rem;
  background-color: #9a86f3;

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`

export default Logout
