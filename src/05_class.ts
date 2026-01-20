// ------------------------------------------------------
// Class : 객체를 정의하기 위한 집합, 타입으로도 사용 가능
// 클래스 명의 첫글자는 대문자로 작성 (PascalCase)
// 파일명은 클래스 명과 동일하게 작성.
// 기본적으로 한 시스템 내에서 클래스 명은 중복 되면 안 된다. (기능 한 부분 내에서만. 시스템 전체 아니고! 그 기능에서만!!)
// property = field, ts= 혼용, property - 함수 - Method
// ------------------------------------------------------

class Animal {  // User.ts , User // file name also exactly same with the class name 
    // Field(property) 정의
    // 정적 필드 , 지역 필드, instance 필드 등등으로 나뉨
    // 인스턴스 필드
    public name: string = '동물';
    // 정적 field = static field
    public static sName: string = 'static name';

    // ------------
    // method 정의
    // ------------
    // 인스턴스 메소드
    public getInstanceName(): string {
        return 'instance method';
    }
    
    // 정적 메소드
    public static getStaticName(): string {
        return 'static method';
    }
}


// 정적 필드 접근방법
// 광범위하게 쓰이는 애들 : EX 날짜 필드 같은 애만 사용
// Instance field, instance method 로 사용 多
// animal.sName;  // Error: 스태틱 메소드는 인스턴스 변수에 접근 불가
Animal.sName; // static field 사용법 - 바로 class에 접근해서 사용 - 정적 필드가 너무 많으면 메모리 누수, 변경 불가라 많이 사용 X
Animal.getStaticName(); // static method 사용법
// animal.getStaticName(); // Error : Property 'getStaticName' does not exist on type 'Animal'. Did you mean to access the static member 'Animal.getStaticName' instead?


// 인스턴스 필드
const animal: Animal = new Animal();
animal.name;
animal.getInstanceName();

export default Animal;

// -----------------------------------------------------------------------------------------
// 생성자 (Constructor) 메소드 : 객체가 생성될 때(new class로 새로 함수(method) 호출 했을 때!)
// 자동으로 호출되는 특수한 메소드
// 작성 안해도 default constructor 있음. `constructor() {}`
// 주로 객체의 초기화 또는 인스턴스 생성시 실행 되어야 하는 작업을 위해 사용하는 특수한 메소드
// 개발자가 생성자 메소드를 생성하지 않을 경우 **기본 생성자(Default Constructor)**가 실행
// -----------------------------------------------------------------------------------------
class Whale {
  // 생성자 메소드 
  // 객체의 인스턴스 생성 시 실행되어야 하는 작업들을 위해 사용
//   public name: string;
//   constructor(name: string) {
//     this.name = name; // 외부에서 넘어온 오른쪽 name =  constructor (name: string) 
//   }

  // 생성자 단축 속성 = parameter properties
  // 생성자 파라미터 앞에 접근 제한자를 붙이면 필드 선언과 초기화를 한 번에 가능
  constructor(
    public name: string
    ) {
    // this 참조 변수 this.name = name;
    this.name = name;
    this.buu();
    }
    public static test(): void {
        console.log('test');
    }
    public buu(): void {
        console.log('buu');
    }
}

const whale: Whale = new Whale('whale');
const whale2: Whale = new Whale('whale2');
const whale3: Whale = new Whale('whale3');

whale.name;
whale2.name;
whale3.name;
Whale.test();

// --------------------------------
// 접근 제어 지시자(Access Modifier)
// --------------------------------
class Cat {
    num1: number = 1; // 없으면 기본값 = pubilc
    public num2: number = 2; // public
    protected num3: number = 3; // protected // 상속 관계에서만 허용하는 접근 제어 지시자 
    private num4: number = 4; // private
}

const cat: Cat = new Cat();
cat.num1;
cat.num2;
// cat.num3; // Error: Property 'num3' is protected and only accessible within class 'Cat' and its subclasses.
// cat.num4; // Error: Property 'num4' is private and only accessible within class 'Cat'.

class Hamster {
    // public (기본값) : 클래스 내부, 자식 클래스, 클래스 인스턴스 등 어디서든 접근 가능.
    // protected : 클래스 내부와 자식 클래스에서 접근 가능. js는 protected 안해줘서 _protected 이렇게 씀.
    // private : 클래스 내부에서만 접근 가능.
    public name: string = '햄스터';
    protected age: number = 0;
    private weight: number = 0;

    constructor(name: string, age: number, weight: number) {
        this.name = name;
        this.age = age;
        this.weight = weight;
    }

    public getWeight(): number {
        return this.weight;
    }

    public setWeight(weight: number): void {
        this.weight = weight;
    }
}

const hamster: Hamster = new Hamster('햄스터', 1, 100);
hamster.name; // public
// hamster.age; // protected - Error: Property 'age' is protected and only accessible within class 'Hamster' and its subclasses.
// hamster.weight; // private - Error: Property 'weight' is private and only accessible within class 'Hamster'.

hamster.getWeight();
hamster.setWeight(120);

class GoldenHamster extends Hamster {
    constructor(name: string, age: number, weight: number) {
        super(name, age, weight);
        this.name; // public
        this.age; // protected
        // this.weight; // private - Error: Property 'weight' is private and only accessible within class 'Hamster'.
    }

}

class Catchild extends Cat {
   test(): void {
    // this
    this.num3; // protected
    // this.num4; // private
}

}