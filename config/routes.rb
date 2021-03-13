Rails.application.routes.draw do
  resources :travels, only: :index
  resources :passengers, only: [:index, :new, :create]
  root to: 'travels#index'
end
