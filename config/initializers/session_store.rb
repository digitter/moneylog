# APIモードだとsession storeが利用できないのでfalse指定
Rails.application.config.api_only = false

if Rails.env.staging?
  Rails.application.config.session_store(
    :cookie_store,
    key: 'staging_app_session',
    domain: 'digitter.info',
    httponly: true,
    same_site: :strict
  )
else
  Rails.application.config.session_store(
    :cookie_store,
    key: 'development_app_session',
    httponly: true,
    same_site: :strict
  )
end

