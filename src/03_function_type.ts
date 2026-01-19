// ------------------------------
// 함수의 타입 정의 
// ------------------------------

// 함수 선언식
function sum(a: number, b: number): number {
//| string | boolean | void | undefined | null | object | bigint | symbol{
    return a + b;
}

// 함수 표현식  
const sum2 = (a: number, b: number): number => {
    return a + b;
}

const sum3 = (a: number, b: number) => a + b;


// optional parameter : 선택적 파라미터
function print1(name: string, age?: number):void {
    console.log(`${name}의 나이는 ${age}입니다.`);
}
print1('홍길동');
print1('홍길동', 20);

// default parameter : 기본값이 설정된 파라미터, 필수 파라미터가 선택적 파라미터보다 뒤에 작성되면 안된다.A required parameter cannot follow an optional parameter.
// function print2(name: string, age?: number, gender: string) {
    //console.log(`${name}의 나이는 ${age}입니다.`);
// }
// print2('홍길동'); 
// }

// ------------------------------
// Rest 파라미터
// ------------------------------

function sumAll(...numbers : number[]): number {
    let sum = 0;
    for (let i = 0; i <= (numbers.length -1); i++) {
        sum += numbers[i] as number; // 비어있지 않다는 것 알려주기      
    }; // 초기값 0부터 시작, 
    return sum;
}
sumAll(1);
sumAll(1, 2);
sumAll(1, 2, 3);
sumAll(1, 2, 3, 4);
sumAll(1, 2, 3, 4, 5, 6);

function sumAll2(...numbers : number[]): number {
    // [1, 2, 3 ....]
    // let sum = 0;
    // for (const val of numbers) {
    //     sum += val;
    // }
    // return sum;
    return numbers.reduce((acc, cur) =>  acc + cur);
}
sumAll2(1);
sumAll2(1, 2);
sumAll2(1, 2, 3);
sumAll2(1, 2, 3, 4);

// ------------------------------
// 함수 타입 표현식
// ------------------------------
const add = (a: number, b:number): number => a + b;
const sub = (a: number, b:number): number => a - b;
const mul = (a: number, b:number): number => a * b;
const div = (a: number, b:number): number => a / b;

// 위의 코드를 함수 타입 표현식으로 정의
type Oper = (a: number, b: number) => number;
const addEx: Oper = (a, b) => a + b;
const subEx: Oper = (a, b) => a - b;
const mulEx: Oper = (a, b) => a * b;
const divEx: Oper = (a, b) => a / b;


// ------------------------------
// 호출 시그니처 : Call signature 함수도 1급 객체이므로 우리가 정의한 객체 안에,
// type안에 함수의 형태를 기술하는 방식. 정의구를 줄 수 있음.
// ------------------------------

type Animal = {
    (name: string): void; // 함수의 호출 시그니처
    age: number;
}
const human: Animal = (name) => console.log(name);
human.age = 20;

type Animal2 = {
    (name: string): void; // 함수의 호출 시그니처
    age: number;
}
const dog: Animal2 = (name) => console.log(name);
dog.age = 3;

// ------------------------------
// 함수의 타입 호환성
// 어떤 함수를 다른 함수 타입에 할당할 수 있는지 판단하는 규칙
// ---------------------------------
// - 리턴의 타입 호환성 : upcasting일 때만 호환이 가능 
// ---------------------------------
type FunA = (num: number) => number;
type FunB = (num: number) => 10;

let funA: FunA = num => num;
let funB: FunB = num => 10;
funA = funB; // 가능
// funB = funA; // 불가능 TypeError 

// funA = funB;

// ---------------------------------------------
// - 파라미터의 타입 호환성: 다운캐스팅일 때 호환 가능
// ---------------------------------------------
type FunC = (num: number) => number; // 넓음
type FunD = (num: 10) => number; // 좁음
let funC: FunC = num => num;
let funD: FunD = num => num;
// funC = funD; // 불가능 Error
funD = funC; // 가능

funC(1);
funD(10);

// -------------------------------------------------------------------------
// 함수 오버로딩 : 하나의 함수명에 여러 개의 파라미터 조합을 선언하는 기능
// -------------------------------------------------------------------------
// 1. 오버로드 시그니처(선언부) : 구현부 없이 선언부만 만들어둔 함수

function addOver(a: number, b: number): number;
function addOver(a: number, b: number, c: number, d: number): number;


// 2. 구현 시그니처(구현부)
function addOver(a: number, b: number, c?: number, d?: number): number {
    if (typeof c === 'number' && typeof d === 'number') {
        return a + b + c + d;
    } else {
        return a + b;
    }
}
addOver(1, 2); // 결과 : 3
// addOver(1, 2, 3); // 결과 : 6 Error : 파라미터가 3개인 시그니처는 정의하지 않았으므로 에러 발생
addOver(1, 2, 3, 4); // 결과 : 10

// ------------------------------------------------------------------------------------
// 사용자 정의 타입 가드 : `is` 키워드를 활용해서 타입을 좁히는 방법(서로소 유나온 먼저하길 추천!)
// ------------------------------------------------------------------------------------
// type Cat = { meow: () => void };
// type Dog = { bark: () => void };


// function isCat(animal: Cat | Dog): animal is Cat { // is = true , false 반환
//     return (animal as Cat).meow !== undefined;
// }

// // function isDog(animal: Cat | Dog): animal is Dog {
// //     return (animal as Dog).bark !== undefined;
// // }

// function speak(animal: Cat | Dog) {
//     if (isCat(animal)) {
//         animal.meow();
//     } else {
//         animal.bark();
//     }
// }

// ----------------------------------------
// 서로소 유니언 버전 (Discriminated Union)
// ----------------------------------------

// 1. 각 타입에 식별자(tag) 속성을 추가합니다. (보통 type, kind 등을 씀)
type Cat = {
  type: 'cat'; // 이것이 핵심! "나는 고양이다"라는 이름표
  meoww: () => void;
};

type Dog = {
  type: 'dog'; // 이것이 핵심! "나는 강아지다"라는 이름표
  barkk: () => void;
};

// 2. 유니온 타입 정의
type UnionAnimal = Cat | Dog;

// 3. 사용하기 (isCat 함수 필요 없음)
function speak(animal: UnionAnimal) {
  // 'type' 속성만 검사하면 TypeScript가 알아서 추론해줍니다.
  if (animal.type === 'cat') {
    // 여기 들어왔다는 건 type이 'cat'이라는 뜻이므로
    // TypeScript는 이제부터 animal을 무조건 'Cat' 타입으로 취급합니다.
    animal.meoww(); 
  } else {
    // 'cat'이 아니면 남은 건 'dog' 뿐이므로
    // TypeScript는 animal을 무조건 'Dog' 타입으로 취급합니다.
    animal.barkk();
  }
}
