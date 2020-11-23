if Rails.env == "staging"
  Rails.application.config.session_store(
    :cookie_store,
    key: 'staging_app_session',
    domain: 'digitter.info',
    # domain: :all,
    # same_site: :none
  )
else
  Rails.application.config.session_store(
    :cookie_store,
    key: 'development_app_session',
  )
end

Rails.application.config.api_only = false
