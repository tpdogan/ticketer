class CreateCities < ActiveRecord::Migration[6.1]
  def change
    create_table :cities do |t|
      t.string :name
      t.decimal :latitude, precision: 5, scale: 3
      t.decimal :longitude, precision: 6, scale: 3
      # city location has error of ~100 meters

      t.timestamps
    end
  end
end
