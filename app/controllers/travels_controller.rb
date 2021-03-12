class TravelsController < ApplicationController
  include TravelsHelper

  def index
    if params[:request]
      paths = getPaths(params[:from], params[:to], params[:passengers], params[:transfer])
      respond_to do |format|
        format.json { render json: { response: 'OK', paths: paths.to_json } }
      end
    end
  end
end
