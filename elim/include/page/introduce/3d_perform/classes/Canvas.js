import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class Canvas {
  constructor() {
    this.canvas = document.getElementById("app");
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });

    //아래 세팅은 현실적인 렌더링을 위한 것입니다.
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 4;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener(
      "resize",
      () => {
        this.OnWindowResize();
      },
      false
    );

    //카메라 세팅
    const fov = 60;
    const aspect = 400 / 647;
    const near = 1.0;
    const far = 1000.0;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(5, 5, 5);


    //this.topViewCamera = new TopViewCamera(this.camera);

    // 테스트 컨트롤러
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    // - scene
    this.scene = new THREE.Scene();

    //배경 매핑이 존재하기 때문에 라이트 셋업이 필요없습니다.
    // - light
    // - directional light
    // this.dirLight = new THREE.DirectionalLight(0xffffff);
    // this.dirLight.position.set(0, 3, 3);
    // this.dirLight.target.position.set(0, 0, 0);
    // this.dirLight.intensity = 1;
    // this.scene.add(this.dirLight);
    // // - ambient light
    // this.ambLight = new THREE.AmbientLight(0xffffff);
    // this.ambLight.intensity = 1;
    // this.scene.add(this.ambLight);

    // - background color
    this.scene.background = new THREE.Color("#020222");
    const color = 0x8982a7;
    const fog_near = 10;
    const fog_far = 20;
    this.scene.fog = new THREE.Fog(color, fog_near, fog_far);
    
    // - grid
    const size = 50;
    const divisions = 50;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);
  }

  //동적 캔버스 사이즈
  OnWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
