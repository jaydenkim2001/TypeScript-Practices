interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

//1. Omit (Creates a new type by removing specific properties from an existing type)
type PublicUser = Omit<User, "password">;

//2. Pick (Creates a new type by selecting specific properties from an existing type)
type BasicUserInfo = Pick<User, "id" | "name">;

//3. Partial (Partial<T> makes all properties of a type optional.)
interface Address {
  street: string;
  city: string;
  country: string;
}

const updateAddress = (address: Partial<Address>) => {
  console.log(address);
};

//===========================================================================================================================================================================================
//Q1: You need to create a type where all properties are optional to handle partially filled signup form data.
/* Base Type Definition:
   - User: user information (name, email, password).
   - Use Partial to create a type where all properties become optional.

   Function Specification:
   - Function name: updateUserForm
   - Input: existing user data and updated form data
   - Output: updated user data */

type User1 = {
  name: string;
  email: string;
  password: string;
};

// 함수 작성
function updateUserForm(user: User1, updates: Partial<User1>): User1 {
  return { ...user, ...updates };
}

// 테스트 코드
const currentUser = {
  name: "Alice",
  email: "alice@example.com",
  password: "1234",
};
const updatedForm = { email: "new-email@example.com" };

console.log(updateUserForm(currentUser, updatedForm));
// 기대 출력: { name: "Alice", email: "new-email@example.com", password: "1234" }

//===========================================================================================================================================================================================
//Q2: You need to select only the required properties from the user information displayed on the profile page.
/* Base Type Definition:
   - UserProfile: user profile information (id, name, email, address).

   Using Pick:
   - Define a type that extracts only the data needed for the profile page (id and name).

   Function Specification:
   - Function name: getProfileSummary
   - Input: the full user information
   - Output: an object containing only the required properties. */

type UserProfile2 = {
  id: number;
  name: string;
  email: string;
  address: string;
};

// 함수 작성
function getProfileSummary(
  user: UserProfile2
): Pick<UserProfile2, "id" | "name"> {
  return { id: user.id, name: user.name };
}

// 테스트 코드
const userProfile2 = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  address: "123 Main St",
};

console.log(getProfileSummary(userProfile2));
// 기대 출력: { id: 1, name: "Alice" }

//===========================================================================================================================================================================================
//Q3: You need to exclude sensitive information when saving data to the database.
/* Base Type Definition:
   - User: user information (name, email, password, role).

   Using Omit:
   - Define a type that excludes sensitive information (exclude the password).

   Function Specification:
   - Function name: filterSensitiveInfo
   - Input: full user information.
   - Output: an object with the sensitive information removed. */

type User3 = {
  name: string;
  email: string;
  password: string;
  role: string;
};

// 함수 작성
function filterSensitiveInfo(user: User3): Omit<User3, "password"> {
  return { name: user.name, email: user.email, role: user.role };
}

// 테스트 코드
const userInfo = {
  name: "Alice",
  email: "alice@example.com",
  password: "1234",
  role: "admin",
};

console.log(filterSensitiveInfo(userInfo));
// 기대 출력: { name: "Alice", email: "alice@example.com", role: "admin" }

//===========================================================================================================================================================================================
//Q4: Design a team management system. Each team consists of multiple members, and administrators can manipulate data based on specific roles.
/* Base Type Definition:
   - type TeamMember = {
        id: number;
        name: string;
        email: string;
        role: "developer" | "designer" | "manager";
        isActive: boolean;
      };

   createTeamMember:
   - Use Partial so that even if only part of the input data is provided, missing fields are initialized with default values.
   - Default values:
      role: "developer"
      isActive: true

   filterTeamMembers:
   - Use Pick to define the filtering criteria.
   - Example: role: "designer" or isActive: false.

   removeSensitiveInfo:
   - Use Omit to exclude email addresses from the returned data. */

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "developer" | "designer" | "manager";
  isActive: boolean;
};

// 1. `createTeamMember` 함수 작성
function createTeamMember(data: Partial<TeamMember>): TeamMember {
  const defaultValues: Pick<TeamMember, "email" | "role" | "isActive"> = {
    email: "",
    role: "developer",
    isActive: false,
  };

  if (data.id == null || data.name == null) {
    throw new Error("ID and name are required!");
  }

  return {
    id: data.id,
    name: data.name,
    ...defaultValues,
    ...data,
  };
}

// 2. `filterTeamMembers` 함수 작성
function filterTeamMembers(
  members: TeamMember[],
  filter: Pick<TeamMember, "role" | "isActive">
): TeamMember[] {
  return members.filter(
    (member) =>
      member.role === filter.role && member.isActive === filter.isActive
  );
}

// 3. `removeSensitiveInfo` 함수 작성
function removeSensitiveInfo(
  members: TeamMember[]
): Omit<TeamMember, "email">[] {
  return members.map(({ email, ...rest }) => rest);
}

// 테스트 코드
const members: TeamMember[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "developer",
    isActive: true,
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    role: "designer",
    isActive: false,
  },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    role: "manager",
    isActive: true,
  },
];

// 1. 새 팀원 생성
const newMember = createTeamMember({ id: 4, name: "Diana" });
console.log(newMember);
// 기대 출력: { id: 4, name: "Diana", email: "", role: "developer", isActive: true }

// 2. 필터링된 팀원 목록
const activeDesigners = filterTeamMembers(members, {
  role: "designer",
  isActive: true,
});
console.log(activeDesigners);
// 기대 출력: []

// 3. 민감한 정보 제거
const sanitizedMembers = removeSensitiveInfo(members);
console.log(sanitizedMembers);
// 기대 출력: [{ id: 1, name: "Alice", role: "developer", isActive: true }, ...]
