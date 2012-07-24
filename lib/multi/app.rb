require 'sinatra'
require 'sinatra/base'

require "slim"
require 'json'

# class Multi::App < Sinatra::Base

  #set :haml, {:format => :html5, :attr_wrapper => '"'}
  set :views, File.dirname(__FILE__) + '/../../views'
  #set :public_folder, File.dirname(__FILE__) + '/../../public'
  set :sessions, true

	get "/" do
		@title = "Multiplication"

		init_multi

		slim :index	
	end

	post "/factor" do
		factor = params[:factor].to_i

		init_multi

		{:result => slim(:factor_table)}.to_json	
	end

	get '/multiply' do
		number1 = params[:number1].to_i
		number2 = params[:number2].to_i
		result = params[:result].to_i

		{:result => number1 * number2 == result}.to_json
	end

	get "/calculate_grade" do
		total = params[:total].to_i
		failed = params[:failed].to_i

		multi = session[:multi]

		{:result => multi.calculate_grade(total, failed)}.to_json
	end
# end

def init_multi
  @multi = Multi.new

	session[:multi] = @multi
end


