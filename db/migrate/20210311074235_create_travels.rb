class CreateTravels < ActiveRecord::Migration[6.1]
  def change
    create_table :travels do |t|
      t.integer :start_id
      t.integer :finish_id

      # Plane/Bus/Train
      t.string :vehicle

      # Periodicity tells number of times per day
      t.integer :periodicity

      # From single hour:minute rest is found via periodicity
      t.integer :hour
      t.integer :minute

      t.integer :capacity
      t.integer :empty

      t.integer :speed
      t.string  :no

      t.integer :price

      t.timestamps
    end
  end
end
