# frozen_string_literal: true

module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user, only: %i[logged_in]
  end

  def set_current_user
    @current_user = User.find(session[:user_id]) if session[:user_id]
  end
end
