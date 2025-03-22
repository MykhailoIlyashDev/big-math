# precision-big-math
BigMath is a high-precision mathematical library for handling large numbers (16+ digits) with accurate arithmetic operations including addition, multiplication, division, exponentiation, square roots, and more.

## Installation

```bash
npm install precision-big-math
```

## Features

- Arbitrary precision arithmetic operations
- Handles numbers with 16+ digits without loss of precision
- Comprehensive mathematical functions (addition, subtraction, multiplication, division)
- Advanced operations (power, square root, factorial, GCD, LCM)
- Error handling with descriptive messages
- No floating-point precision issues

## Usage

```javascript
const { BigMath } = require('precision-big-math');
// or
import { BigMath } from 'precision-big-math';
```

### Basic Operations

```javascript
// Addition
const sum = BigMath.add('9999999999999999', '1');
console.log(sum); // '10000000000000000'

// Subtraction
const difference = BigMath.subtract('10000000000000000', '1');
console.log(difference); // '9999999999999999'

// Multiplication
const product = BigMath.multiply('9999999999999999', '9999999999999999');
console.log(product); // '99999999999999980000000000000001'

// Division
const quotient = BigMath.divide('9999999999999999', '3', 10);
console.log(quotient); // '3333333333333333.0000000000'
```

### Advanced Operations

```javascript
// Power
const power = BigMath.pow('2', 100);
console.log(power); // '1267650600228229401496703205376'

// Square Root
const sqrt = BigMath.sqrt('2', 20);
console.log(sqrt); // '1.41421356237309504880'

// Factorial
const factorial = BigMath.factorial(50);
console.log(factorial); // '30414093201713378043612608166064768844377641568960512000000000000'

// Greatest Common Divisor
const gcd = BigMath.gcd('123456789012345678901234', '987654321098765432109');
console.log(gcd); // '3'

// Least Common Multiple
const lcm = BigMath.lcm('12345678901234567890', '98765432109876543210');
console.log(lcm); // '405349064020168389956139452109876543210'

BigMath.configureBigJs(1000);
const sum = BigMath.add('9'.repeat(1000), '9'.repeat(1000)); // add 2 bignumbers
console.log(sum);
```

### Comparison and Utility Functions

```javascript
// Compare numbers
const comparison = BigMath.compare('9999999999999999', '10000000000000000');
console.log(comparison); // -1 (less than)

// Round to decimal places
const rounded = BigMath.round('3.14159265358979323846', 5);
console.log(rounded); // '3.14159'

// Absolute value
const absolute = BigMath.abs('-9999999999999999');
console.log(absolute); // '9999999999999999'

// Modulo
const remainder = BigMath.mod('9999999999999999', '3');
console.log(remainder); // '0'
```

## API Reference

### Basic Operations

- `BigMath.add(a, b)` - Adds two numbers
- `BigMath.subtract(a, b)` - Subtracts b from a
- `BigMath.multiply(a, b)` - Multiplies two numbers
- `BigMath.divide(a, b, decimalPlaces = 20)` - Divides a by b with specified precision

### Advanced Operations

- `BigMath.pow(base, exponent)` - Raises base to the power of exponent
- `BigMath.sqrt(value, decimalPlaces = 20)` - Calculates square root with specified precision
- `BigMath.factorial(n)` - Calculates factorial of n
- `BigMath.gcd(a, b)` - Finds greatest common divisor
- `BigMath.lcm(a, b)` - Finds least common multiple

### Utility Functions

- `BigMath.compare(a, b)` - Compares two numbers (-1, 0, 1)
- `BigMath.round(value, decimalPlaces = 0)` - Rounds to specified decimal places
- `BigMath.abs(value)` - Returns absolute value
- `BigMath.mod(a, b)` - Returns remainder after division

## Error Handling

All methods include comprehensive error handling with descriptive error messages:

```javascript
try {
  BigMath.divide('100', '0');
} catch (error) {
  console.error(error.message); // 'Division error: Division by zero'
}
```

## License

MIT

Made by Michael Ilyash
