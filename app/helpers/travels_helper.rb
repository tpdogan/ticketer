module TravelsHelper
  def distance(city_start, city_finish)
    lat1 = city_start.latitude
    lon1 = city_start.longitude
    lat2 = city_finish.latitude
    lon2 = city_finish.longitude
    r = 6378.137
    dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180
    dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180
    a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    d = r * c
    return d;
  end
end
