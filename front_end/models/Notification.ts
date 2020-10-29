import { toast } from 'react-toastify'

export const success = {
  signup: 'はじめまして！',
  signin: 'Hello !',
  create: '作成完了',
  update: '更新完了',
  destroy: '削除完了',
  bulkDestroy: '一括削除完了'
}

export const error = {
  signup: 'ユーザー登録に失敗しました...',
  signin: 'ログインに失敗しました...',
  create: '作成失敗',
  update: '更新失敗',
  destroy: '削除失敗',
  bulkDestroy: '一括削除失敗',
  fetchLogs: '取得失敗',
}

export const progress = {
  create: 'ログを作成中...',
  update: 'ログを更新中...',
  destroy: 'ログを削除中...',
  bulkDestroy: 'ログを一括削除中...',
  fetchLogs: 'ログを取得中...',
}

export default class Notification {
  static successMessage(msg: string) {
    toast.success(`🦄 ` + msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  static errorMessage(msg: string) {
      toast.error(`🦄` + msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
}
