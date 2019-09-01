Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations], controllers: {
    sessions: 'users/sessions'
  }

  as :user do
    get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'
    put 'users' => 'devise/registrations#update', :as => 'user_registration'
  end

  root to: "apps/todos#index"

  namespace :apps do
    resources :todos, only: [:index]
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :todos
    end
  end
end
