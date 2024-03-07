import React, { memo } from "react"
import gif from "../assets/hi.gif"
import styled from "styled-components"
import Logout from "./Logout"

const WelCome = memo(({ currentUser }) => {
  return (
    currentUser && (
      <>
        <Container>
          <div className="logout">
            <Logout />
          </div>
          <div className="welcome">
            <img src={gif} alt="load..." />
            <h1>
              Welcome, <span>{currentUser.name}</span>
            </h1>
          </div>
        </Container>
      </>
    )
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  margin-bottom: 10rem;

  .logout {
    margin-left: 75%;
  }

  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      height: 20rem;
    }
    span {
      color: #4e0eff;
    }
  }
`

export default WelCome
