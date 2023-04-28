import * as THREE from "three";
import gsap from "../gsap-public/src/all.js";
import GUI from "../lil-gui/lil-gui.esm.js";
import Canvas from "./Canvas.js";
import Car from "./Car.js";
import GLTFModels from "./GLTFModel.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

export default class Engine {
  
  constructor() {
    //dom element
    this.zoomOutBtn = document.querySelector(".zoom-out");
    //마커 위치는 여기서 수정합니다.
    this.points = [
      {
        // bonnet
        position: new THREE.Vector3(-2.5, 1.7, 3),
        element: document.querySelector(".point-0"),
        // position: new THREE.Vector3(0.7, 0.5, 0.7),
        // element: document.querySelector(".point-0"),
      },
      {
        //fourth wheel
        position: new THREE.Vector3(-0.79, 1.67, -0.79),
        element: document.querySelector(".point-1"),
      },
      {
        position: new THREE.Vector3(1, 1, 2),
        element: document.querySelector(".point-2"),
      },
      {
        position: new THREE.Vector3(3, 0, -4),
        element: document.querySelector(".point-3"),
      },

    ];
    //모델 로딩중임을 표시하기 위한 셋업
    this.progressBar = document.getElementById("progress-bar");
    this.progressContainer = document.getElementById("progress-bar-container");
    this.loadingManager = new THREE.LoadingManager();
    this.loadingManager.onProgress = (_url, loaded, total) => {
      this.progressBar.value = (loaded / total) * 100;
    };
    this.loadingManager.onLoad = () => {
      this.progressContainer.style.display = "none";
      this.points.forEach((el) => {
        el.element.classList.remove("hidden");
      });
    };

    this.canvas = new Canvas();
    this.clock = new THREE.Clock();
    this.gltfModels = new GLTFModels(this.loadingManager);
    this.car = new Car();

    this.cameraOrigin = this.canvas.camera.position.clone(); //메모리 공유 방지를 위해서 클론

    // ray caster
    this.raycaster = new THREE.Raycaster();
    this.intersects = [];

    // boolean states
    this.clicked = false;

    /**
     * Point-related
     */
    //event listeners

    for (let point of this.points) {
      const { x, y, z } = point.position;
      point.element.addEventListener("click", () => {
        this.clicked = true;
        if (x < 0 || y < 0 || z < 0) {
          gsap.to(this.canvas.camera.position, {
            x: x - 1,
            y: y,
            z: z - 1,
            duration: 1,
            onUpdate: () => {
              this.canvas.camera.lookAt(x, y, z);
            },
          });
        } else {
          gsap.to(this.canvas.camera.position, {
            x: x + 1,
            y: y + 1,
            z: z + 1,
            duration: 1,
            onUpdate: () => {
              this.canvas.camera.lookAt(x, y, z);
            },
          });
        }

        this.zoomOutBtn.classList.remove("hidden");
        for (let point of this.points) {
          point.element.classList.add("hidden");
        }

        //touch interaction off
        this.canvas.controls.enableRotate = false;
        this.canvas.controls.enableZoom = false;
        this.canvas.controls.enablePan = false;
      });
    }

    this.zoomOutBtn.addEventListener("click", () => {
      this.clicked = false;
      const { x, y, z } = this.car.group.position;
      gsap.to(this.canvas.camera.position, {
        x: this.cameraOrigin.x,
        y: this.cameraOrigin.y,
        z: this.cameraOrigin.z,
        duration: 2,
        onUpdate: () => {
          this.canvas.camera.lookAt(x, y, z);
        },
      });
      //element.classList.add("mystyle");
      this.zoomOutBtn.classList.add("hidden");
      for (let point of this.points) {
        point.element.classList.remove("hidden");
      }

      //touch interaction on
      this.canvas.controls.enableRotate = true;
      this.canvas.controls.enableZoom = true;
      this.canvas.controls.enablePan = true;
    });

    //HDRI
    //HDR 배경을 설정하는데 시간이 오래 걸리기 때문에, 로딩 후에 차를 로딩하도록 합니다.
    this.rgbeLoader = new RGBELoader(this.loadingManager);
    this.rgbeLoader.load("/elim/include/page/introduce/3d_perform/public/MR_INT-005_WhiteNeons_NAD.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.canvas.scene.environment = texture;

      this.car.LoadCarModel(this.gltfModels);
    });

    this.canvas.scene.add(this.car.group);

    //아래는 포인트 위치 디버깅 할때만 주석 풀어주세요
    // //debug ui
    const gui = new GUI();
    const position = gui.addFolder("Position");
    const mat = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const geo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const cube = new THREE.Mesh(geo, mat);
    cube.position.set(0, 1, 0);
    this.canvas.scene.add(cube);

    const xPosControl = position
      .add(cube.position, "x", -100, 100, 0.01)
      .name("X");
    const yPosControl = position
      .add(cube.position, "y", -100, 100, 0.01)
      .name("Y");
    const zPosControl = position
      .add(cube.position, "z", -100, 100, 0.01)
      .name("Z");
    xPosControl.onChange((v) => {
      cube.position.x = v;
      console.log(cube.position);
    });
    yPosControl.onChange((v) => {
      cube.position.y = v;
      console.log(cube.position);
    });
    zPosControl.onChange((v) => {
      cube.position.z = v;
      console.log(cube.position);
    });
  }

  Run() {
    
    const Tick = () => {
      if (!this.clicked) {
        this.canvas.controls.update();
        // const delta = this.clock.getDelta();
        // const elapsed = this.clock.getElapsedTime();

        //tick에서 포인트 위치를 업데이트 해야합니다.
        for (let point of this.points) {
          const screenPos = point.position.clone();
          screenPos.project(this.canvas.camera); // 3차원 좌표를 카메라가 보는 시점의 scene으로 사영시킵니다

          const currentTime = Date.now();
          if (currentTime - this.lastRaycastTime > 100) {
            // update raycasting event for every 100ms
            // this.raycaster.setFromCamera(screenPos, this.canvas.camera);
            // this.intersects = this.raycaster.intersectObjects(
            //   this.canvas.scene.children,
            //   true
            // );
            // this.lastRaycastTime = currentTime;
          }

          if (this.intersects.length === 0) {
            point.element.classList.remove("hidden");
          } else {
            //교차점이 있다면
            const intersectionDist = this.intersects[0].distance; // 카메라와 물체 표면 사이의 거리를 구합니다
            const pointDist = point.position.distanceTo(
              // 카메라와 포인트 사이의 거리를 구합니다.
              this.canvas.camera.position
            );
            if (pointDist > intersectionDist) {
              // 포인트의 거리가 교차점 거리보다 짧다면 보이지 않도록 합니다.
              point.element.classList.add("hidden");
            } else {
              point.element.classList.remove("hidden");
            }
          }

          const translateX = screenPos.x * window.innerWidth * 0.5; //정규화된 값을 브라우저 창 크기로 변환
          const translateY = screenPos.y * window.innerHeight * 0.5;

          // this.canvas.scene.rotation.y -= 0.0002;

          point.element.style.transform = `translateX(${translateX}px) translateY(${-translateY}px)`;
        }
      }

      this.canvas.OnWindowResize();
      this.canvas.renderer.render(this.canvas.scene, this.canvas.camera);

      
      requestAnimationFrame(Tick);
      
      // gltf.scene.rotation.x -= 0.01;
    };

    //레이캐스팅 발생 횟수를 제한하는 최적화 기법을 확인했습니다.
    //
    this.lastRaycastTime = Date.now(); //initialize the last raycast time
    setInterval(() => {
      this.lastRaycastTime = 0;
    }, 500);

    Tick();
  }
}
