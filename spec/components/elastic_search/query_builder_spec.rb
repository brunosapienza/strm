# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Components::ElasticSearch::QueryBuilder do
  describe 'definition' do
    let(:params) do
      {
        query: 'Scomo',
        before: '1554037199999',
        after: '1551358800000',
        interval: '1d'
      }.as_json
    end

    let(:expected_definition) do
      {
        query: {
          bool: {
            must: [
              { multi_match: { query: 'Scomo' } },
              { range: { timestamp: { gte: '1554037199999', lte: '1551358800000' } } }
            ]
          }
        },
        aggs: {
          first_agg: {
            date_histogram: { field: 'timestamp', interval: '1d' },
            aggs: { sub_agg: { terms: { field: 'medium', min_doc_count: 1 } } }
          }
        }
      }
    end

    it 'returns the definition based on the arguments' do
      expect(described_class.new(params).definition).to eq(expected_definition)
    end
  end
end
