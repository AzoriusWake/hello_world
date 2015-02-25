class Recipe < ActiveRecord::Base
  include HTTParty

  def self.get_recipe
    select_type = ["beef", "chicken", "pork", "potato", "bulgogi", "sushi", "mexican"].sample
    api_key = ENV["FOOD2FORK_KEY"]
    @response = HTTParty.get("http://food2fork.com/api/search?key=#{api_key}&q=#{select_type}")
    body = JSON.parse(@response.body)
  end

end