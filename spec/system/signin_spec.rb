# frozen_string_literal: true

require 'rails_helper'

feature '認証のテスト', js: true, type: :system do
  scenario 'サインインできる' do
    signin
  end

  scenario 'サインアップできる' do
    signup
  end
end
