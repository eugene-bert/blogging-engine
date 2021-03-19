class UsersController < ApplicationController
  def login
    user = User.find_by(username: params[:username])
    token = JsonWebToken.encode(username: params[:username], password: params[:password], id: user[:id] )

    if user && user.authenticate(params[:password])
      render json: { token: token, exp: Time.now.to_i + 4 * 3600 }

    else
      render json: { error: 404, message: 'not found' }
    end
  end

  # register api request
  def register
    @user = User.create(username: params[:username], password: params[:password],
                        first_name: params[:first_name],
                        last_name: params[:last_name])

    if @user.valid?
      @payload = { username: params[:username], password: params[:password] }
      token = JsonWebToken.encode(@payload)

      render json: { token: token, exp: Time.now.to_i + 4 * 3600 }
    else
      @payload = { username: params[:username], errors: @user.errors }
      render json: @payload
    end
  end

  def token_info
    @info = JsonWebToken.decode(params[:token])

    render json: @info
  end
end
