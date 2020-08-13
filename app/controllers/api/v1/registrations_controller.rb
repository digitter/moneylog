module Api
  module V1
    class RegistrationsController < ApplicationController
      include ResponseHelper

      def signup
        user = User.new(user_signup_params)

        return response_conflict(:email) if User.find_by(email: user.email)

        if user.save
          session[:user_id] = user.id
          render json: json_serialized(user)
        else
          response_internal_server_error
        end
      end

      def cancel
        user = User.find_by(email: params[:user][:email])
                   .try(authenticate: params[:user][:password])

        # TODO 論理削除にする
        user.destroy
      end

      private
        def user_signup_params
          params.require(:user).permit(
            :name,
            :email,
            :password,
            :password_confirmation
          )
        end

        def json_serialized(user)
          UserSerializer.new(user).serialized_json
        end
    end
  end
end
