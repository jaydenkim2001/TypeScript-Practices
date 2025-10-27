/* 
The Record<K, T> utility type creates an object type where:
    - the keys are of type K, and
    - the values are of type T.

So think of it as:
“A map or dictionary from keys of type K to values of type T.” */

//example 1
type StringNumberMap = Record<string, number>;

const example: StringNumberMap = {
  apple: 1,
  orange: 2,
  mango: 3,
};

//example 2
type FruitColour = Record<"apple" | "orange" | "mango", string>;

const fruitColour: FruitColour = {
  apple: "red",
  orange: "orange",
  mango: "yellow",
};

//example 3
type UserRole = "admin" | "user" | "guest";

/* Right now, RolePermission1 and 2 are the same. However, when additional roles are added into
   UserRole, manual addition(update) is required for RolePermission1 where else, RolePermission2
   is updated automatically. */

type RolePermission1 = {
  admin: string;
  user: string;
  guest: string;
};

type RolePermission2 = Record<UserRole, string>;

//===========================================================================================================================================================================================
//Q1: Write logic for calculating the shipping cost based on region codes in an e-commerce platform.
/* Requirements:
   - Each region has a unique code and a corresponding shipping cost:   
     type RegionCode = "US" | "EU" | "ASIA" | "AFRICA";

   - Define a data structure that maps each region code to its shipping cost using the Record type.

   - Write a function with the following specifications:
      Function name: calculateShippingCost
      Input: A region code (RegionCode), A shipping cost mapping object (Record<RegionCode, number>)
      Output: The shipping cost for the given region.

   - Additional requirement: If an unsupported region code is provided, throw an error. */

// 지역 코드 타입 정의
type RegionCode = "US" | "EU" | "ASIA" | "AFRICA";

// 배송비 데이터 정의
const shippingCosts: Record<RegionCode, number> = {
  US: 10,
  EU: 15,
  ASIA: 20,
  AFRICA: 25,
};

// 배송비 계산 함수 작성
function calculateShippingCost(
  region: RegionCode,
  costs: Record<RegionCode, number>
): number {
  if (!(region in costs)) {
    throw new Error("Unsupported region code.");
  }
  return costs[region];
}

// 테스트 코드
console.log(calculateShippingCost("US", shippingCosts)); // 10
console.log(calculateShippingCost("EU", shippingCosts)); // 15
console.log(calculateShippingCost("ASIA", shippingCosts)); // 20
console.log(calculateShippingCost("AFRICA", shippingCosts)); // 25
// console.log(calculateShippingCost("AUSTRALIA", shippingCosts)); // 에러 발생

//===========================================================================================================================================================================================
//Q2: You need to record students’ scores and calculate their average score.
/* Requirements:
   - Define the data that maps each student’s name (string) to their score (number) using the Record type  
   - Write a function to calculate the average score.

   - Write a function with the following specifications:
      Function name: calculateAverageScore
      Input: student score data (Record<string, number>)
      Output: the average score of all students (number) */

// 학생 점수 데이터 정의
const scores: Record<string, number> = {
  Alice: 85,
  Bob: 92,
  Charlie: 78,
};

// 평균 점수 계산 함수 작성
function calculateAverageScore(scores: Record<string, number>): number {
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  return total / Object.keys(scores).length;
}

// 테스트 코드
console.log(calculateAverageScore(scores)); // 85

//===========================================================================================================================================================================================
//Q3: Implement a feature in a shopping mall system that maps each product’s name to its price and allows updating the price of a specific product.
/* Requirements:
   - Define the data that maps product names (string) to prices (number) using the Record type.
   - Write a function to update the price of a specific product.

   - Write a function with the following specifications:
      Function name: updateProductPrice
      Input: Product price data (Record<string, number>), 
             The name of the product to update,
             The new price
      Output: Updated product price data (Record<string, number>) */

// 제품 가격 데이터 정의
const prices: Record<string, number> = {
  Laptop: 1000,
  Phone: 500,
  Tablet: 300,
};

// 가격 업데이트 함수 작성
function updateProductPrice(
  prices: Record<string, number>,
  product: string,
  newPrice: number
): Record<string, number> {
  if (!(product in prices)) {
    throw new Error(`Product '${product}' does not exist.`);
  }

  return {
    ...prices, // copy all existing key-value pairs
    [product]: newPrice, // overwrite the target product’s price
  };
}

// 테스트 코드
console.log(updateProductPrice(prices, "Phone", 550));
// 기대 출력: { Laptop: 1000, Phone: 550, Tablet: 300 }
