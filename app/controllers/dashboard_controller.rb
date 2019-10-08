# frozen_string_literal: true

class DashboardController < ActionController::Base
  def index; end

  def query
    render json: Components::ElasticSearch::Lookup.new(query_params).query
  rescue StandardError => e
    render json: { error: e.message }, status: :internal_server_error
  end

  def query_params
    params.permit(:query, :before, :after, :interval)
  end
end
