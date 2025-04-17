import secondModel from "../Model/secondModel";
import CommunicateBetweenScene from "./CommunicateBetweenScene";
export default class secondSceneController {
    private model: secondModel;
    constructor(model: secondModel) {
        this.model = model;
    }

    setInteractForStartButton() {
        this.model.containerStart.on("pointerdown", () => {
            CommunicateBetweenScene.instance.setHookInteractSceneA();
            this.model.containerBoard.setVisible(false);
        });
    }
}
