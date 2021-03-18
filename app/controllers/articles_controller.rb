class ArticlesController < ApplicationController
  def create
    Article.new(title: params[:title], body: params[:body], user: params[:userId]).save
  end

  def articles_list
    @articles = Article.where(user_id: params[:userId])
    logger.info(params)

    render json: @articles
  end

  def article_id
    @article = Article.where(id: params[:articledId])
    render json: @article
  end
end
