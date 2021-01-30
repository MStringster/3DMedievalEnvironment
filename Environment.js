//Author Michael Stringer - W18019818

console.log("Creating Scene - T1");
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0xFFFFFF, 50, 500);
console.log("Scene Created - T1");

console.log("Creating Camera - T2");
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 
camera.position.set(-190, 105, -110);
camera.rotation.x = Math.pi/2;
console.log("Camera Created - T2");

console.log("Creating Renderer - T3");
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
console.log("Renderer Created - T3");

console.log("Setting Orbit Controls - T4")
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
console.log("Orbit Controls Setup - T4");

console.log("Creating Ambiant Light - T5");
var ambiantLight = new THREE.AmbientLight(0xCCCCCC, 1);
scene.add(ambiantLight);
console.log("Ambiant Light Created - T5");

console.log("Creating Sun Directional Light and set Shadow Settings - T6")
var sunDirLight = new THREE.DirectionalLight(0xFFAA00, 1);
sunDirLight.castShadow = true;

//shadows configuration
sunDirLight.shadow.mapSize.width = 1080;
sunDirLight.shadow.mapSize.height = 1080;
sunDirLight.shadow.camera.near = 0.5;
sunDirLight.shadow.camera.far = 850;
sunDirLight.shadow.radius=10;

//shadow cameras view
sunDirLight.shadow.camera.left = -300;
sunDirLight.shadow.camera.right = 300;
sunDirLight.shadow.camera.top = 300;
sunDirLight.shadow.camera.bottom = -300;

sunDirLight.position.set(-200, 300, 500);
sunDirLight.target.position = castleGateWallMesh;
scene.add(sunDirLight);
console.log("Directional Sun and Shadows Created and Configured - T6");

console.log("Creating Sun Visualizer - T7")
var sunGeo = new THREE.SphereGeometry(5, 8, 8);
var sunMat = new THREE.MeshPhongMaterial({color: 0xff4400});
var sunMesh = new THREE.Mesh(sunGeo, sunMat);
sunDirLight.add(sunMesh);
console.log("Sun Visualizer Created - T7");

console.log("Creating Textures - T8 (M1 - M3)");

console.log("Creating Floor Texture - M1");
var floorTexture = new THREE.TextureLoader().load("Textures/grass.png");
var floorTextureBump = new THREE.TextureLoader().load("Textures/grass_Bump.png");
floorTexture.wrapS = THREE.MirroredRepeatWrapping;
floorTexture.wrapT = THREE.MirroredRepeatWrapping;
floorTextureBump.wrapS = THREE.MirroredRepeatWrapping;
floorTextureBump.wrapT = THREE.MirroredRepeatWrapping;
floorTexture.repeat.set(36, 36);
floorTextureBump.repeat.set(36, 36);
console.log("Floor Texture Created - M1");

console.log("Castle Wall Texture - M2");
var castleWallTexture = new THREE.TextureLoader().load("Textures/brickWall.jpg");
var castleWallTextureBump = new THREE.TextureLoader().load("Textures/brickWall_Bump.jpg");
castleWallTexture.wrapS = THREE.MirroredRepeatWrapping;
castleWallTexture.wrapT = THREE.MirroredRepeatWrapping;
castleWallTextureBump.wrapS = THREE.MirroredRepeatWrapping;
castleWallTextureBump.wrapT = THREE.MirroredRepeatWrapping;
castleWallTexture.repeat.set(12,8);
castleWallTextureBump.repeat.set(12, 8);
console.log("Castle Wall Texture Created - M2");

const pathTexture = new THREE.TextureLoader().load("Textures/cobblestone_floor.jpg");
pathTexture.wrapS = THREE.MirroredRepeatWrapping;
pathTexture.wrapT = THREE.MirroredRepeatWrapping;

pathTexture.repeat.set(2,8);
console.log("Textures Created - T8 (M1 - M3)");

//The floor verticies are being manipulated for the moat around the castle
console.log("Creating Floor - T9");
var floorGeo = new THREE.PlaneGeometry(600, 750, 20, 25);
var floorMat = new THREE.MeshPhongMaterial({color: 0x00AA00, map: floorTexture, bumpMap: floorTextureBump, side: THREE.DoubleSide});
var floor = new THREE.Mesh(floorGeo, floorMat);

scene.add(floor);
floor.position.set(0, 0, 0);
floor.rotation.x = Math.PI/2;
floor.castShadow = false;
floor.receiveShadow = true;

//North Castle Moat Vertices
floorGeo.vertices[302] = new THREE.Vector3(-60,-45, 15);
floorGeo.vertices[301] = new THREE.Vector3(-90,-45, 15);
floorGeo.vertices[303] = new THREE.Vector3(-30,-45, 15);
floorGeo.vertices[304] = new THREE.Vector3(0,-45, 15);
floorGeo.vertices[305] = new THREE.Vector3(30, -45, 15);

//West Castle Moat Vertices
floorGeo.vertices[280] = new THREE.Vector3(-90, -15, 15);
floorGeo.vertices[259] = new THREE.Vector3(-90, 15, 15);
floorGeo.vertices[238] = new THREE.Vector3(-90, 45, 15);

//South Castle Moat Vertices
floorGeo.vertices[217] = new THREE.Vector3(-90, 75, 15);
floorGeo.vertices[218] = new THREE.Vector3(-60, 75, 15);
floorGeo.vertices[219] = new THREE.Vector3(-30, 75, 15);
floorGeo.vertices[220] = new THREE.Vector3(0, 75, 15);
floorGeo.vertices[221] = new THREE.Vector3(30, 75, 15);

//East Castle Moat Vertices
floorGeo.vertices[242] = new THREE.Vector3(30, 45, 15);
floorGeo.vertices[263] = new THREE.Vector3(30, 15, 15);
floorGeo.vertices[284] = new THREE.Vector3(30, -15, 15);

//Small 3/4 Moat around the dragon
floorGeo.vertices[222] = new THREE.Vector3(60, 75, 15);
floorGeo.vertices[223] = new THREE.Vector3(90, 75, 15);
floorGeo.vertices[224] = new THREE.Vector3(120, 75, 15);
floorGeo.vertices[245] = new THREE.Vector3(120, 45, 15);
floorGeo.vertices[266] = new THREE.Vector3(120, 15, 15);

floorGeo.verticesNeedUpdate = true;
floorGeo.normalsNeedUpdate = true;
console.log("Floor Created - T9");

console.log("Creating Castle Walls - T10");
var castleGateWallGeo = new THREE.BoxGeometry(55, 20, 5, 4, 8, 8)
var castleWallGeo = new THREE.BoxGeometry(55, 20, 5, 4, 8, 8);
var castleWallMat = new THREE.MeshPhongMaterial({ map: castleWallTexture, bumpMap: castleWallTextureBump});

var castleGateWallMesh= new THREE.Mesh(castleGateWallGeo, castleWallMat);
castleGateWallMesh.position.set(-30,-15,-10);

//Move the vertices in the middle of the mesh up creating a opening
for(i = 190; i < 257; i = i + 3)
{
    castleGateWallGeo.vertices[i] = new THREE.Vector3(0, 10, 0)   
}
castleGateWallGeo.verticesNeedUpdate = true;
castleGateWallMesh.rotation.x = Math.PI/-2;
floor.add(castleGateWallMesh);
castleGateWallMesh.castShadow = true;
castleGateWallMesh.recieveShadow = true;

//Array to Store walls
var walls = [] 

//Create 3 walls and store them in walls
for (i = 0; i < 3; i++)
    {
        walls.push(new THREE.Mesh(castleWallGeo, castleWallMat));
        walls[i].castShadow = true;
        walls[i].recieveShadow = true;
    }

//Position the 3 walls with the wall gate being the parent
var spacing = 50;
for (i = 0; i<3; i++)
    {
        if(i > 0) //position parrelle walls
        {
            walls[i].rotation.y = Math.PI/2;
            walls[i].position.x = spacing;
            walls[i].position.z = 30;
            castleGateWallMesh.add(walls[i]);
            spacing = spacing - 50;
            walls[i].castShadow = true;
            walls[i].recieveShadow = true;
        }
        else //position opposite wall
        {
            walls[i].position.x = 0;
            walls[i].position.z = 60;
            castleGateWallMesh.add(walls[i]);
            spacing = spacing - 25;
            walls[i].castShadow = true;
            walls[i].recieveShadow = true;
        }
    }

var castleGateGeo = new THREE.BoxGeometry(20,6,6, 2, 2, 2);
var castleGateMat = new THREE.MeshPhongMaterial({color: 0x966F33});

var castleGateMesh = new THREE.Mesh(castleGateGeo, castleGateMat);

castleGateMesh.position.set(0, 8, 0);
castleGateMesh.recieveShadow = true;
castleGateMesh.castShadow = true;
castleGateWallMesh.add(castleGateMesh);

var gateChainHoleGeo = new THREE.CylinderGeometry(1, 1, 1, 8, 1, 1);
var gateChainHoleMat = new THREE.MeshPhongMaterial({color: 0x996F33, side: THREE.DoubleSide});

var gateChainHoles = [];
for(i = 0; i < 2; i++)
    {
        gateChainHoles.push(new THREE.Mesh(gateChainHoleGeo, gateChainHoleMat));
        
        gateChainHoles[i].rotation.x = Math.PI/2;
        gateChainHoles[i].recieveShadow = true;
        gateChainHoles[i].castShadow = true;
        castleGateMesh.add(gateChainHoles[i]);
    }
var gateChainHoleMesh = new THREE.Mesh(gateChainHoleGeo, gateChainHoleMat);
gateChainHoles[0].position.set(6,1.5,-3);
gateChainHoles[1].position.set(-6,1.5,-3);
console.log("Walls Created - T10");


console.log("Creating Drawbridge - T11");
var drawBridgeGeo = new THREE.BoxGeometry(15, 1, 60);
var drawBridgeMat = new THREE.MeshPhongMaterial({color: 0xA86801});
var drawBridgeMesh = new THREE.Mesh(drawBridgeGeo, drawBridgeMat);

drawBridgeMesh.castShadow = true;
drawBridgeMesh.recieveShadow = true;
drawBridgeMesh.position.set(0, 30, 0);
drawBridgeMesh.rotation.x = Math.PI/2;

//Pivot to act as an axis point for the drawbridge
var drawBridgePivot = new THREE.Object3D();
drawBridgePivot.position.set(0, -10, -4);
castleGateWallMesh.add(drawBridgePivot);
drawBridgePivot.add(drawBridgeMesh);
console.log("Drawbridge Created - T11");

console.log("Creating Towers - T12");
var towerGeo = new THREE.CylinderGeometry(5, 5, 40, 32);
var towerMat = new THREE.MeshPhongMaterial({map: castleWallTexture, bumpMap: castleWallTextureBump});

//array to store the 4 towers for corners of castle courtyard
var towerArray = [];
for (i = 0; i < 4; i++)
{
    towerArray.push(new THREE.Mesh(towerGeo, towerMat));
    towerArray[i].castShadow = true;
    towerArray[i].recieveShadow = true;
    
    castleGateWallMesh.add(towerArray[i]);
}

//set the position of the four towers
towerArray[0].position.set(25, 5, 0);
towerArray[1].position.set(-25, 5, 0);
towerArray[2].position.set(25,5,60);
towerArray[3].position.set(-25,5,60);
console.log("Towers Created - T12");

console.log("Creating Tower Spires - T13")
var towerSpireGeo = new THREE.ConeBufferGeometry(8, 10, 16, 1, true);
var towerSpireMat = new THREE.MeshPhongMaterial({color: 0xff0000, side:THREE.DoubleSide});

var towerSpireArray = [];
var spireLightArray = [];
for (i = 0; i < 4; i++)
{
    towerSpireArray.push(new THREE.Mesh(towerSpireGeo, towerSpireMat));
    towerSpireArray[i].castShadow = true;
    towerSpireArray[i].recieveShadow = true;
    towerArray[i].add(towerSpireArray[i]);
    towerSpireArray[i].position.y = 25;
}
console.log("Tower Spires Created - T13");

console.log("Creating Castle Grounds Path - T14");
var castleGroundsPathGeo = new THREE.PlaneGeometry(10,60, 36, 36);
var castleGroundsPathMat = new THREE.MeshPhongMaterial({map: pathTexture, side:THREE.DoubleSide});
var castleGroundsPathMesh = new THREE.Mesh(castleGroundsPathGeo, castleGroundsPathMat);

castleGroundsPathMesh.position.set(0, -9.8, 25);
castleGroundsPathMesh.rotation.x = -Math.PI/2;
castleGroundsPathMesh.recieveShadow = true;
castleGateWallMesh.add(castleGroundsPathMesh);
console.log("Castle Grounds Path Created - T14");

console.log("Creating Archery Range - T15");

//The next few sections of code will import an MTL material file and an OBJ object file, these will then have their settings in the world
//set before then being set into a object variable. These models were created within Vectory.

//Material loader
var mtlLoader = new THREE.MTLLoader();

var ArchTargetMesh = new THREE.Object3D();

mtlLoader.load('Models/ArchTarget/ArchTarget.mtl', function (materials) 
{
    materials.preload();
    var objLoader = new THREE.OBJLoader(); //Object Loader
    objLoader.setMaterials(materials);
    objLoader.load('Models/ArchTarget/ArchTarget.obj', function (object) 
    {
        object.traverse(function(node) 
        { 
            if(node instanceof THREE.Mesh )
            {
                node.castShadow = true; 
            } 
        });
        object.rotation.x = Math.PI/-2;
        object.rotation.y = Math.PI;
        object.scale.set(0.1,0.1,0.1);
        object.position.set(-42.35, 13, 0);
        object.castShadow = true;
        object.recieveShadow = true;
        ArchTargetMesh = object;
        floor.add(ArchTargetMesh);
    });
        
});

var FencesMesh = new THREE.Object3D();
mtlLoader.load('Models/Fences/Fences.mtl', function (materials) 
{
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    
    objLoader.load('Models/Fences/Fences.obj', function (object) 
    {
        object.traverse(function(node) 
        { 
            if(node instanceof THREE.Mesh )
            {
                node.castShadow = true; 
            } 
        });
        floor.add(object);
        object.rotation.x = Math.PI/-2;
        object.rotation.y = Math.PI;
        object.scale.set(0.1,0.1,0.1);
        object.position.set(-43, 7, 0);
        object.castShadow = true;
        object.recieveShadow = true;
        FencesMesh = object;
        
    });   
});

var bowMesh = new THREE.Object3D();
mtlLoader.load('Models/Bow/Bow.mtl', function (materials) 
{
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    
    objLoader.load('Models/Bow/Bow.obj', function (object) 
    {
        object.traverse(function(node) 
        { 
            if(node instanceof THREE.Mesh )
            {
                node.castShadow = true; 
            } 
        });
        object.rotation.z = Math.PI / 2;
        object.rotation.x = Math.PI / 2;
        object.scale.set(0.2,0.2,0.2);
        object.position.set(-41, 1, -3);
        object.castShadow = true;
        object.recieveShadow = true;
        bowMesh = object;
        floor.add(object);
    });
        
});

var arrowMesh = new THREE.Object3D();
mtlLoader.load('Models/Arrow/Arrow.mtl', function (materials) 
{
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    
    objLoader.load('Models/Arrow/Arrow.obj', function (object) 
    {
        object.traverse(function(node) 
        { 
            if(node instanceof THREE.Mesh )
            {
                node.castShadow = true; 
            } 
        });
        object.rotation.z = Math.PI / 2;

        object.scale.set(0.3,0.3,0.3);
        object.position.set(-37, 1, -2.5);
        object.castShadow = true;
        object.recieveShadow = true;
        arrowMesh = object;
        floor.add(object);
    });
        
});

var candleHolderGeo = new THREE.CylinderGeometry(0.1, 0.1, 4, 25)
var candleHolderMat = new THREE.MeshPhongMaterial({color: 0xAA4422});
var candleHolderMesh = new THREE.Mesh(candleHolderGeo, candleHolderMat);
candleHolderMesh.position.set(-34, 1.5, -2);
candleHolderMesh.rotation.x = Math.PI / 2;
candleHolderMesh.position.y = 0
floor.add(candleHolderMesh);

var candleGeo = new THREE.CylinderGeometry(0.05,0.05,0.4,25);
var candleMat = new THREE.MeshPhongMaterial({color:0xBBBBBB});
var candleMesh = new THREE.Mesh(candleGeo, candleMat);

candleMesh.position.y = -2;
candleHolderMesh.add(candleMesh);

var candle = new THREE.PointLight(0xff7700, 0, 20, 2);
candle.position.y = -0.5;

candle.castShadow = true;
candle.shadow.mapSize.width = 512;
candle.shadow.mapSize.height = 512;
candle.shadow.camera.near = 0.5;
candle.shadow.camera.far = 20;
candleMesh.add(candle);

console.log("Archery Range Created - T15");

console.log("Creating RedTent Game - T16")
var redTentMesh = new THREE.Object3D();
mtlLoader.load('Models/RedTent/RedTent.mtl', function (materials)
{
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    
    objLoader.load('Models/RedTent/RedTent.obj', function (object)
    {
        object.scale.set(0.08, 0.08, 0.08);
        object.rotation.y = Math.PI/2;
        object.position.set(-40, 0, 32);
        object.castShadow = true;
        object.recieveShadow = true;
        scene.add(object);  
        redTentMesh = object;
    })
})

var tinCanGeo = new THREE.CylinderGeometry(0.7, 0.7, 1.5, 25);
var tinCanMat = new THREE.MeshPhongMaterial({color: 0xBBBBBB});

var tinCanMesh = new THREE.Mesh(tinCanGeo, tinCanMat);

var tins = [];
var spacer = 5; 
for(i=0; i<6; i++)
{
    if(i == 3)
    {
        spacer = 5;
    }
//First Row of Tins
tins.push(new THREE.Mesh(tinCanGeo, tinCanMat));
tins[i].castShadow = true;
tins[i].receiveShadow = true;
tins[i].rotation.x = Math.PI / 2;
tins[i].position.set(-40, 35 - spacer, -4.5);
floor.add(tins[i]);
        
//Second Row of Tins
if(i > 2)
{
    tins[i].position.set(-40, 36 - spacer, -6);
}
//Third Row of Tins
if(i == 5)
{
    tins[i].position.set(-40, 32, -7.5)
}
spacer = spacer - 2;    
}

var tinsBallGeo = new THREE.SphereGeometry(0.5,10, 10);
var tinsBallMat = new THREE.MeshPhongMaterial({color: 0x550000});

var tinsBallMesh = new THREE.Mesh(tinsBallGeo, tinsBallMat);

tinsBallMesh.position.set(-39, 35, -4);
floor.add(tinsBallMesh);

console.log("RedTent Game Created - T16");

console.log("Creating Strength Game - T17")
var strengthGameMesh = new THREE.Object3D();
mtlLoader.load('Models/StrengthGame/strengthGame.mtl', function (materials)
{
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    
    objLoader.load('Models/StrengthGame/strengthGame.obj', function (object)
    {
        object.traverse(function(node) 
        { 
            if(node instanceof THREE.Mesh )
            {
                node.castShadow = true; 
            } 
        });
        object.scale.set(0.2, 0.2, 0.2);
        object.rotation.y = Math.PI;
        object.position.set(-16, 0, 20);
        object.castShadow = true;
        object.recieveShadow = true;
        scene.add(object);    
        strengthGameMesh = object;
    })
})
var malletMesh = new THREE.Object3D();
mtlLoader.load('Models/Mallet/Mallet.mtl', function (materials) 
{
    materials.preload();
    var objLoader = new THREE.OBJLoader(); //Object Loader
    objLoader.setMaterials(materials);
    objLoader.load('Models/Mallet/Mallet.obj', function (object) 
    {
        object.traverse(function(node) 
        { 
            if(node instanceof THREE.Mesh )
            {
                node.castShadow = true; 
            } 
        });
        object.rotation.x = Math.PI;
        object.rotation.z = Math.PI/4;
        object.scale.set(0.1,0.1,0.1);
        object.position.set(-18, 4.5, 20);
        object.castShadow = true;
        object.recieveShadow = true;
        scene.add(object);
        malletMesh = object;
    });
        
});
console.log("Strength Game Created - T17");

console.log("Creating Outside scenary - T18");
console.log("Importing Carriage - T18.1");
var carriageMesh = new THREE.Object3D();
mtlLoader.load('Models/Carriage/Carriage.mtl', function (materials)
{
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    
    objLoader.load('Models/Carriage/Carriage.obj', function (object)
    {
        object.traverse(function(node) 
        { 
            if(node instanceof THREE.Mesh )
            {
                node.castShadow = true;
                node.recieveShadow = true;
            } 
        });
        object.scale.set(0.4, 0.4, 0.4);
        object.rotation.x = Math.PI / -2;
        object.position.set(-60, -100, 0);
        floor.add(object);    
        carriageMesh = object;
    })
})

console.log("Importing Dragon - T18.2");
var dragon = new THREE.Object3D();
mtlLoader.load('Blender_Models/Dragon.mtl', function (materials)
{
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    
    objLoader.load('Blender_Models/Dragon.obj', function (object)
    {
        object.traverse(function(node) 
        { 
            if(node instanceof THREE.Mesh )
            {
                node.castShadow = true;
                node.recieveShadow = true;
                node.material.color.setHex(0x008D00);
            } 
        });
        object.scale.set(30, 30, 30);
        object.position.set(70, -20, -10);
        object.rotation.x = Math.PI / -2;
        object.rotation.y = Math.PI / 2;
              Dragon = object;
        floor.add(Dragon);
    })
})
console.log("Dragon Imported - T18.2");

console.log("Creating Trees - T18.3");
var TreeTrunkGeo = new THREE.CylinderGeometry(2, 2, 15);
var TreeTrunkMat = new THREE.MeshPhongMaterial({color: 0x8B4513});
var TreeLeafsGeo = new THREE.IcosahedronBufferGeometry(8.5, 0);
var TreeLeafsMat = new THREE.MeshPhongMaterial({color: 0x006400});

//Create Tree trunks, place tree leafs on top and then place them in a 
//predetermained path with a slight random variation to createa messier forest.

TreeTrunks = [];
TreeLeafs = [];
for(i = 0; i < 125; i++)
{    
    TreeTrunks.push(new THREE.Mesh(TreeTrunkGeo, TreeTrunkMat));
    TreeLeafs.push(new THREE.Mesh(TreeLeafsGeo, TreeLeafsMat));
    TreeTrunks[i].rotation.x = Math.PI / -2;
    TreeTrunks[i].position.y = 10;
    TreeLeafs[i].position.y = 10;
    TreeTrunks[i].castShadow = true;
    TreeTrunks[i].recieveShadow = true;
    TreeLeafs[i].castShadow = true;
    TreeLeafs[i].recieveShadow = true;
    
    TreeTrunks[i].add(TreeLeafs[i]);
    //Castle is facing north
        
        
    //Southen Trees
    TreeTrunks[i].position.set(i * 25 + -200, Math.random() * 20 + 200, -5);
    if(i >= 15)
    {
        TreeTrunks[i].position.set((i-13) * 25 + -250, Math.random() * 20 + 250, -5);
    }
    if(i >= 30)
    {
        TreeTrunks[i].position.set((i-28) * 25 + -250,  Math.random() * 20 + 300,-5);         
    }
    //Westen Trees
    if(i >= 45)
    {
        TreeTrunks[i].position.set(Math.random() * 20 + 175, (i-43) * 25 - 225, -5);        
    }
    if(i >= 65)
    {
        TreeTrunks[i].position.set(Math.random() * 20 + 215, (i-63) * 25 - 225, -5 );       
    }
    //Easten Trees
    if(i >= 85)
    {
        TreeTrunks[i].position.set(Math.random() * 20 - 240,  (i-83) * 25 - 225, -5); 
    }
    if(i >= 105)
    {
        TreeTrunks[i].position.set(Math.random() * 20 - 275, (i-103) * 25 - 225 , -5 );
    }
    floor.add(TreeTrunks[i]);
}
console.log("Trees Created - T18.3");

console.log("Creating Roads Outside Castle - T18.4");
var outsidePathGeo = new THREE.PlaneGeometry(14, 120, 36, 36);
var outsidePathMat = new THREE.MeshPhongMaterial({map: pathTexture, side:THREE.DoubleSide});
var southToNorthPath = new THREE.Mesh(outsidePathGeo, outsidePathMat);
var westToEastPath = new THREE.Mesh(outsidePathGeo, outsidePathMat);

var ringroadPathGeo = new THREE.TorusGeometry(30, 15, 6, 32, 6.3);
var ringroadPathMesh = new THREE.Mesh(ringroadPathGeo,outsidePathMat);

var ringroadNorth = new THREE.Mesh(outsidePathGeo, outsidePathMat);

southToNorthPath.position.set(-30, -135, -0.2)
floor.add(southToNorthPath);

westToEastPath.position.set(37, -135, -0.2 );

westToEastPath.rotation.z = Math.PI/2;
floor.add(westToEastPath);

ringroadPathMesh.position.set(133, -135, 12);
floor.add(ringroadPathMesh);

ringroadNorth.position.set(133,  -220, -0.2);

floor.add(ringroadNorth);

console.log("Roads Outside Castle Created - T18.4");

console.log("Creating Mountains - T18.5");
var MountainsGeo = new THREE.PlaneGeometry(540,40, 12.5,5  );
var MountainsMat = new THREE.MeshPhongMaterial({color: 0x867e70, side: THREE.DoubleSide, flatShading: true   });

var mountainsMeshS = new THREE.Mesh(MountainsGeo, MountainsMat);
var mountainsMeshE = new THREE.Mesh(MountainsGeo, MountainsMat);
var mountainsMeshW = new THREE.Mesh(MountainsGeo, MountainsMat);
var mountainsMeshN = new THREE.Mesh(MountainsGeo, MountainsMat);

mountainsMeshS.position.set(0 , 345, -1);

mountainsMeshN.rotation.z = Math.PI;
mountainsMeshN.position.set(0 , -210    , -1);

mountainsMeshW.rotation.z = Math.PI / 2;
mountainsMeshW.position.set(-300 , 65, -1);

mountainsMeshE.rotation.z = Math.PI / -2;
mountainsMeshE.position.set(300 , 65, -1);

//Sets the top line of vertices to be random from a certain height.
var x = -225
var y = -12
for(i=53; i < 64; i++)
    {
        MountainsGeo.vertices[i] = new THREE.Vector3(x, y, random());
        x = x + 45;
    }

mountainsMeshS.castShadow = true;
mountainsMeshS.recieveShadow = true;
floor.add(mountainsMeshS);
floor.add(mountainsMeshE);
floor.add(mountainsMeshN);
floor.add(mountainsMeshW);
console.log("Mountains Created - T18.5");

console.log("Creating Mountain Holes - T18.6");
var blackHoleGeo = new THREE.CircleGeometry(10, 10);
var blackHoleMat = new THREE.MeshPhongMaterial({color: 0x000000, side: THREE.DoubleSide});

var blackHoleMesh1 = new THREE.Mesh(blackHoleGeo, blackHoleMat);
var blackHoleMesh2 = new THREE.Mesh(blackHoleGeo, blackHoleMat);

mountainsMeshN.add(blackHoleMesh1);
mountainsMeshN.add(blackHoleMesh2);

blackHoleMesh1.rotation.x = Math.PI / 2;
blackHoleMesh2.rotation.x = Math.PI / 2;
blackHoleMesh1.position.set(30,-20,-5);
blackHoleMesh2.position.set(-133, -20, -5);

console.log("Mountain Holes Created - T18.6");
console.log("Outside Area Created - T18");



var iFrame = 0;
//animate function
function animate() 
{
    requestAnimationFrame(animate);

    //Animate DrawBridge Coming Down
    if(iFrame > 100 && iFrame < 200)
        {
    drawBridgePivot.rotation.x = Math.sin(iFrame/99 + 90) * 2;
        }
    //Used by the "displayOverlay() function, to display the camera position
    descriptor.innerHTML = "Camera Position: (" + camera.position.x.toFixed(2) + ", " + camera.position.y.toFixed(2) + ", " + camera.position.z.toFixed(2) + ")";
        

    renderer.render(scene, camera);
    iFrame ++;
}

//Code for Helpers that will allow for a visual representation of the cameras view and in turn the area effected by shadows
var descriptor = document.getElementById("info");
const sunLightHelper = new THREE.CameraHelper(sunDirLight.shadow.camera);
const candleLightHelper = new THREE.CameraHelper(candle.shadow.camera);
const gridHelper = new THREE.GridHelper(800,25, 20);
scene.add(gridHelper);
scene.add(sunLightHelper);
scene.add(candleLightHelper);
sunLightHelper.visible = false;
gridHelper.visible = false;
candleLightHelper.visible = false;

descriptor.style.display = "none";

document.addEventListener('keydown', DevControls);

//function to display the helpers and change the time of day between day and night
function DevControls()
{
if (event.key == 'C' || event.key == 'c') 
    {        
        if(descriptor.style.display === "none")
            {
                descriptor.style.display = "block";
                sunLightHelper.visible = true;
                gridHelper.visible = true;
                candleLightHelper.visible = true;
                console.log("OVERLAY + HELPERS DISPLAYED")
            }
        else
            {
                descriptor.style.display = "none";
                sunLightHelper.visible = false;
                gridHelper.visible = false;
                candleLightHelper.visible = false;
                console.log("OVERLAY + HELPERS HIDDEN");
            }
    }
    
    if (event.key == 'T' || event.key == 't') 
    {        
        if(sunDirLight.intensity === 1)
            {
                sunDirLight.intensity = 0.4;
                sunDirLight.color = new THREE.Color(0xFFFFFF);
                candle.intensity = 6;
                sunMesh.visible = true;
                ambiantLight.intensity = 0.4;
                scene.background = new THREE.Color(0x1b1e23);
                console.log("TIME SET: NIGHT")
            }
        else
            {
                sunDirLight.intensity = 1;
                candle.intensity = 0;
                sunMesh.visible = true;
                ambiantLight.intensity = 1;
                scene.background = new THREE.Color(0x87CEEB);
                console.log("TIME SET: DAY");
            }
    }
}

//This function was made to specificly get random heights for the mountains
function random()
{
    const x = Math.floor((Math.random() * -50) - 25);
    return x;
}

console.log("Animate Function");
animate();

