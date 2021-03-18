class UsersController < ApplicationController
  def login
    @payload = {username: params[:username], password: params[:password]}
    user = User.find_by(username: params[:username])
    token = JsonWebToken.encode(@payload)

    if user && user.authenticate(params[:password])
      render json: {token: token, exp: Time.now.to_i + 4 * 3600}

    else
      render json: {error: 404, message: 'not found'}
    end
  end

  # register api request
  def register
    @password = BCrypt::Password.create(params[:password])
    @user = User.new(username: params[:username], password_digest: @password).save

    if @user
      @payload = {username: params[:username], password: params[:password]}
      token = JsonWebToken.encode(@payload)

      render json: {token: token, exp: Time.now.to_i + 4 * 3600}
    end
  end

  def token_info
    @info =  JsonWebToken.decode(params[:token])

    render json: @info
  end
end
