Rails.application.routes.draw do
  root 'pages#index'

  post 'api/v1/login', to: 'users#login'
  post 'api/v1/register', to: 'users#register'
  post 'api/v1/token_info', to: 'users#token_info'

  post 'api/v1/articles', to: 'articles#create'

  patch 'api/v1/articles/:id', to: 'articles#update'
  put 'api/v1/articles/:id', to: 'articles#update'

  get 'api/v1/articles/:id', to: 'articles#show'
  get 'api/v1/articles', to: 'articles#index'

  delete 'api/v1/articles/:id', to: 'articles#destroy'

  match '*path', to: 'pages#index', via: :all
end