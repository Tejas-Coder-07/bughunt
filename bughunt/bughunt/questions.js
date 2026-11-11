// =====================================================================
//  BUG HUNT — question bank
//  Each question: { code: [lines...], bug: <index of buggy line, starting at 0>, fix: "short explanation" }
//  Keep them SHORT and BEGINNER-FRIENDLY (1st year students).
//  To add your own: copy any block, change the lines, set `bug` to the line number (0 = first line).
// =====================================================================

window.QUESTIONS = {
  py: [
    { code: ['name = "Riya"', 'print("Hello, " + name)', 'print("Welcome to OSCode)'], bug: 2, fix: 'Missing closing quote " at the end of the text' },
    { code: ['marks = 75', 'if marks > 40', '    print("Pass")'], bug: 1, fix: 'An if line must end with a colon  →  if marks > 40:' },
    { code: ['count = 0', 'for i in range(5):', 'print(i)'], bug: 2, fix: 'Code inside a loop must be indented (pushed right)' },
    { code: ['age = 18', 'if age = 18:', '    print("You can vote!")'], bug: 1, fix: 'Use == to compare. A single = stores a value' },
    { code: ['a = 10', 'b = 20', 'print("Sum is", a + b'], bug: 2, fix: 'Missing closing bracket )' },
    { code: ['city = "Bengaluru"', 'Print("I live in", city)', 'print("Nice!")'], bug: 1, fix: 'Python is case-sensitive: print, not Print' },
    { code: ['def greet()', '    print("Hi there!")', 'greet()'], bug: 0, fix: 'A function definition needs a colon  →  def greet():' },
    { code: ['nums = [10, 20, 30', 'print(nums[0])', 'print("Done")'], bug: 0, fix: 'Missing closing square bracket ]' },
    { code: ['n = 3', 'while n > 0', '    print(n)', '    n = n - 1'], bug: 1, fix: 'while needs a colon too  →  while n > 0:' },
    { code: ['x = 7', 'if x % 2 == 0:', '    print("Even")', 'else', '    print("Odd")'], bug: 3, fix: 'else needs a colon  →  else:' },
    { code: ['day = "Friday"', "print('It's ' + day)"], bug: 1, fix: "The ' in It's ends the text early. Use double quotes \"It's\"" },
    { code: ['fruits = ["apple", "mango", "kiwi"]', 'print(fruits[0])', 'print(fruits[3])'], bug: 2, fix: 'Index 3 does not exist. Positions are 0, 1, 2' },
    { code: ['import Math', 'root = math.sqrt(16)', 'print(root)'], bug: 0, fix: 'Module names are lowercase  →  import math' },
    { code: ['msg = "Hello, World!"', 'print msg'], bug: 1, fix: 'print needs brackets  →  print(msg)' },
    { code: ['1st_place = "Kavya"', 'second = "Rohan"', 'print(second)'], bug: 0, fix: 'Variable names cannot start with a number' },
    { code: ['total = (5 + 3))', 'print(total)'], bug: 0, fix: 'One extra closing bracket )' },
    { code: ['def add(a, b):', '    return a + b', 'print(add(2))'], bug: 2, fix: 'add needs two numbers  →  add(2, 3)' },
    { code: ['score == 100', 'print(score)'], bug: 0, fix: 'Use = to store a value. == only compares' },
    { code: ['name = input("Your name: ")', 'print("Hi", name)', 'print("Bye" name)'], bug: 2, fix: 'Missing comma between the items  →  "Bye", name' },
    { code: ['for i in range(3):', '    print("Loop", i)', 'print("Finished"'], bug: 2, fix: 'Missing closing bracket )' },
    { code: ['numbers = [4, 8, 15]', 'total = sum(numbers)', 'print(total / len(number))'], bug: 2, fix: 'Typo! The list is called numbers, not number' },
    { code: ['is_raining = true', 'if is_raining:', '    print("Take an umbrella")'], bug: 0, fix: 'Python writes True with a capital T' },
    { code: ['x = 10', 'if x > 5:', '    print("Big")', '  print("Really big")'], bug: 3, fix: 'Indentation does not match the line above' },
  ],

  c: [
    { code: ['#include <stdio.h>', '', 'int main() {', '    printf("Hello, World!")', '    return 0;', '}'], bug: 3, fix: 'Missing semicolon ; at the end of the line' },
    { code: ['#include <studio.h>', 'int main() {', '    printf("Hi!");', '    return 0;', '}'], bug: 0, fix: "It's stdio.h (standard input/output), not studio!" },
    { code: ['int main() {', '    int x = 10;', '    if (x = 5) {', '        printf("Five");', '    }', '}'], bug: 2, fix: 'Use == to compare. = assigns a value' },
    { code: ['int main() {', '    int age;', '    scanf("%d", age);', '    printf("%d", age);', '}'], bug: 2, fix: 'scanf needs & before the variable  →  &age' },
    { code: ['int main() {', '    int marks = 90;', '    printf("Marks: %d\\n" marks);', '}'], bug: 2, fix: 'Missing comma after the text  →  "...", marks' },
    { code: ['int main() {', '    Printf("Welcome!");', '    return 0;', '}'], bug: 1, fix: 'C is case-sensitive: printf, not Printf' },
    { code: ['int main() {', '    for (int i = 0; i < 5, i++) {', '        printf("%d ", i);', '    }', '}'], bug: 1, fix: 'Use ; not , inside a for loop' },
    { code: ['int main() {', '    float price = 49.5;', '    printf("%d", price);', '}'], bug: 2, fix: 'Use %f to print a float, not %d' },
    { code: ['int main() {', '    int nums[3] = {1, 2, 3};', '    printf("%d", nums[3]);', '}'], bug: 2, fix: 'nums[3] is outside the array. Valid: 0, 1, 2' },
    { code: ['int main() {', '    int i = 0;', '    while (i < 5);', '    {', '        i++;', '    }', '}'], bug: 2, fix: 'The ; after while makes it loop forever' },
    { code: ['int main() {', '    int a = 5;', '    int b = 10;', '    printf("%d", a + c);', '}'], bug: 3, fix: 'c was never created. Did you mean b?' },
    { code: ['#include <stdio.h>', 'int main() {', '    print("Hello");', '    return 0;', '}'], bug: 2, fix: 'C uses printf, not print' },
    { code: ['int main() {', '    / print a greeting', '    printf("Hi");', '}'], bug: 1, fix: 'Comments need two slashes  →  //' },
    { code: ['int main {', '    printf("Hello");', '    return 0;', '}'], bug: 0, fix: 'main needs brackets  →  int main()' },
    { code: ['int main() {', '    printf("Done);', '    return 0;', '}'], bug: 1, fix: 'Missing closing quote " in the text' },
    { code: ['int main() {', '    int x = 5;', '    return 0', '}'], bug: 2, fix: 'Missing semicolon  →  return 0;' },
    { code: ['int main() {', '    char grade = "A";', '    printf("%c", grade);', '}'], bug: 1, fix: "A single char uses single quotes  →  'A'" },
    { code: ['int main() {', '    int x = 3;', '    if (x > 2) {', '        printf("Yes");', '    else {', '        printf("No");', '    }', '}'], bug: 4, fix: 'Close the if block first  →  } else {' },
    { code: ['#include <stdio.h', 'int main() {', '    printf("Hi");', '}'], bug: 0, fix: 'Missing >  →  #include <stdio.h>' },
    { code: ['int main() {', '    int total = 0;', '    for (int i = 1; i <= 3; i++)', '        total += i', '    printf("%d", total);', '}'], bug: 3, fix: 'Missing semicolon  →  total += i;' },
    { code: ['int main() {', '    int num = 7;', '    if (num % 2 == 0) {', '        printf("Even");', '    } else (', '        printf("Odd");', '    }', '}'], bug: 4, fix: 'Blocks open with { not (' },
  ],
};
