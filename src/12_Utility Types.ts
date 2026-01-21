// -----------------------------------------------------------------------------
// Utility Types : 유틸리티 타입
// 이미 정의된 타입을 변형하여 새로운 타입을 만들 때 사용
// 제네릭, 맵드 타입, 조건부 타입 등을 활용/조합하여 타입 스크립트가 미리 만들어둔 유용한 기능들(유틸리티-Utility)
// 복잡한 타입 조작을 직접 구현하지 않고도 선언만으로 타입을 변형 가능
// -----------------------------------------------------------------------------

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    phone: string;
    gender?: 'M' | 'F';
    post: {
        title: string;
        content: string;
    }
}
// 특정 키, 옵셔널 정도지 크게 바뀔일 없음
// ---------------------------------------
// Partial<T> : 타입 T의 모든 속성을 옵셔널로 변경
type PartialUser = Partial<User>;

// ---------------------------------------
// Reqired<T> : type T의 모든 속성을 필수 속성으로 변경
type RequiredUser = Required<User>;

// ---------------------------------------
// Readonly<T> : type T의 모든 속성을 읽기 전용
type ReadonlyUser = Readonly<User>;

// ---------------------------------------
// Pick<T, K> : 타입 T에서 특정 속성 K들만 골라서 새로운 타입 작성
type PickUser = Pick<User, 'id' | 'email' >;

// ---------------------------------------
// Omit<T, K> : 타입 T에서 특정 속성 K들만 제외하고 나머지로 새로운 타입 작성
type OmitUser = Omit<User, 'id' | 'name' | 'email' | 'phone'>;
type OnlyUser = Omit<User, 'post'>;   

// ---------------------------------------------
// Exclude<T, U> 유니온 타입 T에서 U와 겹치는 타입을 제거하여 새로운 타입 작성
type ExcludeType = Exclude<string | boolean, string>; // boolean

// ---------------------------------------------
// Exclude<T, U> 유니온 타입  T에서 U와 겹치는 타입만 추출하여 새로운 타입 작성
type UnionType = string | number | boolean;
type ExtractType = Extract<string | boolean, string>; // string

// -------------------------------------------------------------------------------
// ReturnType<T> : 함수 T의 반환 타입(Return Type)을 추출하여 새로운 타입 작성
function getUser(): User {
    return {
        id: 1,
        name: '홍길동',
        email: 'myungsoo8504@gmail.com',
        age: 20,
        phone: '010-1234-5678',
        post: {
            title: '히힣',
            content: '내용내용내용내용' 
        }
        }
    }
type GetUserReturnType = ReturnType<typeof getUser>;
        
// -------------------------------------------------------------------------------------
// User 객체 안에 있는 post라는 중첩 객체(Nested Object) 안에서 title만 쏙 빼고 싶을 때! 
// 기존 post를 통째로 빼버리고(Omit), title이 제거된 새로운 post를 덮어씌우는(&)" 방식으로 작성
type UserWithoutPost = Omit<User, 'post'> & {
    post: Omit<User['post'], 'title'>;
}
const userWithoutPost: UserWithoutPost = {
    id: 1,
    name: '홍길동',
    email: 'myungsoo8504@gmail.com',
    age: 20,
    phone: '010-1234-5678',
    post: {
        content: '내용내용내용내용'
    }
}

// 1. User에서 'post'를 통째로 뺍니다. (Omit)
// 2. 그리고(&) 새로운 'post'를 덮어씌웁니다.
// 3. 새로운 'post'는 기존 post 타입에서 'title'만 쏙 골라낸(Pick) 형태입니다.

type UserWithOnlyPostTitle = Omit<User, 'post'> & {
    post: Pick<User['post'], 'title'>; // <--- 여기가 핵심!
}

// 사용 예시
const userWithTitle: UserWithOnlyPostTitle = {
    id: 1,
    name: '김철수',
    email: 'test@gmail.com',
    age: 25,
    phone: '010-0000-0000',
    post: {
        title: '제목만 있습니다',
        // content: '내용' // <--- Error! content는 Pick하지 않았으므로 못 넣습니다.
    }
}

