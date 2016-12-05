require 'byebug'
require 'httparty'

class SchoolAdapter
  include HTTParty

  
#   change method name to just be schools, not get_schools, etc.
  def self.get_schools
    self.get("https://data.cityofnewyork.us/resource/9pyc-nsiu.json?zip=#{@zipcode}")
  end

  def self.filter_schools
    dbnList = get_schools.map{|result| result.fetch("ats_system_code")}.join("','")
    self.get("https://data.cityofnewyork.us/resource/fcpn-yy58.json?$where=_2010_2011_overall_grade<='#{@grade}' AND dbn in('#{dbnList}')")
  end

  def self.get_good_schools(zipcode)
    @zipcode = zipcode
    @grade = 'A'
    filter_schools
  end

  def self.get_lat_lon
    list = filter_schools.map {|school| school.fetch('dbn')}.join("','")
    self.get("https://data.cityofnewyork.us/resource/9pyc-nsiu.json?zip=#{@zipcode}&$where=ats_system_code in ('#{list}')")
  end

  def self.get_school_markers(zipcode: '10004',grade: 'F')
    @zipcode = zipcode
    @grade = grade
    get_lat_lon.map {|result| {name:result.fetch("location_name"),lat:result.fetch("latitude"),lon:result.fetch("longitude")}}
  end

end
