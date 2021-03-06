# frozen_string_literal: true
module Api
  module V1
    class SessionsController < ApplicationController
      include ResponseHelper
      before_action :authorize_user!, only: %i[logout]

      def signin
        # session固定攻撃を防ぐためにログイン時には必ず、ユーザーをemail, passwordで参照してセッションに値を代入する
        user = User.includes(
          :asset,
          :tags,
          monthly_expenditures: [:expenditure_logs],
          expenditure_logs: [:tags],
          income_logs: [:tags]
        ).find_by(email: user_signin_params[:email])
         .try(:authenticate, user_signin_params[:password])

        if user
          session[:user_id] = user.id
          render json: to_json_api_format(user)
        else
          response_unauthorized
        end
      end

      def logged_in
        render json: to_json_api_format(@current_user) if @current_user
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
          UserSerializer.new(user, { include: %i[asset expenditure_logs income_logs monthly_expenditures tags] })
        end
    end
  end
end
