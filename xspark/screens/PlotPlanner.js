import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { AmbientLight, PerspectiveCamera, Scene, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

export default function PlotPlanner({ navigation }) {
    const onContextCreate = async (gl) => {
        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        const camera = new PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
        camera.position.z = 2;

        const scene = new Scene();
        scene.add(new AmbientLight(0xffffff));

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new Mesh(geometry, material);
        scene.add(cube);

        const render = () => {
            requestAnimationFrame(render);
            cube.rotation.x += 0.07;
            cube.rotation.y += 0.04;
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        render();
    };
    return (
        <View style={styles.container}>
            <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});