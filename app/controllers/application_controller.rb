class ApplicationController < ActionController::API
  include ActionController::Cookies
  include CurrentUserConcern
  include ResponseHelper
  before_action :verify_csrf_token
  after_action :set_csrf_token

  private
    # トークン検証
    def verify_csrf_token
      # 認証トークンが不一致ならばセッションをリセット
      reset_session unless session[:auth_token] == request.headers['X-CSRF-Token']
    end

    # 認可チェック
    def authorize_user!
      # ユーザーがログインしていないならば401
      response_unauthorized unless @current_user
    end

    # 新しいトークンをsession storeのcookieで管理しつつ、べつのcookieでset cookieする
    def set_csrf_token
      session[:auth_token] = SecureRandom.urlsafe_base64
      cookies['csrf-token'] = session[:auth_token]
    end
end
