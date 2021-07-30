import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await fetch(`http://127.0.0.1:8000/account/login/`, {
        method: 'post',
        body: JSON.stringify({ username: emailRef.current.value, password: passwordRef.current.value}),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    history.push("/data")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
        <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card bg="success">

        <Card.Body>
        <div style={{margin: 30}}>
        <h2 className="text-center mb-4" style={{color: "white"}} ><img  style={{ height : 55, width: 60, marginLeft: 5, marginRight: 5}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/1024px-Globe_icon-white.svg.png" alt=""/>My Web Feed</h2>
         </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{color:"white"}}>Username</Form.Label>
              <Form.Control type="username" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{color:"white"}}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <div className="text-center" style={{marginTop:25}}>
            <Button variant="dark" disabled={loading} className="w-100" type="submit">
              Log In
            </Button></div>
          </Form>
          
        </Card.Body>
      </Card><div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div></div></Container>
    </>
  )
}
