import { CourseLessons } from "./types";

export const rustLessons: CourseLessons = {
  easy: [
    {
      id: "rust-1", title: "Introduction to Rust",
      content: "Rust is a systems programming language focused on safety, speed, and concurrency. It guarantees memory safety without a garbage collector through its unique ownership system. Rust is used for operating systems, game engines, web assembly, embedded systems, and CLI tools. It's been voted the 'most loved language' on Stack Overflow for years. Rust's compiler catches many bugs at compile time that other languages only catch at runtime.",
      codeExamples: [
        { language: "rust", code: 'fn main() {\n    // Variables (immutable by default)\n    let name = "Ali";\n    let age: u32 = 22;\n    let gpa: f64 = 3.85;\n    let is_student = true;\n\n    println!("Name: {}", name);\n    println!("Age: {}, GPA: {:.2}", age, gpa);\n    println!("Student: {}", is_student);\n\n    // Mutable variable\n    let mut score = 0;\n    score += 10;\n    println!("Score: {}", score);\n\n    // Constants (SCREAMING_SNAKE_CASE)\n    const MAX_POINTS: u32 = 100_000;\n\n    // Shadowing (re-declare with same name)\n    let x = 5;\n    let x = x + 1;      // x is now 6\n    let x = x * 2;      // x is now 12\n    println!("x = {}", x);\n}', explanation: "Rust basics: immutable-by-default variables, mut keyword, constants, and shadowing." },
        { language: "rust", code: '// Data types\nlet integer: i32 = 42;       // Signed 32-bit\nlet unsigned: u64 = 100;     // Unsigned 64-bit\nlet float: f64 = 3.14;       // 64-bit float\nlet character: char = \'🦀\';   // Unicode character\nlet boolean: bool = true;\nlet tuple: (i32, f64, &str) = (42, 3.14, "hello");\nlet array: [i32; 5] = [1, 2, 3, 4, 5];\n\n// Tuple access\nlet (x, y, z) = tuple;       // Destructuring\nprintln!("{}", tuple.0);      // Index access\n\n// Array\nprintln!("First: {}", array[0]);\nprintln!("Length: {}", array.len());', explanation: "Rust primitive types, tuples, and arrays with their fixed sizes." }
      ],
      exercises: [
        { question: "Write a Rust program that converts temperature from Fahrenheit to Celsius using the formula: C = (F - 32) * 5/9.", solution: 'fn fahrenheit_to_celsius(f: f64) -> f64 {\n    (f - 32.0) * 5.0 / 9.0\n}\n\nfn main() {\n    let temps = [32.0, 72.0, 98.6, 212.0];\n    for f in temps {\n        println!("{:.1}°F = {:.1}°C", f, fahrenheit_to_celsius(f));\n    }\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "The Rust Book", url: "https://doc.rust-lang.org/book/" },
        { title: "Rust by Example", url: "https://doc.rust-lang.org/rust-by-example/" },
        { title: "Rustlings (exercises)", url: "https://github.com/rust-lang/rustlings" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "rust-2", title: "Ownership & Borrowing",
      content: "Ownership is Rust's most unique feature. Rules: 1) Each value has one owner. 2) There can be only one owner at a time. 3) When the owner goes out of scope, the value is dropped. Borrowing (&) lets you reference data without taking ownership. Mutable references (&mut) allow modification. You can have either one mutable reference OR any number of immutable references (not both). This prevents data races at compile time.",
      codeExamples: [
        { language: "rust", code: '// Ownership - move semantics\nlet s1 = String::from("hello");\nlet s2 = s1;              // s1 is MOVED to s2\n// println!("{}", s1);     // Error! s1 is no longer valid\nprintln!("{}", s2);        // OK\n\n// Clone (deep copy)\nlet s3 = s2.clone();\nprintln!("{} and {}", s2, s3); // Both valid\n\n// Borrowing (immutable reference)\nfn calculate_length(s: &String) -> usize {\n    s.len()  // Can read but not modify\n}\n\nlet s = String::from("hello");\nlet len = calculate_length(&s); // Borrow s\nprintln!("{} has {} chars", s, len); // s still valid!\n\n// Mutable reference\nfn add_world(s: &mut String) {\n    s.push_str(", world!");\n}\n\nlet mut greeting = String::from("hello");\nadd_world(&mut greeting);\nprintln!("{}", greeting); // "hello, world!"', explanation: "Ownership, move semantics, borrowing, and mutable references — Rust's core innovation." }
      ],
      exercises: [
        { question: "Fix the ownership errors in this code: let s = String::from('hello'); let s2 = s; println!('s={}, s2={}', s, s2);", solution: '// Option 1: Clone\nlet s = String::from("hello");\nlet s2 = s.clone();\nprintln!("s={}, s2={}", s, s2);\n\n// Option 2: Borrow\nlet s = String::from("hello");\nlet s2 = &s;\nprintln!("s={}, s2={}", s, s2);\n\n// Option 3: Use after move\nlet s = String::from("hello");\nlet s2 = s;\nprintln!("s2={}", s2); // Only use s2', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Rust Book - Ownership", url: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "rust-3", title: "Structs & Enums",
      content: "Structs group related data (like objects without inheritance). Enums represent types that can be one of several variants — much more powerful than enums in other languages. Enum variants can hold data. impl blocks add methods to structs and enums. The Option<T> enum (Some/None) replaces null. The Result<T, E> enum (Ok/Err) handles errors. Pattern matching with match exhaustively handles all variants.",
      codeExamples: [
        { language: "rust", code: '// Struct\nstruct Student {\n    name: String,\n    age: u32,\n    gpa: f64,\n}\n\nimpl Student {\n    // Constructor (associated function)\n    fn new(name: &str, age: u32, gpa: f64) -> Self {\n        Student {\n            name: name.to_string(),\n            age,\n            gpa,\n        }\n    }\n\n    // Method\n    fn is_honor_roll(&self) -> bool {\n        self.gpa >= 3.5\n    }\n\n    fn display(&self) -> String {\n        format!("{} (Age: {}, GPA: {:.2})", self.name, self.age, self.gpa)\n    }\n}\n\n// Enum with data\nenum Shape {\n    Circle(f64),           // radius\n    Rectangle(f64, f64),   // width, height\n    Triangle { base: f64, height: f64 },\n}\n\nimpl Shape {\n    fn area(&self) -> f64 {\n        match self {\n            Shape::Circle(r) => std::f64::consts::PI * r * r,\n            Shape::Rectangle(w, h) => w * h,\n            Shape::Triangle { base, height } => 0.5 * base * height,\n        }\n    }\n}\n\nlet shapes = vec![\n    Shape::Circle(5.0),\n    Shape::Rectangle(4.0, 6.0),\n];\nfor s in &shapes {\n    println!("Area: {:.2}", s.area());\n}', explanation: "Structs with methods and enums with data — Rust's core data modeling tools." }
      ],
      exercises: [
        { question: "Create a 'Color' enum with RGB(u8,u8,u8) and Hex(String) variants. Implement a to_hex method.", solution: 'enum Color {\n    RGB(u8, u8, u8),\n    Hex(String),\n}\n\nimpl Color {\n    fn to_hex(&self) -> String {\n        match self {\n            Color::RGB(r, g, b) => format!("#{:02X}{:02X}{:02X}", r, g, b),\n            Color::Hex(s) => s.clone(),\n        }\n    }\n}\n\nlet red = Color::RGB(255, 0, 0);\nprintln!("{}", red.to_hex()); // #FF0000', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Rust Book - Structs", url: "https://doc.rust-lang.org/book/ch05-00-structs.html" },
        { title: "Rust Book - Enums", url: "https://doc.rust-lang.org/book/ch06-00-enums.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "rust-4", title: "Error Handling with Result & Option",
      content: "Rust has no exceptions. Instead, it uses Result<T, E> for recoverable errors and panic! for unrecoverable ones. The ? operator propagates errors concisely. Option<T> handles the absence of values (Some(value) or None). Pattern matching with match ensures you handle all cases. Custom error types implement the std::error::Error trait. The thiserror and anyhow crates simplify error handling.",
      codeExamples: [
        { language: "rust", code: 'use std::fs;\nuse std::io;\n\n// Result and ? operator\nfn read_username() -> Result<String, io::Error> {\n    let content = fs::read_to_string("username.txt")?; // ? propagates error\n    Ok(content.trim().to_string())\n}\n\n// Option handling\nfn find_student(name: &str) -> Option<&Student> {\n    students.iter().find(|s| s.name == name)\n}\n\nmatch find_student("Ali") {\n    Some(student) => println!("Found: {}", student.display()),\n    None => println!("Student not found"),\n}\n\n// If let (concise pattern match)\nif let Some(student) = find_student("Sara") {\n    println!("GPA: {:.2}", student.gpa);\n}\n\n// Chaining Option methods\nlet grade = find_student("Ali")\n    .map(|s| s.gpa)\n    .filter(|&gpa| gpa >= 3.5)\n    .map(|_| "Honor Roll")\n    .unwrap_or("Regular");', explanation: "Result for errors, Option for missing values, ? operator, and method chaining." }
      ],
      exercises: [
        { question: "Write a function that parses a config string 'key=value' and returns Result with a custom error.", solution: '#[derive(Debug)]\nenum ConfigError {\n    MissingEquals,\n    EmptyKey,\n    EmptyValue,\n}\n\nimpl std::fmt::Display for ConfigError {\n    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {\n        match self {\n            ConfigError::MissingEquals => write!(f, "Missing = separator"),\n            ConfigError::EmptyKey => write!(f, "Empty key"),\n            ConfigError::EmptyValue => write!(f, "Empty value"),\n        }\n    }\n}\n\nfn parse_config(s: &str) -> Result<(String, String), ConfigError> {\n    let parts: Vec<&str> = s.splitn(2, \'=\').collect();\n    if parts.len() != 2 { return Err(ConfigError::MissingEquals); }\n    if parts[0].trim().is_empty() { return Err(ConfigError::EmptyKey); }\n    if parts[1].trim().is_empty() { return Err(ConfigError::EmptyValue); }\n    Ok((parts[0].trim().to_string(), parts[1].trim().to_string()))\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Rust Book - Error Handling", url: "https://doc.rust-lang.org/book/ch09-00-error-handling.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "rust-5", title: "Collections: Vec, HashMap, String",
      content: "Rust's standard library provides powerful collections. Vec<T> is a growable array. HashMap<K, V> stores key-value pairs. String is a heap-allocated, growable UTF-8 string. Iterators provide functional-style operations (map, filter, fold, collect). Iterator adaptors are lazy — they don't execute until consumed. The collect() method transforms iterators into collections.",
      codeExamples: [
        { language: "rust", code: 'use std::collections::HashMap;\n\n// Vec operations\nlet mut nums: Vec<i32> = vec![1, 2, 3, 4, 5];\nnums.push(6);\nnums.retain(|&x| x % 2 == 0);  // Keep evens: [2, 4, 6]\n\n// Iterator methods\nlet sum: i32 = nums.iter().sum();\nlet doubled: Vec<i32> = nums.iter().map(|x| x * 2).collect();\nlet has_even = nums.iter().any(|x| x % 2 == 0);\n\n// HashMap\nlet mut scores: HashMap<&str, i32> = HashMap::new();\nscores.insert("Ali", 95);\nscores.insert("Sara", 88);\nscores.entry("Ahmed").or_insert(75); // Insert only if absent\n\n// Count word frequencies\nlet text = "hello world hello rust hello";\nlet mut freq: HashMap<&str, i32> = HashMap::new();\nfor word in text.split_whitespace() {\n    *freq.entry(word).or_insert(0) += 1;\n}\n// {"hello": 3, "world": 1, "rust": 1}\n\n// Sort and take top 3\nlet mut top: Vec<_> = freq.into_iter().collect();\ntop.sort_by(|a, b| b.1.cmp(&a.1));\nlet top3: Vec<_> = top.into_iter().take(3).collect();', explanation: "Vec, HashMap, and iterator chains for powerful data processing." }
      ],
      exercises: [
        { question: "Write a function that groups a vector of strings by their first character into a HashMap.", solution: 'fn group_by_first_char(words: Vec<&str>) -> HashMap<char, Vec<&str>> {\n    let mut groups: HashMap<char, Vec<&str>> = HashMap::new();\n    for word in words {\n        if let Some(ch) = word.chars().next() {\n            groups.entry(ch).or_insert_with(Vec::new).push(word);\n        }\n    }\n    groups\n}\n\nlet words = vec!["apple", "banana", "avocado", "blueberry", "cherry"];\nlet grouped = group_by_first_char(words);\n// {\'a\': ["apple", "avocado"], \'b\': ["banana", "blueberry"], \'c\': ["cherry"]}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Rust Book - Collections", url: "https://doc.rust-lang.org/book/ch08-00-common-collections.html" }
      ],
      estimatedMinutes: 25
    },
  ],
  intermediate: [
    {
      id: "rust-6", title: "Traits & Generics",
      content: "Traits define shared behavior — similar to interfaces. Types implement traits to provide specific behavior. Generic functions and structs use type parameters with trait bounds. The impl Trait syntax simplifies function signatures. Trait objects (dyn Trait) enable dynamic dispatch. Derive macros auto-implement common traits like Debug, Clone, PartialEq.",
      codeExamples: [
        { language: "rust", code: '// Define a trait\ntrait Summary {\n    fn summarize(&self) -> String;\n    \n    // Default implementation\n    fn preview(&self) -> String {\n        format!("{}...", &self.summarize()[..20])\n    }\n}\n\nstruct Article {\n    title: String,\n    content: String,\n    author: String,\n}\n\nimpl Summary for Article {\n    fn summarize(&self) -> String {\n        format!("{} by {} - {}", self.title, self.author, &self.content[..50])\n    }\n}\n\n// Generic function with trait bound\nfn print_summary<T: Summary>(item: &T) {\n    println!("{}", item.summarize());\n}\n\n// Multiple trait bounds\nfn compare_and_display<T: PartialOrd + std::fmt::Display>(a: &T, b: &T) {\n    if a > b {\n        println!("{} is greater", a);\n    } else {\n        println!("{} is greater", b);\n    }\n}\n\n// impl Trait in return position\nfn create_summary() -> impl Summary {\n    Article { title: "Rust".into(), content: "Great language...".into(), author: "Ali".into() }\n}', explanation: "Traits for shared behavior and generics for code reuse with type safety." }
      ],
      exercises: [
        { question: "Create a Drawable trait and implement it for Circle and Rectangle. Write a function that draws any Drawable.", solution: 'trait Drawable {\n    fn draw(&self) -> String;\n    fn bounding_box(&self) -> (f64, f64);\n}\n\nstruct Circle { radius: f64 }\nstruct Rectangle { width: f64, height: f64 }\n\nimpl Drawable for Circle {\n    fn draw(&self) -> String { format!("○ (r={})", self.radius) }\n    fn bounding_box(&self) -> (f64, f64) { (self.radius * 2.0, self.radius * 2.0) }\n}\n\nimpl Drawable for Rectangle {\n    fn draw(&self) -> String { format!("□ ({}x{})", self.width, self.height) }\n    fn bounding_box(&self) -> (f64, f64) { (self.width, self.height) }\n}\n\nfn render(shapes: &[&dyn Drawable]) {\n    for shape in shapes {\n        println!("{}", shape.draw());\n    }\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Rust Book - Traits", url: "https://doc.rust-lang.org/book/ch10-02-traits.html" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "rust-7", title: "Lifetimes",
      content: "Lifetimes ensure references are valid for as long as they're used. They prevent dangling references at compile time. Most lifetimes are inferred (lifetime elision), but sometimes you must annotate them explicitly. The lifetime 'a means 'lives at least as long as a'. Lifetime annotations don't change how long values live — they describe the relationship between reference lifetimes.",
      codeExamples: [
        { language: "rust", code: '// Explicit lifetime annotation\nfn longest<\'a>(s1: &\'a str, s2: &\'a str) -> &\'a str {\n    if s1.len() > s2.len() { s1 } else { s2 }\n}\n\nlet result;\n{\n    let s1 = String::from("long string");\n    let s2 = "short";\n    result = longest(s1.as_str(), s2);\n    println!("{}", result); // OK — both s1 and s2 are alive\n}\n// println!("{}", result); // Error if s1 was dropped!\n\n// Lifetime in structs\nstruct Excerpt<\'a> {\n    text: &\'a str,\n}\n\nimpl<\'a> Excerpt<\'a> {\n    fn first_word(&self) -> &str {\n        self.text.split_whitespace().next().unwrap_or("")\n    }\n}\n\nlet novel = String::from("Call me Ishmael. Some years ago...");\nlet excerpt = Excerpt {\n    text: novel.split(\'.\').next().unwrap(),\n};\nprintln!("{}", excerpt.first_word()); // "Call"', explanation: "Lifetimes ensure references don't outlive the data they point to." }
      ],
      exercises: [
        { question: "Fix this code that has a lifetime error: fn first_word(s: &str) -> &str { &s[..s.find(' ').unwrap_or(s.len())] }", solution: '// This actually works because of lifetime elision!\n// The compiler infers the lifetime.\nfn first_word(s: &str) -> &str {\n    let end = s.find(\' \').unwrap_or(s.len());\n    &s[..end]\n}\n\n// Explicit version:\nfn first_word_explicit<\'a>(s: &\'a str) -> &\'a str {\n    let end = s.find(\' \').unwrap_or(s.len());\n    &s[..end]\n}\n\nlet text = String::from("hello world");\nlet word = first_word(&text);\nprintln!("{}", word); // "hello"', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Rust Book - Lifetimes", url: "https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "rust-8", title: "Closures & Iterators",
      content: "Closures are anonymous functions that capture their environment. They can capture by reference (&T), mutable reference (&mut T), or value (T). Iterator trait provides methods like map, filter, fold, zip, chain, enumerate. Iterators are zero-cost abstractions — they compile to the same code as manual loops. The into_iter, iter, and iter_mut methods create different iterator types.",
      codeExamples: [
        { language: "rust", code: '// Closures\nlet add = |a: i32, b: i32| -> i32 { a + b };\nlet double = |x| x * 2;  // Type inferred\n\n// Capturing environment\nlet threshold = 80;\nlet high_scores: Vec<i32> = scores\n    .iter()\n    .filter(|&&s| s >= threshold)  // Captures threshold\n    .copied()\n    .collect();\n\n// Iterator chains\nlet students = vec![\n    ("Ali", 85), ("Sara", 92), ("Ahmed", 78), ("Fatima", 95),\n];\n\nlet honor_roll: Vec<&str> = students.iter()\n    .filter(|(_, grade)| *grade >= 90)\n    .map(|(name, _)| *name)\n    .collect();\n// ["Sara", "Fatima"]\n\n// fold (reduce)\nlet total: i32 = (1..=100).fold(0, |acc, x| acc + x);\n// 5050\n\n// zip two iterators\nlet names = vec!["Ali", "Sara"];\nlet ages = vec![22, 20];\nlet people: Vec<_> = names.iter().zip(ages.iter())\n    .map(|(name, age)| format!("{}: {}", name, age))\n    .collect();', explanation: "Closures capture variables and iterators chain operations efficiently." }
      ],
      exercises: [
        { question: "Use iterators to find the most common character in a string.", solution: 'fn most_common_char(s: &str) -> Option<(char, usize)> {\n    let mut freq: HashMap<char, usize> = HashMap::new();\n    for ch in s.chars().filter(|c| !c.is_whitespace()) {\n        *freq.entry(ch).or_insert(0) += 1;\n    }\n    freq.into_iter().max_by_key(|&(_, count)| count)\n}\n\nif let Some((ch, count)) = most_common_char("hello world") {\n    println!("Most common: \'{}\' ({} times)", ch, count);\n    // Most common: \'l\' (3 times)\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Rust Book - Closures", url: "https://doc.rust-lang.org/book/ch13-01-closures.html" },
        { title: "Rust Book - Iterators", url: "https://doc.rust-lang.org/book/ch13-02-iterators.html" }
      ],
      estimatedMinutes: 25
    },
  ],
  hard: [
    {
      id: "rust-9", title: "Smart Pointers & Unsafe Rust",
      content: "Smart pointers own the data they point to. Box<T> allocates on the heap. Rc<T> enables multiple ownership with reference counting. RefCell<T> provides interior mutability (runtime borrow checking). Arc<T> is Rc for multi-threaded contexts. Unsafe Rust allows: dereferencing raw pointers, calling unsafe functions, accessing mutable statics, and implementing unsafe traits. Use unsafe minimally and wrap it in safe abstractions.",
      codeExamples: [
        { language: "rust", code: 'use std::rc::Rc;\nuse std::cell::RefCell;\n\n// Box — heap allocation\nlet boxed: Box<i32> = Box::new(42);\n\n// Rc — multiple ownership\nlet shared = Rc::new(vec![1, 2, 3]);\nlet clone1 = Rc::clone(&shared);\nlet clone2 = Rc::clone(&shared);\nprintln!("Reference count: {}", Rc::strong_count(&shared)); // 3\n\n// RefCell — interior mutability\nlet data = RefCell::new(vec![1, 2, 3]);\ndata.borrow_mut().push(4); // Mutable borrow at runtime\nprintln!("{:?}", data.borrow()); // [1, 2, 3, 4]\n\n// Rc<RefCell<T>> — shared mutable state\nlet shared_list = Rc::new(RefCell::new(Vec::new()));\n{\n    let list = Rc::clone(&shared_list);\n    list.borrow_mut().push("hello");\n}\nshared_list.borrow_mut().push("world");\nprintln!("{:?}", shared_list.borrow()); // ["hello", "world"]\n\n// Unsafe Rust (use sparingly!)\nunsafe {\n    let raw_ptr: *const i32 = &42;\n    println!("Value: {}", *raw_ptr); // Dereference raw pointer\n}', explanation: "Smart pointers for memory management and unsafe blocks for low-level operations." }
      ],
      exercises: [
        { question: "Implement a simple linked list using Box<T> for heap allocation.", solution: '#[derive(Debug)]\nenum List<T> {\n    Cons(T, Box<List<T>>),\n    Nil,\n}\n\nimpl<T: std::fmt::Debug> List<T> {\n    fn new() -> Self { List::Nil }\n    \n    fn push(self, value: T) -> Self {\n        List::Cons(value, Box::new(self))\n    }\n    \n    fn len(&self) -> usize {\n        match self {\n            List::Nil => 0,\n            List::Cons(_, next) => 1 + next.len(),\n        }\n    }\n}\n\nlet list = List::new().push(1).push(2).push(3);\nprintln!("{:?}, length: {}", list, list.len());', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Rust Book - Smart Pointers", url: "https://doc.rust-lang.org/book/ch15-00-smart-pointers.html" },
        { title: "Rust Book - Unsafe", url: "https://doc.rust-lang.org/book/ch19-01-unsafe-rust.html" }
      ],
      estimatedMinutes: 35
    },
    {
      id: "rust-10", title: "Concurrency in Rust",
      content: "Rust prevents data races at compile time through its ownership system. Threads are created with std::thread::spawn. Message passing uses channels (mpsc). Shared state uses Mutex<T> and Arc<T>. The Send trait means a type can be transferred between threads. Sync means a type can be shared between threads. Async/await with tokio provides efficient async I/O.",
      codeExamples: [
        { language: "rust", code: 'use std::sync::{Arc, Mutex};\nuse std::thread;\n\n// Thread-safe shared counter\nlet counter = Arc::new(Mutex::new(0));\nlet mut handles = vec![];\n\nfor _ in 0..10 {\n    let counter = Arc::clone(&counter);\n    let handle = thread::spawn(move || {\n        let mut num = counter.lock().unwrap();\n        *num += 1;\n    });\n    handles.push(handle);\n}\n\nfor handle in handles {\n    handle.join().unwrap();\n}\nprintln!("Count: {}", *counter.lock().unwrap()); // 10\n\n// Message passing with channels\nuse std::sync::mpsc;\n\nlet (tx, rx) = mpsc::channel();\n\nfor i in 0..5 {\n    let tx = tx.clone();\n    thread::spawn(move || {\n        tx.send(format!("Message {}", i)).unwrap();\n    });\n}\ndrop(tx); // Close sender\n\nfor msg in rx {\n    println!("Received: {}", msg);\n}', explanation: "Thread-safe concurrency with Arc<Mutex<T>> and channels for message passing." }
      ],
      exercises: [
        { question: "Create a parallel map function that processes each element in a separate thread.", solution: 'fn parallel_map<T, U, F>(data: Vec<T>, f: F) -> Vec<U>\nwhere\n    T: Send + \'static,\n    U: Send + \'static,\n    F: Fn(T) -> U + Send + Sync + \'static,\n{\n    let f = Arc::new(f);\n    let handles: Vec<_> = data\n        .into_iter()\n        .map(|item| {\n            let f = Arc::clone(&f);\n            thread::spawn(move || f(item))\n        })\n        .collect();\n    \n    handles.into_iter().map(|h| h.join().unwrap()).collect()\n}\n\nlet nums = vec![1, 2, 3, 4, 5];\nlet squares = parallel_map(nums, |x| x * x);\nprintln!("{:?}", squares); // [1, 4, 9, 16, 25]', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Rust Book - Concurrency", url: "https://doc.rust-lang.org/book/ch16-00-concurrency.html" },
        { title: "Tokio Tutorial", url: "https://tokio.rs/tokio/tutorial" }
      ],
      estimatedMinutes: 35
    },
  ],
};
