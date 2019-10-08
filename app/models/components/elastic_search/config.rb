# frozen_string_literal: true

module Components
  module ElasticSearch
    module Config
      module_function

      def url
        ENV.fetch('ELASTIC_SEARCH_URL')
      end

      def user
        ENV.fetch('ELASTIC_SEARCH_USER')
      end

      def password
        ENV.fetch('ELASTIC_SEARCH_PASSWORD')
      end
    end
  end
end
