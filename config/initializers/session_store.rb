if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: '_app_session', domain: "production-domain"
else
  Rails.application.config.session_store :cookie_store, key: '_app_session'
end

# Rails.application.config.api_only = false
