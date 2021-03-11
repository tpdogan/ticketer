Rails.application.routes.draw do
  resources :travels, only: :index
  root to: 'travels#index'
end
