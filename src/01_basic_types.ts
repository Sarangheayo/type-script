// 타입 정의 방법

let num: number = 12;
let str: string = '1';
let bool: boolean = true;

// number(정수형) 타입
let decimal : number = 6;
let hex : number = 0xf00d;
let nan : number = NaN;
let infinity : number = Infinity;
let big : bigint = 100n; // (ES2020+ 지원)

// number(실수형) 타입
let binary : number = 0b1010;
let octal : number = 0o744;
let floatingPoint : number = 3.14;

// string(문자열) 타입
let color : string = 'blue';
let color2 : string = 'red';
let fullName : string = `welcome to sara website`;

// Literal(리터럴) 타입
let numLiteral : 2 = 2;
let strLiteral : 'sara' = 'sara';
let boolLiteral : boolean = 100 > 99;
let boolLiteral2 : true = true;
let boolLiteral3 : false = false;
let bigLiteral : 100n = 100n;

// Array(배열) 타입
// 배열 요소 타입 ([]) 방식
let numList : number[] = [1, 2, 3, 4, 5];
let strList : string[] = ["a", "b", "c"];
let boolList : boolean[] = [true, false, true];
let bigList : bigint[] = [100n, 200n, 300n];

// 배열 요소 타입 (<제네릭>)
let numList2 : Array<number> = [1, 2, 3, 4, 5];
let strList2 : Array<string> = ["a", "b", "c"];
let boolList2 : Array<boolean> = [true, false, true];
let bigList2 : Array<bigint> = [100n, 200n, 300n];

// 뜻: 이 배열 안에는 '숫자 배열'이나 '이중 숫자 배열'이 들어갈 수 있다.
let dimensionalList : number[][][] = [
    [ // 애도 하나의 배열, 0,
        [1, 2, 3], // 얘도 하나으 ㅣ배열 0,1,2
        [4, 5, 6]  // 얘도 하나의 배열 0,1,2
    ],
    [
        [7, 8, 9],
        [10, 11, 12]  // 12번에 접근하고 싶다면? - 1,1,2
    
    ],
    [
        [7, 8, 9],
        [10, 11, 12]
    ]
];

// union(타입을 제한하는 법)
// 이 배열 안에는 숫자도 들어갈 수 있고, 문자도 들어갈 수 있어." (가장 많이 쓰는 형태)
let multiList : ( number | string )[] = [1, '2'];

// Tuple(튜플) 타입 : 길이와 타입, 순서가 "고정"된 배열. 배열의 subtype
let x : [number, number] = [1,1]; // 숫자면 숫자, 타입이 같아야 함
let y : [number, string] = [1, '2']; // 길이가 다름: 2개만 넣기로 약속함
let Z : [Array<number>, number, boolean] = [[1,2,3], 1234, true]; // 순서가 다름: 숫자가 먼저 옴
let a : [number[], number, boolean] = [[1,2,3], 1234, true];

// object(객체) 타입 - 에러가 안나서 Object는 안 쓰고
Object
let obj: object = {};
let arr: object = []; // 배열이 Object를 상속받는 객체 중 하나.
let func : object = function() {}; // 함수도 1급 객체임
let obj2 : object = new Date(); // js에서 이미 만들어둔 date 객체도 객체임

let obj3 : object = { name : '1', age : 20 };
// obj3.name 부모가 name이란 걸 안가지고 있어서 안돼. 

let obj4 : { name: string, age: number } = { name : '홍길동', age : 25 };
// 객체의 형태 자체의 타입을 정의해주면 됨
obj4.name;
obj4.age;
// obj4.genter (X) Property 'genter' does not exist on type '{ name: string; age: number; }'.

interface User0 {
    name: string;
    age: number;
    gender?: string;
}

let obj5 : User0;
obj5 = { name : '홍길동', age : 25 };

// optional(선택적) property : 프로퍼티명 뒤에 '?' 를 붙여서 설정
// readonly(읽기전용) property : 프로퍼티명 앞에 'readonly' 를 붙여서 설정 / 그 property는 변경 불가
let obj6 : { 
    readonly name: string, 
    age: number, 
    gender?: string 
};
obj6 = { name : '홍길동', age : 25 };
obj6 = { name : '홍길동', age : 25, gender : 'M' }; // gender 넣어도 안넣어도 에러 안남
// obj6.name = 'ttt' X = Cannot assign to 'name' because it is a read-only property.

// --------------------
// null & undefined 타입, 
// --------------------

// `strict` 모드 일 경우: 'any', 'unknown', 'null'에만 할당 가능
// `strict` 모드가 아닐 경우: 모든 타입에 할당 가능
// let numNull : number = null; Type 'null' is not assignable to type 'number'.
let numUndefined : any = undefined;
let numNull : unknown = null; 
let numNull2 : null = null;
let numUndefined2 : undefined = undefined;

let objNull :  { name : string, age : number } | null  | undefined = null; 
// Type 'null' is not assignable to type '{ name: string; age: number; }'.


// ---------------------------------
// Type Alias : 사용자가 정의하는 타입
// 선언할 때 변수명의 첫글자는 PascalCase(대문자로 시작) 
// ---------------------------------

type User = {
    name: string;
    age: number;
    gender?: string;
}

const obj7 : User = { name : '홍길동', age : 25 };
const obj8 : User = { name : '홍길동', age : 25, gender : 'M' };


// -------------------------------------------------------------
// Index Signature : 객체의 타입을 유연하게 정의할 수 있도록 돕는 문법
// -------------------------------------------------------------
type LangCodes = {
    KOREA: string;
    USA: string;
    JAPAN: string;
};

type LangCodes2 = {
    [key: string]: string;
    KOREA: string; // 반드시 포함되어야 하는 프로퍼티인 경우 직접 명시 (library 만들면 사용)
}

const langCodes : LangCodes2 = {
    // KOREA : 'ko'? = Property 'KOREA' is missing in type '{ USA: string; JAPAN: string; CHINESE: string; FRENCH: string; }' but required in type 'langCodes2'.
    KOREA : 'ko',
    USA : 'en',
    JAPAN : 'ja',
    CHINESE : 'cn',
    FRENCH : 'fr',
    // GERMAN : 2, Type 'number' is not assignable to type 'string'.
    GERMAN : 'de'
}

// ----------------------------------------------------------------------
// Enum(열거형) 타입 : 여러 값들에 각각 이름과 특정 값을 부여해두고 사용하는 독립적인 타입
// ----------------------------------------------------------------------
// 특정 값 세팅 안하는 편 : enumeration - 열거하는 친구 - 정의하는 순서도 중요함
// transfile = 해석이 가능하다면? - ts = 파일이란 js 시스템을 얹어 만든, 특정 패턴을 js 라이브러리 제작 가능

enum Role {
    // 값은 정의한 순서대로 0부터 idx 자동으로 할당됨
    USER,  // index 번호를 가집니다 0
    GUEST, // 1
    ADMIN, // 2 
}

const user1 = {
    name : 'sarachoi',
    role : Role.ADMIN  //2
}

const user2 = {
    name : 'sara',
    role : Role.GUEST  // 1
}

const user3 = {
    name : 'hello kitty',
    role : Role.USER // 0
}

// 값을 별도의 고정값으로 지정해서도 사용 가능
enum Role2 {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}

const User3 = {
    name : 'sarachoi',
    role : Role2.ADMIN, // admin
}

const User4 = {
    name : 'sara',
    role : Role2.GUEST, // guest
}

const User5 = {
    name : 'hello kitty',
    role : Role2.USER, // user
}

// -------------------------------------------------------------
// any 타입 : 모든 타입 허용 , 남용 X, ts 하는 이유가 없어질 수 있음.
// -------------------------------------------------------------
let anyval: any = 1;
anyval = 1;
anyval = '1';
anyval = true;

// -------------------------------------------------------------------
// unknown 타입 : 모든 타입 허용, 어떤 타입인지 모르기 때문에 함부로 연산 불가
// -------------------------------------------------------------------

let val1 : any = 10;
let val2 : unknown = 10;

// val2.length; // Property 'length' does not exist on type 'unknown'.
// 만들고자하는 전체 로직 = 연산, 특정 값, 특정 property 접근하는 자체가 연산이므로 연산 불가.
// length - any = array일 수 있으니, 가능. unknown = 뭐가 올 지 모르니 맘대로 연산은 할 수 없어.

// any : 연산 가능
// unknown : 연산 불가능 (when) = 외부에서 값을 전달받아야 하는 경우 많음 : 
// //any .... 모든 타입 허용
//런타임 - 실행시점에 문제 생김

// val - 휴먼에러 줄일 수 있음 -> 어떤 값인지 잘 모르면 unknown이 더 안전해. 쓰세요

if (typeof val2 === 'string') {
	val2.length; // ts가 정상인 것으로 체크 가능
}

// ---------------------------------------------------------------------------------
// void 타입 : `undefined`만 할당이 가능한 타입, 리턴 타입이 없는 함수에서 리턴 타입으로 사용
// ----------------------------------------------------------------------------------
function test(): void {
    console.log(`test!!!`);
    // return; js는 리턴값이 없을 때 기본적으로 `undefined`으로 할당
}


// ------------------------------------------------
// Algebraic type (대수) : 복수 타입을 합성해 만드는 타입 
// ------------------------------------------------
// Union : 합집합 / 복수의 타입을 허용하고 싶을 때, `|` 를 통해 타입을 구분 '확신할 수 없을 때 제한하는 범위 a? b? ab? hummm....'
// Union 사용 시 주의 사항

// 1. 시점에 따라서 사용 범위가 달라진다.
//  1-1  타입 할당(선언) 시 : `A` | `B`의 필수 프로퍼티를 모두 가지고 있거나, 
//         `A` | `B`의 모든 프로퍼티를 가지고 있으면 타입 검사 통과
let unionNumeric : number | string;
unionNumeric = 1;
unionNumeric = '1';
// unionNumeric = true; Type 'boolean' is not assignable to type 'string | number'.

unionNumeric.length; // Property 'length' does not exist on type 'string | number'.
//  1-2  타입 사용(연산) 시 :  `A` | `B`가 공통적으로 가진 프로퍼티만 사용 가능
if (typeof unionNumeric === 'string') {
    unionNumeric.length; // number 엔 length가 없으니. 
}

// Union 타입에서의 객체 
type Human = {
    name: string;
    lang: string;
}
type Dog = {
    name: string;
    age: number;
}
type Animal = Human | Dog; // Animal type : Union type

let test1: Animal = {
    name: 'sara',
    lang: 'ko',
};
let test2: Animal = {
    name: 'hello kitty',
    age: 3,
};
let test3: Animal = {
    name: 'sara',
    lang: 'ko',
    age: 3,
};
test3.name; // human, dog 누구나 다 와도 ㄱㅊ 
// test3.lang; // human, dog 누구나 다 와도 ㅇㄱㅊ - 거절 
// test3.age; // human, dog 누구나 다 와도 ㅇㄱㅊ - 거절

// Type '{ name: string; lang: string; age: number; }' is not assignable to type 'Animal'.
// let test4: Animal = {
//    name: 'bj',
//}; // Type '{ name: string; }' is not assignable to type 'Animal'.
// 얘는 하나만 연결해주니 안 됨.


// -------------------------------------------------------------------
// Intersection : 교집합 : 복수의 타입을 조합하는 경우 `&`기호로 타입을 구분
// -------------------------------------------------------------------
type Human2 = {
    name: string;
    lang: string;
    age: number;
}
type Dog2 = {
    name: string;
    age: number;
}
type Animal2 = Human2 & Dog2; // Animal type : Intersection

// 할당 시점: 각 타입의 모든 프로퍼티를 가지고 있어야 통과
const Animal3: Animal2 = {
    name: 'sara'
    , lang: 'ko'
    , age: 3    
};

// 사용 시점: 각 타입의 모든 프로퍼티에 접근 가능
Animal3.name;
Animal3.lang;
Animal3.age;

// ----------------------------------------------------------
//  never 타입 : 절대 발생하지 않아야 하는 불가능의 의미를 가진 타입
// ----------------------------------------------------------
type Color = 'red' | 'blue';

function getFlower(val: Color): string {
    if (val === 'red') {
        return 'Rose';
        } else if (val === 'blue') {
        return 'Bluebell';
        } else {
            return checkInfo(val);    
    }
}

function checkInfo(info: never): never {
    throw new Error(`타입 오류 : ${info}`);
}

type Color2 = 'pink' | 'white';

function getFlower2(val: Color2): string {
    switch (val) {
        case 'pink':
            return 'Rose';
        case 'white':
            return 'Tulip';
        default:
            return checkInfo2(val);
    }
}

function checkInfo2(info: never): never {
    throw new Error(`타입 오류 : ${info}`);
}

