# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Components::ElasticSearch::Lookup do
  describe '#query' do
    let(:query_params) do
      {
        "query": 'Scomo',
        "before": '1554037199999',
        "after": '1551358800000',
        "interval": '1d'
      }
    end

    let(:query_builder) { Components::ElasticSearch::QueryBuilder }

    let(:client) { double('SingletonClient') }
    let(:lookup) { described_class.new(query_params, client) }

    it 'performs an Elastic Search lookup' do
      expect(client).to receive(:search).with(
        index: 'news',
        body: query_builder.new(query_params).definition
      )

      lookup.query(query_params)
    end
  end
end
