# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Netherlands cities
cap1 = City.create(:country => 'NL', :name => 'Amsterdam', :latitude => 52.377, :longitude => 4.897)
City.create(:country => 'NL', :name => 'Den Haag', :latitude => 52.078, :longitude => 4.288)
City.create(:country => 'NL', :name => 'Maastricht', :latitude => 50.851, :longitude => 5.690)
City.create(:country => 'NL', :name => 'Leiden', :latitude => 52.160, :longitude => 4.497)
City.create(:country => 'NL', :name => 'Utrecht', :latitude => 52.092, :longitude => 5.104)
City.create(:country => 'NL', :name => 'Rotterdam', :latitude => 51.920, :longitude => 4.480)
City.create(:country => 'NL', :name => 'Eindhoven', :latitude => 51.430, :longitude => 5.500)
City.create(:country => 'NL', :name => 'Groningen', :latitude => 53.220, :longitude => 6.580)

# USA cities
cap2 = City.create(:country => 'US', :name => 'Washington', :latitude => 38.89, :longitude => -77.03)
City.create(:country => 'US', :name => 'Dallas', :latitude => 32.779, :longitude => -96.808)
City.create(:country => 'US', :name => 'San Francisco', :latitude => 37.62, :longitude => -122.38)
City.create(:country => 'US', :name => 'New York', :latitude => 40.65, :longitude => -73.78)
City.create(:country => 'US', :name => 'Philadelphia', :latitude => 39.88, :longitude => -75.25)
City.create(:country => 'US', :name => 'Seattle', :latitude => 47.45, :longitude => -122.30)
City.create(:country => 'US', :name => 'Miami', :latitude => 25.82, :longitude => -80.28)
City.create(:country => 'US', :name => 'Chicago', :latitude => 41.90, :longitude => -87.65)

# Japan cities
cap3 = City.create(:country => 'JP', :name => 'Tokyo', :latitude => 35.65, :longitude => 139.83)
City.create(:country => 'JP', :name => 'Osaka', :latitude => 34.66, :longitude => 135.49)
City.create(:country => 'JP', :name => 'Kyoto', :latitude => 35.01, :longitude => 139.69)
City.create(:country => 'JP', :name => 'Hiroshima', :latitude => 34.38, :longitude => 132.44)
City.create(:country => 'JP', :name => 'Nagoya', :latitude => 35.11, :longitude => 136.93)
City.create(:country => 'JP', :name => 'Yokohama', :latitude => 35.43, :longitude => 139.63)
City.create(:country => 'JP', :name => 'Fukuoka', :latitude => 33.59, :longitude => 130.40)
City.create(:country => 'JP', :name => 'Sapporo', :latitude => 43.06, :longitude => 141.35)

# Australia cities
cap4 = City.create(:country => 'AU', :name => 'Sydney', :latitude => -33.86, :longitude => 151.20)
City.create(:country => 'AU', :name => 'Melbourne', :latitude => -37.84, :longitude => 144.94)
City.create(:country => 'AU', :name => 'Canberra', :latitude => -35.28, :longitude => 149.12)
City.create(:country => 'AU', :name => 'Devonport', :latitude => -41.18, :longitude => 146.34)
City.create(:country => 'AU', :name => 'Adelaide', :latitude => -34.92, :longitude => 138.59)
City.create(:country => 'AU', :name => 'Bunbury', :latitude => -33.33, :longitude => 115.63)
City.create(:country => 'AU', :name => 'Albany', :latitude => -35.02, :longitude => 117.88)
City.create(:country => 'AU', :name => 'Townsville', :latitude => -19.25, :longitude => 146.81)

# Colombia cities
cap5 = City.create(:country => 'CO', :name => 'Bogotá', :latitude => 4.62, :longitude => -74.06)
City.create(:country => 'CO', :name => 'Medellin', :latitude => 6.23, :longitude => -75.59)
City.create(:country => 'CO', :name => 'Cali', :latitude => 3.42, :longitude => -76.52)
City.create(:country => 'CO', :name => 'Barranquilla', :latitude => 10.96, :longitude => -74.79)
City.create(:country => 'CO', :name => 'Cartagena', :latitude => 10.39, :longitude => -75.51)
City.create(:country => 'CO', :name => 'Popayán', :latitude => 2.43, :longitude => -76.61)
City.create(:country => 'CO', :name => 'Montería', :latitude => 8.74, :longitude => -75.88)
City.create(:country => 'CO', :name => 'Cúcuta', :latitude => 7.88, :longitude => -72.49)

# Allow flights if countries are different
#* Allow flights if distance is larger than x meters
# Allow train/bus within the same country only
# Plane speed range 900 km/h
# Train speed range 120 km/h
# Bus speed range 90 km/h
# Plane capacity 120 people
# Train capacity 250 people
# Bus capacity 50 people
# Plane price range 500-800 euro
# Train price range 10-50 euro
# Bus price range 10-30 euro

# type should be 0,1,2
def per(type)
  times = [1,2,4,6,8,12,16,18,24,32,36,40,48]
  times[rand(3) + type*5]
end

def price(type)
  type == 0 ? (500 + rand(301)) : type == 1 ? (10 + rand(41)) : (5 + rand(16))
end

def duration(city_start, city_finish, type)
  lat1 = city_start.latitude
  lon1 = city_start.longitude
  lat2 = city_finish.latitude
  lon2 = city_finish.longitude
  r = 6378.137
  dLat = lat2 * Math::PI / 180 - lat1 * Math::PI / 180
  dLon = lon2 * Math::PI / 180 - lon1 * Math::PI / 180
  a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math::PI / 180) * Math.cos(lat2 * Math::PI / 180) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
  c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  d = r * c
  speed = type == 0 ? 900 : type == 1 ? 120 : 90
  return (60*d/speed).round
end

def traveler(cityList, type)
  vehicle = type == 0 ? 'Plane' : type == 1 ? 'Train' : 'Bus'
  capacity = type == 0 ? 120 : type == 1 ? 250 : 50
  speed = type == 0 ? 900 : type == 1 ? 120 : 90
  cityList[0..-2].each_with_index do |first, index|
    cityList[index+1..-1].each do |second|
      Travel.create(
        start_id: first.id,
        finish_id: second.id,
        vehicle: vehicle,
        periodicity: per(type),
        hour: rand(24),
        minute: rand(12)*5,
        capacity: capacity,
        empty: rand(capacity+1),
        duration: duration(first, second, type),
        no: 'td' + (rand(9000)+1000).to_s,
        price: price(type))
  
      Travel.create(
        start_id: second.id,
        finish_id: first.id,
        vehicle: vehicle,
        periodicity: per(type),
        hour: rand(24),
        minute: rand(12)*5,
        capacity: capacity,
        empty: rand(capacity+1),
        duration: duration(first, second, type),
        no: 'td' + (rand(9000)+1000).to_s,
        price: price(type))
    end
  end
end

# Planes only travel between capitols
capitols = [cap1, cap2, cap3, cap4, cap5]
p 'Plane travels are being created.'
traveler(capitols, 0)

# Train/Bus only travels within country
countries = ['NL','US','JP','AU','CO']
countries.each do |local|
  p local + ' train/bus travels are being created.'
  cities = City.where(:country => local)
  traveler(cities, 1)
  traveler(cities, 2)
end