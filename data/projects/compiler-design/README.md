# Compiler Design

Practical Assignments 1 and 2 for the **Compiler Design** course in the Systems Engineering program.

## Links

- [Open the Compiler Design repository](https://github.com/FelipePipe2002/Compilador)

## Team

* **Felipe Manuel Bertoldi**
* **Mateo Manolio**
* **Fernando Agustín Sánchez**

## Objective

The project develops the first two phases of a compiler: the **lexical analyzer** and the **syntax analyzer**. It includes token recognition from source code, validation of token sequences against grammar rules, and integration between both analyzers using **BYACC**.

## Assigned Topics

* 32-bit long integers with `_l` suffix
* 16-bit unsigned integers with `_ui` suffix
* 64-bit floating-point numbers with optional exponent using `D` or `d`
* Arithmetic operator `--`
* Reserved words `LONG`, `UINT`, `WHILE`, `DO`, `INTERFACE`, and `IMPLEMENT`
* Composition-based inheritance with named usage
* Concentrated method declarations
* Attribute overriding
* Explicit conversions with `TOD(<expression>)`
* Multiline comments between `{` and `}*`
* Multiline strings delimited by `%`

## Lexical Analyzer

The lexical analyzer converts source code into tokens for later syntax analysis. The implementation was organized with classes and structures focused on clarity, maintainability, and robustness.

Main components:

* **AnalizadorLexico**: reads the source file, manages the current buffer, recognizes tokens, and records lexical errors
* **MatrizDeTransicionEstados**: represents the deterministic finite automaton used to recognize tokens
* **MatrizDeAS**: executes semantic actions associated with automaton states
* **Symbol table**: stores recognized identifiers, constants, and strings

## Semantic Actions

The analyzer uses semantic actions to control character and token processing:

* Push characters into the buffer
* Return the last read character
* Validate maximum identifier length
* Check ranges for `UINT`, `LONG`, and floating-point values
* Count line breaks for error reporting
* Process multiline comments

## Lexical Error Handling

The compiler accumulates errors without stopping execution immediately. At the end, it reports every error found.

Handled errors include:

* Malformed constants
* Floating-point values with invalid exponents
* Unsigned or long integers outside their valid range
* Malformed operators
* Unterminated strings or comments
* Invalid reserved words
* Identifiers exceeding the allowed length

## Syntax Analyzer

The syntax analyzer was defined with a **Yacc/Bison-style** grammar. The grammar validates that declarations, statements, expressions, control structures, classes, and interfaces follow the language syntax.

Design decisions:

* Descriptive names for grammar rules
* Recursive rules for declaration and statement lists
* Clear separation between declarations, expressions, blocks, classes, interfaces, and control structures
* Syntax error handling for common cases such as missing braces, empty blocks, incomplete comparisons, and invalid declarations

## Supported Rules and Constructs

* Variable, class, interface, and function declarations
* Statement blocks
* `IF`, `ELSE`, `WHILE`, `DO`, `PRINT`, and `RETURN` statements
* Comparisons and arithmetic operations
* Class member calls
* Explicit conversion with `TOD(...)`
* Specific validations for `double`, `uint`, `long`, and identifier types

## Technologies

`Java` `BYACC` `Yacc/Bison` `Finite automata` `Lexical analysis` `Syntax analysis` `Formal grammars`

## Result

The work builds a functional foundation for a compiler, with a modular lexical analyzer, an extensible syntax grammar, and an error reporting system designed to continue analysis even when issues exist in the source code.
