import * as React from 'react'
import { ToastContainer, toast, Flip } from 'react-toastify'

interface Props {
}

export const successMessage = (msg: string) => {
    toast.success(`🦄` + msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })
}

export const errorMessage = (msg: string) => {
    toast.error(`🦄` + msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })
}

const GlobalMessage = (props: Props) => {
  return (
    <React.Fragment>
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  )
}

export default GlobalMessage
