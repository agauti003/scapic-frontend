import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import OrbitControls from 'three-orbitcontrols';

export default class Box extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        this.mount = this.refs.mount;
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(75, width / width, 0.1, 1000);
        camera.position.z = 30;

        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor('#F2F2F2');
        renderer.setSize(width, height);


        var controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;


        var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
        keyLight.position.set(-100, 0, 100);

        var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
        fillLight.position.set(100, 0, 100);

        var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
        backLight.position.set(100, 0, -100).normalize();

        scene.add(keyLight);
        scene.add(fillLight);
        scene.add(backLight);

        let mtlLoader = new MTLLoader();
        let objLoader = new OBJLoader();

        let pathObj = this.props.obj;

        mtlLoader.load(this.props.obj, function (materials) {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(pathObj, function (object) {
                object.position.z = 0;
                object.position.y = -1;
                scene.add(object);
            });
        });

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        this.mount.appendChild(renderer.domElement);
        this.start();
    }
    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId);
    }

    animate = () => {
        this.frameId = window.requestAnimationFrame(this.animate);
    }
    render () {
        return (
            <div
                ref={'mount'}
                style={{ width: '100%', height: '450px' }} />
        );
    }
}
Box.propTypes = {
    obj: PropTypes.string,
    mtl: PropTypes.string
};
