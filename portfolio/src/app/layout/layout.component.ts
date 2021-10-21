import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

import { Inject} from "@angular/core";
import { DOCUMENT } from '@angular/common';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements  AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  threeScene = new THREE.Scene();
  threeRenderer = new THREE.WebGLRenderer();
  threeCamera = new THREE.PerspectiveCamera( 75, 0, 0.1, 1000 );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }


  @HostListener('wheel', ['$event'])
  public onWheel(event) {
    if (event.deltaY < 0) {
      this.threeCamera.position.z -= 1;
    }
    else if (event.deltaY > 0) {
      this.threeCamera.position.z += 1;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(){
    this.threeCamera.aspect = window.innerWidth / window.innerHeight;
    this.threeCamera.updateProjectionMatrix();
    this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngAfterViewInit(): void {
    this.threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.appendChild(this.canvas.nativeElement, this.threeRenderer.domElement);
    this.threeCamera.position.z = 20;


    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshStandardMaterial({ color: 0xFF55555 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(-10, 0, 0);
    this.threeScene.add(cube);

    const pointLight = new THREE.PointLight(0xfffffff);
    pointLight.position.set(5, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.threeScene.add(pointLight, ambientLight);

    // const lightHelper = new THREE.PointLightHelper(pointLight)
    // const gridHelper = new THREE.GridHelper(200, 50);
    // this.threeScene.add(lightHelper, gridHelper);

    // const controls = new OrbitControls(this.threeCamera, this.threeRenderer.domElement);
    // controls.enablePan = false;
    // controls.enableRotate = false;

    Array(400).fill(0).forEach(() => this.addStar(this.threeScene));

    const animate = () => {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      this.threeRenderer.render(this.threeScene, this.threeCamera);
    };

    animate();
  }

  addStar(scene) {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
    scene.add(star);
  }
}