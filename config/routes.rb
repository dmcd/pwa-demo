Rails.application.routes.draw do
  namespace :apps do
    resources :todos, only: [:index]
  end

  scope '/api/v1' do
    resources :todos
  end
end
