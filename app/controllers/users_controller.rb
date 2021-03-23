class UsersController < ApplicationController
  def login
    @user = User.find_by(user_name: params[:user_name])

    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_name: params[:user_name], id: @user.id)
      render json: { token: token }

    else
      render json: { message: 'unauthorized' }, status: :unauthorized
    end
  end

  # register api request
  def register
    @user = User.create(user_name: params[:user_name],
                        password: params[:password],
                        first_name: params[:first_name],
                        last_name: params[:last_name])

    if @user.valid? && @user.id
      @payload = { user_name: @user.user_name, id: @user.id }
      token = JsonWebToken.encode(@payload)

      logger.info(JsonWebToken.decode(token))
      render json: { token: token }
    else
      @payload = { user_name: params[:user_name], errors: @user.errors }
      render json: @payload
    end
  end

  def token_info
    @info = JsonWebToken.decode(params[:token])

    render json: @info
  end
end
