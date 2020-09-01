class ApplicationController < ActionController::API
  include CurrentUserConcern
  before_action :verify_csrf_token
  after_action :set_csrf_token

  def verify_csrf_token
    # 認証トークンが不一致ならばセッションをリセット
    # セッションがリセットされた後
    # 認可チェックが必要な場合は authenticate_user! で制御する。
    reset_session unless session[:auth_token] == request.headers['X-CSRF-Token']
  end

  def authenticate_user!
    # ユーザーがログインしていないならばリダイレクト
    redirect_to api_v1_logged_in_path unless @current_user
  end

  def set_csrf_token
    # カスタムヘッダが送信されるレスポンス成功時 (200~300) のみに新しいトークンの付与をする
    if response.successful?
      session[:auth_token] = SecureRandom.urlsafe_base64
      response.set_header('X-CSRF-Token', session[:auth_token])
    end
  end
end
