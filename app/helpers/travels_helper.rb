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

  def getPaths(city_start_name, city_finish_name, passenger_count, transfer)
    # Get city objects
    city_start = City.find_by_name(city_start_name)
    city_finish = City.find_by_name(city_finish_name)

    transfer_0 = 
    ActiveRecord::Base.connection.execute(
      "SELECT travels.start_id, travels.finish_id
      FROM travels
      WHERE travels.start_id = #{city_start.id}
      AND travels.finish_id = #{city_finish.id}
      AND travels.empty >= #{passenger_count}")
    
    # For strict direct travels
    if transfer == 'no'
      return travels = [transfer_0]
    # For non-strict direct travels
    else
      transfer_1 = 
      ActiveRecord::Base.connection.execute(
        "SELECT A.start_id AS start_id, A.finish_id AS middle_id, B.finish_id AS finish_id
        FROM travels A, travels B
        WHERE A.finish_id = B.start_id
        AND A.start_id = #{city_start.id}
        AND B.finish_id = #{city_finish.id}
        AND A.empty >= #{passenger_count}
        AND B.empty >= #{passenger_count}")

      transfer_2 = 
      ActiveRecord::Base.connection.execute(
        "SELECT A.start_id AS start_id, A.finish_id AS middle_1_id, B.finish_id AS middle_2_id, C.finish_id AS finish_id
        FROM travels A, travels B, travels C
        WHERE A.finish_id = B.start_id
        AND B.finish_id = C.start_id
        AND A.finish_id != C.finish_id
        AND A.start_id = #{city_start.id}
        AND C.finish_id = #{city_finish.id}
        AND A.empty >= #{passenger_count}
        AND B.empty >= #{passenger_count}
        AND C.empty >= #{passenger_count}")

      return travels = [transfer_0, transfer_1, transfer_2]
    end
  end
end