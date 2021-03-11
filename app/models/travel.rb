class Travel < ApplicationRecord
  belongs_to :start, class_name: 'City'
  belongs_to :finish, class_name: 'City'

  has_many :passengers
end
