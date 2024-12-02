import * as THREE from 'three';

async function loadTexture(url) {

    const loader = new THREE.TextureLoader()

    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (texture) => resolve(texture),
            undefined,
            (err) => reject(err)
        );
    });
}

export { loadTexture }
