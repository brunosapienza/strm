# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Components::ElasticSearch::Config do
  let(:url) { 'http://' }
  let(:user) { 'Luke Skywalker' }
  let(:password) { 'C3pO' }

  describe 'url' do
    it 'returns the url' do
      allow(ENV).to receive(:fetch).with('ELASTIC_SEARCH_URL') { url }
      expect(described_class.url).to eq(url)
    end
  end

  describe 'user' do
    it 'returns the user' do
      allow(ENV).to receive(:fetch).with('ELASTIC_SEARCH_USER') { user }
      expect(described_class.user).to eq(user)
    end
  end

  describe 'password' do
    it 'returns the password' do
      allow(ENV).to receive(:fetch).with('ELASTIC_SEARCH_PASSWORD') { password }
      expect(described_class.password).to eq(password)
    end
  end
end
