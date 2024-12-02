import * as THREE from "three"

class DioramaCamera {
    constructor(frustumSize, aspectRatio, texture) {

        const frustumHalfSize = frustumSize/2
        const [ left, right, top, bottom ] =
            [
                -frustumHalfSize * aspectRatio,
                frustumHalfSize * aspectRatio,
                frustumHalfSize,
                -frustumHalfSize
            ];

        const [ near, far ] =
            [
                0.1,
                1000
            ];

        this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
        this.camera.position.set(0, 0, 5)

        this.camera.add(DioramaCamera.createTexturedPlane(texture, frustumSize, aspectRatio))

    }

    updatePlaneGeometry(frustumSize, aspectRatio) {

        const plane = this.camera.children.find(child => 'cameraPlane' === child.name)
        plane.geometry.dispose()

        const effectiveFrustumSize = frustumSize / this.camera.zoom
        plane.geometry = new THREE.PlaneGeometry(effectiveFrustumSize * aspectRatio, effectiveFrustumSize)
    }

    windowResizeHelper(frustumSize, aspectRatio){
        this.camera.left = (-frustumSize * aspectRatio) / 2;
        this.camera.right = (frustumSize * aspectRatio) / 2;
        this.camera.top = frustumSize / 2;
        this.camera.bottom = -frustumSize / 2;
        this.camera.updateProjectionMatrix();
    }

    static createTexturedPlane(texture, frustumSize, aspectRatio) {

        const geometry = new THREE.PlaneGeometry(frustumSize * aspectRatio, frustumSize)
        const material = new THREE.MeshBasicMaterial({ map: texture, depthTest: false })

        const plane = new THREE.Mesh(geometry, material)
        plane.name = 'cameraPlane'
        plane.position.z = -4; // Push it behind everything else
        plane.renderOrder = -1;

        return plane
    }

}

export default DioramaCamera
