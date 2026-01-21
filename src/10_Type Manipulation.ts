// ----------------------------------------
// Type Manipulation : 타입 조작 : 응용 방법
// ----------------------------------------

// keyof 연산자 (Index Type Query) & typeof 연산자
interface User {
  id: number;
  name: string;
  age: number;
}

// "id" | "name" | "age" = string - 유니온 타입이 됨
type UserKeys = keyof User; 

const key: UserKeys = "id"; // 정상
// const key2: UserKeys = "email"; // Error: Type '"email"' is not assignable to type 'keyof User'.
const key3: UserKeys = "age"; // 정상
const key4: UserKeys = "name"; // 정상

// ----------------------------------------
// typeof 연산자
const user = { name: '홍길동', age: 20 };

// `user`라는 값을 기반으로 타입을 생성
type User2 = typeof user; // { name: string; age: number }

const user2: User2 = {
  name: '둘리',
  age: 30,
};

// -------------------------------------------------------------------
// indexed excess type 인덱스드 엑세스 타입 
// - 객체, 배열, 튜플의 특정 요소나 속성의 타입을 추출할 때 사용
// - 대형 API 명세에서 특정 데이터 타입만 추출할 때 용이함.
// - 객체의 구조가 변경되어도 인덱싱된 타입이 자동으로 업데이트되어 유지보수
// -------------------------------------------------------------------

// 객체 프로퍼티의 타입 추출
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    email: string; // add
  }
}

function printAuthorInfo1(author: {id: number, name: string}): void { // key의 key를 접근하나하나 해주면 귀찮음.
  console.log(`${author.id}, ${author.name}`);
}

function printAuthorInfo2(author: Post['author']): void {
  console.log(`${author.id}, ${author.name}`);
}

const post: Post = {
  title: '제목',
  content: '내용',
  author: {
    id: 1,
    name: '홍길동',
    email: 'myungsoo8504@gmail.com'
 }
} 

printAuthorInfo1(post.author);
printAuthorInfo2(post.author);

// ----------------------------------------------------------------
// 배열 요소의 타입 추출 : 상수로 사용하다가 union으로 추출하고 싶을 때.
// enum type 하나씩 바꿔줄 때 문제가 많아서 유지보수를 위해 사용
const COLORS = ['red', 'green', 'blue'] as const;
type Color = typeof COLORS[number]; 
// 배열의 값들을 유니온 타입으로 한 번에 추출
// type Color = 'red' | 'green' | 'blue';


// -------------------------------------------------------------------------------------------------------
// 튜플의 요소 타입 추출. 배열의 요소 전부 다 지정해준 애. 한 배열안에 여러 타입이 많으면 헷갈림. 한 배열 = 한 타입 추천
// 특정 인덱스로 추출
type Tuple = [number, string, boolean];
type Tuple1 = Tuple[0]; // number
type Tuple2 = Tuple[1]; // string
type Tuple3 = Tuple[2]; // boolean
// 모든 요소를 유니온으로 추출
type Tuple4 = Tuple[number]; // number | string | boolean

// ------------------------------------------------------------------------
// 맵드 타입 (Mapped Types) : - 기존의 타입을 기반으로 새로운 타입을 일괄 생성할 때 사용
// - `for...in` 루프와 유사한 문법을 사용하여 타입을 순회
type User3 = {
  id: number;
  name: string;
  age: number;
  gender: 'M' | 'F';
}

type User4 = {
  id?: number;
  name?: string;
  age?: number;
  gender?: 'M' | 'F';
}
// 결과: { id?: number; name?: string; age?: number; }

// 모든 속성을 optional로 변경 
type OptionalUser = {
    [K in keyof User3]?: User3[K] | undefined;
}

// 모든 속성을 readonly로 변경
type ReadonlyUser = {
    readonly [K in keyof User3]: User3[K];
}

// 결과: { readonly id: number; readonly name: string; readonly age: number; }


// --------------------------------------------
// 템플릿 리터럴 타입 (Template Literal Types)
// string literal type을 조합해서 새로운 string literal 타입을 생성
type Color2 = 'pink' | 'hotPink' | 'skyBlue';
type Intensity = 'light' | 'dark'
type ColorTheme = `${Intensity}-${Color2}`; // 클래스 명 너무 좋다ㅜ 다 타입 지정 시. css - 공통 이름 다 만들 수 있음
// 두 유니온 타입이 조합된 새로운 문자열 타입 생성
// 결과: 'light-light' | 'light-dark' | 'dark-light' | 'dark-dark' | 'green-light' | 'green-dark'

