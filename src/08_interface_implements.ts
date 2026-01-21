// -------------------------
// interface_implements.ts
// -------------------------


// ------------------------- interface
interface Swimming {
    swimming(): void;
}

interface Flightable {
    flying(): void;
}

// ------------------------- Mammal 관련 -------------------------------- //

abstract class Mammal {
    constructor(
        protected name: string   
    ) {
        this.name = name;
    }

    // 추상 메소드
    abstract residence(): void;

    // 일반 메소드
    public breath(): void {
        console.log(`${this.name}이/가 숨을 쉰다.`);
    }
}

class Whale extends Mammal implements Swimming{
    override residence(): void {
        console.log(`${this.name}의 거주지: 바다`);
    }
    public swimming(): void {
        console.log(`${this.name}이/가 수영한다.`); // interface는 그냥 가져오면 됨. override (x)
    }
}

class FlyingSquirrel extends Mammal {
    override residence(): void {
        console.log(`${this.name}의 거주지: 산`);
    }
} 

// ------------------------- Fish 관련 -------------------------------- //

class FlyingFish implements Swimming, Flightable { // ,로 쭉 적어준다. 여러 개 적을 때
    constructor(
        protected name: string
    ) {
        this.name = name;  // 이름 선언 되지 않았으니 선언해주기. 
    }

    public swimming(): void {
        console.log(`${this.name}이/가 수영한다.`);
    }
    public flying(): void {
        console.log(`${this.name}이/가 날아간다.`);
    }

    // 수영, 비행, 거주지: 바다
}