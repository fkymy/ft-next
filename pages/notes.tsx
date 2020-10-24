import Link from 'next/link'
import Layout from '../components/Layout'
import React from 'react'

type User = {
  firstName: string
  lastName: string
}

function formatName(user: User) {
  return user.firstName + ' ' + user.lastName
}

const user: User = {
  firstName: 'Harper',
  lastName: 'Perez',
}

type Props = {
  user: User
}

function Test({ user }: Props) {
  if (user) {
    return <h1>Hello {formatName(user)}!</h1>
  }
  return <h1>Hello Stranger!</h1>
}

// Component Lifecycle
class Clock extends React.Component<{}, { date: Date }> {
  timerID: number

  constructor(props) {
    super(props)
    this.timerID = 0
    this.state = {
      date: new Date(),
    }
  }

  componentDidMount() {
    this.timerID = window.setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date(),
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, Clock</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

// Conditional Rendering
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <h1>Welcome Back!</h1>
  }
  return <h1>Please sign up.</h1>
}

function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>
}

type LoginProps = {}
type LoginState = {
  isLoggedIn: boolean
}

class LoginControl extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
    this.state = { isLoggedIn: false }
    this.handleLogInClick = this.handleLogInClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLogInClick() {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    let button
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLogInClick} />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

// Output Page
const NotesPage = () => (
  <Layout title="Notes">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
    <div>
      <Test user={user} />
      <Clock />
      <LoginControl />
    </div>
  </Layout>
)

export default NotesPage
