# To use with thin
# thin start -p PORT -R config.ru

require ::File.join(::File.dirname(__FILE__), 'lib', 'multi')

# trap(:INT) { exit }

# app = Rack::Builder.new {
#  use Rack::CommonLogger
#  run Multi::App
# }.to_app

# run app

# if ENV['launchy']
#   require 'launchy'

#   Launchy::Browser.run("http://localhost:9292")
# end

require 'bundler'
Bundler.require

require "sinatra/reloader"
# if development?

# require 'lib/multi/app'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'assets/javascripts'
  environment.append_path 'assets/stylesheets'
  # environment.append_path 'assets/templates'
  run environment
end

map '/' do
  run Sinatra::Application
end
