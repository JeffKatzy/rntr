require_relative '../adapters/crime_adapter.rb'
require_relative '../adapters/distance_adapter.rb'
require_relative '../adapters/map_adapter.rb'
require_relative '../adapters/school_adapter.rb'
require_relative '../adapters/yelp_adapter.rb'

class AptsController < ApplicationController

  def show
     zip = params["id"][-5..-1]
     crime_data = CrimeAdapter.get_crime(params["id"])
     distance_data = DistanceAdapter.get_distance(origin: params["id"], destination: "11 broadway, New York, NY 10004")
     school_data = SchoolAdapter.get_good_schools(zip)
     render json: {crime_data: crime_data, distance_data: distance_data, school_data: school_data.length}

  end

  private
# This logic belongs in a calculator object that takes in apts and returns a score object, etc.  
  
  def commute_score(duration)
    # JK: this can be refactored using logic.  Calculate the score, without using a bunch of elsif statements. 
#     You can even build a calculator object that calculates for multiple different resources.

    if duration < 10
      score = 10
    elsif duration >= 10 && duration < 15
      score = 9
    elsif duration >= 15 && duration < 20
      score = 8
    elsif duration >= 20 && duration < 25
      score = 7
    elsif duration >= 25 && duration < 30
      score = 6
    elsif duration >= 30 && duration < 35
      score = 5
    elsif duration >= 35 && duration < 40
      score = 4
    elsif duration >= 40 && duration < 45
      score = 3
    elsif duration >= 45 && duration < 50
      score = 2
    else
      score = 1

  end

  def crime_score(felonies)
   # This is better.
    score = felonies / 10
    score >= 10 ? roundScore = 9 : roundScore = score.floor
    10 - roundScore

  end

  def amenities_score
    7
  end

  def school_score(schools)
    schools > 10 ? score = 10 : score = schools
    score
  end

  def calculate_weights(prefs)
    total = prefs[:schools] + prefs[:amenities] + prefs[:safety] + prefs[:commute]
    weights[:schools] = prefs[:schools] / total * 10
    weights[:amenities] = prefs[:amenities] / total * 10
    weights[:safety] = prefs[:safety] / total * 10
    weights[:commute] = prefs[:commute] / total * 10
    weights
  end

  def calculate_score(scores, weights)
    (scores[:schools] * weights[:schools]) + (scores[:commute] * weights[:commute]) + (scores[:safety] * weights[:safety]) + (scores[:amenities] * weights[:amenities])
  end

end
