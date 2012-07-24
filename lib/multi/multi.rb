class Multi
 
  def initialize
    @from = 2 
    @to = 9
  end

  def generate_examples_for factor
    examples = []

    (0..7).each do |multiplicand|
      examples << [multiplicand+2, factor.to_i]
    end

    examples
  end

  def quiz examples
    examples.shuffle!

    correct_answers = 0 

    examples.each_slice(4) do |slice|
      result = display_block slice
      correct_answers += result.count { |n| n == "OK" }

      puts "Answers: #{result.join(" ")}"
    end

    calculate_grade(examples.size, correct_answers)
  end

  def display_block slice
    output = []
    slice.each do |_|
      output <<"FAIL"
    end

    slice.each do |multiplicand, factor|
      puts "#{multiplicand} x #{factor} = "
    end

    result = STDIN.readline.chomp

    result.split.each_with_index do |answer, index|
      multiplicand, factor = *slice[index]

      ok = check_answer(multiplicand, factor, answer.to_i)

      output[index] = "OK" if ok
    end

    output
  end

  def check_answer multiplicand, factor, answer
    factor * multiplicand == answer
  end

  def calculate_grade(total, correct_answers)
    ratio = correct_answers.to_f / total.to_f

    if ratio == 1.0
      "A"
    elsif ratio >= 0.9
      "B"
    elsif ratio >= 0.8
      "C"
    elsif ratio >= 0.7
      "D"
    elsif ratio < 0.7
      "F"
    end
  end

end
