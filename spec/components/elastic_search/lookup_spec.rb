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
    let(:client) { Components::ElasticSearch::Client.instance }
    let(:lookup) { described_class.new(query_params, client) }
    let(:connection) { double('connection') }

    it 'performs an Elastic Search lookup' do
      allow(client).to receive(:connection).and_return(connection)
      allow(connection).to receive(:search)

      lookup.query

      expect(connection).to have_received(:search).with(
        index: 'news',
        body: query_builder.new(query_params).definition
      )
    end
  end
end
