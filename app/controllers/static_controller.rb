class StaticController < ApplicationController
  def home
    render json: { status: 'working' }
  end
end
