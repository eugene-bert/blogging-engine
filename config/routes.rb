Rails.application.routes.draw do
  root 'pages#index'

  post 'api/v1/login', to: 'users#login'
  post 'api/v1/register', to: 'users#register'
  post 'api/v1/token_info', to: 'users#token_info'
  post 'api/v1/create_article', to: 'articles#create'
  get 'api/v1/login/articles_list', to: 'articles#articles_list'

  match '*path', to: 'pages#index', via: :all
end