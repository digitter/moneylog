Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post :registrations, to: 'registrations#signup'
      delete :registrations, to: 'registrations#cancel'
      post :sessions, to: 'sessions#signin'
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"

      resource :assets, only: %i[update]
      resources :expenditure_logs, only: %i[create update destroy index]
    end
  end

  root to: "static#home"
end
