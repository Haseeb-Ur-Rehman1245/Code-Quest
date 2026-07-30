import { CourseLessons } from "./types";

export const javaLessons: CourseLessons = {
  easy: [
    {
      id: "java-1", title: "Introduction to Java",
      content: "Java is a high-level, object-oriented programming language designed for portability. The 'Write Once, Run Anywhere' (WORA) principle means compiled Java code runs on any platform with a JVM (Java Virtual Machine). Java is statically typed, meaning variable types are declared at compile time. It's widely used in enterprise applications, Android development, web services, and large-scale systems. Java's garbage collector automatically manages memory, preventing memory leaks common in languages like C++.",
      codeExamples: [
        { language: "java", code: 'public class HelloWorld {\n  public static void main(String[] args) {\n    // Variables and data types\n    String name = "Ali";\n    int age = 22;\n    double gpa = 3.85;\n    boolean isStudent = true;\n    char grade = \'A\';\n\n    System.out.println("Name: " + name);\n    System.out.println("Age: " + age);\n    System.out.println("GPA: " + gpa);\n    System.out.println("Student: " + isStudent);\n\n    // String formatting\n    System.out.printf("Hello %s, you are %d years old%n", name, age);\n  }\n}', explanation: "Java program structure with main method, variables, and output." },
        { language: "java", code: '// Type casting\nint x = 10;\ndouble y = x;          // Implicit (widening)\nint z = (int) 3.99;    // Explicit (narrowing) → 3\n\n// Constants\nfinal double PI = 3.14159;\n// PI = 3.14; // Error! final cannot be reassigned\n\n// String methods\nString text = "Hello, World!";\nSystem.out.println(text.length());       // 13\nSystem.out.println(text.toUpperCase());  // HELLO, WORLD!\nSystem.out.println(text.substring(0,5)); // Hello\nSystem.out.println(text.contains("World")); // true', explanation: "Type casting, constants with final, and String methods." }
      ],
      exercises: [
        { question: "Write a Java program that calculates the area and perimeter of a rectangle given length and width.", solution: 'public class Rectangle {\n  public static void main(String[] args) {\n    double length = 10.5;\n    double width = 5.3;\n    double area = length * width;\n    double perimeter = 2 * (length + width);\n    System.out.printf("Area: %.2f%n", area);\n    System.out.printf("Perimeter: %.2f%n", perimeter);\n  }\n}', difficulty: "beginner" },
        { question: "Create a program that converts temperature from Celsius to Fahrenheit and vice versa.", solution: 'public class TempConverter {\n  public static void main(String[] args) {\n    double celsius = 37.0;\n    double fahrenheit = (celsius * 9/5) + 32;\n    System.out.printf("%.1f°C = %.1f°F%n", celsius, fahrenheit);\n    \n    double f = 98.6;\n    double c = (f - 32) * 5/9;\n    System.out.printf("%.1f°F = %.1f°C%n", f, c);\n  }\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "W3Schools Java Tutorial", url: "https://www.w3schools.com/java/" },
        { title: "Oracle Java Documentation", url: "https://docs.oracle.com/javase/tutorial/" },
        { title: "GeeksforGeeks Java", url: "https://www.geeksforgeeks.org/java/" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "java-2", title: "Control Flow & Loops",
      content: "Java provides if/else, switch, for, while, do-while, and enhanced for-each for control flow. The switch statement in Java 14+ supports pattern matching and arrow syntax. Break exits a loop; continue skips to the next iteration. Labeled breaks can exit nested loops. Java's for-each loop simplifies array/collection iteration.",
      codeExamples: [
        { language: "java", code: '// Enhanced switch (Java 14+)\nString day = "Monday";\nString type = switch (day) {\n  case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> "Weekday";\n  case "Saturday", "Sunday" -> "Weekend";\n  default -> "Unknown";\n};\n\n// For-each loop\nint[] numbers = {1, 2, 3, 4, 5};\nfor (int num : numbers) {\n  System.out.print(num + " ");\n}\n\n// Nested loops with label\nouter:\nfor (int i = 0; i < 5; i++) {\n  for (int j = 0; j < 5; j++) {\n    if (i * j > 6) break outer;\n    System.out.printf("(%d,%d) ", i, j);\n  }\n}', explanation: "Modern switch expressions, for-each, and labeled break." }
      ],
      exercises: [
        { question: "Write a program that prints a multiplication table (1-10) using nested loops.", solution: 'for (int i = 1; i <= 10; i++) {\n  for (int j = 1; j <= 10; j++) {\n    System.out.printf("%4d", i * j);\n  }\n  System.out.println();\n}', difficulty: "beginner" },
        { question: "Write a program that checks if a number is prime.", solution: 'public static boolean isPrime(int n) {\n  if (n < 2) return false;\n  for (int i = 2; i <= Math.sqrt(n); i++) {\n    if (n % i == 0) return false;\n  }\n  return true;\n}\n\n// Test\nSystem.out.println(isPrime(17)); // true\nSystem.out.println(isPrime(15)); // false', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "W3Schools Java If...Else", url: "https://www.w3schools.com/java/java_conditions.asp" },
        { title: "W3Schools Java Loops", url: "https://www.w3schools.com/java/java_for_loop.asp" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "java-3", title: "Arrays & ArrayList",
      content: "Arrays have fixed size and store elements of the same type. ArrayList is a resizable array from java.util. Arrays use index access (arr[0]), while ArrayList uses methods (get, add, remove, size). Multi-dimensional arrays represent matrices. The Arrays class provides utility methods: sort, binarySearch, fill, copyOf, toString. Use ArrayList for dynamic data and arrays for fixed-size, performance-critical code.",
      codeExamples: [
        { language: "java", code: '// Arrays\nint[] scores = {85, 92, 78, 95, 88};\nSystem.out.println(scores.length);     // 5\nArrays.sort(scores);                   // Sort in place\nSystem.out.println(Arrays.toString(scores)); // [78, 85, 88, 92, 95]\n\n// ArrayList\nimport java.util.ArrayList;\nArrayList<String> names = new ArrayList<>();\nnames.add("Ali");\nnames.add("Sara");\nnames.add("Ahmed");\nnames.remove("Sara");\nSystem.out.println(names);        // [Ali, Ahmed]\nSystem.out.println(names.size()); // 2\nSystem.out.println(names.contains("Ali")); // true\n\n// 2D Array\nint[][] matrix = {\n  {1, 2, 3},\n  {4, 5, 6},\n  {7, 8, 9}\n};\nSystem.out.println(matrix[1][2]); // 6', explanation: "Fixed arrays vs dynamic ArrayList and 2D arrays." }
      ],
      exercises: [
        { question: "Write a method that takes an ArrayList of integers and returns the average.", solution: 'public static double average(ArrayList<Integer> list) {\n  int sum = 0;\n  for (int num : list) sum += num;\n  return (double) sum / list.size();\n}\n\nArrayList<Integer> grades = new ArrayList<>(List.of(80, 90, 75, 95));\nSystem.out.println(average(grades)); // 85.0', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "W3Schools Java Arrays", url: "https://www.w3schools.com/java/java_arrays.asp" },
        { title: "W3Schools ArrayList", url: "https://www.w3schools.com/java/java_arraylist.asp" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "java-4", title: "Methods & Functions",
      content: "Methods are blocks of reusable code. They have a return type, name, and parameter list. void methods don't return values. Method overloading allows multiple methods with the same name but different parameters. The static keyword means the method belongs to the class, not instances. Variable arguments (varargs) accept a flexible number of arguments.",
      codeExamples: [
        { language: "java", code: '// Method with return value\npublic static int max(int a, int b) {\n  return a > b ? a : b;\n}\n\n// Method overloading\npublic static double max(double a, double b) {\n  return a > b ? a : b;\n}\n\npublic static int max(int a, int b, int c) {\n  return Math.max(a, Math.max(b, c));\n}\n\n// Varargs\npublic static int sum(int... numbers) {\n  int total = 0;\n  for (int n : numbers) total += n;\n  return total;\n}\n\nSystem.out.println(sum(1, 2, 3));       // 6\nSystem.out.println(sum(10, 20, 30, 40)); // 100', explanation: "Methods with overloading and variable arguments." }
      ],
      exercises: [
        { question: "Write overloaded methods 'calculate' for area: circle (radius), rectangle (l, w), and triangle (base, height).", solution: 'public static double calculate(double radius) {\n  return Math.PI * radius * radius;\n}\n\npublic static double calculate(double length, double width) {\n  return length * width;\n}\n\npublic static double calculate(double base, double height, boolean isTriangle) {\n  return 0.5 * base * height;\n}\n\nSystem.out.printf("Circle: %.2f%n", calculate(5.0));\nSystem.out.printf("Rectangle: %.2f%n", calculate(4.0, 6.0));\nSystem.out.printf("Triangle: %.2f%n", calculate(3.0, 8.0, true));', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "W3Schools Java Methods", url: "https://www.w3schools.com/java/java_methods.asp" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "java-5", title: "OOP: Classes & Objects",
      content: "Java is fundamentally object-oriented. A class is a blueprint; an object is an instance. Classes have fields (data), constructors (initialization), and methods (behavior). Access modifiers control visibility: public (everywhere), private (class only), protected (package + subclasses), default (package only). Encapsulation uses private fields with public getters/setters. The 'this' keyword refers to the current object.",
      codeExamples: [
        { language: "java", code: "public class Student {\n  // Private fields (encapsulation)\n  private String name;\n  private int age;\n  private double gpa;\n\n  // Constructor\n  public Student(String name, int age, double gpa) {\n    this.name = name;\n    this.age = age;\n    this.gpa = gpa;\n  }\n\n  // Getters and Setters\n  public String getName() { return name; }\n  public int getAge() { return age; }\n  public double getGpa() { return gpa; }\n\n  public void setGpa(double gpa) {\n    if (gpa >= 0 && gpa <= 4.0) {\n      this.gpa = gpa;\n    }\n  }\n\n  // Method\n  public String getStatus() {\n    return gpa >= 3.5 ? \"Dean's List\" : \"Regular\";\n  }\n\n  @Override\n  public String toString() {\n    return String.format(\"%s (Age: %d, GPA: %.2f)\", name, age, gpa);\n  }\n}\n\n// Usage\nStudent s = new Student(\"Ali\", 22, 3.85);\nSystem.out.println(s);           // Ali (Age: 22, GPA: 3.85)\nSystem.out.println(s.getStatus()); // Dean's List", explanation: "Class with encapsulation, constructor, methods, and toString override." }
      ],
      exercises: [
        { question: "Create a BankAccount class with deposit, withdraw, and getBalance methods. Prevent negative balances.", solution: 'public class BankAccount {\n  private String owner;\n  private double balance;\n\n  public BankAccount(String owner, double initialBalance) {\n    this.owner = owner;\n    this.balance = Math.max(0, initialBalance);\n  }\n\n  public void deposit(double amount) {\n    if (amount > 0) balance += amount;\n  }\n\n  public boolean withdraw(double amount) {\n    if (amount > 0 && amount <= balance) {\n      balance -= amount;\n      return true;\n    }\n    return false;\n  }\n\n  public double getBalance() { return balance; }\n\n  @Override\n  public String toString() {\n    return String.format("%s: $%.2f", owner, balance);\n  }\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "W3Schools Java OOP", url: "https://www.w3schools.com/java/java_oop.asp" },
        { title: "GeeksforGeeks OOP in Java", url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "java-6", title: "Inheritance & Polymorphism",
      content: "Inheritance lets a class inherit fields and methods from a parent class using 'extends'. Java supports single inheritance (one parent) but multiple interface implementation. Polymorphism allows objects to take many forms — a parent reference can hold a child object. Method overriding lets subclasses provide specific implementations. The 'super' keyword accesses parent class members. Abstract classes can't be instantiated directly.",
      codeExamples: [
        { language: "java", code: 'abstract class Shape {\n  String color;\n\n  Shape(String color) { this.color = color; }\n\n  abstract double area();\n\n  @Override\n  public String toString() {\n    return color + " shape with area " + String.format("%.2f", area());\n  }\n}\n\nclass Circle extends Shape {\n  double radius;\n\n  Circle(String color, double radius) {\n    super(color);\n    this.radius = radius;\n  }\n\n  @Override\n  double area() { return Math.PI * radius * radius; }\n}\n\nclass Rectangle extends Shape {\n  double width, height;\n\n  Rectangle(String color, double w, double h) {\n    super(color);\n    this.width = w;\n    this.height = h;\n  }\n\n  @Override\n  double area() { return width * height; }\n}\n\n// Polymorphism\nShape[] shapes = {\n  new Circle("Red", 5),\n  new Rectangle("Blue", 4, 6)\n};\nfor (Shape s : shapes) {\n  System.out.println(s); // Calls overridden toString()\n}', explanation: "Abstract class, inheritance, method overriding, and polymorphism." }
      ],
      exercises: [
        { question: "Create an Animal hierarchy with Dog and Cat subclasses that override a makeSound() method.", solution: 'abstract class Animal {\n  String name;\n  Animal(String name) { this.name = name; }\n  abstract String makeSound();\n  \n  @Override\n  public String toString() {\n    return name + " says " + makeSound();\n  }\n}\n\nclass Dog extends Animal {\n  Dog(String name) { super(name); }\n  @Override\n  String makeSound() { return "Woof!"; }\n}\n\nclass Cat extends Animal {\n  Cat(String name) { super(name); }\n  @Override\n  String makeSound() { return "Meow!"; }\n}\n\nAnimal[] animals = { new Dog("Rex"), new Cat("Whiskers") };\nfor (Animal a : animals) System.out.println(a);', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "W3Schools Inheritance", url: "https://www.w3schools.com/java/java_inheritance.asp" },
        { title: "W3Schools Polymorphism", url: "https://www.w3schools.com/java/java_polymorphism.asp" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "java-7", title: "Interfaces & Abstract Classes",
      content: "Interfaces define contracts that classes must implement. Since Java 8, interfaces can have default and static methods. A class can implement multiple interfaces but extend only one class. Abstract classes provide partial implementation. Use interfaces for 'can-do' relationships (Serializable, Comparable) and abstract classes for 'is-a' relationships with shared code.",
      codeExamples: [
        { language: "java", code: 'interface Payable {\n  double calculatePay();\n  \n  // Default method (Java 8+)\n  default String getPaymentInfo() {\n    return "Payment: $" + String.format("%.2f", calculatePay());\n  }\n}\n\ninterface Printable {\n  void print();\n}\n\n// Implementing multiple interfaces\nclass Employee implements Payable, Printable {\n  String name;\n  double hourlyRate;\n  int hoursWorked;\n\n  Employee(String name, double rate, int hours) {\n    this.name = name;\n    this.hourlyRate = rate;\n    this.hoursWorked = hours;\n  }\n\n  @Override\n  public double calculatePay() {\n    return hourlyRate * hoursWorked;\n  }\n\n  @Override\n  public void print() {\n    System.out.println(name + " - " + getPaymentInfo());\n  }\n}\n\nEmployee emp = new Employee("Ali", 25.0, 40);\nemp.print(); // Ali - Payment: $1000.00', explanation: "Multiple interface implementation with default methods." }
      ],
      exercises: [
        { question: "Create a Sortable interface with a sort() method and implement it for an IntArray class.", solution: 'interface Sortable {\n  void sort();\n  boolean isSorted();\n}\n\nclass IntArray implements Sortable {\n  int[] data;\n\n  IntArray(int... values) { this.data = values.clone(); }\n\n  @Override\n  public void sort() { Arrays.sort(data); }\n\n  @Override\n  public boolean isSorted() {\n    for (int i = 1; i < data.length; i++) {\n      if (data[i] < data[i-1]) return false;\n    }\n    return true;\n  }\n\n  @Override\n  public String toString() { return Arrays.toString(data); }\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "W3Schools Java Interface", url: "https://www.w3schools.com/java/java_interface.asp" }
      ],
      estimatedMinutes: 25
    },
  ],
  intermediate: [
    {
      id: "java-8", title: "Exception Handling",
      content: "Java uses try-catch-finally for exception handling. Checked exceptions (IOException, SQLException) must be caught or declared with 'throws'. Unchecked exceptions (NullPointerException, ArrayIndexOutOfBoundsException) extend RuntimeException. Create custom exceptions by extending Exception. The try-with-resources statement auto-closes resources like files and database connections.",
      codeExamples: [
        { language: "java", code: '// Try-with-resources (auto-closes)\ntry (BufferedReader reader = new BufferedReader(new FileReader("file.txt"))) {\n  String line;\n  while ((line = reader.readLine()) != null) {\n    System.out.println(line);\n  }\n} catch (FileNotFoundException e) {\n  System.err.println("File not found: " + e.getMessage());\n} catch (IOException e) {\n  System.err.println("Read error: " + e.getMessage());\n}\n\n// Custom exception\nclass InsufficientFundsException extends Exception {\n  private double amount;\n  \n  InsufficientFundsException(double amount) {\n    super("Insufficient funds. Short by $" + String.format("%.2f", amount));\n    this.amount = amount;\n  }\n  \n  double getShortage() { return amount; }\n}', explanation: "Try-with-resources and custom exceptions for robust error handling." }
      ],
      exercises: [
        { question: "Create a custom AgeValidationException and use it in a setAge method that rejects ages outside 0-150.", solution: 'class AgeValidationException extends Exception {\n  AgeValidationException(int age) {\n    super("Invalid age: " + age + ". Must be 0-150.");\n  }\n}\n\npublic static void setAge(int age) throws AgeValidationException {\n  if (age < 0 || age > 150) throw new AgeValidationException(age);\n  System.out.println("Age set to: " + age);\n}\n\ntry {\n  setAge(200);\n} catch (AgeValidationException e) {\n  System.err.println(e.getMessage());\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "W3Schools Exceptions", url: "https://www.w3schools.com/java/java_try_catch.asp" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "java-9", title: "Collections Framework",
      content: "The Java Collections Framework provides data structures: List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap), Queue (PriorityQueue, LinkedList). Choose based on needs: ArrayList for indexed access, LinkedList for frequent insertions, HashSet for uniqueness, TreeSet for sorted unique values, HashMap for key-value pairs.",
      codeExamples: [
        { language: "java", code: 'import java.util.*;\n\n// HashMap\nMap<String, Integer> wordCount = new HashMap<>();\nString[] words = {"hello", "world", "hello", "java"};\nfor (String w : words) {\n  wordCount.merge(w, 1, Integer::sum);\n}\nSystem.out.println(wordCount); // {hello=2, world=1, java=1}\n\n// HashSet (unique values)\nSet<Integer> uniqueNums = new HashSet<>(List.of(1, 2, 2, 3, 3, 4));\nSystem.out.println(uniqueNums); // [1, 2, 3, 4]\n\n// TreeMap (sorted keys)\nTreeMap<String, Integer> sortedMap = new TreeMap<>(wordCount);\nSystem.out.println(sortedMap); // {hello=2, java=1, world=1}\n\n// PriorityQueue (min-heap)\nPriorityQueue<Integer> pq = new PriorityQueue<>();\npq.addAll(List.of(5, 1, 3, 2, 4));\nwhile (!pq.isEmpty()) {\n  System.out.print(pq.poll() + " "); // 1 2 3 4 5\n}', explanation: "Key collection types: HashMap, HashSet, TreeMap, PriorityQueue." }
      ],
      exercises: [
        { question: "Write a method that finds the most frequent element in a list using a HashMap.", solution: 'public static <T> T mostFrequent(List<T> list) {\n  Map<T, Integer> freq = new HashMap<>();\n  for (T item : list) {\n    freq.merge(item, 1, Integer::sum);\n  }\n  return Collections.max(freq.entrySet(), Map.Entry.comparingByValue()).getKey();\n}\n\nList<String> fruits = List.of("apple", "banana", "apple", "cherry", "apple");\nSystem.out.println(mostFrequent(fruits)); // apple', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Oracle Collections Tutorial", url: "https://docs.oracle.com/javase/tutorial/collections/" },
        { title: "GeeksforGeeks Collections", url: "https://www.geeksforgeeks.org/collections-in-java-2/" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "java-10", title: "Generics",
      content: "Generics add type safety to classes, interfaces, and methods by parameterizing types. They prevent ClassCastException at runtime by catching type errors at compile time. Bounded type parameters (<T extends Comparable>) restrict allowed types. Wildcards (?) represent unknown types: <? extends T> (upper bound), <? super T> (lower bound). Generic methods can have their own type parameters.",
      codeExamples: [
        { language: "java", code: '// Generic class\nclass Pair<K, V> {\n  private K key;\n  private V value;\n\n  Pair(K key, V value) {\n    this.key = key;\n    this.value = value;\n  }\n\n  K getKey() { return key; }\n  V getValue() { return value; }\n\n  @Override\n  public String toString() {\n    return key + " = " + value;\n  }\n}\n\nPair<String, Integer> age = new Pair<>("Ali", 22);\nPair<String, Double> gpa = new Pair<>("Sara", 3.9);\n\n// Generic method with bounds\npublic static <T extends Comparable<T>> T max(T a, T b) {\n  return a.compareTo(b) > 0 ? a : b;\n}\n\nSystem.out.println(max(10, 20));         // 20\nSystem.out.println(max("apple", "banana")); // banana', explanation: "Generic classes and bounded type parameters for type-safe code." }
      ],
      exercises: [
        { question: "Create a generic Stack<T> class with push, pop, peek, and isEmpty methods.", solution: 'class Stack<T> {\n  private ArrayList<T> items = new ArrayList<>();\n\n  void push(T item) { items.add(item); }\n\n  T pop() {\n    if (isEmpty()) throw new RuntimeException("Stack is empty");\n    return items.remove(items.size() - 1);\n  }\n\n  T peek() {\n    if (isEmpty()) throw new RuntimeException("Stack is empty");\n    return items.get(items.size() - 1);\n  }\n\n  boolean isEmpty() { return items.isEmpty(); }\n  int size() { return items.size(); }\n}\n\nStack<Integer> stack = new Stack<>();\nstack.push(1);\nstack.push(2);\nSystem.out.println(stack.pop()); // 2', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Oracle Generics Tutorial", url: "https://docs.oracle.com/javase/tutorial/java/generics/" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "java-11", title: "Lambda Expressions & Streams",
      content: "Lambda expressions (Java 8) enable functional programming. They provide concise syntax for implementing functional interfaces (interfaces with one abstract method). The Stream API processes collections declaratively with operations like filter, map, reduce, sorted, collect. Streams are lazy — intermediate operations aren't executed until a terminal operation triggers them.",
      codeExamples: [
        { language: "java", code: 'List<Student> students = List.of(\n  new Student("Ali", 3.8),\n  new Student("Sara", 3.2),\n  new Student("Ahmed", 3.9),\n  new Student("Fatima", 2.8)\n);\n\n// Stream operations\nList<String> honorRoll = students.stream()\n  .filter(s -> s.getGpa() >= 3.5)           // Filter\n  .sorted(Comparator.comparing(Student::getGpa).reversed()) // Sort\n  .map(Student::getName)                     // Transform\n  .collect(Collectors.toList());             // Collect\n\nSystem.out.println(honorRoll); // [Ahmed, Ali]\n\n// Average GPA\ndouble avgGpa = students.stream()\n  .mapToDouble(Student::getGpa)\n  .average()\n  .orElse(0.0);\n\n// Group by status\nMap<String, List<Student>> grouped = students.stream()\n  .collect(Collectors.groupingBy(\n    s -> s.getGpa() >= 3.5 ? "Honor" : "Regular"\n  ));', explanation: "Stream API for declarative data processing with filter, map, sort, and collect." }
      ],
      exercises: [
        { question: "Use streams to find the 3 longest words in a sentence, converted to uppercase.", solution: 'String sentence = "The quick brown fox jumps over the lazy dog";\nList<String> longest = Arrays.stream(sentence.split(" "))\n  .sorted(Comparator.comparingInt(String::length).reversed())\n  .limit(3)\n  .map(String::toUpperCase)\n  .collect(Collectors.toList());\n\nSystem.out.println(longest); // [JUMPS, QUICK, BROWN]', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Oracle Lambda Tutorial", url: "https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html" },
        { title: "Oracle Stream API", url: "https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "java-12", title: "File I/O & NIO",
      content: "Java provides multiple I/O APIs. The traditional java.io uses streams (FileReader, BufferedReader). Java NIO (java.nio) offers Channels, Buffers, and the modern Path/Files API. The Files class simplifies file operations: readAllLines, writeString, copy, move, delete. Always use try-with-resources for auto-closing. For large files, use BufferedReader or Stream<String> for line-by-line processing.",
      codeExamples: [
        { language: "java", code: 'import java.nio.file.*;\nimport java.io.*;\n\n// Modern NIO.2 approach\nPath path = Path.of("data.txt");\n\n// Write to file\nFiles.writeString(path, "Hello, Java NIO!\\nLine 2");\n\n// Read entire file\nString content = Files.readString(path);\n\n// Read lines as list\nList<String> lines = Files.readAllLines(path);\n\n// Stream lines (memory efficient for large files)\ntry (Stream<String> stream = Files.lines(path)) {\n  stream\n    .filter(line -> !line.isBlank())\n    .map(String::trim)\n    .forEach(System.out::println);\n}\n\n// Copy and move\nFiles.copy(path, Path.of("backup.txt"), StandardCopyOption.REPLACE_EXISTING);\nFiles.move(Path.of("old.txt"), Path.of("new.txt"));', explanation: "Modern Java NIO.2 for clean, efficient file operations." }
      ],
      exercises: [
        { question: "Write a program that reads a CSV file and calculates the average of a numeric column.", solution: 'Path csv = Path.of("grades.csv");\ndouble avg = Files.lines(csv)\n  .skip(1) // Skip header\n  .map(line -> line.split(","))\n  .mapToDouble(cols -> Double.parseDouble(cols[1]))\n  .average()\n  .orElse(0.0);\n\nSystem.out.printf("Average: %.2f%n", avg);', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Oracle NIO Tutorial", url: "https://docs.oracle.com/javase/tutorial/essential/io/fileio.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "java-13", title: "Multithreading Basics",
      content: "Java supports concurrent programming through threads. Create threads by extending Thread or implementing Runnable. The ExecutorService manages thread pools efficiently. Synchronized blocks prevent race conditions. The volatile keyword ensures variable visibility across threads. Java's concurrency utilities (java.util.concurrent) provide higher-level abstractions like CompletableFuture.",
      codeExamples: [
        { language: "java", code: '// Runnable with lambda\nRunnable task = () -> {\n  System.out.println("Running in: " + Thread.currentThread().getName());\n};\nnew Thread(task).start();\n\n// ExecutorService (thread pool)\nExecutorService executor = Executors.newFixedThreadPool(4);\nfor (int i = 0; i < 10; i++) {\n  final int taskId = i;\n  executor.submit(() -> {\n    System.out.printf("Task %d on %s%n", taskId, Thread.currentThread().getName());\n  });\n}\nexecutor.shutdown();\n\n// CompletableFuture (async programming)\nCompletableFuture<String> future = CompletableFuture\n  .supplyAsync(() -> fetchData())\n  .thenApply(data -> processData(data))\n  .thenApply(result -> formatResult(result));\n\nfuture.thenAccept(System.out::println);', explanation: "Thread creation, thread pools, and CompletableFuture for async work." }
      ],
      exercises: [
        { question: "Write a program that downloads 5 URLs concurrently using CompletableFuture.", solution: 'List<String> urls = List.of("url1", "url2", "url3", "url4", "url5");\n\nList<CompletableFuture<String>> futures = urls.stream()\n  .map(url -> CompletableFuture.supplyAsync(() -> {\n    // Simulate download\n    return "Content from " + url;\n  }))\n  .collect(Collectors.toList());\n\nList<String> results = futures.stream()\n  .map(CompletableFuture::join)\n  .collect(Collectors.toList());\n\nresults.forEach(System.out::println);', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Oracle Concurrency Tutorial", url: "https://docs.oracle.com/javase/tutorial/essential/concurrency/" }
      ],
      estimatedMinutes: 30
    },
  ],
  hard: [
    {
      id: "java-14", title: "Design Patterns in Java",
      content: "Design patterns are proven solutions to common software design problems. Creational patterns (Singleton, Factory, Builder) handle object creation. Structural patterns (Adapter, Decorator, Facade) compose objects. Behavioral patterns (Observer, Strategy, Command) manage algorithms and communication. Understanding patterns improves code maintainability, testability, and team communication.",
      codeExamples: [
        { language: "java", code: '// Builder Pattern\nclass User {\n  private final String name;\n  private final String email;\n  private final int age;\n  private final String phone;\n\n  private User(Builder builder) {\n    this.name = builder.name;\n    this.email = builder.email;\n    this.age = builder.age;\n    this.phone = builder.phone;\n  }\n\n  static class Builder {\n    private final String name; // required\n    private String email;\n    private int age;\n    private String phone;\n\n    Builder(String name) { this.name = name; }\n    Builder email(String email) { this.email = email; return this; }\n    Builder age(int age) { this.age = age; return this; }\n    Builder phone(String phone) { this.phone = phone; return this; }\n    User build() { return new User(this); }\n  }\n}\n\nUser user = new User.Builder("Ali")\n  .email("ali@email.com")\n  .age(22)\n  .build();', explanation: "Builder pattern for constructing complex objects with optional parameters." },
        { language: "java", code: '// Strategy Pattern\ninterface SortStrategy {\n  void sort(int[] array);\n}\n\nclass BubbleSort implements SortStrategy {\n  public void sort(int[] arr) {\n    // Bubble sort implementation\n    for (int i = 0; i < arr.length; i++)\n      for (int j = 0; j < arr.length - i - 1; j++)\n        if (arr[j] > arr[j+1]) { int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }\n  }\n}\n\nclass QuickSort implements SortStrategy {\n  public void sort(int[] arr) { Arrays.sort(arr); }\n}\n\nclass Sorter {\n  private SortStrategy strategy;\n  Sorter(SortStrategy strategy) { this.strategy = strategy; }\n  void sort(int[] arr) { strategy.sort(arr); }\n}', explanation: "Strategy pattern for swappable algorithms at runtime." }
      ],
      exercises: [
        { question: "Implement the Observer pattern for a weather station that notifies multiple displays.", solution: 'interface Observer { void update(float temp, float humidity); }\n\nclass WeatherStation {\n  private List<Observer> observers = new ArrayList<>();\n  private float temp, humidity;\n\n  void addObserver(Observer o) { observers.add(o); }\n  void setMeasurements(float t, float h) {\n    this.temp = t;\n    this.humidity = h;\n    observers.forEach(o -> o.update(temp, humidity));\n  }\n}\n\nclass Display implements Observer {\n  private String name;\n  Display(String name) { this.name = name; }\n  public void update(float t, float h) {\n    System.out.printf("%s: %.1f°C, %.0f%%%n", name, t, h);\n  }\n}', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Refactoring Guru - Patterns", url: "https://refactoring.guru/design-patterns/java" }
      ],
      estimatedMinutes: 35
    },
    {
      id: "java-15", title: "Java Records & Sealed Classes",
      content: "Records (Java 16) are immutable data carriers that auto-generate constructor, getters, equals, hashCode, and toString. Sealed classes (Java 17) restrict which classes can extend them. Pattern matching for instanceof (Java 16) eliminates casting. These modern features make Java code more concise and expressive, reducing boilerplate significantly.",
      codeExamples: [
        { language: "java", code: '// Record (immutable data class)\nrecord Point(double x, double y) {\n  // Custom method\n  double distanceTo(Point other) {\n    return Math.sqrt(Math.pow(x - other.x, 2) + Math.pow(y - other.y, 2));\n  }\n}\n\nPoint p1 = new Point(0, 0);\nPoint p2 = new Point(3, 4);\nSystem.out.println(p1.distanceTo(p2)); // 5.0\nSystem.out.println(p1);               // Point[x=0.0, y=0.0]\n\n// Sealed classes\nsealed interface Shape permits Circle, Rectangle, Triangle {}\nrecord Circle(double radius) implements Shape {}\nrecord Rectangle(double w, double h) implements Shape {}\nrecord Triangle(double a, double b, double c) implements Shape {}\n\n// Pattern matching with switch\ndouble area(Shape shape) {\n  return switch (shape) {\n    case Circle c -> Math.PI * c.radius() * c.radius();\n    case Rectangle r -> r.w() * r.h();\n    case Triangle t -> {\n      double s = (t.a() + t.b() + t.c()) / 2;\n      yield Math.sqrt(s * (s-t.a()) * (s-t.b()) * (s-t.c()));\n    }\n  };\n}', explanation: "Modern Java: Records for data, sealed classes for restricted hierarchies." }
      ],
      exercises: [
        { question: "Create a sealed interface Expression with record implementations for Number, Add, and Multiply. Write an evaluate method using pattern matching.", solution: 'sealed interface Expr permits Num, Add, Mul {}\nrecord Num(double value) implements Expr {}\nrecord Add(Expr left, Expr right) implements Expr {}\nrecord Mul(Expr left, Expr right) implements Expr {}\n\nstatic double evaluate(Expr expr) {\n  return switch (expr) {\n    case Num n -> n.value();\n    case Add a -> evaluate(a.left()) + evaluate(a.right());\n    case Mul m -> evaluate(m.left()) * evaluate(m.right());\n  };\n}\n\n// (2 + 3) * 4 = 20\nExpr expr = new Mul(new Add(new Num(2), new Num(3)), new Num(4));\nSystem.out.println(evaluate(expr)); // 20.0', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Oracle Records", url: "https://docs.oracle.com/en/java/javase/16/language/records.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "java-16", title: "Data Structures & Algorithms",
      content: "Understanding data structures is crucial for efficient programming. Key structures: linked lists (sequential access), stacks (LIFO), queues (FIFO), trees (hierarchical), graphs (network), hash tables (O(1) lookup). Algorithm categories: sorting (O(n log n)), searching (O(log n) with binary search), graph traversal (BFS/DFS). Big O notation measures algorithm efficiency.",
      codeExamples: [
        { language: "java", code: '// Linked List implementation\nclass LinkedList<T> {\n  private class Node {\n    T data;\n    Node next;\n    Node(T data) { this.data = data; }\n  }\n\n  private Node head;\n  private int size;\n\n  void addFirst(T data) {\n    Node node = new Node(data);\n    node.next = head;\n    head = node;\n    size++;\n  }\n\n  void addLast(T data) {\n    Node node = new Node(data);\n    if (head == null) { head = node; }\n    else {\n      Node current = head;\n      while (current.next != null) current = current.next;\n      current.next = node;\n    }\n    size++;\n  }\n\n  T get(int index) {\n    Node current = head;\n    for (int i = 0; i < index; i++) current = current.next;\n    return current.data;\n  }\n\n  int size() { return size; }\n}', explanation: "Custom LinkedList showing node-based data structure fundamentals." }
      ],
      exercises: [
        { question: "Implement a binary search algorithm that works on a sorted array of integers.", solution: 'public static int binarySearch(int[] arr, int target) {\n  int low = 0, high = arr.length - 1;\n  while (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (arr[mid] == target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1; // Not found\n}\n\nint[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\nSystem.out.println(binarySearch(sorted, 23)); // 5', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "GeeksforGeeks DSA", url: "https://www.geeksforgeeks.org/data-structures/" },
        { title: "HackerRank Java", url: "https://www.hackerrank.com/domains/java" }
      ],
      estimatedMinutes: 35
    },
  ],
};
