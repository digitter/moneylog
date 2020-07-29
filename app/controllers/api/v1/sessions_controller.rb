# frozen_string_literal: true
module Api
  module V1
    class SessionsController < ApplicationController
      include ResponseHelper
      include CurrentUserConcern

      def signin
        # session固定攻撃を防ぐためにログイン時には必ず、ユーザーをemail, passwordで参照してセッションに値を代入する
        user = User.find_by(email: params[:user][:email])
                  .try(:authenticate, params[:user][:password])

        if user
          session[:user_id] = user.id

          render json: {
            user: user
          }
        else
          response_unauthorized
        end
      end

      def logged_in
        if @current_user
          render json: {
            user: @current_user
          }
        else
          response_unauthorized
        end
      end

      def logout
        reset_session
        response_success(:user, :logout)
      end

      private
        def user_signin_params
          params.require(:user).permit(
            :email, :password
          )
        end
    end
  end
end
