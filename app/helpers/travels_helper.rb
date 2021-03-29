module TravelsHelper
  def sqlTransfer(transfer, city_start, city_finish, passenger_count)
    if transfer == 0
      ActiveRecord::Base.connection.execute(
        "SELECT
          travels.start_id,
          travels.finish_id,
          travels.vehicle AS vehicle_1,
          travels.duration AS duration_1,
          travels.hour AS hour_1,
          travels.minute AS minute_1,
          travels.periodicity AS periodicity_1,
          travels.price AS price_1,
          travels.no AS no_1
        FROM travels
        WHERE travels.start_id = #{city_start.id}
        AND travels.finish_id = #{city_finish.id}
        AND travels.empty >= #{passenger_count}")

    elsif transfer == 1
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
    else
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
    end
  end

  def getPaths(city_start_name, city_finish_name, passenger_count, transfer)
    # Get city objects
    city_start = City.find_by_name(city_start_name)
    city_finish = City.find_by_name(city_finish_name)
    
    # For strict direct travels
    if transfer == '0'
      return [sqlTransfer(
                0,
                city_start,
                city_finish,
                passenger_count)]
    # For non-strict direct travels
    elsif transfer == '1'
      return [sqlTransfer(
                0,
                city_start,
                city_finish,
                passenger_count),
              sqlTransfer(1,
                city_start,
                city_finish,
                passenger_count)]
    else
      return [sqlTransfer(
                0,
                city_start,
                city_finish,
                passenger_count),
              sqlTransfer(1,
                city_start,
                city_finish,
                passenger_count),
              sqlTransfer(2,
                city_start,
                city_finish,
                passenger_count)]
    end
  end
end