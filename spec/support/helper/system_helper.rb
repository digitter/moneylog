# frozen_string_literal: true

require 'rails_helper'

module FeatureHelper
  def signin
    visit('http://localhost:8080/')

    page.find_link('Signin').click

    expect(page).to have_current_path('/signin')

    email = "a@a.a"
    password = 'aaaaaa'
    fill_in 'Email', with: email
    fill_in 'Password', with: password

    page.find_button('Sign In').click

    expect(page).to have_content 'This is boilerplate'

    expect(page).to have_current_path('/')
  end
end
