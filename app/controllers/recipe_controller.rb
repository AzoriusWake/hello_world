class RecipeController < ApplicationController
  def index
  end

  def search
    select_type = params["/dashboard"]["search"]
    api_key = ENV["FOOD2FORK_KEY"]
    @response = HTTParty.get("http://food2fork.com/api/search?key=#{api_key}&q=#{select_type}")
    body = JSON.parse(@response.body)

    render json: body

  end

end
