class ArticlesController < ApplicationController

  def index
    @articles = Article.where(user_id: current_user.id)
  end

  def create
    Article.new(title: params[:title], body: params[:body], user: current_user).save
  end

  def articles_list
    @articles = Article.all

    render json: @articles
  end

  def article_id
    @article = Article.where(id: params[:articledId])
    render json: @article
  end
end
