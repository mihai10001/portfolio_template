import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import * as THREE from 'three';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements  AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  constructor(
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, this.canvas.nativeElement.offsetWidth/this.canvas.nativeElement.offsetHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();

    renderer.setSize( this.canvas.nativeElement.offsetWidth, this.canvas.nativeElement.offsetHeight );
    this.renderer.appendChild(this.canvas.nativeElement, renderer.domElement);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };

    animate();
  }
}