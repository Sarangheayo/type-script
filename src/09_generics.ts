// ----------------------------------------------------------------------------------------
// Generics ? 
// 함수나 클래스를 정의할 때 타입을 미리 확정 짓지 않고, (선언, 정의 시 : number X )
// 사용하는 시점에 타입을 파라미터로 전달받아 외부에서 지정하는 기법(객체 =  함수, class 다 가능)
// 다이아몬드 연산자 <> 안에 타입 명을 기재하여 표기(e.g,: T, M, N / 넘버 X, 아님. V… 새로 생성함)
// ----------------------------------------------------------------------------------------

// generic 함수 : 어떤게 오더라도 대응하기 위함
// 일반적인 함수일 경우
// 
function fncNormal(val: any) {
    return val;
}
let num1 = fncNormal(10); // any
num1.toUpperCase(); // any type = 오류 감지 불가

let str1 = fncNormal('1'); // any
let bool1 = fncNormal(true); // any

// generic 함수를 이용해서 함수로 만들 경우 : 어떤게 오더라도 대응하기 위함
function fncGeneric<T>(val:T): T {
    // 외부에서 타입 지정해줄거고, 파라미터, 리턴타입 전부 T로 갈거다.
    return val;
}
let num2 = fncGeneric(10);
// num2.toUppercase(); // Error: Property 'toUppercase' does not exist on type 'number'.

let str2 = fncGeneric('1');
let bool2 = fncGeneric(2>0);

// 뜬금 method 공부 타임! 
bool2.valueOf(); // valueOf? 객체(Object)가 가지고 있는 원시값(Primitive Value)을 반환
// 이 변수가 가진 진짜 값(알맹이)을 줘!" 라고 하는 메서드
// 사용 예시 valueOf method
const bool3 = new Boolean(true);
console.log(typeof bool3); // "object" (객체임)

const primitiveValue = bool3.valueOf();
console.log(typeof primitiveValue); // "boolean" (이제 진짜 true/false 값임)

// -------------------
// generic interface
// -------------------

// normal interface
interface DropBox1 {
    val: number;
    selected: boolean;
}
const dropBox1: DropBox1 = { val: 10, selected: true }; // or true. // val 주입 값: number라서 타입 바꿀 수 없음

// generic interface
interface DropBox2<T> {
    val: T;
    selected: boolean;
}
const dropBox2: DropBox2<string> = { val: '10', selected: true  };
const dropBox3: DropBox2<number> = { val: 10, selected: true  }; // selected에도 number로 줬으니 값 바꿔주기
const dropBox4: DropBox2<boolean> = { val: true, selected: true };

// 복수의 generic
interface DropBox3<T, U> {
    val: T;
    selected: U;
} 
const dropBox5: DropBox3<string, number> = { val: '10', selected: 10 };
const dropBox6: DropBox3<number, boolean> = { val: 10, selected: true };
const dropBox7: DropBox3<boolean, string> = { val: false, selected: '호헤헿' };

// T랑 U.. 엄청 많이 쓸 수 있다. 복수 계속 가능
interface DropBox4<T, U, V, X, Y, Z> {
    val: T;
    selected: U;
    name: V;
    content: X,
    title: Y, 
    desc: Z;
}

// ------------------------------------------------------------------------------------------------
// 클래스에서의 제네릭: 배열은 타입 정의 후 하나의 타입만 가져가는 것이 좋음. 여러 타입이 한 배열 안에? X
// ------------------------------------------------------------------------------------------------
class BoxNormal {
    public kinds: string[] = [];

    public add(val: string): void {
        this.kinds.push(val);
    }

    public toString(): string {
        return this.kinds.toString();
    }
}
const boxNormal: BoxNormal = new BoxNormal();
boxNormal.add('test');
// boxNormal.add(1); //Argument of type 'number' is not assignable to parameter of type 'string'.
console.log(boxNormal.toString());

// 외부에서 주입받은 "T"로 kinds의 타입 = T의 배열로 만들겠다. 
class BoxGeneric<T> {
    public kinds: T[] = [];

    public add(val: T): void {
        this.kinds.push(val);
    }

    public toString(): string {
        return this.kinds.toString();
    }
}
const boxGeneric: BoxGeneric<number> = new BoxGeneric();  // 인스턴스 선언 시 타입 생략 가능 // new BoxGeneric"<number>"(); 
boxGeneric.add(1); // 숫자 넣을 수 있음
const boxGeneric2: BoxGeneric<string> = new BoxGeneric();
boxGeneric2.add('2'); // 문자열 넣을 수 있음
const boxGeneric3: BoxGeneric<boolean> = new BoxGeneric();
boxGeneric3.add(true); // boolean 넣을 수 있음

// 클래스는 타입 상관없이 하나만 만들고, 내가 인스턴스 할 때 외부에서 주입 받는 타입으로 줄 수 있음

// -----------------------------------------------------------------
// 제네릭 제약 조건 (Constraints) : 특정 조건을 만족하는 타입만 받도록 제한
// -----------------------------------------------------------------
 interface RequiredLength {
    length: number;
}

// T는 반드시 RequiredLength타입이어야 함 (`length`라는 속성을 가져야함)
function getLength<T extends RequiredLength>(arg: T): number{ // extends RequiredLength 를 무조건 가지고 있어야해! 
  return arg.length; // Property 'length' does not exist on type 'T'. = 안전하지 않을 수 있어!
}
getLength([1, 2, 3]); // 정상
getLength('Banana'); // 정상

// `length` 속성이 없는 값이므로 에러
// getLength(1); // Error: Argument of type 'number' is not assignable to parameter of type 'RequiredLength'.

// extends RequiredLength 를 무조건 가지고 있어야해! - 특정 제약 줄 수 있음 e.g. 무조건 length 있어야 해! 이것처럼
