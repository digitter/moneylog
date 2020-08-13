class ApplicationController < ActionController::API
  before_action :verify_csrf_token
  after_action :set_csrf_token

  def verify_csrf_token
    reset_session unless session[:auth_token] == request.headers['X-CSRF-Token']
  end

  def set_csrf_token
    session[:auth_token] = SecureRandom.urlsafe_base64
    response.set_header('X-CSRF-Token', session[:auth_token])
  end
end
