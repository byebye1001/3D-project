

    // once everything is loaded, we run our Three.js stuff.
    function init() {
        var clock = new THREE.Clock();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);


        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));

        //渲染器渲染范围，window.innerWidth, window.innerHeight？？？
        webGLRenderer.setSize(window.innerWidth-500, window.innerHeight-200);
        webGLRenderer.shadowMapEnabled = true;

        var sphere = createMesh(new THREE.SphereGeometry(40, 30, 30));
        //添加到场景
        scene.add(sphere);

        //相机位置，朝向场景深处
        camera.position.x = 100;
        camera.position.y = 100;
        camera.position.z = 300;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        

        //添加轨迹球控件用于鼠标控制放缩旋转
        var trackballControls = new THREE.TrackballControls(camera);

        trackballControls.rotateSpeed = 1.0;
        trackballControls.zoomSpeed = 1.0;
        trackballControls.panSpeed = 1.0;
//        trackballControls.noZoom=false;
//        trackballControls.noPan=false;
        trackballControls.staticMoving = true;
//        trackballControls.dynamicDampingFactor=0.3;

        var ambientLight = new THREE.AmbientLight(0x383838);
        scene.add(ambientLight);

        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(300, 300, 300);
        spotLight.intensity = 1;
        scene.add(spotLight);

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);



        var mesh;
        function createMesh(geom) {

            // assign two materials
           var meshMaterial = new THREE.MeshNormalMaterial();
           meshMaterial.side = THREE.DoubleSide;
           // var wireFrameMat = new THREE.MeshBasicMaterial();
           // wireFrameMat.wireframe = true;
            
            //改变原来的线框材质
            var colorMeterial = new THREE.MeshBasicMaterial({color:0x00ff00,transparent:true,blending:THREE.MultiplyBlending})

            // create a multimaterial
           // var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
           // 把原来网格的材质替换
            var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, colorMeterial]);
            return mesh;
        }


        render();

        function render() {
            var delta = clock.getDelta();
            trackballControls.update(delta);
            // render using requestAnimationFrame
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera)
        }

    }
    window.onload = init;