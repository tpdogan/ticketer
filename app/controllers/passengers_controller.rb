class PassengersController < ApplicationController
  def new
    @passenger = Passenger.new
  end
  def create
  end
end
