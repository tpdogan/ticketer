class PassengersController < ApplicationController
  def new
    @passengers = []
    params[:count].to_i.times do |i|
      @passengers.push([i+1, Passenger.new])
    end
  end
  def create
  end
  def show
    @passenger = Passenger.find(params[:id])
  end
end
