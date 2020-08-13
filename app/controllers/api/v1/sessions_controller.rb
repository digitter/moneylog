# frozen_string_literal: true
module Api
  module V1
    class SessionsController < ApplicationController
      include ResponseHelper
      include CurrentUserConcern

      def signin
        # session固定攻撃を防ぐためにログイン時には必ず、ユーザーをemail, passwordで参照してセッションに値を代入する
        user = User.find_by(email: user_signin_params[:email])
                   .try(:authenticate, user_signin_params[:password])

        if user
          session[:user_id] = user.id
          render json: to_json_api_format(user)
        else
          response_unauthorized
        end
      end

      def logged_in
        if @current_user
          render json: to_json_api_format(@current_user)
        else
          check_login_response_unauthorized
        end
      end

      def logout
        reset_session
        response_success(:user, :logout)
      end

      private
        def user_signin_params
          params.require(:user).permit(
            :email,
            :password
          )
        end

        def to_json_api_format(user)
          UserSerializer.new(user, { include: %i[asset] })
        end
    end
  end
end
