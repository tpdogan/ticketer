class PassengersController < ApplicationController
  def index
  end
  def new
    @passengers = []
    params[:count].to_i.times do |i|
      @passengers.push([i+1, Passenger.new])
    end
  end
  def create
    @travels = [Travel.find_by_no(travel_params[:no_1])]
    travel_params[:no_2] ? @travels.push(Travel.find_by_no(travel_params[:no_2])) : ''
    travel_params[:no_3] ? @travels.push(Travel.find_by_no(travel_params[:no_3])) : ''

    passengerIds = []

    @travels.each do |travel|
      8.times do |count|
        params["passenger_#{count+1}"] ? passenger = travel.passengers.build(passenger_params(count+1)) : break
        passenger.save
        passengerIds.push(passenger.id)
      end
    end

    redirect_to passengers_path(travel: params[:travel], ids: passengerIds)
  end

  private

  def travel_params
    params.require(:travel).permit(:no_1, :no_2, :no_3)
  end

  def passenger_params(count)
    params.require("passenger_#{count}").permit(:first_name, :last_name, :date_of_birth, :passport_number, :nationality, :email, :address, :tel)
  end
end
