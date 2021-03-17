Rails.application.routes.draw do
  # resources :users, only: [:new, :create]
  # get 'login', to: 'sessions#new'
  # get 'logout', to: 'sessions#logout'
  # post 'login', to: 'sessions#create'
  # get 'welcome', to: 'sessions#welcome'
  # get 'authorized', to: 'sessions#page_requires_login'
  # get 'articles', to: 'articles#index'
  # post 'article', to: 'articles#create'

  # react test endpoints
  root 'pages#index'

  get 'articlesList', to: 'articles#articles_list'
  get 'article/:articledId', to: 'articles#article_id'
  post 'api/v1/login', to: 'users#login'
  post 'api/v1/register', to: 'users#register'
  post 'api/v1/token_info', to: 'users#token_info'
  match '*path', to: 'pages#index', via: :all
end