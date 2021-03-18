class SessionsController < ApplicationController

  skip_before_action :authorized, only: [:new, :create, :welcome]

  def new
  end

  def create
    @user = User.find_by(username: params[:username])
    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to '/welcome'
    else
      flash.now[:danger] = 'Invalid email/password combination'
      redirect_to '/login'
    end
  end

  def login
  end

  def welcome
  end

  def page_requires_login
  end

  def destroy
    session.destroy
    redirect_to root_path
  end
end
