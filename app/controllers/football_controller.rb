require 'pp'
require 'nokogiri'
require 'open-uri'
require 'restclient'

class FootballController < ApplicationController
  def index
  end
  def endpoint
    all_scores = []
    all_imgs   = []
    all_teams  = []
    page = Nokogiri::HTML(RestClient.get("http://www.cbssports.com/nfl/scoreboard/2014/week13"))
    scores = page.css('.finalScore')
    scores.each do |score, index|
      all_scores << score.children.text.to_i
    end
    images = page.css(".teamName img")
    images.each do |img, index|
      all_imgs << img.attributes["delaysrc"].value
    end
    all_teams = []
    teams = page.css(".teamName")
    teams.each do |team, index|
      all_teams << team.children[1].children[0].children.text
    end
    games_arr = []
    games_num = all_scores.count / 2
    counter = 0
    games_num.times do
      games_arr << Game.new({ "away_team"  => all_teams[counter],
                              "home_team"  => all_teams[counter+1],
                              "away_score" => all_scores[counter],
                              "home_score" => all_scores[counter+1],
                              "away_gif"   => all_imgs[counter],
                              "home_gif"   => all_imgs[counter+1]
      })
      counter += 2
    end
    render json: games_arr
  end
end

class Game
  def initialize(params={})
    @home_team  = params["home_team"]
    @away_team  = params["away_team"]
    @home_score = params["home_score"]
    @away_score = params["away_score"]
    @home_gif   = params["home_gif"]
    @away_gif   = params["away_gif"]
  end
end
