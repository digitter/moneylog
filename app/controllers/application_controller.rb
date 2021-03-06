class ApplicationController < ActionController::API
  include ActionController::Cookies
  include CurrentUserConcern
  include ResponseHelper

  before_action :verify_csrf_token
  after_action :set_csrf_token

  private
    # 認証トークン検証をし、不一致ならばセッションをリセット
    def verify_csrf_token
      unless session[:auth_token] == request.headers['X-CSRF-Token']
        reset_session

        # 400、500番台レスポンスエラー時には
        # after_action が動作しない為、新しいトークンを送る必要がある.
        set_csrf_token

        response_unauthorized
      end
    end

    # 新しいトークンをsession storeのcookieで管理しつつ、べつのcookieでset cookieする
    def set_csrf_token
      session[:auth_token] = SecureRandom.urlsafe_base64
      cookies['csrf-token'] = {
        value: session[:auth_token],
        domain: Rails.application.credentials.dig(:host, :front)
      }
    end

    # 認可チェック
    def authorize_user!
      # ユーザーがログインしていないならば401
      response_unauthorized unless @current_user
    end
end
