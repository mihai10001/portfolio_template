import { Component, AfterViewInit, ViewChild, ElementRef, HostListener, Renderer2 } from '@angular/core';

import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

import { ContentService } from '../content/services/content.service';
import { ContentModel } from '../content/models/ContentModel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements  AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;
  threeScene;
  threeRenderer;
  threeCamera;
  threeComposer;

  canvasHeight: number = 0;
  canvasWidth: number = 0;

  helpers: boolean = false;
  postProcessing: boolean = false;
  isOrbitalControlsEnabled: boolean = false;

  whiteColor: number = 0xFFFFFF;
  objectColor: number = 0x5DADE2;
  zCameraOffset: number = 50;
  xObjectOffset: number = -13;
  sphereRadius: number = 30;
  thetaObjectDegreeOffset: number = 0;
  spinByRadians: number = 0;

  content: ContentModel = this.contentService.content;
  object3DArray: Array<{ index: number, object: THREE.Object3D, deltaDegreesToCenter: number }> = [];


  constructor(private contentService: ContentService, private renderer: Renderer2) { }

  ngAfterViewInit(): void {

    this.initThree(75, 0, 0.1, 1000);
    this.setCanvasProperties(this.whiteColor, this.zCameraOffset);
    this.renderer.appendChild(this.canvas.nativeElement, this.threeRenderer.domElement);

    this.addAmbientLight(this.whiteColor, 0.6);
    this.addPointLight(-10, -10, 35, 0xFF0066, 2, this.helpers);
    this.addPointLight(-5, 15, 30, 0x66FF66, 2, this.helpers);
    this.addPointLight(-20, 15, 35, 0x0066FF, 2, this.helpers);

    const starContainers = this.addStars(400);
    const objectGroup = this.addObjectGroup(this.helpers);

    this.helpers && this.addGridHelper(200, 50);
    this.postProcessing && this.enablePostProcessing();

    this.contentService.activeTabIndexSubject
      .subscribe(activeTabIndex =>
        this.spinObjectTween(objectGroup, this.spinObjectGroupByRadians(activeTabIndex))
      )


    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();

      for (let i = 0; i < objectGroup.children.length; i++) {
        objectGroup.children[i].rotation.x += 0.004;
        objectGroup.children[i].rotation.y += 0.004;
      }
      for (let i = 0; i < starContainers.length; i++)
        starContainers[i].rotation.y += 0.0001;

      !this.postProcessing && this.threeRenderer.render(this.threeScene, this.threeCamera);
      this.postProcessing && this.threeComposer.render(this.threeScene, this.threeCamera);
    };

    animate();
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.canvas.nativeElement) {
      this.setCanvasProperties(this.whiteColor, this.zCameraOffset);
    }
  }


  initThree(fov: number, aspect: number, near: number, far: number) {
    this.threeScene = new THREE.Scene();
    this.threeRenderer = new THREE.WebGLRenderer();
    this.threeCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.threeComposer = new EffectComposer(this.threeRenderer);
  }


  setCanvasProperties(canvasBackgroundColor: number, zCameraOffset: number) {
    this.canvasHeight = this.canvas.nativeElement.offsetHeight;
    this.canvasWidth = this.canvas.nativeElement.offsetWidth;

    this.threeCamera.aspect = this.canvasWidth / this.canvasHeight;
    this.threeCamera.position.z = zCameraOffset;
    this.threeCamera.updateProjectionMatrix();

    this.threeRenderer.setClearColor(canvasBackgroundColor);
    this.threeRenderer.setSize(this.canvasWidth, this.canvasHeight);
    this.threeComposer.setSize(this.canvasWidth, this.canvasHeight);
  }

  addObjectGroup(helpers: boolean): THREE.Group {
    const degreesBetweenObjects = Math.floor(360 / this.content.sections.length);
    const group = new THREE.Group();
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(this.sphereRadius, 32, 32),
      new THREE.MeshBasicMaterial({ color: "gray", wireframe: true })
    );
    helpers && this.threeScene.add(sphere);

    for (let i = 0; i < this.content.sections.length; i++) {
      let currentDegreeOffset = (i * degreesBetweenObjects) + this.thetaObjectDegreeOffset;

      if (this.content.sections[i].object3DPath === undefined) {
        const cube = this.createCube(8, 8, 8, this.objectColor);
        this.objectColor += 0x33333;
        cube.position.setFromSphericalCoords(this.sphereRadius + 0.1, THREE.Math.degToRad(90), THREE.Math.degToRad(currentDegreeOffset));
        cube.lookAt(sphere.position);
        this.object3DArray.push({ index: i, object: cube, deltaDegreesToCenter: currentDegreeOffset });
        group.add(cube);
      }
    }

    group.position.set(this.xObjectOffset, 0, 0);
    this.threeScene.add(group);
    return group;
  }


  spinObjectGroupByRadians(activeTabIndex: number): number {
    const activeObject = this.object3DArray.find(entry => entry.index === activeTabIndex);
    return activeObject
      ? THREE.Math.degToRad(360 - activeObject.deltaDegreesToCenter + this.thetaObjectDegreeOffset)
      : 0;
  }


  spinObjectTween(group: THREE.Group, spinByRadians: number, delay: number = 500) {
    new TWEEN.Tween(group.rotation)
      .to({ y: spinByRadians }, delay)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();
  }

  createCube(cubeWidth: number, cubeHeight: number, cubeDepth: number, cubeColor: number, xCubeOffset: number = 0) {
    const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);
    const material = new THREE.MeshStandardMaterial({ color: cubeColor });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(xCubeOffset, 0, 0);
    return cube;
  }


  addStar(starWidth: number, starHeight: number, starDepth: number, starColor: number) {
    const geometry = new THREE.SphereGeometry(starWidth, starHeight, starDepth);
    const material = new THREE.MeshStandardMaterial({color: starColor});
    const star = new THREE.Mesh(geometry, material);
	  const starContainer = new THREE.Object3D();
    starContainer.position.set(0, 0,  0);
    starContainer.add(star);

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(200));
    star.position.set(x, y, z);
  
    this.threeScene.add(starContainer);
    return starContainer;
  }


  addStars(starCount: number) {
    return Array(starCount).fill(0).map(() => this.addStar(0.25, 24, 24, 0x000000));
  }


  addAmbientLight(lightColor: number, intensity: number = 1) {
    this.threeScene.add(new THREE.AmbientLight(lightColor, intensity));
  }


  addPointLight(xLight: number, yLight: number, zLight: number, lightColor: number, intensity: number = 1, helpers: boolean) {
    const pointLight = new THREE.PointLight(lightColor, intensity, 50);
    pointLight.position.set(xLight, yLight, zLight);
    pointLight.add(new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8), new THREE.MeshBasicMaterial({ color: lightColor })));
    this.threeScene.add(pointLight);
    helpers && this.addLightHelper(pointLight);
  }


  addLightHelper(pointLight: THREE.PointLight) {
    const lightHelper = new THREE.PointLightHelper(pointLight);
    this.threeScene.add(lightHelper);
  }


  addGridHelper(gridWidth: number, gridHeight: number) {
    const gridHelper = new THREE.GridHelper(gridWidth, gridHeight);
    this.threeScene.add(gridHelper);
  }


  enableOrbitalControls() {
    new OrbitControls(this.threeCamera, this.threeRenderer.domElement);
  }


  enablePostProcessing() {
    const renderScene = new RenderPass(this.threeScene, this.threeCamera);
    const composer = new EffectComposer(this.threeRenderer);
    const glitchPass = new GlitchPass();
    composer.setSize(this.canvasWidth, this.canvasHeight);
    composer.addPass(renderScene);
    composer.addPass(glitchPass);
  }
}