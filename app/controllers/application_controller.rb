class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def current_user
    User.find_by(id: session[:user_id])
  end

  # before_action :authorized

  # def logged_in?
  #   !current_user.nil?
  # end
  # def authorized
  #   redirect_to '/welcome' unless logged_in?
  # end
end
