// ---------------------------------------------------------------------------------------
// Conditional Types - 조건부 타입 : 특정 타입이 다른 타입에 하랑 가능한지에 따라 타입을 결정하는 것 
// ---------------------------------------------------------------------------------------
type IsNumber<T> = T extends number ? string : never;
type T3 = IsNumber<string>; // never
type T4 = IsNumber<number>; // string

type IsString<T> = T extends string ? (string | true) : (never | false); 
type T1 = IsString<string>; // string | true
type T2 = IsString<number>; // false

// ---------------------------------------------------
// 분산적 조건부 타입 (Distributive Conditional Types)
// 제네릭에 유니온 타입을 전달하면, 유니온 타입의 각 요소를 하나씩 떼어내서 조건부를 적용하고 다시 합치는 타입
// 특정 타입을 유니온에서 제거하는 예제
// ----------------------------------------------------
type Exclude<T, U> = T extends U ? never : T;
type Result = Exclude<string | number | boolean, number>;
// 1. string extends number ? never : string  => string
// 2. number extends number ? never : number  => never
// 3. boolean extends number ? never : boolean => boolean
// 결과: string | never | boolean => string | boolean


// ---------------------------------------------------
// infer 키워드 
// 조건부 타입의 extends 절에서 특정 타입을 추론(Inference)하여 변수처럼 추출해낼 때 사용
// 함수의 리턴 타입, 배열의 요소 타입 등을 추출하여 변수 타입으로 사용 할 때 유용

// -------------------------------------
// 함수의 반환 타입을 추출하는 유틸리티
// -------------------------------------
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
function getName() { return '최설아'; }
getName(); // string

type GetNameReturnType = GetReturnType<typeof getName>; // 함수 타입  : "() => string" -> T에 들어가기 extends = 체킹하는 타입 조건부로 체킹하는 타입 : (...args: any[]) => infer R ? R : any;

// -------------------------------------
// 배열의 요소 타입을 추출하는 유틸리티
// -------------------------------------
type UnpackArray<T> = T extends (infer U)[] ? U : never;
type strArr = UnpackArray<string[]>;
type numArr = UnpackArray<number[]>;
type boolArr = UnpackArray<boolean[]>;
type sArr = UnpackArray<'wfrrr'>;

type GetElementType<T> = T extends (infer R)[] ? R : any;

type strArr2 = GetElementType<string[]>;
type numArr2 = GetElementType<number[]>;
type boolArr2 = GetElementType<boolean[]>;
type sArr2 = GetElementType<'wfrrr'>;