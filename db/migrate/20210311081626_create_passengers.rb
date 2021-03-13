class CreatePassengers < ActiveRecord::Migration[6.1]
  def change
    create_table :passengers do |t|
      # A passenger will have a single travel
      # Many transfers will be saved as different travels
      t.integer :travel_id
      
      t.string :first_name
      t.string :last_name

      t.string :date_of_birth
      t.string :passport_number
      t.string :nationality

      # Address could well be extended
      t.string :email
      t.string :address
      t.string :tel

      t.timestamps
    end
  end
end
