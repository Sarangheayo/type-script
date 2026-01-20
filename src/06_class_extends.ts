// --------------------------------
// 클래스 상속
// --------------------------------

// 연관 있는 클래스에 대해 공통적인 구성 요소를 정의하여 부모 클래스를 작성
// 연관 있는 클래스끼리 묶으려면 하나하나 공통적 특성으로 묶어주기 : 추상화(abstraction)
// 동물
// 포유류
// 고래 고릴라 고등어
// 다중 상속 금지! 
// 클래스 간에 부모 자식관계가 형성
// 추상화를 통해 코드 중복 제거 및 재사용성 증가
// 부모 클래스의 필드나 메소드를 자식 클래스에서 상속받아 호출하거나 재정의 가능
// 상속은 단 하나의 클래스만 가능 (다중상속 X)

class Mammal {
    constructor( 
        protected name: string,
        protected residence: string,
        protected age: number,
        protected weight: number
        ) {
            console.log('--- 생성자 호출: 부모(Mammal) 생성 ---');
        }

        public breath(): void {
            console.log(`${this.name}이/가 숨을 쉰다.`);
        }
        public move(): void {
            console.log(`${this.name}이/가 움직인다.`);
        }
        public eat(): void {
            console.log(`${this.name}이/가 먹는다.`);
        }
}

class Whale extends Mammal {
    constructor(name: string, residence: string, age: number, weight: number) { 
        // 자식쪽에서 생성자, 메소드를 정의할 경우, 반드시 부모 생성자를 먼저 호출하고,
        // 후속처리를 해야 한다.
        super(name, residence, age, weight); 
        console.log('--- 생성자 호출: 자식(Whale) 생성 ---');
    }    

        // 오버라이딩: 부모에게 상속 받은 메소드를 자식이 재정의하여 사용하는 것
        // v4.3+부터 `override` 키워드를 메소드명 앞에 붙여 명시 (추천)
        override breath(): void {
            console.log(`${this.name}의 상세정보.`);
            console.log(`   - 거주지: ${this.residence}`);
            console.log(`   - 나이: ${this.age}세`);
            console.log(`   - 몸무게: ${this.weight}kg`);
            console.log('--------------------------------');
        }

        public swimming(): void {
            this.age;
            super.breath();
            console.log(`${this.name}이/가 수영한다.`);

        }
}

class FlyingSquirrel extends Mammal {
    // 자식쪽의 생성자를 생략할 경우, 자동으로 부모 생성자를 호출
   public flying(): void {
       console.log(`${this.name}이/가 날아간다.`);
       console.log(this.age);

   }    
}
const whale: Whale = new Whale('맹맹', '바다', 3, 200); // 각 this의 값을 줘야함
whale.breath(); 
whale.swimming();

const flyingSquirrel: FlyingSquirrel = new FlyingSquirrel('다람이', '산', 3, 2);
flyingSquirrel.breath();
flyingSquirrel.flying();


// --------------------------------
// 오버라이딩 
// --------------------------------