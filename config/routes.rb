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

      resources :expenditure_logs, only: %i[create update destroy]
      delete '/bulk_delete/expenditure_logs', to: 'expenditure_logs#bulk_delete'

      resources :income_logs, only: %i[create update destroy]
      delete '/bulk_delete/income_logs' => 'income_logs#bulk_delete'

      resources :monthly_expenditures, only: %i[update]

      resources :tags, only: %i[create update destroy] do
        member do
          post '/expenditure_log' => 'tags#relate_to_expenditure_log'
          post '/income_log' => 'tags#relate_to_income_log'
        end
      end
    end
  end

  root to: "static#home"
end
