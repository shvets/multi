puts "Please enter your name:"

name = gets

letters = %w(a b c d e f g h i j k l m n o p q r s t u v w x y z)
digits = %(1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24)

name.each_char do |char|
  result = letters.each_with_index do letter, index
  end
  
  puts result
end  

#puts "Hi, #{name}"