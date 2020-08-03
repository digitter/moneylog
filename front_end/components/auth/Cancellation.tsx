import * as React from 'react'

interface Props {
}

const Cancellation = (props: Props) => {
  const { useState } = React
  const [userInfo, setUserInfo] = useState({
    email: null, password: null
  })

  const handleChange = (event: any) => {
  }

  const handleCancelSubmit = () => {
  }

  return (
    <React.Fragment>
      <h2>Cancellation</h2>
      <form onSubmit={handleCancelSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          defaultValue={userInfo.email}
          onChange={handleChange}
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Passowrd'
          defaultValue={userInfo.password}
          onChange={handleChange}
          required
        />

        <button type='submit'>Cancel</button>
      </form>
    </React.Fragment>
  )
}

export default Cancellation
