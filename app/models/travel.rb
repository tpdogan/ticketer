class Travel < ApplicationRecord
  belongs_to :start, class_name: 'City'
  belongs_to :finish, class_name: 'City'

  has_many :passengers

  validates :start_id, :finish_id, :type, :periodicity, :hour, :minute, :capacity, :passengers, :speed, :no, :price, presence: true
end
