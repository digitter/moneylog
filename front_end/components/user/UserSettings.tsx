import * as React from 'react'
import { Link } from 'react-router-dom';

interface Props {}

const UserSettings = (props: Props) => {
  return (
    <React.Fragment>
      ゆーざ〜のせってい
      <Link to='/settings/cancellation'>
        <p>たいかい画面</p>
      </Link>
    </React.Fragment>
  )
}

export default UserSettings
