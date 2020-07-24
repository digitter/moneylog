# frozen_string_literal: true

class Api::V1::SessionsController < ApplicationController
  include CurrentUserConcern

  def signin
    # session固定攻撃を防ぐためにログイン時には必ず、ユーザーをemail, passwordで参照してセッションに値を代入する
    user = User.find_by(email: params[:user][:email])
               .try(:authenticate, params[:user][:password])

    if user
      session[:user_id] = user.id

      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      render json: { status: 401 }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      # ここではエラーを起こさない
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end
end
