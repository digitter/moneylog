# frozen_string_literal: true

require 'rails_helper'

feature 'サインインのテスト', js: true, type: :system do
  scenario 'サインインできる' do
    signin
  end

  scenario 'サインアップのテスト', js: true, type: :system do
    signup
  end
end
