# frozen_string_literal: true

module Components
  module ElasticSearch
    class Lookup
      def initialize(params, client = Components::ElasticSearch::Client.instance)
        @client = client
        @query_builder = Components::ElasticSearch::QueryBuilder.new(params)
      end

      def query(index = 'news')
        connection.search index: index, body: query_builder.definition
      end

      private

      attr_reader :query_builder, :client

      def connection
        client.connection
      end
    end
  end
end
