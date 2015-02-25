class Video < ActiveRecord::Base
  include HTTParty

  def self.search
  animals = ["sloths", "pandas", "bunnies", "cats", "puppies", "alpacas", "slow+loris", "cute+owl", "dolphins", "baby+penguins", "hedgehogs", "otters", "baby+pig"]
  animal = animals.sample
  api_key = ENV["YOUTUBE_KEY"]
  @response = HTTParty.get("https://www.googleapis.com/youtube/v3/search?key=#{api_key}&part=id&type=video&q=#{animal}&maxResults=1")
    @video_link = @response["items"][0]["id"]["videoId"]
  end

  def self.tswift
    api_key = ENV["YOUTUBE_KEY"]
    @response = HTTParty.get("https://www.googleapis.com/youtube/v3/search?key=#{api_key}&part=id&type=video&q=taylor+swift&maxResults=1")
    @video_link = @response["items"][0]["id"]["videoId"]
  end
end
