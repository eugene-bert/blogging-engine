class ArticlesController < ApplicationController

  def index
    @articles = Article.where(user_id: current_user.id)
  end

  def create
    Article.new(title: params[:title], body: params[:body], user: current_user).save
  end
end
