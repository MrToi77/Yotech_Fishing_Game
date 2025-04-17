import generateModelInstance from "../Model/generateModel";
import mainModel from "../Model/mainModel";
const Max_Depth: number = 680;
const Min_Depth: number = 280;
const Max_Width: number = 900;
const Min_Width: number = -100;
let destination: number;
let randomAmount_category: number = 5;
let category: string[] = ["orange", "blue", "green", "purple", "yellow"];

export default class SpawnFish {
    private mainGeneral: mainModel;
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, mainGeneral: mainModel) {
        this.scene = scene;
        this.mainGeneral = mainGeneral;
    }

    private createTweenSwim(category: string, flip: number, depth: number) {
        if (flip === 1) {
            // Tạo cá có physics body bằng cách sử dụng physics.add.sprite
            this.mainGeneral.fish = this.scene.physics.add
                .sprite(Min_Width, depth, `${category}_fish_caught_0`)
                .setOrigin(0.5, 1)
                .setFlipX(true);
            destination = Max_Width;
        } else {
            this.mainGeneral.fish = this.scene.physics.add
                .sprite(800, depth, `${category}_fish_caught_0`)
                .setOrigin(0.5, 1);
            destination = Min_Width;
        }
        const length = this.mainGeneral.fishGroup.getLength();
        // Tạo text đánh số cá
        let fishNumber = this.scene.add
            .text(
                this.mainGeneral.fish.x,
                this.mainGeneral.fish.y - 30,
                length.toString(),
                {
                    fontSize: "20px",
                    fontStyle: "bold",
                    color: "#fff",
                }
            )
            .setOrigin(0.5);

        // Gán data để truy cập sau này (ví dụ để xóa)
        this.mainGeneral.fish.setData("fishNumber", fishNumber);

        this.mainGeneral.fish.setData("IndexNumber", length);

        // Chạy animation cho cá
        this.mainGeneral.fish.play(`${category}_fish_swim_anim`);

        // Tạo tween di chuyển cá và số cá cùng nhau
        this.scene.tweens.add({
            targets: [this.mainGeneral.fish, fishNumber],
            x: destination,
            duration: Phaser.Math.Between(3000, 7000),
            ease: "Linear",
            repeat: -1,
        });
        this.mainGeneral.fish.body?.setSize(30, 20);

        this.mainGeneral.fishGroup.add(this.mainGeneral.fish);
    }

    private spawnFishSwim(category: string, depth: number, flip: number) {
        if (category === "shark") {
            // Tạo shark có physics body
            this.mainGeneral.shark = this.scene.physics.add
                .sprite(Min_Width, depth, "shark_caught_0")
                .setOrigin(0.5, 1);
            this.mainGeneral.shark.play("shark_swim_anim");

            this.scene.tweens.add({
                targets: this.mainGeneral.shark,
                x: Max_Width,
                duration: Phaser.Math.Between(3000, 7000),
                ease: "Linear",
                repeat: -1,
            });
            this.mainGeneral.shark.body?.setSize(32, 30, false);
            this.mainGeneral.shark.body?.setOffset(110, 45);

            this.mainGeneral.fishGroup.add(this.mainGeneral.shark);
        } else {
            this.createTweenSwim(category, flip, depth);
        }
    }

    public randomFish(amount: number): void {
        const delayBetweenSpawns = 200; // Thời gian giữa mỗi lần spawn (ms)

        // Spawn cá theo category (không phải shark)
        for (let i: number = 0; i < amount; i++) {
            const randomIndex: number = Math.floor(
                Math.random() * randomAmount_category
            );
            // Nếu muốn flip ngẫu nhiên: ta sử dụng Math.random() < 0.5 ? 1 : 0
            const flip: number = Math.random() < 0.5 ? 1 : 0;
            // Tính depth ngẫu nhiên giữa Min_Depth và Max_Depth
            const depth: number = Phaser.Math.Between(Min_Depth, Max_Depth);

            this.scene.time.delayedCall(i * delayBetweenSpawns, () => {
                this.spawnFishSwim(category[randomIndex], depth, flip);
            });
        }

        // Spawn cá mập theo amount_shark
        for (let i: number = 0; i < generateModelInstance.amount_shark; i++) {
            const depth: number = Phaser.Math.Between(Min_Depth, Max_Depth);
            const flip: number = Math.random() < 0.5 ? 1 : 0;
            this.spawnFishSwim("shark", depth, flip);
        }
    }
}
