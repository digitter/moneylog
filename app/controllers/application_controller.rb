class ApplicationController < ActionController::API
  before_action :verify_csrf_token
  after_action :set_csrf_token

  def verify_csrf_token
    # 認証トークンが不一致ならばセッションをリセット & リダイレクト
    unless session[:auth_token] == request.headers['X-CSRF-Token']
      reset_session
      redirect_to api_v1_logged_in_path
    end
  end

  def set_csrf_token
    session[:auth_token] = SecureRandom.urlsafe_base64
    response.set_header('X-CSRF-Token', session[:auth_token])
  end

  def authenticate_user!
    # ユーザーがログインしていないならばリダイレクト
    redirect_to api_v1_logged_in_path unless @current_user
  end
end
