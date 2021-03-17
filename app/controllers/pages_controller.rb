class PagesController < ApplicationController
  def index
    logger.debug(params)
  end
end
