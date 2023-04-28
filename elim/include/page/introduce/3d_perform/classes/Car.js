import * as THREE from "three";

export default class Car {
  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 0);
  }

  LoadCarModel(gltfModel) {
    gltfModel.LoadGLTFModel(
      "/elim/include/page/introduce/3d_perform/public/building/scene.gltf",
      "porsche911",
      (gltf) => {
        const model = gltf.scene;
        this.group.add(model);

        this.group.traverse((obj) => {
          obj.castShadow = true;
          obj.receiveShadow = true;
          if (obj.material && obj.material.map) {
            obj.material.map.encoding = THREE.sRGBEncoding;
          }
        });
        //콜백으로 레이아웃 나옴
        setTimeout(()=>{ $(`.hooker-msg`).fadeIn(); },1000);

      }
    );
  }
}
