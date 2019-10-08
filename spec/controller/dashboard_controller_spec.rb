# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DashboardController, type: :controller do
  describe '#query' do
    let(:connection) { double('connection') }
    let(:lookup) { instance_double('Components::ElasticSearch::Lookup') }

    let(:result) do
      { key: 'result' }
    end

    let(:params) do
      {
        query: 'Scomo',
        before: '1554037199999',
        after: '1551358800000',
        interval: '1d'
      }
    end

    it 'renders orders' do
      expect(Components::ElasticSearch::Lookup).to receive(:new)
        .with(hash_including(params))
        .and_return(lookup)

      expect(lookup).to receive(:query).and_return(result)

      get :query, params: params
      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)).to eq(result.as_json)
    end

    it 'renders error in JSON format' do
      expect(Components::ElasticSearch::Lookup).to receive(:new).and_raise('boom')

      get :query, params: params
      expect(response.status).to eq(500)
      expect(response.content_type).to eq('application/json; charset=utf-8')
      expect(JSON.parse(response.body)).to eq({ error: 'boom' }.as_json)
    end
  end
end
