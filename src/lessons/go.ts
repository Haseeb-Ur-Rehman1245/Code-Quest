import { CourseLessons } from "./types";

export const goLessons: CourseLessons = {
  easy: [
    {
      id: "go-1", title: "Introduction to Go",
      content: "Go (Golang) was created at Google by Robert Griesemer, Rob Pike, and Ken Thompson. It's a statically typed, compiled language designed for simplicity, concurrency, and performance. Go compiles to a single binary with no dependencies, has a built-in garbage collector, and excels at networked services and concurrent programming. Its philosophy: 'Less is more' — Go deliberately omits features like classes, generics inheritance, and exceptions in favor of simplicity.",
      codeExamples: [
        { language: "go", code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Variables\n    var name string = "Ali"\n    age := 22                    // Short declaration (type inferred)\n    var gpa float64 = 3.85\n    isStudent := true\n\n    fmt.Println("Name:", name)\n    fmt.Printf("Age: %d, GPA: %.2f\\n", age, gpa)\n    fmt.Printf("Student: %t\\n", isStudent)\n\n    // Constants\n    const pi = 3.14159\n    const appName = "LearnGo"\n\n    // Multiple variables\n    var (\n        width  = 100\n        height = 200\n    )\n    fmt.Println("Area:", width*height)\n}', explanation: "Go basics: packages, imports, variables with := short declaration, and Printf formatting." },
        { language: "go", code: '// Data types\nvar (\n    b    bool    = true\n    i    int     = 42\n    f    float64 = 3.14\n    s    string  = "hello"\n    r    rune    = \'A\'    // Unicode code point (alias for int32)\n    by   byte    = 255   // alias for uint8\n)\n\n// Zero values (Go initializes variables)\nvar zeroInt int       // 0\nvar zeroStr string    // ""\nvar zeroBool bool     // false\nvar zeroPtr *int      // nil\n\n// Type conversion (explicit only)\nvar x int = 42\nvar y float64 = float64(x)\nvar z string = fmt.Sprintf("%d", x)', explanation: "Go data types, zero values, and explicit type conversion." }
      ],
      exercises: [
        { question: "Write a Go program that calculates and prints the area and circumference of a circle given a radius.", solution: 'package main\n\nimport (\n    "fmt"\n    "math"\n)\n\nfunc main() {\n    radius := 5.0\n    area := math.Pi * radius * radius\n    circumference := 2 * math.Pi * radius\n    fmt.Printf("Radius: %.1f\\n", radius)\n    fmt.Printf("Area: %.2f\\n", area)\n    fmt.Printf("Circumference: %.2f\\n", circumference)\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Go Tour", url: "https://go.dev/tour/" },
        { title: "Go by Example", url: "https://gobyexample.com/" },
        { title: "W3Schools Go Tutorial", url: "https://www.w3schools.com/go/" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "go-2", title: "Control Flow & Functions",
      content: "Go has if/else, for (the only loop), switch, and select (for channels). For loops cover all iteration: traditional, while-style, infinite, and range-based. Functions are first-class citizens. Go supports multiple return values, named returns, variadic functions, and closures. Error handling uses the (result, error) pattern — no exceptions. Defer schedules a function call to run when the surrounding function returns.",
      codeExamples: [
        { language: "go", code: '// For loop (the ONLY loop in Go)\nfor i := 0; i < 5; i++ {\n    fmt.Println(i)\n}\n\n// While-style\nn := 10\nfor n > 0 {\n    n--\n}\n\n// Range loop\nfruits := []string{"apple", "banana", "cherry"}\nfor index, fruit := range fruits {\n    fmt.Printf("%d: %s\\n", index, fruit)\n}\n\n// Functions with multiple returns\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, fmt.Errorf("cannot divide by zero")\n    }\n    return a / b, nil\n}\n\nresult, err := divide(10, 3)\nif err != nil {\n    fmt.Println("Error:", err)\n} else {\n    fmt.Printf("Result: %.2f\\n", result)\n}\n\n// Defer (runs when function exits)\nfunc readFile(name string) {\n    f, _ := os.Open(name)\n    defer f.Close() // Always closes, even on error\n    // Read file...\n}', explanation: "Go loops, multi-return functions, error handling pattern, and defer." }
      ],
      exercises: [
        { question: "Write a function that returns both the quotient and remainder of integer division.", solution: 'func divmod(a, b int) (quotient, remainder int, err error) {\n    if b == 0 {\n        return 0, 0, fmt.Errorf("division by zero")\n    }\n    return a / b, a % b, nil\n}\n\nq, r, err := divmod(17, 5)\nif err != nil {\n    fmt.Println(err)\n} else {\n    fmt.Printf("17 / 5 = %d remainder %d\\n", q, r)\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Go Control Structures", url: "https://gobyexample.com/if-else" },
        { title: "Go Functions", url: "https://gobyexample.com/functions" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "go-3", title: "Slices, Maps & Structs",
      content: "Slices are Go's dynamic arrays — they're more flexible than arrays. Maps are hash tables (key-value pairs). Structs are typed collections of fields, serving as Go's primary data structuring mechanism (Go has no classes). Slices are references to underlying arrays. Maps must be initialized with make(). Struct methods are defined outside the struct using receiver functions.",
      codeExamples: [
        { language: "go", code: '// Slices\nnums := []int{1, 2, 3, 4, 5}\nnums = append(nums, 6, 7)\nfmt.Println(nums[:3])    // [1 2 3]\nfmt.Println(len(nums))   // 7\n\n// Maps\nages := map[string]int{\n    "Ali":   22,\n    "Sara":  20,\n    "Ahmed": 25,\n}\nages["Fatima"] = 23\ndelete(ages, "Ahmed")\n\nif age, ok := ages["Ali"]; ok {\n    fmt.Println("Ali is", age)\n}\n\n// Structs\ntype Student struct {\n    Name   string\n    Age    int\n    GPA    float64\n    Courses []string\n}\n\n// Method on struct\nfunc (s Student) IsHonorRoll() bool {\n    return s.GPA >= 3.5\n}\n\nstudent := Student{\n    Name: "Ali",\n    Age:  22,\n    GPA:  3.85,\n    Courses: []string{"Go", "Algorithms"},\n}\nfmt.Println(student.IsHonorRoll()) // true', explanation: "Core Go data structures: slices, maps, structs with methods." }
      ],
      exercises: [
        { question: "Create a 'Counter' struct with methods to increment, decrement, and get the value.", solution: 'type Counter struct {\n    value int\n}\n\nfunc (c *Counter) Increment() { c.value++ }\nfunc (c *Counter) Decrement() { c.value-- }\nfunc (c Counter) Value() int  { return c.value }\n\nfunc (c Counter) String() string {\n    return fmt.Sprintf("Counter(%d)", c.value)\n}\n\nc := &Counter{}\nc.Increment()\nc.Increment()\nc.Decrement()\nfmt.Println(c) // Counter(1)', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Go Slices", url: "https://gobyexample.com/slices" },
        { title: "Go Maps", url: "https://gobyexample.com/maps" },
        { title: "Go Structs", url: "https://gobyexample.com/structs" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "go-4", title: "Interfaces & Polymorphism",
      content: "Go interfaces are implicit — a type implements an interface by implementing its methods, no 'implements' keyword needed. This is called 'structural typing' or 'duck typing.' The empty interface (interface{} or 'any' in Go 1.18+) accepts any value. Interface composition builds complex interfaces from simple ones. This design promotes loose coupling and testability.",
      codeExamples: [
        { language: "go", code: '// Interface definition\ntype Shape interface {\n    Area() float64\n    Perimeter() float64\n}\n\ntype Circle struct { Radius float64 }\ntype Rectangle struct { Width, Height float64 }\n\n// Circle implements Shape (implicitly)\nfunc (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }\nfunc (c Circle) Perimeter() float64  { return 2 * math.Pi * c.Radius }\n\n// Rectangle implements Shape (implicitly)\nfunc (r Rectangle) Area() float64      { return r.Width * r.Height }\nfunc (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }\n\n// Polymorphic function\nfunc printShape(s Shape) {\n    fmt.Printf("Area: %.2f, Perimeter: %.2f\\n", s.Area(), s.Perimeter())\n}\n\nprintShape(Circle{Radius: 5})\nprintShape(Rectangle{Width: 4, Height: 6})\n\n// Type assertion\nvar s Shape = Circle{Radius: 5}\nif c, ok := s.(Circle); ok {\n    fmt.Println("Radius:", c.Radius)\n}', explanation: "Implicit interface implementation and polymorphism in Go." }
      ],
      exercises: [
        { question: "Create a Stringer interface and implement it for different types to format output.", solution: 'type Stringer interface {\n    String() string\n}\n\ntype Person struct {\n    Name string\n    Age  int\n}\n\nfunc (p Person) String() string {\n    return fmt.Sprintf("%s (%d years)", p.Name, p.Age)\n}\n\ntype Point struct {\n    X, Y float64\n}\n\nfunc (p Point) String() string {\n    return fmt.Sprintf("(%.1f, %.1f)", p.X, p.Y)\n}\n\nthings := []Stringer{\n    Person{"Ali", 22},\n    Point{3.5, 7.2},\n}\nfor _, t := range things {\n    fmt.Println(t)\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Go Interfaces", url: "https://gobyexample.com/interfaces" },
        { title: "Effective Go - Interfaces", url: "https://go.dev/doc/effective_go#interfaces" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "go-5", title: "Error Handling",
      content: "Go uses explicit error handling with the (value, error) return pattern. The error interface has one method: Error() string. Create custom errors with fmt.Errorf, errors.New, or custom error types. errors.Is and errors.As check error types in chains. errors.Join combines multiple errors. Sentinel errors (like io.EOF) represent specific conditions. This approach forces developers to handle errors immediately.",
      codeExamples: [
        { language: "go", code: 'import (\n    "errors"\n    "fmt"\n)\n\n// Custom error type\ntype ValidationError struct {\n    Field   string\n    Message string\n}\n\nfunc (e *ValidationError) Error() string {\n    return fmt.Sprintf("%s: %s", e.Field, e.Message)\n}\n\n// Wrapping errors\nfunc parseAge(s string) (int, error) {\n    age, err := strconv.Atoi(s)\n    if err != nil {\n        return 0, fmt.Errorf("parseAge: %w", err) // %w wraps error\n    }\n    if age < 0 || age > 150 {\n        return 0, &ValidationError{Field: "age", Message: "must be 0-150"}\n    }\n    return age, nil\n}\n\n// Checking error types\nage, err := parseAge("abc")\nif err != nil {\n    var ve *ValidationError\n    if errors.As(err, &ve) {\n        fmt.Println("Validation:", ve.Field, ve.Message)\n    } else {\n        fmt.Println("Parse error:", err)\n    }\n}', explanation: "Go error handling with custom types, wrapping, and errors.As." }
      ],
      exercises: [
        { question: "Create a function that validates user input (name, email, age) and returns all validation errors at once.", solution: 'func validateUser(name, email string, age int) error {\n    var errs []error\n    if len(name) < 2 {\n        errs = append(errs, &ValidationError{"name", "must be at least 2 chars"})\n    }\n    if !strings.Contains(email, "@") {\n        errs = append(errs, &ValidationError{"email", "invalid format"})\n    }\n    if age < 0 || age > 150 {\n        errs = append(errs, &ValidationError{"age", "must be 0-150"})\n    }\n    if len(errs) > 0 {\n        return errors.Join(errs...)\n    }\n    return nil\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "Go Error Handling", url: "https://gobyexample.com/errors" },
        { title: "Go Blog - Errors", url: "https://go.dev/blog/go1.13-errors" }
      ],
      estimatedMinutes: 20
    },
  ],
  intermediate: [
    {
      id: "go-6", title: "Goroutines & Concurrency",
      content: "Goroutines are lightweight threads managed by the Go runtime. Start one with the 'go' keyword. They're extremely cheap — you can run millions. Channels communicate between goroutines. Unbuffered channels block until both sender and receiver are ready. Buffered channels have capacity. The select statement handles multiple channel operations. WaitGroups coordinate goroutine completion.",
      codeExamples: [
        { language: "go", code: '// Goroutines\nfunc fetchURL(url string, ch chan<- string) {\n    resp, err := http.Get(url)\n    if err != nil {\n        ch <- fmt.Sprintf("Error: %s", url)\n        return\n    }\n    defer resp.Body.Close()\n    ch <- fmt.Sprintf("%s: %d", url, resp.StatusCode)\n}\n\nfunc main() {\n    urls := []string{\n        "https://golang.org",\n        "https://github.com",\n        "https://google.com",\n    }\n\n    ch := make(chan string)\n    for _, url := range urls {\n        go fetchURL(url, ch) // Launch goroutine\n    }\n\n    // Receive results\n    for range urls {\n        fmt.Println(<-ch)\n    }\n}\n\n// Select statement\nselect {\ncase msg := <-ch1:\n    fmt.Println("ch1:", msg)\ncase msg := <-ch2:\n    fmt.Println("ch2:", msg)\ncase <-time.After(3 * time.Second):\n    fmt.Println("timeout")\n}', explanation: "Goroutines for concurrent URL fetching and select for channel multiplexing." }
      ],
      exercises: [
        { question: "Write a pipeline that generates numbers, filters evens, and squares them using channels.", solution: 'func generate(max int) <-chan int {\n    ch := make(chan int)\n    go func() {\n        for i := 1; i <= max; i++ { ch <- i }\n        close(ch)\n    }()\n    return ch\n}\n\nfunc filterEven(in <-chan int) <-chan int {\n    ch := make(chan int)\n    go func() {\n        for n := range in {\n            if n%2 == 0 { ch <- n }\n        }\n        close(ch)\n    }()\n    return ch\n}\n\nfunc square(in <-chan int) <-chan int {\n    ch := make(chan int)\n    go func() {\n        for n := range in { ch <- n * n }\n        close(ch)\n    }()\n    return ch\n}\n\nfor v := range square(filterEven(generate(10))) {\n    fmt.Println(v) // 4, 16, 36, 64, 100\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Go Concurrency", url: "https://gobyexample.com/goroutines" },
        { title: "Go Channels", url: "https://gobyexample.com/channels" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "go-7", title: "Generics (Go 1.18+)",
      content: "Go 1.18 introduced generics with type parameters. Type constraints define what operations are allowed on generic types. The 'comparable' constraint allows == and !=. The 'any' constraint allows any type. Custom constraints use interfaces. The constraints package provides Ordered, Signed, Unsigned, etc. Generics eliminate the need for interface{} in many cases.",
      codeExamples: [
        { language: "go", code: '// Generic function\nfunc Map[T any, U any](slice []T, fn func(T) U) []U {\n    result := make([]U, len(slice))\n    for i, v := range slice {\n        result[i] = fn(v)\n    }\n    return result\n}\n\nnums := []int{1, 2, 3, 4, 5}\ndoubled := Map(nums, func(n int) int { return n * 2 })\n// [2, 4, 6, 8, 10]\n\nstrings := Map(nums, func(n int) string { return fmt.Sprintf("#%d", n) })\n// ["#1", "#2", "#3", "#4", "#5"]\n\n// Generic constraint\ntype Number interface {\n    ~int | ~int32 | ~int64 | ~float32 | ~float64\n}\n\nfunc Sum[T Number](nums []T) T {\n    var total T\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}\n\nfmt.Println(Sum([]int{1, 2, 3}))         // 6\nfmt.Println(Sum([]float64{1.5, 2.5}))    // 4.0', explanation: "Generic functions with type parameters and custom constraints." }
      ],
      exercises: [
        { question: "Write a generic Filter function that works with any slice type and a predicate function.", solution: 'func Filter[T any](slice []T, predicate func(T) bool) []T {\n    var result []T\n    for _, v := range slice {\n        if predicate(v) {\n            result = append(result, v)\n        }\n    }\n    return result\n}\n\nnums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}\nevens := Filter(nums, func(n int) bool { return n%2 == 0 })\nfmt.Println(evens) // [2, 4, 6, 8, 10]\n\nwords := []string{"go", "rust", "python", "c"}\nlong := Filter(words, func(s string) bool { return len(s) > 2 })\nfmt.Println(long) // [rust, python]', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Go Generics Tutorial", url: "https://go.dev/doc/tutorial/generics" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "go-8", title: "HTTP Servers & REST APIs",
      content: "Go's net/http package provides a powerful built-in HTTP server. http.HandleFunc registers route handlers. The http.Request contains method, URL, headers, and body. http.ResponseWriter sends responses. For production APIs, use a router like chi or gorilla/mux for path parameters and middleware. JSON encoding/decoding uses encoding/json with struct tags.",
      codeExamples: [
        { language: "go", code: 'package main\n\nimport (\n    "encoding/json"\n    "net/http"\n)\n\ntype Book struct {\n    ID     string `json:"id"`\n    Title  string `json:"title"`\n    Author string `json:"author"`\n}\n\nvar books = []Book{\n    {ID: "1", Title: "Clean Code", Author: "Robert Martin"},\n    {ID: "2", Title: "The Go Programming Language", Author: "Donovan & Kernighan"},\n}\n\nfunc booksHandler(w http.ResponseWriter, r *http.Request) {\n    w.Header().Set("Content-Type", "application/json")\n    \n    switch r.Method {\n    case "GET":\n        json.NewEncoder(w).Encode(books)\n    case "POST":\n        var book Book\n        json.NewDecoder(r.Body).Decode(&book)\n        books = append(books, book)\n        w.WriteHeader(http.StatusCreated)\n        json.NewEncoder(w).Encode(book)\n    default:\n        w.WriteHeader(http.StatusMethodNotAllowed)\n    }\n}\n\nfunc main() {\n    http.HandleFunc("/api/books", booksHandler)\n    http.ListenAndServe(":8080", nil)\n}', explanation: "REST API with Go's standard library — GET and POST handlers with JSON." }
      ],
      exercises: [
        { question: "Build a simple key-value store HTTP API with GET, PUT, and DELETE endpoints.", solution: 'var store = map[string]string{}\nvar mu sync.RWMutex\n\nfunc kvHandler(w http.ResponseWriter, r *http.Request) {\n    key := strings.TrimPrefix(r.URL.Path, "/kv/")\n    w.Header().Set("Content-Type", "application/json")\n    \n    switch r.Method {\n    case "GET":\n        mu.RLock()\n        val, ok := store[key]\n        mu.RUnlock()\n        if !ok { w.WriteHeader(404); return }\n        json.NewEncoder(w).Encode(map[string]string{"key": key, "value": val})\n    case "PUT":\n        var body map[string]string\n        json.NewDecoder(r.Body).Decode(&body)\n        mu.Lock()\n        store[key] = body["value"]\n        mu.Unlock()\n        w.WriteHeader(201)\n    case "DELETE":\n        mu.Lock()\n        delete(store, key)\n        mu.Unlock()\n        w.WriteHeader(204)\n    }\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Go HTTP Server", url: "https://gobyexample.com/http-servers" },
        { title: "Go net/http Package", url: "https://pkg.go.dev/net/http" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "go-9", title: "Testing in Go",
      content: "Go has built-in testing support with the testing package. Test files end with _test.go. Test functions start with Test and take *testing.T. Table-driven tests are idiomatic Go. Benchmarks start with Benchmark and use *testing.B. Run tests with 'go test'. The testify package adds assertions. Use interfaces and dependency injection for testable code.",
      codeExamples: [
        { language: "go", code: '// math.go\nfunc Add(a, b int) int { return a + b }\nfunc Divide(a, b float64) (float64, error) {\n    if b == 0 { return 0, errors.New("division by zero") }\n    return a / b, nil\n}\n\n// math_test.go\nfunc TestAdd(t *testing.T) {\n    // Table-driven test\n    tests := []struct {\n        name     string\n        a, b     int\n        expected int\n    }{\n        {"positive", 2, 3, 5},\n        {"negative", -1, -2, -3},\n        {"zero", 0, 0, 0},\n        {"mixed", -5, 10, 5},\n    }\n\n    for _, tc := range tests {\n        t.Run(tc.name, func(t *testing.T) {\n            result := Add(tc.a, tc.b)\n            if result != tc.expected {\n                t.Errorf("Add(%d, %d) = %d, want %d", tc.a, tc.b, result, tc.expected)\n            }\n        })\n    }\n}\n\nfunc TestDivideByZero(t *testing.T) {\n    _, err := Divide(10, 0)\n    if err == nil {\n        t.Error("expected error for division by zero")\n    }\n}', explanation: "Idiomatic Go testing with table-driven tests and subtests." }
      ],
      exercises: [
        { question: "Write table-driven tests for a function that validates email addresses.", solution: 'func TestValidateEmail(t *testing.T) {\n    tests := []struct {\n        email string\n        valid bool\n    }{\n        {"user@example.com", true},\n        {"user@.com", false},\n        {"@example.com", false},\n        {"user@example", false},\n        {"", false},\n        {"a@b.co", true},\n    }\n\n    for _, tc := range tests {\n        t.Run(tc.email, func(t *testing.T) {\n            result := ValidateEmail(tc.email)\n            if result != tc.valid {\n                t.Errorf("ValidateEmail(%q) = %v, want %v", tc.email, result, tc.valid)\n            }\n        })\n    }\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "Go Testing", url: "https://gobyexample.com/testing" },
        { title: "Go Test Package", url: "https://pkg.go.dev/testing" }
      ],
      estimatedMinutes: 25
    },
  ],
  hard: [
    {
      id: "go-10", title: "Advanced Concurrency Patterns",
      content: "Advanced Go concurrency includes worker pools, fan-in/fan-out, pipeline patterns, context for cancellation, and the sync package (Mutex, RWMutex, Once, Pool). Context carries deadlines, cancellation signals, and request-scoped values across goroutines. The errgroup package coordinates goroutines that return errors. These patterns are essential for building production Go services.",
      codeExamples: [
        { language: "go", code: '// Worker pool pattern\nfunc workerPool(jobs <-chan int, results chan<- int, numWorkers int) {\n    var wg sync.WaitGroup\n    for i := 0; i < numWorkers; i++ {\n        wg.Add(1)\n        go func(id int) {\n            defer wg.Done()\n            for job := range jobs {\n                result := job * job // Process job\n                results <- result\n            }\n        }(i)\n    }\n    wg.Wait()\n    close(results)\n}\n\n// Context for cancellation\nfunc fetchWithTimeout(ctx context.Context, url string) (string, error) {\n    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)\n    defer cancel()\n\n    req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)\n    resp, err := http.DefaultClient.Do(req)\n    if err != nil {\n        return "", err\n    }\n    defer resp.Body.Close()\n    body, _ := io.ReadAll(resp.Body)\n    return string(body), nil\n}', explanation: "Worker pool for parallelism and context for timeout/cancellation." }
      ],
      exercises: [
        { question: "Implement a rate limiter using a ticker and channel.", solution: 'type RateLimiter struct {\n    tokens chan struct{}\n}\n\nfunc NewRateLimiter(rate int, interval time.Duration) *RateLimiter {\n    rl := &RateLimiter{tokens: make(chan struct{}, rate)}\n    // Fill initial tokens\n    for i := 0; i < rate; i++ {\n        rl.tokens <- struct{}{}\n    }\n    // Refill periodically\n    go func() {\n        ticker := time.NewTicker(interval / time.Duration(rate))\n        for range ticker.C {\n            select {\n            case rl.tokens <- struct{}{}:\n            default: // Full, skip\n            }\n        }\n    }()\n    return rl\n}\n\nfunc (rl *RateLimiter) Wait() {\n    <-rl.tokens\n}', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Go Concurrency Patterns", url: "https://go.dev/blog/pipelines" },
        { title: "Go Context", url: "https://gobyexample.com/context" }
      ],
      estimatedMinutes: 35
    },
    {
      id: "go-11", title: "Building Production Services",
      content: "Production Go services need graceful shutdown, structured logging, metrics, health checks, configuration management, and proper error handling. Use signal.NotifyContext for graceful shutdown. Structured logging with slog (Go 1.21). Environment-based configuration. Middleware chains for HTTP servers. Database connection pooling with database/sql.",
      codeExamples: [
        { language: "go", code: 'func main() {\n    // Graceful shutdown\n    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)\n    defer stop()\n\n    // Structured logging (Go 1.21+)\n    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))\n    slog.SetDefault(logger)\n\n    // Setup server\n    mux := http.NewServeMux()\n    mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {\n        w.WriteHeader(200)\n        w.Write([]byte(`{"status":"ok"}`))\n    })\n\n    server := &http.Server{\n        Addr:         ":8080",\n        Handler:      mux,\n        ReadTimeout:  10 * time.Second,\n        WriteTimeout: 10 * time.Second,\n    }\n\n    // Start server\n    go func() {\n        slog.Info("server starting", "addr", server.Addr)\n        if err := server.ListenAndServe(); err != http.ErrServerClosed {\n            slog.Error("server error", "err", err)\n        }\n    }()\n\n    // Wait for shutdown signal\n    <-ctx.Done()\n    slog.Info("shutting down...")\n    shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)\n    defer cancel()\n    server.Shutdown(shutdownCtx)\n}', explanation: "Production-ready Go service with graceful shutdown and structured logging." }
      ],
      exercises: [
        { question: "Create middleware for logging, recovery (panic handling), and request ID injection.", solution: 'func loggingMiddleware(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        start := time.Now()\n        next.ServeHTTP(w, r)\n        slog.Info("request",\n            "method", r.Method,\n            "path", r.URL.Path,\n            "duration", time.Since(start),\n        )\n    })\n}\n\nfunc recoveryMiddleware(next http.Handler) http.Handler {\n    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {\n        defer func() {\n            if err := recover(); err != nil {\n                slog.Error("panic recovered", "err", err)\n                http.Error(w, "Internal Server Error", 500)\n            }\n        }()\n        next.ServeHTTP(w, r)\n    })\n}', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Effective Go", url: "https://go.dev/doc/effective_go" },
        { title: "Go Production Patterns", url: "https://go.dev/blog/context" }
      ],
      estimatedMinutes: 30
    },
  ],
};
