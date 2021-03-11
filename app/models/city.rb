class City < ApplicationRecord
  has_many :travel_starts, class_name: 'Travel', foreign_key: :start_id
  has_many :travel_finishs, class_name: 'Travel', foreign_key: :finish_id

  validates :name, :latitude, :longitude
end
