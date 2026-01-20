// -------------------------
// 객체들의 설계도 interface
// -------------------------
interface User {
    readonly id: number; // 읽기 전용
    name: string;
    age: number;
    gender?: string;
    // gender: 'M' | 'F -> Unterminated string literal. Error. 
}

const user4: User = {
    id: 1,
    name: 'sara',
    age: 25,
    gender: 'F'
};
// user.id = 2; - 역시 에러
// user4.name = Cannot assign to 'name' because it is a read-only property. Error 읽기 전용이라


type User2 = {
    name: string;
    age: number;
    gender?: string;
}

const obj9 : User2 = { name : '홍길동', age : 25, gender : 'M'}; // = type style
const obj10 : User2 = { name : '홍길동', age : 25 }; // class의 설계서로 사용 가능. 미리 값을 넣을 수는 없음

class ClassA implements User2 {
    name: string = '홍길동';
    // age: number = 25; -> Class 'ClassA' incorrectly implements interface 'User'. 
    // Property 'age' is missing in type 'ClassA' but required in type 'User'.
    // 타입도 클래스로
    age: number = 25;
    gender?: string = 'M'; 
}

// -----------------------------
// 객체들의 설계도 - interface 확장
// `extends = 상속`키워드를 사용해서 기존 인터페이스를 상속해서 확장해나가는 기법
// extends = 부모, 자식 class를 상속해서 만들 때 사용
// interface = extends를 엄청 많이 쓰기 보단 class를 많이 쓴다.
// -----------------------------

interface Animal {
    name: string;
}

interface Human extends Animal {
    age: number;
}

interface Douner extends Animal, Human {
    gender: string;
}
// 다중 상속 지양. intersection 사용이 나을 수도 있음.

// [변경 포인트] interface extends 대신 type과 & 연산자 사용
// Animal과 Human의 속성을 모두 가지고, 추가로 gender를 가짐
// type Douner = Animal & Human & {
    // gender: string;
// };

// 사용 예시
const myDouner: Douner = {
    name: '도우너',  // from Animal
    age: 15,        // from Human
    gender: 'M'     // from { gender: string }
};

//const douner: Douner;
//douner.age = 20;
//douner.name = '홍길동';
//douner.gender = 'M'; // 다 접근해서 사용 가능.,

// ------------------------------------------
// 선언 병합 - Declaration Merging
// 동일한 이름으로 인터페이스를 다시 선언하면, 자동으로 하나로 병합
// 외부 라이브러리 확장 시 유용하게 사용 가능
// ------------------------------------------

interface Dog {
    name: string;
}

interface Dog {
    age: number; // ts - 추후 만든 프로퍼티가 합쳐짐
}

const dog: Dog = {
    name: 'hello kitty', // name만 적으면 안댐 
    age: 3,
    // gender: 'M'
    // age: 3 - Property 'age' is missing in type '{ name: string; }' but required in type 'Dog'.
}

// ----------------------------------------------------------------------------------------------------------------------------------------
// 객체 안에 정의된 함수들, class안에 정의된 함수들 - method

  interface Dog2 {
    // 함수 타입 프로퍼티 방식 -(Function Type Property)
    //  타입이 받는 타입과(animal - name) 조금만 다르더라도 통과 X - 타입 안정성이 높음. 깐깐하니 추천
    barking: (arg: Animal) => void;
  
    // 메소드 시그니처 방식 -Method Signature
    //  타입이 조금 다르더라도 받는 타입(animal - name)만 충족한다면 통과 - 관습적 설계 구조를 위해 사용할 때 있음.
    barking2(arg: Animal) : void;
}  
// ----------------------------------------------------------------------------------------------------------------------------------------
let humanBarking = (arg: Human) => console.log(arg.name);
const dog2: Dog2 = {
    // barking: humanBarking, 함수 타입 프로퍼티 방식이라 미통과.
    // barking2: humanBarking, 얘는 메서드 시그니처 방식이라 통과
    barking: (arg: Animal) => console.log(arg.name),
    barking2: humanBarking,
}   

// ------------------------------------------
// 메소드 오버로딩 - (Method Overloading)
// 똑같은 함수 안에서 프로퍼티의 데이터 타입 등 구조가 다른 것을 여러 개 정의해서 
// 사용하고 싶을 때, 여러개 구현해서 사용하는 것 : 이름은 같음. property구조는 다름 
// const 변수는 중복 안됨
// ------------------------------------------
interface Cat {
    // meow: () => void; // Error: Duplicate identifier 
    // meow: (arg: string) => void; 함수 타입 프로퍼티로는 메소드 오버로딩 안 됨
    meow(): void;
    meow(arg: string): void; // 메소드 시그니처 방식으로 메소드 오버로딩 가능
}

