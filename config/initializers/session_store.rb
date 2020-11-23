Rails.application.config.session_store(
  :cookie_store,
  key: 'staging_app_session',
  domain: 'digitter.info',
  # domain: :all,
  # same_site: :none
)

Rails.application.config.api_only = false
