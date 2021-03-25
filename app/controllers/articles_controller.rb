class ArticlesController < ApplicationController

  before_action :resolve_token, only: [:create, :update, :destroy]

  def resolve_token
    begin
      @token_data = JsonWebToken.decode(bearer_token)
    rescue NoMethodError
      nil
    end

    if @token_data.nil?
      head :unauthorized
    else
      @token_data
    end
  end

  def create
    @article = Article.create(title: params[:title], body: params[:body],
                              user_id: @token_data[:id])
    if @article.valid?
      render json: @article
    else
      @payload = { object: @article, errors: @article.errors }
      render json: @payload, status: :method_not_allowed
    end
  end

  def index
    @articles = Article.order(created_at: :desc).joins(:user)
                       .select('articles.*', 'users.user_name',
                               'users.first_name', 'users.last_name')
                       .where(is_archived: false)

    render json: @articles, status: 200
  end

  def show
    @article = Article.joins(:user)
                      .select('articles.*', 'users.user_name',
                              'users.first_name', 'users.last_name')
                      .where(is_archived: false)
                      .find_by_id(params[:id])
    if @article
      render json: @article, status: 200
    else
      head :not_found
    end

  end

  def update
    @article = Article.where(id: params[:id], user_id: @token_data[:id]).first
    @article.update(title: params[:title].nil? ? @article.title : params[:title],
                    body: params[:body].nil? ? @article.body : params[:body],
                    is_private: params[:is_private].nil? ? @article.is_private : params[:is_private],
                    is_archived: params[:is_archived].nil? ? @article.is_archived : params[:is_archived])
    if @article.valid?
      render json: @article, status: 200
    else
      @payload = { object: @article, errors: @article.errors }
      render json: @payload, status: 200
    end
  end

  def destroy
    @article = Article.find_by_id(params[:id])
    if @article
      @article.destroy
      render json: @article, status: 200
    else
      head :not_found
    end

  end

end
