require File.expand_path(File.dirname(__FILE__) + '/multi')

multi = Multi.new

puts "Multipling by factor:"
puts "-------------------------"

result = STDIN.readline.chomp

examples = []

result.split.each do |factor|
  examples += multi.generate_examples_for factor
end

grade = multi.quiz(examples)

puts "Grade: #{grade}"

