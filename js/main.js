//console.log('Hellow world!!!');

// get our canvas
const canvas = document.getElementById("renderCanvas");

//create a babylon engine
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
  let noArmCap = [];
  let chair = [];
  let arm2D = [];
  let arm4D = [];
  let seat = undefined;
  let seatMaterial = undefined;
  let blueSeat = undefined;
  let beigeSeat = undefined;

  //create scene

  const scene = new BABYLON.Scene(engine);

  // const mat1 = new BABYLON.StandardMaterial("mat1", scene);

  scene.clearColor = new BABYLON.Color3(0.9, 0.9, 0.9);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0;
  //light.diffuse = new BABYLON.Color3(1, 0, 0);

  //create camera
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    0,
    0,
    20,
    new BABYLON.Vector3(0, 45, 0),
    scene
  );
  camera.setPosition(new BABYLON.Vector3(0, 90, 150));
  camera.upperRadiusLimit = 200;
  camera.lowerRadiusLimit = 90;
  camera.upperBetaLimit = Math.PI / 1.5;
  camera.lowerBetaLimit = 0;
  //camera.upperAlphaLimit = Math.PI;
  //camera.lowerAlphaLimit = Math.PI/2;
  camera.attachControl(canvas, true);

  beigeSeat = new BABYLON.Texture("assets/fabric.jpg", scene);

  beigeSeat.uScale = 4.0;
  beigeSeat.vScale = 4.0;

  var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "./assets/environment.env",
    scene
  );

  scene.environmentTexture = hdrTexture;
  scene.environmentIntensity = 0.85;

  const arm2dButton = document.getElementById("2D-chair");
  const arm4dButton = document.getElementById("4D-chair");
  const armlessdButton = document.getElementById("armless");
  const beigeButton = document.getElementById("beige");
  const blueButton = document.getElementById("black");

  // const testbuttn = document.querySelectorAll(".btn");

  // console.log(testbuttn);
  // testbuttn[1].addEventListener("click", () => {
  //   console.log("working");
  // });
  // // console.log(armmdButton);
  //Importing cap meshes
  const noArmCapImp = new BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/",
    "no_arm_cap.glb",
    scene
  );
  noArmCapImp.then((result) => {
    noArmCap = result.meshes;
    // console.log(noArmCap[1].material);
  });

  const myChair = new BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/",
    "chair_base.glb",
    scene
  );

  myChair.then((result) => {
    chair = result.meshes;
    seat = scene.getMeshByName("AFUCH-3-STFB");
    seatMaterial = seat.material;
    blueSeat = seatMaterial.albedoTexture;
    // console.log(blueSeat, beigeSeat);
    // chair[0].setEnabled(false);
    // camera.zoomOn([chair[5]], true);
    chair.forEach((element) => {
      // console.log(element);
    });
  });

  arm2dButton.addEventListener("click", () => {
    // console.log("working");
    try {
      noArmCap[0].setEnabled(false);
      arm4D[0].setEnabled(false);
    } catch (err) {}
    const arm2DT = new BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "./assets/",
      "2D_arm.glb",
      scene
    );
    arm2DT.then((result) => {
      arm2D = result.meshes;
      // console.log("working");
    });
  });

  arm4dButton.addEventListener("click", () => {
    // console.log("working");
    try {
      noArmCap[0].setEnabled(false);
      arm2D[0].setEnabled(false);
    } catch (err) {}
    const arm4DT = new BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "./assets/",
      "4D_arm.glb",
      scene
    );
    arm4DT.then((result) => {
      arm4D = result.meshes;
      // console.log("working");
    });
  });

  armlessdButton.addEventListener("click", () => {
    // console.log("working");
    try {
      noArmCap[0].setEnabled(true);
    } catch (err) {}
    try {
      arm2D[0].setEnabled(false);
    } catch (err) {}
    try {
      arm4D[0].setEnabled(false);
    } catch (err) {}
  });

  beigeButton.addEventListener("click", () => {
    console.log("working");
    seatMaterial.albedoTexture = beigeSeat;
    // seatMaterial = mat1;
  });

  blueButton.addEventListener("click", () => {
    seatMaterial.albedoTexture = blueSeat;
  });

  return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
