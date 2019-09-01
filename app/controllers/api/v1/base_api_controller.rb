module Api
  module V1
    class BaseApiController < ActionController::Base
      # Prevent CSRF attacks by raising an exception.
      # For APIs, you may want to use :null_session instead.
      protect_from_forgery with: :null_session
     
      acts_as_token_authentication_handler_for User, fallback: :exception
    end
  end
end
