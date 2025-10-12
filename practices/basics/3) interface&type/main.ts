//interface can only represent objects, classes, and functions
interface IStudent {
  name: string;
  age?: number;
  isStudent?: boolean;
}

//type is more general. It can represent primitives, unions, intersections, tuples, etc.
type TStudent = {
  name: string;
  age?: number;
};

let e: IStudent = { name: "Jayden", age: 24 };
let f: TStudent = { name: "Greg", age: 25 };

//===================================================================================================

interface IPerson {
  name: string;
  age: number;
  gender: string;
}

//can be extended using "extends"
interface IForeigner extends IPerson {
  // name: string;
  // age: number;
  // gender:string;
  nationality: string;
}

//can be extended via intersections "&"
type TForeigner = IPerson & { nationality: string; period: Date };

type TForeigner2 = IPerson | { nationality: string; period: Date };

let american: IForeigner = {
  name: "John",
  age: 45,
  gender: "male",
  nationality: "american",
};

//===========================================================================================================================================================================================
//Q1: Write an interface and a type that represent user information.
/*The user information has the following structure:
    - id: unique ID (number)
    - name: name (string)
    - email: email (string, optional property)*/

// Interface
interface IUser1 {
  id: number;
  name: string;
  email?: string;
}

// Type
type TUser1 = {
  id: number;
  name: string;
  email?: string;
};

const user1: IUser1 = {
  id: 1,
  name: "Alice",
};

const user1WithEmail: TUser1 = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
};

//===========================================================================================================================================================================================
//Q2: Define a type that represents the following structure, and then create an object based on that type.
/*A User has the following properties:
    - id: unique ID (number)
    - name: name (string)
    - address: object ({ city: string, zipCode: number }) */

// User type
type TUser2 = {
  id: number;
  name: string;
  address: { city: string; zipCode: number };
};

// User 타입을 사용하여 아래 객체를 작성하세요.
const user2: TUser2 = {
  id: 1,
  name: "Alice",
  address: {
    city: "Seoul",
    zipCode: 12345,
  },
};

//===========================================================================================================================================================================================
//Q3: Extend an interface according to the following conditions:
/*  - First, create a User interface that represents user information (id, name, email?).
    - Next, create an Admin interface that extends the User interface. An Admin has an additional property: role (string).
    - After writing the interfaces, create objects that represent both a user and an admin. */

// User Interface
interface IUser3 {
  id: number;
  name: string;
  email?: string;
}

// Admin Interface (extension of User)
interface IAdmin3 extends IUser3 {
  role: string;
}

const normalUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const adminUser = {
  id: 2,
  name: "Bob",
  role: "Administrator",
};

//===========================================================================================================================================================================================
//Q4: Extend a type according to the following conditions:
/*  - First, create a Product type that represents product information (id, name, price).
    - Next, create a DiscountedProduct type that extends Product and has an additional property: discount (number: percentage value).
    - After writing the types, create objects that represent both a regular product and a discounted product. */

// Product Type
type TProduct4 = {
  id: number;
  name: string;
  price: number;
};

// DiscountedProduct Type (extension of Product)
type TDiscountedProduct4 = TProduct4 & {
  discount: number;
};

const normalProduct = {
  id: 1,
  name: "Laptop",
  price: 1000,
};

const discountedProduct = {
  id: 2,
  name: "Smartphone",
  price: 800,
  discount: 10,
};

//===========================================================================================================================================================================================
//Q5: Write interfaces that satisfy the following conditions, and then create objects based on those interfaces.
/*  A Product has the following properties:
    - id: number
    - name: string
    - price: number
    
    An Order has the following properties:
    - orderId: number
    - products: an array of Product type
    - totalPrice: number */

// Product Interface
interface IProduct5 {
  id: number;
  name: string;
  price: number;
}

// Order Interface
interface IOrder5 {
  orderId: number;
  products: IProduct5[];
  totalPrice: number;
}

// Order 타입을 사용하여 아래 객체를 작성하세요.
const order: IOrder5 = {
  orderId: 101,
  products: [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Mouse", price: 50 },
  ],
  totalPrice: 1050,
};

//===========================================================================================================================================================================================
//Q6: Write a type and an interface that satisfy the following conditions, and then create objects based on those definitions.
/*  Create an interface called BaseUser with the following properties:
    - id: number
    - name: string
    
    Create a type called AdminUser that extends BaseUser and also includes:
    - role: string

    Create a type called GuestUser that extends BaseUser and also includes:
    - visitCount: number */

// BaseUser interface
interface BaseUser {
  id: number;
  name: string;
}

// AdminUser Interface
interface AdminUser extends BaseUser {
  role: string;
}

// GuestUser Interface
interface GuestUser extends BaseUser {
  visitCount: number;
}

// 아래 객체를 작성하세요.
const admin: AdminUser = {
  id: 1,
  name: "Alice",
  role: "Administrator",
};

const guest: GuestUser = {
  id: 2,
  name: "Bob",
  visitCount: 5,
};
