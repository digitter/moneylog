ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'support/capybara.rb'

Dir[Rails.root.join("spec/support/*.rb")].each { |f| require f }
ActiveRecord::Migration.check_pending! if defined?(ActiveRecord::Migration)

RSpec.configure do |config|
  config.include Rails.application.routes.url_helpers
  config.include Capybara::DSL
  # ターミナルにテストメッセージを表示する
  config.default_formatter = "doc"
end
