import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Create a realistic pro footballer with proper skeletal system
const createProFootballer = () => {
  const player = new THREE.Group();

  // Materials with better realism
  const jerseyMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f8d2c,
    roughness: 0.4,
    metalness: 0.05,
    emissive: 0x061410,
  });

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xebb89f,
    roughness: 0.5,
    metalness: 0,
  });

  const bootMaterial = new THREE.MeshStandardMaterial({
    color: 0x0d0d0d,
    roughness: 0.25,
    metalness: 0.35,
  });

  // Create skeleton bones
  const bones = {
    pelvis: new THREE.Bone(),
    spine: new THREE.Bone(),
    chest: new THREE.Bone(),
    neck: new THREE.Bone(),
    head: new THREE.Bone(),
    leftShoulder: new THREE.Bone(),
    rightShoulder: new THREE.Bone(),
    leftUpperArm: new THREE.Bone(),
    rightUpperArm: new THREE.Bone(),
    leftLowerArm: new THREE.Bone(),
    rightLowerArm: new THREE.Bone(),
    leftHand: new THREE.Bone(),
    rightHand: new THREE.Bone(),
    leftHip: new THREE.Bone(),
    rightHip: new THREE.Bone(),
    leftThigh: new THREE.Bone(),
    rightThigh: new THREE.Bone(),
    leftCalf: new THREE.Bone(),
    rightCalf: new THREE.Bone(),
  };

  // Build proper skeleton hierarchy
  player.add(bones.pelvis);
  bones.pelvis.add(bones.spine);
  bones.spine.add(bones.chest);
  bones.chest.add(bones.neck);
  bones.neck.add(bones.head);
  bones.chest.add(bones.leftShoulder);
  bones.chest.add(bones.rightShoulder);
  bones.leftShoulder.add(bones.leftUpperArm);
  bones.rightShoulder.add(bones.rightUpperArm);
  bones.leftUpperArm.add(bones.leftLowerArm);
  bones.rightUpperArm.add(bones.rightLowerArm);
  bones.leftLowerArm.add(bones.leftHand);
  bones.rightLowerArm.add(bones.rightHand);
  bones.pelvis.add(bones.leftHip);
  bones.pelvis.add(bones.rightHip);
  bones.leftHip.add(bones.leftThigh);
  bones.rightHip.add(bones.rightThigh);
  bones.leftThigh.add(bones.leftCalf);
  bones.rightThigh.add(bones.rightCalf);

  // Position bones (realistic human proportions)
  bones.spine.position.y = 0.6;
  bones.chest.position.y = 0.55;
  bones.neck.position.y = 0.4;
  bones.head.position.y = 0.28;
  bones.leftShoulder.position.set(-0.25, 0.05, 0);
  bones.rightShoulder.position.set(0.25, 0.05, 0);
  bones.leftHip.position.set(-0.2, -0.55, 0);
  bones.rightHip.position.set(0.2, -0.55, 0);
  bones.leftUpperArm.position.y = -0.3;
  bones.rightUpperArm.position.y = -0.3;
  bones.leftLowerArm.position.y = -0.35;
  bones.rightLowerArm.position.y = -0.35;
  bones.leftHand.position.y = -0.15;
  bones.rightHand.position.y = -0.15;
  bones.leftThigh.position.y = -0.4;
  bones.rightThigh.position.y = -0.4;
  bones.leftCalf.position.y = -0.45;
  bones.rightCalf.position.y = -0.45;

  // Head with better proportions
  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), skinMaterial);
  headMesh.castShadow = true;
  headMesh.receiveShadow = true;
  bones.head.add(headMesh);

  // Hair mesh
  const hairMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.6),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 })
  );
  hairMesh.position.y = 0.02;
  hairMesh.scale.set(1.1, 0.8, 1.1);
  hairMesh.castShadow = true;
  bones.head.add(hairMesh);

  // Torso (Jersey)
  const torsoMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.65, 0.2),
    jerseyMaterial
  );
  torsoMesh.castShadow = true;
  torsoMesh.receiveShadow = true;
  bones.chest.add(torsoMesh);

  // Jersey number
  const numberCanvas = document.createElement("canvas");
  numberCanvas.width = 128;
  numberCanvas.height = 128;
  const ctx = numberCanvas.getContext("2d");
  ctx.fillStyle = "#1f8d2c";
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("10", 64, 64);
  const numberTexture = new THREE.CanvasTexture(numberCanvas);
  const numberMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.14, 0.16),
    new THREE.MeshStandardMaterial({ map: numberTexture, emissive: 0xffffff, emissiveIntensity: 0.3 })
  );
  numberMesh.position.z = 0.11;
  torsoMesh.add(numberMesh);

  // Shorts
  const shortsMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.28, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x0d1f15, roughness: 0.5 })
  );
  shortsMesh.position.y = -0.3;
  shortsMesh.castShadow = true;
  shortsMesh.receiveShadow = true;
  bones.chest.add(shortsMesh);

  // Left arm
  const leftUpperArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.08, 0.32, 12), skinMaterial);
  leftUpperArmMesh.castShadow = true;
  leftUpperArmMesh.position.y = -0.16;
  bones.leftUpperArm.add(leftUpperArmMesh);

  const leftLowerArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.35, 12), skinMaterial);
  leftLowerArmMesh.castShadow = true;
  leftLowerArmMesh.position.y = -0.175;
  bones.leftLowerArm.add(leftLowerArmMesh);

  const leftHandMesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), skinMaterial);
  leftHandMesh.scale.set(0.7, 1, 0.8);
  leftHandMesh.castShadow = true;
  bones.leftHand.add(leftHandMesh);

  // Right arm
  const rightUpperArmMesh = leftUpperArmMesh.clone();
  bones.rightUpperArm.add(rightUpperArmMesh);

  const rightLowerArmMesh = leftLowerArmMesh.clone();
  bones.rightLowerArm.add(rightLowerArmMesh);

  const rightHandMesh = leftHandMesh.clone();
  bones.rightHand.add(rightHandMesh);

  // Left leg
  const leftThighMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.105, 0.42, 12), skinMaterial);
  leftThighMesh.castShadow = true;
  leftThighMesh.position.y = -0.21;
  bones.leftThigh.add(leftThighMesh);

  const leftCalfMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.085, 0.45, 12), skinMaterial);
  leftCalfMesh.castShadow = true;
  leftCalfMesh.position.y = -0.225;
  bones.leftCalf.add(leftCalfMesh);

  const leftBootMesh = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.14, 0.36), bootMaterial);
  leftBootMesh.position.set(0, -0.22, 0.08);
  leftBootMesh.castShadow = true;
  leftBootMesh.receiveShadow = true;
  bones.leftCalf.add(leftBootMesh);

  const leftSockMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.105, 0.105, 0.12, 10),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.65 })
  );
  leftSockMesh.position.y = -0.04;
  bones.leftCalf.add(leftSockMesh);

  // Right leg
  const rightThighMesh = leftThighMesh.clone();
  bones.rightThigh.add(rightThighMesh);

  const rightCalfMesh = leftCalfMesh.clone();
  bones.rightCalf.add(rightCalfMesh);

  const rightBootMesh = leftBootMesh.clone();
  bones.rightCalf.add(rightBootMesh);

  const rightSockMesh = leftSockMesh.clone();
  bones.rightCalf.add(rightSockMesh);

  // Return with skeleton and bone references
  player.userData = {
    bones: bones,
  };

  return player;
};

// Create deformable goal net
const createGoalNet = () => {
  const netGroup = new THREE.Group();
  const netMaterial = new THREE.LineBasicMaterial({
    color: 0xf0f0f0,
    transparent: true,
    opacity: 0.5,
    linewidth: 1,
  });

  const netNodes = [];

  // Create grid of net nodes for deformation
  for (let i = -6; i <= 6; i++) {
    for (let j = 0; j < 3; j++) {
      const node = new THREE.Vector3(0, 0.2 + i * 0.32, -0.95 + j * 1.0);
      netNodes.push(node);
    }
  }

  // Connect nodes with lines
  for (let i = -6; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      const idx1 = (i + 6) * 3 + j;
      const idx2 = (i + 7) * 3 + j;

      if (idx2 < netNodes.length) {
        const geom = new THREE.BufferGeometry().setFromPoints([netNodes[idx1], netNodes[idx2]]);
        netGroup.add(new THREE.Line(geom, netMaterial));
      }

      const idx3 = (i + 6) * 3 + j;
      const idx4 = (i + 6) * 3 + (j + 1);

      if (idx4 < netNodes.length && j < 2) {
        const geom = new THREE.BufferGeometry().setFromPoints([netNodes[idx3], netNodes[idx4]]);
        netGroup.add(new THREE.Line(geom, netMaterial));
      }
    }
  }

  netGroup.userData.nodes = netNodes;
  return netGroup;
};

export default function IntroAnimation({ onFinish }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [fade, setFade] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if user has seen intro before (localStorage) - only skip on RETURN visits
    const hasSeenIntro = localStorage.getItem("intro_seen_v2");
    if (hasSeenIntro) {
      finishedRef.current = true;
      onFinish();
      return;
    }

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1a);
    scene.fog = new THREE.Fog(0x0a0f1a, 12, 35);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(-5.2, 3.2, 9.8);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // LIGHTING - Stadium night scene
    const ambientLight = new THREE.AmbientLight(0x6b8ac6, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffacd, 1.4);
    mainLight.position.set(-6, 14, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(2048, 2048);
    mainLight.shadow.camera.far = 30;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -10;
    mainLight.shadow.bias = -0.0008;
    scene.add(mainLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x4a8fb8, 0.35);
    fillLight.position.set(8, 7, -6);
    scene.add(fillLight);

    // ENVIRONMENT
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x0b5a1f,
      roughness: 0.82,
      metalness: 0.01,
    });

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 50), groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Stadium structure
    const stadiumMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d1220,
      roughness: 0.92,
      metalness: 0.03,
    });

    const backStand = new THREE.Mesh(new THREE.BoxGeometry(60, 12, 3), stadiumMaterial);
    backStand.position.set(0, 6, -18);
    backStand.receiveShadow = true;
    scene.add(backStand);

    // Goals
    const goalPostMaterial = new THREE.MeshStandardMaterial({
      color: 0xfaf8f3,
      roughness: 0.12,
      metalness: 0.5,
    });

    const leftPost = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.44, 10), goalPostMaterial);
    leftPost.position.set(5.0, 1.22, -0.95);
    leftPost.castShadow = true;
    leftPost.receiveShadow = true;
    scene.add(leftPost);

    const rightPost = leftPost.clone();
    rightPost.position.z = 0.95;
    scene.add(rightPost);

    const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 10), goalPostMaterial);
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(5.0, 2.44, 0);
    crossbar.castShadow = true;
    scene.add(crossbar);

    // GOAL NET
    const goalNet = createGoalNet();
    scene.add(goalNet);

    // PLAYER
    const player = createProFootballer();
    player.position.set(-3.5, 0, 0.95);
    scene.add(player);

    // BALL
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.18,
    });

    const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.36, 5), ballMaterial);
    ball.castShadow = true;
    ball.receiveShadow = true;
    scene.add(ball);

    // Ball initial position (incoming pass)
    ball.position.set(-2.8, 1.9, 0.9);
    const ballVelocity = new THREE.Vector3(0, -0.8, -0.12);

    // FIELD MARKINGS
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });

    const centerLine = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-15, 0.02, 0),
      new THREE.Vector3(15, 0.02, 0),
    ]);
    scene.add(new THREE.Line(centerLine, lineMaterial));

    const penaltyLine = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(4.5, 0.02, -4),
      new THREE.Vector3(4.5, 0.02, 4),
    ]);
    scene.add(new THREE.Line(penaltyLine, lineMaterial));

    // ANIMATION STATE
    const clock = new THREE.Clock();
    let shouldStop = false;
    let nextPhase = 0;
    let animationTime = 0;

    const totalDuration = 5.2; // 5.2 second sequence

    // Animation phases
    const phases = [
      { start: 0.0, end: 1.2, name: "pass_incoming" },
      { start: 1.2, end: 2.0, name: "chest_control" },
      { start: 2.0, end: 2.8, name: "preparation" },
      { start: 2.8, end: 3.6, name: "volley_jump" },
      { start: 3.6, end: 4.2, name: "ball_flight" },
      { start: 4.2, end: 5.2, name: "goal_impact" },
    ];

    // Get current phase
    const getCurrentPhase = (t) => {
      return phases.find((p) => t >= p.start && t < p.end);
    };

    // Animate pass incoming
    const animatePassIncoming = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);
      const { bones } = player.userData;
      
      ball.position.x = -2.8 + localT * 0.5;
      ball.position.y = 1.9 - localT * 1.35;
      ball.position.z = 0.9 - localT * 0.1;
      ball.rotation.x += localT * 0.3;
      ball.rotation.z += localT * 0.2;

      // Player looks at ball, prepares chest
      bones.head.rotation.y = Math.sin(localT * Math.PI) * 0.4;
      bones.chest.rotation.z = Math.sin(localT * Math.PI * 0.5) * 0.2;
      bones.leftUpperArm.rotation.z = -0.3 + Math.sin(localT * Math.PI) * 0.2;
      bones.rightUpperArm.rotation.z = 0.3 - Math.sin(localT * Math.PI) * 0.2;
    };

    // Animate chest control (realistic contact)
    const animateChestControl = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);
      const { bones } = player.userData;

      // Ball settles on chest
      ball.position.x = -2.3;
      ball.position.y = 1.15 + Math.sin(localT * Math.PI * 2.5) * 0.06;
      ball.position.z = 0.8;
      ball.rotation.x += localT * 0.15;

      // Realistic chest control: lean back slightly, absorb ball
      player.rotation.x = Math.sin(localT * Math.PI * 0.5) * 0.18;
      bones.chest.rotation.x = -0.1 + Math.sin(localT * Math.PI) * 0.15;
      bones.head.rotation.y = 0.3 - localT * 0.2;
      bones.leftUpperArm.rotation.z = -0.5 + Math.sin(localT * Math.PI) * 0.15;
      bones.rightUpperArm.rotation.z = 0.5 - Math.sin(localT * Math.PI) * 0.15;
      
      // Slight hop/balance
      player.position.y = Math.sin(localT * Math.PI) * 0.1;
    };

    // Animate preparation (touch and get ready for volley)
    const animatePreparation = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);
      const { bones } = player.userData;

      ball.position.x = -2.15 + localT * 0.25;
      ball.position.y = 0.95 + Math.sin(localT * Math.PI) * 0.12;
      ball.position.z = 0.75 - localT * 0.1;

      // Prepare body for volley: rotate hips, lean back
      bones.pelvis.rotation.z = localT * 0.25;
      bones.chest.rotation.z = -localT * 0.3;
      bones.head.rotation.y = 0.2 - localT * 0.15;
      
      // Arms up for balance
      bones.leftUpperArm.rotation.z = -0.7 + localT * 0.2;
      bones.rightUpperArm.rotation.z = 0.7 - localT * 0.2;
      
      // Shift weight to left leg
      bones.leftThigh.rotation.z = -localT * 0.15;
      bones.rightThigh.rotation.z = localT * 0.2;
    };

    // Animate volley jump and kick with realistic body mechanics
    const animateVolleyKick = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);
      const { bones } = player.userData;

      // Jump effect
      const jumpCurve = Math.sin(localT * Math.PI) * 0.45;
      player.position.y = jumpCurve;

      // Powerful kicking motion - right leg extends
      const kickPower = Math.sin(localT * Math.PI);
      bones.rightThigh.rotation.x = -1.3 * kickPower;
      bones.rightCalf.rotation.x = 0.9 * kickPower;
      
      // Left leg stabilizes
      bones.leftThigh.rotation.x = -0.4 + kickPower * 0.2;
      
      // Torso rotation and balance
      bones.pelvis.rotation.z = 0.3 + kickPower * 0.2;
      bones.chest.rotation.x = -0.2 + kickPower * 0.25;
      bones.chest.rotation.z = -0.3 - kickPower * 0.3;
      
      // Arm swings for balance (left up, right down)
      bones.leftUpperArm.rotation.z = -1.2 + kickPower * 0.3;
      bones.leftUpperArm.rotation.x = -0.4 - kickPower * 0.2;
      bones.rightUpperArm.rotation.z = 0.6 - kickPower * 0.4;
      bones.rightUpperArm.rotation.x = -0.8 + kickPower * 0.3;
      
      // Head follows ball
      bones.head.rotation.y = 0.1 + kickPower * 0.15;
      
      // Ball accelerates from boot
      const kickIntensity = Math.sin(localT * Math.PI);
      ball.position.x = -1.9 + kickIntensity * 0.35;
      ball.position.y = 0.8 + kickIntensity * 0.35;
      ball.rotation.x += kickIntensity * 0.8;
      ball.rotation.z += kickIntensity * 0.6;
    };

    // Animate ball flight to goal
    const animateBallFlight = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);
      const { bones } = player.userData;

      // Parabolic trajectory for realistic ball flight
      const flightCurve = Math.sin(localT * Math.PI) * 1.9;
      ball.position.x = -1.65 + localT * 6.8;
      ball.position.y = 1.08 + flightCurve;
      ball.position.z = 0.65 - localT * 0.75;

      // Ball spins from kick
      ball.rotation.x += localT * 0.65;
      ball.rotation.z += localT * 0.4;

      // Player lands and watches ball
      player.position.y = Math.max(0, Math.sin((1 - localT) * Math.PI) * 0.15);
      bones.rightThigh.rotation.x = -1.3 + localT * 1.3;
      bones.rightCalf.rotation.x = 0.9 - localT * 0.9;
      bones.head.rotation.y = 0.25 + localT * 0.25;
      bones.chest.rotation.z = -0.6 + localT * 0.4;
      bones.leftUpperArm.rotation.z = -1.2 + localT * 0.5;

      // Camera tracking follows ball
      const camX = -4.5 + localT * 6.2;
      const camY = 2.8 + localT * 0.8;
      const camZ = 8.8 - localT * 2.3;
      camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.13);
    };

    // Animate goal impact and net deformation
    const animateGoalImpact = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);
      const { bones } = player.userData;

      ball.position.set(5.0, 1.2 - localT * 0.2, 0);

      // Net deformation physics
      const netNodes = goalNet.userData.nodes;
      if (netNodes) {
        netNodes.forEach((node, idx) => {
          const distToCenter = Math.abs(node.z);
          const impact = Math.max(0, 1 - (distToCenter * 2 + idx * 0.05));
          const deform = Math.sin(localT * Math.PI * 4) * impact * 0.15;
          node.x = deform;
        });
      }

      // Player celebration animation
      bones.leftUpperArm.rotation.z = -1.2 + localT * 1.5;
      bones.rightUpperArm.rotation.z = 0.8 + localT * 1.0;
      bones.chest.rotation.x = Math.sin(localT * Math.PI * 2) * 0.2;
      player.position.y = Math.sin(localT * Math.PI * 2.5) * 0.08;

      // Camera setup for goal celebration view
      camera.position.lerp(new THREE.Vector3(3.8, 2.3, 5.2), 0.1);
      camera.lookAt(5.0, 1.2, 0);
    };

    // Main animation loop
    const animate = () => {
      if (shouldStop) return;

      const elapsed = clock.getElapsedTime();
      const t = Math.min(elapsed, totalDuration);
      const phase = getCurrentPhase(t);

      if (phase) {
        switch (phase.name) {
          case "pass_incoming":
            animatePassIncoming(t, phase);
            break;
          case "chest_control":
            animateChestControl(t, phase);
            break;
          case "preparation":
            animatePreparation(t, phase);
            break;
          case "volley_jump":
            animateVolleyKick(t, phase);
            break;
          case "ball_flight":
            animateBallFlight(t, phase);
            break;
          case "goal_impact":
            animateGoalImpact(t, phase);
            break;
        }
      }

      renderer.render(scene, camera);

      if (t >= totalDuration - 0.1) {
        // Trigger finish at goal moment
        if (finishedRef.current) return;
        finishedRef.current = true;
        localStorage.setItem("intro_seen_v2", "true");
        setFade(true);
        setTimeout(() => {
          onFinish();
        }, 800);
        return;
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    setLoaded(true);
    requestAnimationFrame(animate);

    return () => {
      shouldStop = true;
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onFinish]);

  const handleSkip = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    localStorage.setItem("intro_seen_v2", "true");
    setFade(true);
    setTimeout(() => {
      onFinish();
    }, 300);
  };

  return (
    <div className={`intro-overlay ${fade ? "intro-fade" : ""}`}>
      <div className="intro-canvas" ref={containerRef} />
      <div className="intro-ui">
        <div className="intro-title">
          <span className="intro-tag">🎬 Cinematic Football Moment</span>
          <h1>Volley into Victory</h1>
          <p>Watch a stunning chest-control volley followed by a net-shaking goal</p>
        </div>
        {!loaded && <div className="intro-loading">Initializing 3D scene...</div>}
        <button type="button" className="intro-skip" onClick={handleSkip}>
          Skip →
        </button>
      </div>
    </div>
  );
}
