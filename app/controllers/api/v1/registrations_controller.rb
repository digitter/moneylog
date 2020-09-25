module Api
  module V1
    class RegistrationsController < ApplicationController
      include ResponseHelper
      before_action :authenticate_user!, only: %i[cancel]

      def signup
        user = User.new(user_signup_params)

        return response_conflict(:email) if User.find_by(email: user.email)

        begin
          ActiveRecord::Base.transaction do
            session[:user_id] = user.id if user.save!

            Asset.create!(user_id: user.id)

            3.times { MonthlhExpenditure.create!(user_id: user.id) }

            render json: to_json_api_format(user)
          end
        rescue => exception
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

        def to_json_api_format(user)
          UserSerializer.new(user, { include: %i[asset] })
        end
    end
  end
end
