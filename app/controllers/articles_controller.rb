class ArticlesController < ApplicationController
  def create
    @article = Article.create(title: params[:title], body: params[:body],
                              user_id: JsonWebToken.decode(request.headers[:Bearer])[:id])
    if @article.valid?
      render json: @article
    else
      @payload = { object: @article, errors: @article.errors }
      render json: @payload, status: 200
    end
  end

  def index
    @articles = Article.order(created_at: :desc).joins(:user)
                       .select('articles.*', 'users.user_name',
                               'users.first_name', 'users.last_name')
    render json: @articles, status: 200
  end

  def show()
    @article = Article.joins(:user)
                      .select('articles.*', 'users.user_name',
                              'users.first_name', 'users.last_name')
                      .find_by_id(params[:id])
    if @article
      render json: @article, status: 200
    else
      head :not_found
    end

  end

  def update
    @article = Article.where(id: params[:id], user_id: JsonWebToken.decode(request.headers[:Bearer])[:id]).first
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

  def articles_list
    @user_id = JsonWebToken.decode(request.headers[:Bearer])[:id]
    @articles = Article.where(user_id: @user_id)
    puts @articles
    render json: @articles
  end

  def edit_article
    @article = Article.where(id: params[:id], user_id: JsonWebToken.decode(request.headers[:Bearer])[:id]).first
    @article.update(title: params[:title].nil? ? @article.title : params[:title],
                    body: params[:body].nil? ? @article.body : params[:body],
                    is_private: params[:is_private].nil? ? @article.is_private : params[:is_private],
                    is_archived: params[:is_archived].nil? ? @article.is_archived : params[:is_archived])
    if @article.valid?
      render json: @article
    else
      @payload = { object: @article, errors: @article.errors }
      render json: @payload, status: 200
    end
  end
end
