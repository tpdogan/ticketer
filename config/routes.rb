Rails.application.routes.draw do
  resources :travels, only: :index
  resources :passengers, only: [:new, :create, :show]
  root to: 'travels#index'
end
