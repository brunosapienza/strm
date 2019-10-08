# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Components::ElasticSearch::Client do
  let(:instance) { described_class.instance }

  describe '.connection' do
    it 'returns an instance of Elasticsearch::Transport::Client' do
      expect(instance.connection).to be_an_instance_of(Elasticsearch::Transport::Client)
    end
  end
end
