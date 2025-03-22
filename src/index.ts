import Big from 'big.js';

/**
 * BigMath - A high-precision mathematical library for handling large numbers
 * with accurate arithmetic operations.
 */
export class BigMath {
  /**
   * Adds two large numbers with arbitrary precision
   * @param a First number (string or number)
   * @param b Second number (string or number)
   * @returns Result of addition as string
   */
static add(a: string | number, b: string | number): string {
  try {
    const bigA = new Big(a);
    const bigB = new Big(b);
    const result = bigA.plus(bigB);
    
    if (result.toString().includes('.')) {
      return result.toString();
    } else {
      return result.toFixed(0);
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
      const bigA = new Big(a);
      const bigB = new Big(b);
      return bigA.minus(bigB).toString();
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
            const bigA = new Big(a);
            const bigB = new Big(b);
            // Використовуємо toFixed(0) замість toString() для уникнення наукової нотації
            return bigA.times(bigB).toFixed(0);
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
            const bigA = new Big(a);
            const bigB = new Big(b);
            // Зберігаємо поточне значення DP
            const currentDP = Big.DP;
            // Встановлюємо нове значення DP
            Big.DP = decimalPlaces;
            // Використовуємо toFixed для забезпечення правильної кількості десяткових знаків
            const result = bigA.div(bigB).toFixed(decimalPlaces);
            // Відновлюємо попереднє значення DP
            Big.DP = currentDP;
            return result;
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
            const bigBase = new Big(base);
            if (exponent === 0) {
                return '1';
            }
            if (exponent < 0) {
                return new Big(1).div(bigBase.pow(-exponent)).toFixed(0);
            }
            // Використовуємо toFixed(0) для уникнення наукової нотації
            return bigBase.pow(exponent).toFixed(0);
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
    // Зберігаємо поточне значення DP
    const currentDP = Big.DP;
    // Встановлюємо нове значення DP з додатковою точністю для проміжних обчислень
    Big.DP = decimalPlaces + 5;
    
    // Метод Ньютона для обчислення квадратного кореня
    let x = new Big(value); // Початкове наближення
    let xPrev = new Big(0);
    
    // Ітеруємо до досягнення бажаної точності
    while (x.minus(xPrev).abs().gt(new Big(10).pow(-decimalPlaces))) {
      xPrev = x;
      x = x.plus(new Big(value).div(x)).div(2);
    }
    
    // Округлюємо до потрібної кількості десяткових знаків
    // Використовуємо toFixed для забезпечення правильної кількості десяткових знаків
    const result = x.toFixed(decimalPlaces);
    
    // Відновлюємо попереднє значення DP
    Big.DP = currentDP;
    
    return result;
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
      
      if (n === 0 || n === 1) {
        return '1';
      }
      
      let result = new Big(1);
      
      for (let i = 2; i <= n; i++) {
        result = result.times(i);
      }
      
      return result.toString();
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
    let bigA = new Big(a).abs();
    let bigB = new Big(b).abs();
    
    if (!this.isInteger(bigA) || !this.isInteger(bigB)) {
      throw new Error('GCD is defined only for integers');
    }
    
    while (!bigB.eq(0)) {
      const temp = new Big(bigB);
      bigB = bigA.mod(bigB);
      bigA = temp;
    }
    
    return bigA.toFixed(0);
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
    const bigA = new Big(a).abs();
    const bigB = new Big(b).abs();
    
    if (!this.isInteger(bigA) || !this.isInteger(bigB)) {
      throw new Error('LCM is defined only for integers');
    }
    
    if (bigA.eq(0) || bigB.eq(0)) {
      return '0';
    }
    
    const gcd = this.gcd(a, b);
    const product = bigA.times(bigB).toFixed(0);
    const lcm = new Big(product).div(new Big(gcd)).toFixed(0);
    
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
      const bigA = new Big(a);
      const bigB = new Big(b);
      
      if (bigA.lt(bigB)) return -1;
      if (bigA.eq(bigB)) return 0;
      return 1;
    } catch (error) {
      throw new Error(`Comparison error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  static configureBigJs(precision: number = 1000): void {
    Big.DP = precision;
    Big.RM = 1;
    Big.PE = 1000; 
    Big.NE = -1000;
  }

  /**
   * Rounds a large number to specified decimal places
   * @param value Number to round (string or number)
   * @param decimalPlaces Number of decimal places (default 0)
   * @returns Rounded number as string
   */
  static round(value: string | number, decimalPlaces: number = 0): string {
    try {
      const bigValue = new Big(value);
      return bigValue.round(decimalPlaces).toString();
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
      const bigValue = new Big(value);
      return bigValue.abs().toString();
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
      
      const bigA = new Big(a);
      const bigB = new Big(b);
      
      return bigA.mod(bigB).toString();
    } catch (error) {
      throw new Error(`Modulo error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
