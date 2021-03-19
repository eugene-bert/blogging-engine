class ArticlesController < ApplicationController

  def create
    @article = Article.create(title: params[:title],
                              body: params[:body],
                              user_id: params[:user_id])

    if @article.valid?
      render json: @article
    else
      @payload = { object: @article, errors: @article.errors }
      render json: @payload
    end

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
