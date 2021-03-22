class ArticlesController < ApplicationController
  def create
    @article = Article.create(title: params[:title], body: params[:body], user_id: JsonWebToken.decode(request.headers[:Bearer])[:id])
    if @article.valid?
      render json: @article
    else
      @payload = { object: @article, errors: @article.errors }
      render json: @payload, status: 404
    end
  end

  def articles_list
    @user_id = JsonWebToken.decode(request.headers[:Bearer])[:id]
    @articles = Article.where(user_id: @user_id)

    render json: @articles
  end

  def edit_article
    @article = Article.where(id: params[:articledId], user_id: JsonWebToken.decode(request.headers[:Bearer])[:id])
  end
end
