class CreateTravels < ActiveRecord::Migration[6.1]
  def change
    create_table :travels do |t|
      t.integer :start_id
      t.integer :finish_id

      # Plane/Bus/Train
      t.string :type

      # Periodicity tells number of times per day
      t.integer :periodicity

      # From single hour:minute rest is found via periodicity
      t.integer :hour
      t.integer :minute

      t.integer :capacity
      t.integer :passengers

      t.integer :speed
      t.string  :no

      t.decimal :price, precision: 6, scale: 2

      t.timestamps
    end
  end
end
