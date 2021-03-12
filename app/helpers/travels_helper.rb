module TravelsHelper
  def getPaths(city_start_name, city_finish_name, passenger_count, transfer)
    # Get city objects
    city_start = City.find_by_name(city_start_name)
    city_finish = City.find_by_name(city_finish_name)

    transfer_0 = 
    ActiveRecord::Base.connection.execute(
      "SELECT
        travels.start_id,
        travels.finish_id,
        travels.vehicle,
        travels.duration,
        travels.hour,
        travels.minute,
        travels.periodicity,
        travels.price,
        travels.no
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
        "SELECT
          A.start_id AS start_id,
          A.finish_id AS middle_id,
          B.finish_id AS finish_id,

          A.vehicle AS vehicle_1,
          A.duration AS duration_1,
          A.hour AS hour_1,
          A.minute AS minute_1,
          A.periodicity AS periodicity_1,
          A.price AS price_1,
          A.no AS no_1,
          
          B.vehicle AS vehicle_2,
          B.duration AS duration_2,
          B.hour AS hour_2,
          B.minute AS minute_2,
          B.periodicity AS periodicity_2,
          B.price AS price_2,
          B.no AS no_2
        FROM travels A, travels B
        WHERE A.finish_id = B.start_id
        AND A.start_id = #{city_start.id}
        AND B.finish_id = #{city_finish.id}
        AND A.empty >= #{passenger_count}
        AND B.empty >= #{passenger_count}")

      transfer_2 = 
      ActiveRecord::Base.connection.execute(
        "SELECT
          A.start_id AS start_id,
          A.finish_id AS middle_1_id,
          B.finish_id AS middle_2_id,
          C.finish_id AS finish_id,

          A.vehicle AS vehicle_1,
          A.duration AS duration_1,
          A.hour AS hour_1,
          A.minute AS minute_1,
          A.periodicity AS periodicity_1,
          A.price AS price_1,
          A.no AS no_1,
          
          B.vehicle AS vehicle_2,
          B.duration AS duration_2,
          B.hour AS hour_2,
          B.minute AS minute_2,
          B.periodicity AS periodicity_2,
          B.price AS price_2,
          B.no AS no_2,
          
          C.vehicle AS vehicle_3,
          C.duration AS duration_3,
          C.hour AS hour_3,
          C.minute AS minute_3,
          C.periodicity AS periodicity_3,
          C.price AS price_3,
          C.no AS no_3
        FROM travels A, travels B, travels C
        WHERE A.finish_id = B.start_id
        AND B.finish_id = C.start_id
        AND A.start_id != C.start_id
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