class PassengersController < ApplicationController
  def new
    @passenger = Passenger.new
  end
  def create
  end
  def show
    @passenger = Passenger.find(params[:id])
  end
end
