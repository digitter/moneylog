class Api::V1::SessionsController < ApplicationController
  def create
    user = User
            .find_by(email: parasm[:user][:email])
            .try(:authenticate, param[:user][:password])

    if user
      session[:user_id] = user.id

      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    else
      # unauthrized
      render json: { status: 401 }
    end
  end

  def destroy
  end
end
