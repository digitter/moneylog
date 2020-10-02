import * as React from 'react'
import { ToastContainer, toast, Flip } from 'react-toastify'

interface Props {
}

export const succesmMessages = {
  signup: 'はじめまして！',
  signin: 'Hello !',
  create: '作成完了',
  update: '更新完了',
  destroy: '削除完了'
}

export const errorMessages = {
  create: '作成失敗',
  update: '更新失敗',
  destroy: '削除失敗'
}

export const successMessage = (msg: string) => {
    toast.success(`🦄 ` + msg, {
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
