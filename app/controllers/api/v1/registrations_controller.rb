class Api::V1::RegistrationsController < ApplicationController
  def signup
    user = User.new(user_signup_params)

    if user.save
      session[:user_id] = user.id
      render json: {
        user: user
      }
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
        :name, :email, :password, :password_confirmation
      )
    end
end
