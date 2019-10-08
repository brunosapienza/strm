# frozen_string_literal: true

module Components
  module ElasticSearch
    class Client
      include Singleton

      def connection
        Elasticsearch::Client.new(
          url: config.url, user: config.user, password: config.password
        )
      end

      private

      def config
        Components::ElasticSearch::Config
      end
    end
  end
end
