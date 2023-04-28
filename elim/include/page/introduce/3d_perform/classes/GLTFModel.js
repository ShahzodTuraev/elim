import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export default class GLTFModels {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.models = {};
  }

  LoadGLTFModel(path, name, onLoadCallback) {
    if (!(name in this.models)) {
      const dracoLoader = new DRACOLoader();
      const loader = new GLTFLoader(this.loadingManager);
      loader.setDRACOLoader(dracoLoader);

      loader.load(path, (gltf) => {
        this.models[name] = {
          loader: loader, //기존에 생성된 모델이라면 loder를 객체 안에 저장해서 재사용 할 수 있도록 합니다.
          asset: gltf,
          queue: [onLoadCallback],
        };

        const queue = this.models[name].queue; //객체 안에 저장해놓은 대기 큐를 가져옵니다.
        this.models[name].queue = null;

        //큐 항목이 존재하면
        if (queue) {
          for (let q of queue) {
            const clone = { ...gltf }; // gltf 에셋을 깊은 복사 -> 깊은 복사를 하는 이유는 복사를 하지않고 그냥 할당했을때 메모리를 공유하는 문제가 생깁니다.
            q(clone); //콜백으로 넘어온 대기 큐에게 전달하여 작업을 마무리 합니다.
          }
        } else if (this.models[name].asset == null) {
          this.models[name].queue.push(onLoadCallback); //asset이 존재하지 않으면 큐에 콜백을 넣습니다.
        } else {
          //이미 존재하는 에셋이라면 바로 콜백으로 복사 객체를 넘겨줍니다.
          const clone = { ...this.models[name].asset };
          onLoadCallback(clone);
        }
      });
    }
  }
}
