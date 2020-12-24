module Api
  module V1
    class RegistrationsController < ApplicationController
      include ResponseHelper
      before_action :authorize_user!, only: %i[cancel]

      def signup
        # 登録済みemmailは拒否
        return response_conflict(:email) if User.find_by(email: user_signup_params[:email])

        user = User.new(user_signup_params)

        ActiveRecord::Base.transaction do
        begin
          user.save!

          Asset.create!(user_id: user.id)

          3.times do |i|
            i += 1
            MonthlyExpenditure.create!(
              user_id: user.id,
              title: "固定費タイトル #{i}",
              is_active: false
            )
          end

          rescue => exception
            return response_internal_server_error
          end
        end

        # transaction成功後、セッション管理
        session[:user_id] = user.id

        render json: to_json_api_format(user)
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
          UserSerializer.new(user, { include: %i[asset monthly_expenditures expenditure_logs income_logs] })
        end
    end
  end
end
