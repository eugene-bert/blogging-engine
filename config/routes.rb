Rails.application.routes.draw do
  root 'pages#index'

  get 'articlesList', to: 'articles#articles_list'
  get 'article/:articledId', to: 'articles#article_id'
  post 'api/v1/login', to: 'users#login'
  post 'api/v1/register', to: 'users#register'
  post 'api/v1/token_info', to: 'users#token_info'
  post 'api/v1/articles', to: 'articles#create'

  match '*path', to: 'pages#index', via: :all
end