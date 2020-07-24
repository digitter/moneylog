class ApplicationController < ActionController::API
  before_action :verify_csrf_token, only: %i[create update destroy]
  after_action :set_csrf_token

  def verify_csrf_token
    if session[:auth_token] == request.headers['X-CSRF-Token']
      puts "Authorized !"
    else
      # TODO: エラーヘルパーにまとめる
      puts "Unauthorized !"
      raise
    end
  end

  def set_csrf_token
    session[:auth_token] = SecureRandom.urlsafe_base64
    response.set_header('X-CSRF-Token', session[:auth_token])
  end
end
