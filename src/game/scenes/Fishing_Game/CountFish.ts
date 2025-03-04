
export class FishCountScene extends Phaser.Scene {
    private gridSize: number = 60; 
    private gridWidth: number = 10; 
    private gridHeight: number = 5; 
    private gridStartX: number = 170; 
    private gridStartY: number = 220;
    private fishData: { [key: string]: number[][] } = {}; // Lưu vị trí cá
    private colors: string[] = ["yellow", "blue", "green", "purple", "orange"];

    constructor() {
        super({ key: "FishCountScene" });
    }

    preload(){
        this.load.image('blue', 'assets/fishing_assets/fish/blue/caught/frame1.png');
        this.load.image('orange', 'assets/fishing_assets/fish/orange/caught/frame1.png');
        this.load.image('yellow', 'assets/fishing_assets/fish/yellow/caught/frame1.png');
        this.load.image('purple', 'assets/fishing_assets/fish/purple/caught/frame1.png');
        this.load.image('green', 'assets/fishing_assets/fish/green/caught/frame1.png');
        this.load.image('background_graph', 'assets/fishing_assets/ui/background_graph.png');
    }
    create(){
        // Font size
        const fontStyle = document.createElement("style");
        fontStyle.innerHTML = `
            @font-face {
                font-family: 'Mukta Bold';
                src: url('assets/fishing_assets/font_mukta/Mukta-Bold.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Mukta ExtraBold';
                src: url('assets/fishing_assets/font_mukta/Mukta-ExtraBold.woff2') format('woff2');
            }
            @font-face {
                font-family: 'Mukta Regular';
                src: url('assets/fishing_assets/font_mukta/Mukta-Regular.woff2') format('woff2');
            }
        `;
        document.head.appendChild(fontStyle);
        this.add.image(390, 330, 'background_graph').setOrigin(0.5,0.5);
        this.createGrid();
        this.populateFish();
        this.add.text(390, 570, "How many Purple fish did you catch?", {
            fontSize: "24px",
            color: "#036b84",
            fontStyle: "bold"
        }).setOrigin(0.5, 0.5);
    }
    update(){}
    private createGrid() {
        for (let row = 0; row < this.gridHeight; row++) {
            for (let col = 0; col < this.gridWidth; col++) {
                // Vẽ ô lưới
                this.add.rectangle(
                    this.gridStartX + col * this.gridSize,
                    this.gridStartY + row * this.gridSize,
                    this.gridSize,
                    this.gridSize,
                    0xffffff
                ).setStrokeStyle(3, 0x036b84);
            }
        }

        for (let i = 0; i < this.gridHeight; i++) {
            this.add.text(45, this.gridStartY + i * this.gridSize, this.colors[i].toUpperCase(), {
                fontSize: "20px",
                color: "#036b84",
                fontStyle: "bold",
                fontFamily: "sans-serif"
            });
        }

        // Thêm số thứ tự cột
        for (let i = 0; i < this.gridWidth; i++) {
            this.add.text(this.gridStartX + i * this.gridSize - 10 , this.gridStartY + this.gridHeight * this.gridSize - 15, 
                (i + 1).toString(), { fontSize: "30px", color: "#036b84", fontStyle: "bold" });
        }
    }

    private populateFish() {
        this.fishData = {
            "yellow": [[0, 0], [1, 0], [2, 0], [3, 0], [6, 0]],
            "blue": [[0, 1], [3, 1], [5, 1], [6, 1]],
            "green": [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
            "purple": [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]],
            "orange": [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]]
        };

        for (const color in this.fishData) {
            this.fishData[color].forEach(([x, y]) => {
                this.add.image(
                    this.gridStartX + x * this.gridSize,
                    this.gridStartY + y * this.gridSize,
                    color
                ).setOrigin(0.5);
            });
        }
    }
}