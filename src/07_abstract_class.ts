// -------------------------
// 추상 클래스(Abstract Class) ?
// 스스로는 객체를 생성할 수 없는 미완성된 설계도
// 오직 자식 클래스에게 상속(extends)되어 공통된 기능을 물려주거나, 특정 기능을 구현하도록 강제하기 위해 존재
// -------------------------
abstract class Mammal {
    constructor(
        protected name: string,
        protected residence: string,
        protected age: number,
        protected weight: number
    ) {
        this.name = name;
        this.residence = residence;
        this.age = age;
        this.weight = weight;
    }
    // 일반 메소드
    public breath(): void {
        console.log(`${this.name}이/가 숨을 쉰다.`);
    }
    
    // 추상 메소드 : 반드시 자식쪽에서 오버라이딩 해야 하는 메소드
    // like 미완성된 설계도 : 부모쪽에서는 얘를 어떻게 쓸지 정확히 모름. 
    // 반드시 니가 사용할 때는 새로 정의해서 써! 누락방지용
    abstract printResidence(): void;
}
 
// const Mammal: Mammal = new Mammal(); // Error: Cannot create an instance of an abstract class.
// 추상 클래스는 단독으로 instance 생성이 불가하다. 부모가 되어서 자식에게 물려주거나 강제로 넣으라고 알려주는 용도

// 반드시 부모의 추상 메소드를 반드시 오버라이드해서 구현해야지 오류가 나지 않는다.
class whale extends Mammal {
    override printResidence(): void {
        console.log(`${this.name}의 거주지: ${this.residence}`);
    }
}
   // Non-abstract class 'whale' does not implement inherited abstract member printResidence from class 'Mammal'.