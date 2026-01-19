// -----------------------------------------------------
// TypeScript 타입 시스템: 집합론 (Set Theory), ts의 집합론
// -----------------------------------------------------
// number: -1, 0, 2, 5... 무한집합
// boolean: true, false 유한집합
// string: 'a', 'b' ...
// Type을 정의하는 것은 이 데이터가 가져야 할 최소한의 조건을 정의하는 것으로 제약 조건의 집합
// 다른 언어와의 차이 : 다른 애들은 명시적이나 ts는 객체 내부의 구조를 기준으로 타입을 결정하는 구조적 타입 시스템이다.

// TypeScript는 객체의 이름이 아니라 객체의 내부 구조(Property)를 기준으로 타입을 결정하는 구조적 타입 시스템(Structural Typing)
// 구조? - 대부분 property

// 아래의 타입들 중 부모 타입은 Animal이고, 이 때, Human과 Dog은 자식 타입
// Animal의 조건이 적으므로 넓은 범위 타입(Superset)
// name이란 애를 둘 다 가진 animal = human, dog의 superset - 넓은 범위 타입
// Human과 Dog은 조건이 좀 많으므로 좁은 범위 타입(Subset)

// Animal 타입의 조건 : 프로퍼티 `name`을 가지고 있어야 한다.
type Animal = {
  name: string;
}

// Human 타입의 조건 : 프로퍼티 `name`과 `lang`을 가지고 있어야 한다.
type Human = {
  type: 'HUMAN';
  name: string;
  lang: string;
}

// Dog 타입의 조건 : 프로퍼티 `name`과 `age`을 가지고 있어야 한다.
type Dog = {
  type: 'DOG';
  name: string;
  age: number;
}

// ----------------------------------------------------------------------------
// TypeScript Compatibility ( 타입 호환성 )
// A와 B 두 개의 타입이 존재할 때, A타입의 값을 B 타입으로 취급해도 괜찮은지 판단하는 것
// ----------------------------------------------------------------------------

let num1: number = 1; // Number 타입
let num2: 2 = 2; // Number Literal 타입

// Number Literal 타입은 Number 타입의 서브셋이므로 허용 가능
num1 = num2;

// // Number 타입은 Number Literal 타입의 슈퍼셋이므로 비허용 됨
// num2 = num1;

const dog : Dog = { name: 'hello kitty', age: 3, type: 'DOG'};
const animal: Animal = dog;
// animal = name 이 있으니 통과 ~~~~~

animal.name
// animal.age -> Property 'age' does not exist on type 'Animal'. 없다. 주소값을 참조하므로 

// TypeScript는 `Upcasting`은 허용하지만 `Downcasting`는 허용하지 않음
// Upcasting : 부모 타입을 자식 타입으로 취급하는 것 (TypeScript에서는 허용)

// const dog2: Dog = animal; // Downcasting은 비허용


// ----------------------------------------------------------------------------
// TypeScript 초과 속성 체크 (Excess Property Checks) 
// 객체 리터럴을 직접 대입하는 상황에서 실수 방지를 위해 더 엄격하게 체크
// 초과 속성 체크 에러는 파라미터에서도 동일하게 발생
// ----------------------------------------------------------------------------
// const animal2: Animal = { name: 'hello kitty', age: 3 };
// Object literal may only specify known properties, and 'age' does not exist in type 'Animal'.


// ----------------------------------------------------------------------------
// 타입 추론 (Type Inference) ? 
// : 명시적으로 타입을 적지 않아도 TypeScript가 코드를 분석해서 타입을 결정하는 기능
// : 일반 변수의 타입 추론
//   `let` 으로 변수를 선언하면 넓은 타입으로 추론
//   `const` 로 변수를 선언하면 좁은 타입으로 추론
// ----------------------------------------------------------------------------

// -----------------
// 일반 변수의 타입 추론
// -----------------
let num3 = 1; // number로 넓게 타입 추론
const num4 = 2; // number literal 2로 좁게 타입 추론


let fullName = '홍길동'; // string으로 자동 추론
const fullName2 = '홍길동'; // string literal '홍길동'으로 자동 추론

let age = 20;           // number로 자동 추론
const num = 10;         // 10 Number Literal로 자동 추론

// 객체의 타입추론 : 무조건 literal로 주니, 명시적으로 적어주는 것이 좋음.
let obj = { name : '홍길동', age : 20 };
// obj = { lang: 'ko', name: '홍길동', age: 20 }; // Object literal may only specify known properties, and 'lang' does not exist in type '{ name: string; age: number; }'.

// 구조 분해 할당의 타입 추론 -각각 값들에 맞게 : [number, string, boolean 얘네 작성 안해도 추론해 줌
let [num5, str5, bool5]: [number, string, boolean] = [1, 'str', true]; // any[]

// -----------------
// 함수의 타입 추론
// -----------------
// 함수의 리턴 타입 추론
function test1 (a: number, b : number) {
    return a + b;
}

// --------------------------------------------------------
// 함수의 파라미터 타입 추론
// --------------------------------------------------------
// 기본값이 설정된 파라미터의 타입 추론
// 기본적으로 함수는 const로 만들어지지 않으므로 기본값인 string!
// --------------------------------------------------------
function test2(msg = 'test') {
    return 'hi';
}

// ------------------------------------------------------------------------
// 최적 공통 타입(Best Common Type) 추론
// ------------------------------------------------------------------------
// 다양한 타입의 요소를 담은 배열을 변수의 초기값으로 설정하면 최적 공통 타입으로 추론
// 생략하지마세요. 다 사용하세요. 안정성을 위해 적어주는 것이 나음
// (string | number | boolean)[]
let arr: (number | string | boolean)[] = [1, '2', true];
// arr
let bct = [1, 'hi', true];


// ------------------------------------------------------------------------------------------------------
// 타입 단언 (Type Assertions) : 개발자가 해당 타입에 대해 더 확실한 정보를 가지고 있을 때,
// ts 컴파일러에게 특정 타입을 강제로 지정하는 기능. 타입 단언은 타입 변환이 아니므로 주의! 
// * 슈퍼 타입 또는 서브 타입이 아닌 무관한 타입으로는 단언 불가능 (예: string 타입을 number 타입으로 단언은 불가능)*
// ------------------------------------------------------------------------------------------------------

let num10 = 10 as never; // 정상 
let num6 = 10 as never;   // 정상 
let num7 = 10 as unknown; // 정상
// let num8 = 10 as string;  // Error: Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

const main = document.getElementById('main') as HTMLElement;
const main2 = <HTMLElement>document.getElementById('main')
// 둘 다 타입이 안 정해져 있음 html = 무조건 HTMLElement야! 이렇게 가능. 가끔 프론트에서 있음. 

// ----------------------------------------------------------------
// Non-null 단언 연산자: 값이 null이나 undefined가 아님을 확신할 때 사용
// !. like ?. 
// ----------------------------------------------------------------

type User = {
  name: string;
  age?: number;
  // age = optional property age 
};

const user: User = {
  name: 'Hong'
};

user.name.toString();
user.age!.toString();
// user.age.toString(); - 단언! 확실히 아니라고 적으면 에러 안 뜸. 실수로 문제 발생 가능 - 타입 단언 최대한 쓰지마.
// 사용하고싶으면 타입 좁히기 사용하세요!  

let user2: User = {
  name: 'Hong'
};

// // null 또는 undefined일 가능성이 있으므로 에러 발생
// const age1: number = user.age.toString(); // Error: 'user.age' is possibly 'undefined'.

// // age가 null 또는 undefined이지 않다는 단언을 통해 오류 발생 안함
// const age2: number = user.age!.toString();


// ----------------------------------------------------------------
// const 단언 : 모든 프로퍼티가 readonly를 갖도록 단언 가능
// ----------------------------------------------------------------

let user3 = {
  name: 'Hong',
  age: 50,
} as const;

user.name = 'test'; // Error: Cannot assign to 'name' because it is a read-only property.

// -----------------------------------------------------------------------
// 타입 좁히기 (Type Narrowing) : 여러 타입이 섞여 있는 상황에서, 조건문을 통해 
// 특정 범위로 타입을 제한하여 안전하게 속성이나 메서드를 사용하는 과정
// 분기문, return, 타입 가드 등을 통해 타입 좁히기를 수행
// 안전한 코드를 위해 타입 단언보다 타입 좁히기를 먼저 사용하는 것을 고려할 것
// typeof null은 object를 반환하므로 주의! 
// void =  화면에 출력만 하고 끝남. 값을 뱉어내지(return) 않음.
// -----------------------------------------------------------------------
function printVal(val: number | string | null): void {
  if (typeof val === 'number' ) {
    console.log(val.toFixed(2));
  } else if (typeof val === 'string') {
    console.log(val.toUpperCase());
  } else {
    console.log('null');  
  }
}

// 객체의 타입 좁히기 : 객체의 속성 유무로 좁히기 (in 연산자)
function whatIsKinds(animal: Human | Dog) {
  if('lang' in animal ) {
    animal.lang; // lang이 있다면 human인게 확정이니 자동으로 다음 else에는 age method 접근, 연산 가능
  } else {
    animal.age;
  }
}

// 클래스 인스턴스 좁히기 : 'instanceof' 연산자 
class Dog2 {bark: string = '멍멍멍!';}
class Cat2 {meow: string = '냥냥냥!';}

function chkClass(animal: Dog2 | Cat2) {
    if ( animal instanceof Dog2 ) {
        animal.bark;
    } else {
        // animal.bark : Property 'bark' does not exist on type 'Cat2'.
        animal.meow;
    }
}

// -----------------------------------------------------------------------------------------------
// 서로소 유니온 discriminated Union 을 통해 좁히기, 보기에 좀 더 쉬움
// 교집합이 없는(서로소) 타입들을 합친 유니온 타입
// 공통된 이름의 식별자를 부여하여, TypeScript가 타입을 아주 쉽고 완벽하게 좁힐 수 있도록 돕는 강력한 패턴
// -----------------------------------------------------------------------------------------------
function test3(animal: Dog | Human) {
    if (animal.type === 'HUMAN') {
        animal.lang;
    } else {
        animal.age;
    }
}