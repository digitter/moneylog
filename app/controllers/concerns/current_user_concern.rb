# frozen_string_literal: true

module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user, except: %i[signup signin logged_in]
    before_action :initialize_data, only: %i[signup signin logged_in]
  end

  def set_current_user
    @current_user = User.find(session[:user_id]) if session[:user_id]
  end

  def initialize_data
    @current_user = User.includes(
      :asset,
      :tags,
      monthly_expenditures: [:expenditure_logs],
      expenditure_logs: [:tags],
      income_logs: [:tags]
    ).find(session[:user_id]) if session[:user_id]
  end
end
