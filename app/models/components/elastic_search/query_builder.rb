# frozen_string_literal: true

module Components
  module ElasticSearch
    class QueryBuilder
      def initialize(params)
        @params = params
      end

      def definition
        { query: query, aggs: aggs }
      end

      private

      attr_reader :params

      def query
        {
          bool: {
            must: [
              { multi_match: { query: params['query'] } },
              { range: { timestamp: { gte: params['before'], lte: params['after'] } } }
            ]
          }
        }
      end

      def aggs
        {
          first_agg: {
            date_histogram: { field: 'timestamp', interval: params['interval'] },
            aggs: {
              sub_agg: {
                terms: { field: 'medium', min_doc_count: 1 }
              }
            }
          }
        }
      end
    end
  end
end
