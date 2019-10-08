Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "dashboard/index"
  root to: "dashboard#index"
  get '/results' => 'dashboard#query'
end
