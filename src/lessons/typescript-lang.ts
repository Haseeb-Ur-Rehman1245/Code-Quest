import { CourseLessons } from "./types";

export const typescriptLessons: CourseLessons = {
  easy: [
    {
      id: "ts-1", title: "Introduction to TypeScript",
      content: "TypeScript is a superset of JavaScript that adds static typing. Created by Microsoft, it compiles to plain JavaScript and works everywhere JS runs. TypeScript catches errors at compile time instead of runtime, provides better IDE support with autocompletion, and makes large codebases easier to maintain. Every valid JavaScript file is also valid TypeScript, making migration gradual.",
      codeExamples: [
        { language: "typescript", code: '// Basic types\nlet name: string = "Ali";\nlet age: number = 22;\nlet isStudent: boolean = true;\nlet scores: number[] = [85, 92, 78];\nlet tuple: [string, number] = ["Ali", 22];\n\n// Type inference (TS figures out the type)\nlet city = "Karachi"; // inferred as string\n// city = 42; // Error! Type number is not assignable to type string\n\n// Any (escape hatch — avoid when possible)\nlet data: any = "hello";\ndata = 42; // No error, but loses type safety\n\n// Unknown (safer than any)\nlet input: unknown = getUserInput();\nif (typeof input === "string") {\n  console.log(input.toUpperCase()); // OK after type check\n}', explanation: "TypeScript basic types, inference, and the difference between any and unknown." },
        { language: "typescript", code: '// Function types\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\n// Arrow function with types\nconst add = (a: number, b: number): number => a + b;\n\n// Optional parameters\nfunction createUser(name: string, age?: number): string {\n  return age ? `${name} (${age})` : name;\n}\n\n// Default parameters\nfunction paginate(page: number = 1, limit: number = 10): string {\n  return `Page ${page}, showing ${limit} items`;\n}\n\n// Void return type\nfunction log(message: string): void {\n  console.log(message);\n}', explanation: "Function type annotations with optional and default parameters." }
      ],
      exercises: [
        { question: "Write a typed function that takes an array of numbers and returns an object with min, max, and average.", solution: 'function analyzeNumbers(nums: number[]): { min: number; max: number; average: number } {\n  const min = Math.min(...nums);\n  const max = Math.max(...nums);\n  const average = nums.reduce((a, b) => a + b, 0) / nums.length;\n  return { min, max, average };\n}\n\nconst result = analyzeNumbers([4, 8, 15, 16, 23, 42]);\nconsole.log(result); // { min: 4, max: 42, average: 18 }', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/" },
        { title: "W3Schools TypeScript", url: "https://www.w3schools.com/typescript/" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "ts-2", title: "Interfaces & Type Aliases",
      content: "Interfaces define object shapes — they describe what properties and methods an object must have. Type aliases create custom type names for any type. Interfaces can be extended (inheritance) and merged (declaration merging). Types support unions and intersections. Use interfaces for object shapes you might extend; use types for unions, intersections, and primitive aliases.",
      codeExamples: [
        { language: "typescript", code: '// Interface\ninterface User {\n  name: string;\n  email: string;\n  age?: number;        // Optional\n  readonly id: string; // Cannot be changed after creation\n}\n\n// Extending interfaces\ninterface Student extends User {\n  gpa: number;\n  courses: string[];\n}\n\nconst student: Student = {\n  id: "s001",\n  name: "Ali",\n  email: "ali@email.com",\n  gpa: 3.8,\n  courses: ["TypeScript", "React"]\n};\n\n// Type alias\ntype ID = string | number;\ntype Point = { x: number; y: number };\ntype Status = "active" | "inactive" | "banned"; // Literal types\n\nconst userId: ID = "abc123";\nconst status: Status = "active";\n// const bad: Status = "unknown"; // Error!', explanation: "Interfaces for object shapes and type aliases for unions and custom types." }
      ],
      exercises: [
        { question: "Define interfaces for a blog system: Post, Author, and Comment. Create a sample blog post.", solution: 'interface Author {\n  id: string;\n  name: string;\n  avatar?: string;\n}\n\ninterface Comment {\n  id: string;\n  author: Author;\n  text: string;\n  createdAt: Date;\n}\n\ninterface Post {\n  id: string;\n  title: string;\n  content: string;\n  author: Author;\n  tags: string[];\n  comments: Comment[];\n  published: boolean;\n}\n\nconst post: Post = {\n  id: "1",\n  title: "Learning TypeScript",\n  content: "TypeScript is amazing...",\n  author: { id: "a1", name: "Ali" },\n  tags: ["typescript", "programming"],\n  comments: [],\n  published: true\n};', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "TS Handbook - Interfaces", url: "https://www.typescriptlang.org/docs/handbook/2/objects.html" }
      ],
      estimatedMinutes: 20
    },
    {
      id: "ts-3", title: "Union & Intersection Types",
      content: "Union types (A | B) allow a value to be one of several types. Intersection types (A & B) combine multiple types into one. Use type narrowing (typeof, instanceof, in operator) to safely work with union types. Discriminated unions use a common literal property to distinguish between types. These are powerful tools for modeling complex data.",
      codeExamples: [
        { language: "typescript", code: '// Union types\ntype Result = "success" | "error" | "loading";\ntype StringOrNumber = string | number;\n\nfunction formatValue(value: StringOrNumber): string {\n  if (typeof value === "string") {\n    return value.toUpperCase(); // TS knows it\'s string here\n  }\n  return value.toFixed(2);      // TS knows it\'s number here\n}\n\n// Discriminated unions\ntype Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "rectangle"; width: number; height: number }\n  | { kind: "triangle"; base: number; height: number };\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle": return Math.PI * shape.radius ** 2;\n    case "rectangle": return shape.width * shape.height;\n    case "triangle": return 0.5 * shape.base * shape.height;\n  }\n}\n\n// Intersection types\ntype Timestamped = { createdAt: Date; updatedAt: Date };\ntype WithId = { id: string };\ntype Entity = WithId & Timestamped;\n\nconst entity: Entity = {\n  id: "1",\n  createdAt: new Date(),\n  updatedAt: new Date()\n};', explanation: "Unions for 'either/or' types, intersections for combining types, discriminated unions for type-safe branching." }
      ],
      exercises: [
        { question: "Create a discriminated union for API responses: Success (with data), Error (with message), and Loading.", solution: 'type ApiResponse<T> =\n  | { status: "success"; data: T; timestamp: Date }\n  | { status: "error"; message: string; code: number }\n  | { status: "loading" };\n\nfunction handleResponse(response: ApiResponse<User[]>) {\n  switch (response.status) {\n    case "success":\n      console.log(`Got ${response.data.length} users`);\n      break;\n    case "error":\n      console.error(`Error ${response.code}: ${response.message}`);\n      break;\n    case "loading":\n      console.log("Loading...");\n      break;\n  }\n}', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "TS Handbook - Unions", url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "ts-4", title: "Generics",
      content: "Generics let you create reusable components that work with any type while maintaining type safety. Think of generics as 'type variables' — placeholders for types that are specified when the function/class is used. Constraints (<T extends SomeType>) restrict what types are allowed. Generics are essential for utility functions, data structures, and API wrappers.",
      codeExamples: [
        { language: "typescript", code: '// Generic function\nfunction first<T>(array: T[]): T | undefined {\n  return array[0];\n}\n\nconst num = first([1, 2, 3]);       // type: number | undefined\nconst str = first(["a", "b", "c"]); // type: string | undefined\n\n// Generic with constraint\nfunction longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}\n\nlongest("hello", "hi");         // "hello"\nlongest([1, 2, 3], [4, 5]);     // [1, 2, 3]\n// longest(10, 20); // Error! number has no .length\n\n// Generic interface\ninterface ApiResponse<T> {\n  data: T;\n  status: number;\n  message: string;\n}\n\nconst userResponse: ApiResponse<User> = {\n  data: { id: "1", name: "Ali", email: "ali@email.com" },\n  status: 200,\n  message: "OK"\n};', explanation: "Generic functions and interfaces for reusable, type-safe code." }
      ],
      exercises: [
        { question: "Create a generic function 'groupBy' that groups array items by a key returned from a callback.", solution: 'function groupBy<T, K extends string>(array: T[], keyFn: (item: T) => K): Record<K, T[]> {\n  return array.reduce((groups, item) => {\n    const key = keyFn(item);\n    (groups[key] ??= []).push(item);\n    return groups;\n  }, {} as Record<K, T[]>);\n}\n\nconst people = [\n  { name: "Ali", city: "Karachi" },\n  { name: "Sara", city: "Lahore" },\n  { name: "Ahmed", city: "Karachi" }\n];\n\nconst byCity = groupBy(people, p => p.city);\n// { Karachi: [...], Lahore: [...] }', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "TS Handbook - Generics", url: "https://www.typescriptlang.org/docs/handbook/2/generics.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "ts-5", title: "Enums & Literal Types",
      content: "Enums define a set of named constants. TypeScript has numeric enums (auto-incrementing), string enums (explicit values), and const enums (inlined at compile time). Literal types restrict values to specific strings, numbers, or booleans. Template literal types combine string literals. Often, union types of string literals are preferred over enums for better tree-shaking.",
      codeExamples: [
        { language: "typescript", code: '// String enum\nenum Direction {\n  Up = "UP",\n  Down = "DOWN",\n  Left = "LEFT",\n  Right = "RIGHT"\n}\n\nfunction move(dir: Direction): void {\n  console.log(`Moving ${dir}`);\n}\nmove(Direction.Up); // "Moving UP"\n\n// Const enum (inlined, no runtime object)\nconst enum HttpStatus {\n  OK = 200,\n  NotFound = 404,\n  ServerError = 500\n}\n\n// Alternative: Union of literals (often preferred)\ntype Color = "red" | "green" | "blue";\ntype Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;\n\n// Template literal types\ntype CssUnit = "px" | "rem" | "em" | "%";\ntype CssValue = `${number}${CssUnit}`;\n\nconst width: CssValue = "100px";   // OK\nconst height: CssValue = "2.5rem"; // OK\n// const bad: CssValue = "hello";  // Error!', explanation: "Enums, literal types, and template literal types for precise type definitions." }
      ],
      exercises: [
        { question: "Create a type-safe event system using string literal types for event names.", solution: 'type EventMap = {\n  click: { x: number; y: number };\n  keypress: { key: string; code: number };\n  submit: { formData: Record<string, string> };\n};\n\ntype EventName = keyof EventMap;\n\nfunction on<E extends EventName>(event: E, handler: (data: EventMap[E]) => void): void {\n  console.log(`Listening for ${event}`);\n  // Register handler...\n}\n\non("click", (data) => {\n  console.log(data.x, data.y); // Fully typed!\n});\n\non("keypress", (data) => {\n  console.log(data.key); // Fully typed!\n});', difficulty: "beginner" }
      ],
      externalLinks: [
        { title: "TS Handbook - Enums", url: "https://www.typescriptlang.org/docs/handbook/enums.html" }
      ],
      estimatedMinutes: 20
    },
  ],
  intermediate: [
    {
      id: "ts-6", title: "Utility Types",
      content: "TypeScript provides built-in utility types for common type transformations. Partial<T> makes all properties optional. Required<T> makes all required. Pick<T, K> selects specific properties. Omit<T, K> removes properties. Record<K, V> creates an object type. Readonly<T> prevents mutation. ReturnType<T> extracts a function's return type. These compose to create complex types from simple ones.",
      codeExamples: [
        { language: "typescript", code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  age: number;\n  role: "admin" | "user";\n}\n\n// Partial — all optional (for updates)\ntype UpdateUser = Partial<User>;\n// { id?: string; name?: string; email?: string; ... }\n\n// Pick — select specific fields\ntype UserPreview = Pick<User, "id" | "name">;\n// { id: string; name: string }\n\n// Omit — exclude fields\ntype CreateUser = Omit<User, "id">;\n// { name: string; email: string; age: number; role: ... }\n\n// Record — key-value mapping\ntype UserRoles = Record<string, User[]>;\nconst teams: UserRoles = {\n  admin: [/* admin users */],\n  dev: [/* dev users */]\n};\n\n// Readonly — prevent mutation\ntype FrozenUser = Readonly<User>;\nconst user: FrozenUser = { id: "1", name: "Ali", email: "a@b.com", age: 22, role: "user" };\n// user.name = "Sara"; // Error! Cannot assign to readonly', explanation: "Built-in utility types for transforming and composing types." }
      ],
      exercises: [
        { question: "Create a type-safe CRUD helper type that generates Create, Update, and Read types from a base entity type.", solution: 'type Entity<T> = {\n  Create: Omit<T, "id" | "createdAt" | "updatedAt">;\n  Update: Partial<Omit<T, "id" | "createdAt">>;\n  Read: Readonly<T>;\n};\n\ninterface Product {\n  id: string;\n  name: string;\n  price: number;\n  stock: number;\n  createdAt: Date;\n  updatedAt: Date;\n}\n\ntype ProductCreate = Entity<Product>["Create"];\n// { name: string; price: number; stock: number }\n\ntype ProductUpdate = Entity<Product>["Update"];\n// { name?: string; price?: number; stock?: number; updatedAt?: Date }', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "TS Handbook - Utility Types", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "ts-7", title: "Mapped & Conditional Types",
      content: "Mapped types transform each property in a type. They use [K in keyof T] to iterate over properties. Conditional types (T extends U ? X : Y) select types based on conditions. The infer keyword extracts types within conditional types. These advanced features enable powerful type-level programming and meta-programming.",
      codeExamples: [
        { language: "typescript", code: '// Mapped type — make all properties nullable\ntype Nullable<T> = {\n  [K in keyof T]: T[K] | null;\n};\n\ntype NullableUser = Nullable<User>;\n// { id: string | null; name: string | null; ... }\n\n// Conditional types\ntype IsString<T> = T extends string ? "yes" : "no";\ntype A = IsString<string>;  // "yes"\ntype B = IsString<number>;  // "no"\n\n// Extract array element type\ntype ElementOf<T> = T extends (infer E)[] ? E : never;\ntype NumElement = ElementOf<number[]>; // number\n\n// Practical: Extract function parameter types\ntype Parameters<T> = T extends (...args: infer P) => any ? P : never;\ntype Params = Parameters<(a: string, b: number) => void>;\n// [string, number]\n\n// Deep Readonly\ntype DeepReadonly<T> = {\n  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];\n};', explanation: "Mapped types for transformations and conditional types for type-level logic." }
      ],
      exercises: [
        { question: "Create a 'MakeOptionalExcept' type that makes all properties optional except specified keys.", solution: 'type MakeOptionalExcept<T, K extends keyof T> = \n  Required<Pick<T, K>> & Partial<Omit<T, K>>;\n\ninterface Form {\n  name: string;\n  email: string;\n  phone: string;\n  address: string;\n}\n\ntype RequiredForm = MakeOptionalExcept<Form, "name" | "email">;\n// { name: string; email: string; phone?: string; address?: string }', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "TS Handbook - Mapped Types", url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html" }
      ],
      estimatedMinutes: 30
    },
    {
      id: "ts-8", title: "Type Guards & Narrowing",
      content: "Type narrowing helps TypeScript determine a more specific type within a block of code. Type guards include typeof, instanceof, in operator, and custom type predicates (is keyword). Assertion functions (asserts condition) narrow types by throwing on failure. The satisfies operator (TS 4.9) validates a value matches a type while preserving the narrower type.",
      codeExamples: [
        { language: "typescript", code: '// Custom type guard\ninterface Dog { bark(): void; breed: string; }\ninterface Cat { meow(): void; color: string; }\ntype Pet = Dog | Cat;\n\nfunction isDog(pet: Pet): pet is Dog {\n  return "bark" in pet;\n}\n\nfunction handlePet(pet: Pet) {\n  if (isDog(pet)) {\n    pet.bark();  // TS knows it\'s Dog\n    console.log(pet.breed);\n  } else {\n    pet.meow();  // TS knows it\'s Cat\n    console.log(pet.color);\n  }\n}\n\n// Assertion function\nfunction assertDefined<T>(val: T | undefined, msg: string): asserts val is T {\n  if (val === undefined) throw new Error(msg);\n}\n\nconst user = getUser();\nassertDefined(user, "User not found");\nconsole.log(user.name); // TS knows user is defined here\n\n// satisfies operator\nconst palette = {\n  red: [255, 0, 0],\n  green: "#00ff00",\n} satisfies Record<string, string | number[]>;\n\npalette.red.map(x => x); // Works! Type is number[], not string | number[]', explanation: "Custom type guards, assertion functions, and satisfies operator." }
      ],
      exercises: [
        { question: "Write a type guard for validating API response shapes at runtime.", solution: 'interface User { name: string; email: string; age: number; }\n\nfunction isUser(data: unknown): data is User {\n  return (\n    typeof data === "object" &&\n    data !== null &&\n    "name" in data && typeof (data as any).name === "string" &&\n    "email" in data && typeof (data as any).email === "string" &&\n    "age" in data && typeof (data as any).age === "number"\n  );\n}\n\nasync function fetchUser(id: string): Promise<User> {\n  const res = await fetch(`/api/users/${id}`);\n  const data = await res.json();\n  if (!isUser(data)) throw new Error("Invalid user data");\n  return data; // Type-safe!\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "TS Handbook - Narrowing", url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "ts-9", title: "Decorators & Metadata",
      content: "Decorators are special functions that modify classes, methods, properties, or parameters. They use the @decorator syntax and are widely used in frameworks like Angular and NestJS. Class decorators receive the constructor. Method decorators receive the target, property key, and descriptor. TypeScript 5 introduced standard ECMAScript decorators alongside the experimental legacy syntax.",
      codeExamples: [
        { language: "typescript", code: '// Method decorator — logging\nfunction log(target: any, key: string, descriptor: PropertyDescriptor) {\n  const original = descriptor.value;\n  descriptor.value = function (...args: any[]) {\n    console.log(`Calling ${key} with`, args);\n    const result = original.apply(this, args);\n    console.log(`${key} returned`, result);\n    return result;\n  };\n}\n\nclass Calculator {\n  @log\n  add(a: number, b: number): number {\n    return a + b;\n  }\n\n  @log\n  multiply(a: number, b: number): number {\n    return a * b;\n  }\n}\n\nconst calc = new Calculator();\ncalc.add(2, 3);\n// Calling add with [2, 3]\n// add returned 5', explanation: "Method decorator for automatic logging — used extensively in NestJS and Angular." }
      ],
      exercises: [
        { question: "Create a @memoize decorator that caches function results based on arguments.", solution: 'function memoize(target: any, key: string, descriptor: PropertyDescriptor) {\n  const cache = new Map<string, any>();\n  const original = descriptor.value;\n  \n  descriptor.value = function (...args: any[]) {\n    const cacheKey = JSON.stringify(args);\n    if (cache.has(cacheKey)) {\n      console.log(`Cache hit for ${key}(${cacheKey})`);\n      return cache.get(cacheKey);\n    }\n    const result = original.apply(this, args);\n    cache.set(cacheKey, result);\n    return result;\n  };\n}\n\nclass MathService {\n  @memoize\n  fibonacci(n: number): number {\n    if (n <= 1) return n;\n    return this.fibonacci(n - 1) + this.fibonacci(n - 2);\n  }\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "TS Handbook - Decorators", url: "https://www.typescriptlang.org/docs/handbook/decorators.html" }
      ],
      estimatedMinutes: 25
    },
    {
      id: "ts-10", title: "Module System & Project Setup",
      content: "TypeScript uses ES modules with import/export. The tsconfig.json configures compilation options: target (ES version), module (module system), strict (strict type checking), paths (import aliases). Declaration files (.d.ts) provide types for JavaScript libraries. The @types scope on npm contains type definitions for thousands of packages.",
      codeExamples: [
        { language: "json", code: '// tsconfig.json\n{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "outDir": "./dist",\n    "rootDir": "./src",\n    "declaration": true,\n    "paths": {\n      "@/*": ["./src/*"],\n      "@components/*": ["./src/components/*"]\n    }\n  },\n  "include": ["src/**/*"],\n  "exclude": ["node_modules", "dist"]\n}', explanation: "Standard tsconfig.json with strict mode, path aliases, and modern target." }
      ],
      exercises: [
        { question: "Create a tsconfig.json for a React project with strict mode, path aliases, and JSX support.", solution: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "lib": ["ES2022", "DOM", "DOM.Iterable"],\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "jsx": "react-jsx",\n    "strict": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "paths": { "@/*": ["./src/*"] },\n    "outDir": "dist"\n  },\n  "include": ["src"]\n}', difficulty: "intermediate" }
      ],
      externalLinks: [
        { title: "TSConfig Reference", url: "https://www.typescriptlang.org/tsconfig" }
      ],
      estimatedMinutes: 20
    },
  ],
  hard: [
    {
      id: "ts-11", title: "Advanced Generic Patterns",
      content: "Advanced generics enable powerful abstractions. Recursive types model nested structures. Generic constraints with keyof and indexed access types create precise APIs. Type-level programming uses conditional types, mapped types, and template literal types together. These patterns power libraries like Zod, tRPC, and Prisma.",
      codeExamples: [
        { language: "typescript", code: '// Type-safe object path accessor\ntype Path<T, K extends keyof T = keyof T> = K extends string\n  ? T[K] extends object\n    ? K | `${K}.${Path<T[K]>}`\n    : K\n  : never;\n\ninterface Config {\n  database: { host: string; port: number };\n  api: { key: string; timeout: number };\n}\n\ntype ConfigPath = Path<Config>;\n// "database" | "api" | "database.host" | "database.port" | "api.key" | "api.timeout"\n\n// Builder pattern with generics\nclass QueryBuilder<T extends Record<string, any>> {\n  private conditions: string[] = [];\n  \n  where<K extends keyof T>(key: K, value: T[K]): this {\n    this.conditions.push(`${String(key)} = ${JSON.stringify(value)}`);\n    return this;\n  }\n  \n  build(): string {\n    return `WHERE ${this.conditions.join(" AND ")}`;\n  }\n}\n\nconst query = new QueryBuilder<User>()\n  .where("name", "Ali")  // Only accepts User keys with correct value types\n  .where("age", 22)\n  .build();', explanation: "Recursive path types and generic builder pattern for type-safe APIs." }
      ],
      exercises: [
        { question: "Create a type-safe event emitter using mapped types and generics.", solution: 'type EventMap = Record<string, any>;\n\nclass TypedEmitter<Events extends EventMap> {\n  private handlers: Partial<{ [K in keyof Events]: ((data: Events[K]) => void)[] }> = {};\n\n  on<K extends keyof Events>(event: K, handler: (data: Events[K]) => void): void {\n    (this.handlers[event] ??= []).push(handler);\n  }\n\n  emit<K extends keyof Events>(event: K, data: Events[K]): void {\n    this.handlers[event]?.forEach(h => h(data));\n  }\n}\n\ninterface AppEvents {\n  login: { userId: string; timestamp: Date };\n  logout: { userId: string };\n  error: { message: string; code: number };\n}\n\nconst emitter = new TypedEmitter<AppEvents>();\nemitter.on("login", (data) => console.log(data.userId)); // Fully typed!', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "Type Challenges", url: "https://github.com/type-challenges/type-challenges" }
      ],
      estimatedMinutes: 35
    },
    {
      id: "ts-12", title: "TypeScript with React Patterns",
      content: "TypeScript enhances React with prop typing, event handling, ref types, and generic components. Use FC<Props> or function declarations with typed props. React.ComponentProps extracts props from components. Generic components enable reusable typed components like Select<T> or Table<T>. Discriminated unions model component variants cleanly.",
      codeExamples: [
        { language: "typescript", code: '// Typed React component\ninterface ButtonProps {\n  variant: "primary" | "secondary" | "danger";\n  size?: "sm" | "md" | "lg";\n  children: React.ReactNode;\n  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;\n  disabled?: boolean;\n}\n\nfunction Button({ variant, size = "md", children, ...rest }: ButtonProps) {\n  return <button className={`btn-${variant} btn-${size}`} {...rest}>{children}</button>;\n}\n\n// Generic component\ninterface SelectProps<T> {\n  items: T[];\n  value: T;\n  onChange: (item: T) => void;\n  renderItem: (item: T) => React.ReactNode;\n  keyExtractor: (item: T) => string;\n}\n\nfunction Select<T>({ items, value, onChange, renderItem, keyExtractor }: SelectProps<T>) {\n  return (\n    <div>\n      {items.map(item => (\n        <div key={keyExtractor(item)} onClick={() => onChange(item)}>\n          {renderItem(item)}\n        </div>\n      ))}\n    </div>\n  );\n}\n\n// Usage — fully typed!\n<Select<User>\n  items={users}\n  value={selectedUser}\n  onChange={setSelectedUser}\n  renderItem={(u) => u.name}\n  keyExtractor={(u) => u.id}\n/>', explanation: "Typed React components and generic components for reusable UI." }
      ],
      exercises: [
        { question: "Create a type-safe useLocalStorage hook that persists state and infers types.", solution: 'function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {\n  const [stored, setStored] = useState<T>(() => {\n    try {\n      const item = localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch {\n      return initialValue;\n    }\n  });\n\n  const setValue = (value: T | ((prev: T) => T)) => {\n    const valueToStore = value instanceof Function ? value(stored) : value;\n    setStored(valueToStore);\n    localStorage.setItem(key, JSON.stringify(valueToStore));\n  };\n\n  return [stored, setValue];\n}\n\n// Usage\nconst [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");', difficulty: "advanced" }
      ],
      externalLinks: [
        { title: "React TypeScript Cheatsheet", url: "https://react-typescript-cheatsheet.netlify.app/" }
      ],
      estimatedMinutes: 30
    },
  ],
};
