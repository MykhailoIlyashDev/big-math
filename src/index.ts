import Big from 'big.js';

/**
 * BigMath - A high-precision mathematical library for handling large numbers
 * with accurate arithmetic operations.
 */
export class BigMath {
/**
   * Configures the Big.js library for handling very large numbers
   * This should be called before using the library for very large calculations
   */
  static configure() {
    // Set precision for calculations
    Big.DP = 1000;
    // Set rounding mode
    Big.RM = 1; // 1 = round to nearest (0.5 up)
    // Set exponent limits
    Big.PE = 1000000; // Positive exponent limit
    Big.NE = -1000000; // Negative exponent limit
  }

  /**
   * Adds two large numbers with arbitrary precision
   * @param a First number (string or number)
   * @param b Second number (string or number)
   * @returns Result of addition as string
   */
  static add(a: string | number, b: string | number): string {
    try {
      // Configure Big.js for very large numbers
      this.configure();
      
      const bigA = new Big(a);
      const bigB = new Big(b);
      const result = bigA.plus(bigB);
      
      // Check if the result has a decimal part
      if (result.toString().includes('.')) {
        // If it has a decimal part, return as is
        return result.toString();
      } else {
        // For very large integers, avoid scientific notation
        return result.toFixed();
      }
    } catch (error) {
      throw new Error(`Addition error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Subtracts two large numbers with arbitrary precision
   * @param a First number (string or number)
   * @param b Second number (string or number)
   * @returns Result of subtraction as string
   */
  static subtract(a: string | number, b: string | number): string {
    try {
      // Configure Big.js for very large numbers
      this.configure();
      
      const bigA = new Big(a);
      const bigB = new Big(b);
      const result = bigA.minus(bigB);
      
      // Check if the result has a decimal part
      if (result.toString().includes('.')) {
        // If it has a decimal part, return as is
        return result.toString();
      } else {
        // For very large integers, avoid scientific notation
        return result.toFixed();
      }
    } catch (error) {
      throw new Error(`Subtraction error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Multiplies two large numbers with arbitrary precision
   * @param a First number (string or number)
   * @param b Second number (string or number)
   * @returns Result of multiplication as string
   */
  static multiply(a: string | number, b: string | number): string {
    try {
      // Configure Big.js for very large numbers
      this.configure();
      
      const bigA = new Big(a);
      const bigB = new Big(b);
      const result = bigA.times(bigB);
      
      // Check if the result has a decimal part
      if (result.toString().includes('.')) {
        // If it has a decimal part, return as is
        return result.toString();
      } else {
        // For very large integers, avoid scientific notation
        return result.toFixed();
      }
    } catch (error) {
      throw new Error(`Multiplication error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Divides two large numbers with arbitrary precision
   * @param a Dividend (string or number)
   * @param b Divisor (string or number)
   * @param decimalPlaces Number of decimal places (default 20)
   * @returns Result of division as string
   */
  static divide(a: string | number, b: string | number, decimalPlaces: number = 20): string {
    try {
      if (String(b) === '0') {
        throw new Error('Division by zero');
      }
      
      // Configure Big.js for very large numbers
      this.configure();
      
      const bigA = new Big(a);
      const bigB = new Big(b);
      
      // Save current DP value
      const currentDP = Big.DP;
      // Set new DP value
      Big.DP = decimalPlaces;
      
      // Calculate division
      const result = bigA.div(bigB);
      
      // Format result with exact decimal places
      const formattedResult = result.toFixed(decimalPlaces);
      
      // Restore previous DP value
      Big.DP = currentDP;
      
      return formattedResult;
    } catch (error) {
      throw new Error(`Division error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Raises a number to the power of an integer exponent
   * @param base Base number (string or number)
   * @param exponent Integer exponent
   * @returns Result of exponentiation as string
   */
  static pow(base: string | number, exponent: number): string {
    try {
      if (!Number.isInteger(exponent)) {
        throw new Error('Exponent must be an integer');
      }
      
      // Configure Big.js for very large numbers
      this.configure();
      
      const bigBase = new Big(base);
      
      if (exponent === 0) {
        return '1';
      }
      
      if (exponent < 0) {
        return new Big(1).div(bigBase.pow(-exponent)).toFixed();
      }
      
      const result = bigBase.pow(exponent);
      
      // Check if the result has a decimal part
      if (result.toString().includes('.')) {
        // If it has a decimal part, return as is
        return result.toString();
      } else {
        // For very large integers, avoid scientific notation
        return result.toFixed();
      }
    } catch (error) {
      throw new Error(`Power error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Calculates the square root of a number
   * @param value Input number (string or number)
   * @param decimalPlaces Number of decimal places (default 20)
   * @returns Square root as string
   */
  static sqrt(value: string | number, decimalPlaces: number = 20): string {
    try {
      const bigValue = new Big(value);
      
      if (bigValue.lt(0)) {
        throw new Error('Cannot calculate square root of negative number');
      }
      
      if (bigValue.eq(0)) {
        return '0';
      }
      
      // Configure Big.js for very large numbers
      this.configure();
      
      // Save current DP value
      const currentDP = Big.DP;
      // Set new DP value with extra precision for intermediate calculations
      Big.DP = decimalPlaces + 5;
      
      // Newton's method for square root calculation
      let x = new Big(value); // Initial approximation
      let xPrev = new Big(0);
      
      // Iterate until desired precision is reached
      while (x.minus(xPrev).abs().gt(new Big(10).pow(-decimalPlaces))) {
        xPrev = x;
        x = x.plus(new Big(value).div(x)).div(2);
      }
      
      // Format result with exact decimal places
      const formattedResult = x.toFixed(decimalPlaces);
      
      // Restore previous DP value
      Big.DP = currentDP;
      
      return formattedResult;
    } catch (error) {
      throw new Error(`Square root error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Calculates the factorial of a non-negative integer
   * @param n Non-negative integer
   * @returns Factorial as string
   */
  static factorial(n: number): string {
    try {
      if (!Number.isInteger(n) || n < 0) {
        throw new Error('Factorial is defined only for non-negative integers');
      }
      
      // Configure Big.js for very large numbers
      this.configure();
      
      if (n === 0 || n === 1) {
        return '1';
      }
      
      let result = new Big(1);
      
      for (let i = 2; i <= n; i++) {
        result = result.times(i);
      }
      
      // Check if the result has a decimal part
      if (result.toString().includes('.')) {
        // If it has a decimal part, return as is
        return result.toString();
      } else {
        // For very large integers, avoid scientific notation
        return result.toFixed();
      }
    } catch (error) {
      throw new Error(`Factorial error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Calculates the greatest common divisor (GCD) of two integers
   * @param a First integer (string or number)
   * @param b Second integer (string or number)
   * @returns GCD as string
   */
  static gcd(a: string | number, b: string | number): string {
    try {
      // Configure Big.js for very large numbers
        this.configure();
        
        let strA = a.toString();
        let strB = b.toString();
        
        if (strA.startsWith('-')) strA = strA.substring(1);
        if (strB.startsWith('-')) strB = strB.substring(1);
        
        if (strA.includes('.')) strA = strA.substring(0, strA.indexOf('.'));
        if (strB.includes('.')) strB = strB.substring(0, strB.indexOf('.'));
        
        while (strB !== '0') {
            const bigA = new Big(strA);
            const bigB = new Big(strB);
            const remainder = bigA.mod(bigB).toFixed();
            
            strA = strB;
            strB = remainder;
        }
        
        return strA;
    } catch (error) {
      throw new Error(`GCD error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Calculates the least common multiple (LCM) of two integers
   * @param a First integer (string or number)
   * @param b Second integer (string or number)
   * @returns LCM as string
   */
static lcm(a: string | number, b: string | number): string {
  try {
      // Configure Big.js for very large numbers
      this.configure();
      
    let strA = a.toString();
    let strB = b.toString();
    
    if (strA.startsWith('-')) strA = strA.substring(1);
    if (strB.startsWith('-')) strB = strB.substring(1);
    
    if (strA.includes('.')) strA = strA.substring(0, strA.indexOf('.'));
    if (strB.includes('.')) strB = strB.substring(0, strB.indexOf('.'));
    
    if (strA === '0' || strB === '0') {
      return '0';
    }
    
    const gcd = this.gcd(strA, strB);
    
    const product = new Big(strA).times(strB).toFixed();
    const lcm = new Big(product).div(gcd).toFixed();
    
    return lcm;
  } catch (error) {
    throw new Error(`LCM error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

  /**
   * Checks if a number is an integer
   * @param value Big number
   * @returns true if integer, false otherwise
   */
  private static isInteger(value: Big): boolean {
    return value.eq(value.round());
  }

  /**
   * Compares two large numbers
   * @param a First number (string or number)
   * @param b Second number (string or number)
   * @returns -1 if a < b, 0 if a = b, 1 if a > b
   */
  static compare(a: string | number, b: string | number): number {
    try {
    // Configure Big.js for very large numbers
      this.configure();

      const bigA = new Big(a);
      const bigB = new Big(b);
      
      if (bigA.lt(bigB)) return -1;
      if (bigA.eq(bigB)) return 0;
      return 1;
    } catch (error) {
      throw new Error(`Comparison error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Rounds a large number to specified decimal places
   * @param value Number to round (string or number)
   * @param decimalPlaces Number of decimal places (default 0)
   * @returns Rounded number as string
   */
  static round(value: string | number, decimalPlaces: number = 0): string {
    try {
    // Configure Big.js for very large numbers
      this.configure();

      const bigValue = new Big(value);
      
      return bigValue.toFixed(decimalPlaces);
    } catch (error) {
      throw new Error(`Rounding error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Calculates the absolute value of a number
   * @param value Input number (string or number)
   * @returns Absolute value as string
   */
  static abs(value: string | number): string {
    try {
      // Configure Big.js for very large numbers
      this.configure();
      
      const bigValue = new Big(value);
      const result = bigValue.abs();
      
      // Check if the result has a decimal part
      if (result.toString().includes('.')) {
        // If it has a decimal part, return as is
        return result.toString();
      } else {
        // For very large integers, avoid scientific notation
        return result.toFixed();
      }
    } catch (error) {
      throw new Error(`Absolute value error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Calculates the modulo (remainder after division)
   * @param a Dividend (string or number)
   * @param b Divisor (string or number)
   * @returns Remainder as string
   */
  static mod(a: string | number, b: string | number): string {
    try {
      if (String(b) === '0') {
        throw new Error('Modulo by zero');
      }
      this.configure();
      
        const bigA = new Big(a);
        const bigB = new Big(b);
        const result = bigA.mod(bigB);
        
        if (result.toString().includes('.')) {
            return result.toString();
        } else {
            return result.toFixed();
        }
    } catch (error) {
      throw new Error(`Modulo error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
