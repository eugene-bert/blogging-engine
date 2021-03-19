class ArticlesController < ApplicationController
  def create
    @user_id = JsonWebToken.decode(request.headers[:Bearer])[:id]

    @article = Article.new(title: params[:title], body: params[:body], user_id: @user_id).save

    if (@article)
      render json: @article
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
