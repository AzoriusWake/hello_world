module BartHelper
  def yourDetailedTrip(origin, destination, arrival_time)
  require 'nokogiri'
  require 'open-uri'
  require 'httparty'

  xml_file = Nokogiri::XML(open("http://api.bart.gov/api/sched.aspx?cmd=arrive&orig=#{origin}&dest=#{destination}&time=#{arrival_time}&date=now&b=2&a=1&l=1&key=MW9S-E7SL-26DU-VV8V"))


  trip_options_xml_information = xml_file.xpath('//schedule/request/trip')

  leg_info = xml_file.at_xpath('//schedule/request/trip/leg')

  train_direction = leg_info.values[10]

  early_trip = trip_options_xml_information[0].values

  on_time_trip = trip_options_xml_information[1].values

  pushing_it_trip = trip_options_xml_information[2].values

  trip_options = []
  trip_options << early_trip
  trip_options << on_time_trip
  trip_options << pushing_it_trip
  trip_options << train_direction

  return trip_options
end
end
