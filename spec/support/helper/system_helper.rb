# frozen_string_literal: true

require 'rails_helper'

module FeatureHelper
  def signin
    visit(Rails.application.credentials.end_point[:front])

    page.find_link('Sign In').click

    expect(page).to have_current_path('/signin')

    email = "a@a.a"
    password = 'aaaaaa'
    fill_in 'Email', with: email
    fill_in 'Password', with: password

    page.find_button('Sign In').click

    expect(page).to have_content 'Aさん'
    expect(page).to have_current_path('/')
  end

  def signup
    visit(Rails.application.credentials.end_point[:front])

    page.find_link('Sign Up').click

    expect(page).to have_current_path('/signup')

    timestamp = Time.zone.now.to_i

    name = "#{timestamp}さん"
    email = "#{timestamp}@a.a"
    password = 'aaaaaa'
    password_confirmation = 'aaaaaa'

    fill_in 'Name', with: name
    fill_in 'Email', with: email
    fill_in 'Password', with: password
    fill_in 'Confirmation', with: password_confirmation

    page.find_button('Sign Up').click
    expect(page).to have_content "#{timestamp}さん"
    expect(page).to have_current_path('/')
  end
end
