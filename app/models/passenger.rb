class Passenger < ApplicationRecord
  belongs_to :travel

  validates :first_name, :last_name, :date_of_birth, :passport_number, :nationality, :address, :tel, presence: true
end
