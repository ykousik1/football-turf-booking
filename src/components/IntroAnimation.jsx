import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Create a sophisticated pro footballer model
const createProFootballer = () => {
  const player = new THREE.Group();

  // Body materials
  const jerseyMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f8d2c,
    roughness: 0.35,
    metalness: 0.08,
    emissive: 0x0a3d15,
  });

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5d5b8,
    roughness: 0.4,
    metalness: 0.02,
  });

  const bootMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.3,
    metalness: 0.25,
  });

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 20), skinMaterial);
  head.position.y = 1.8;
  head.castShadow = true;
  head.receiveShadow = true;
  player.add(head);

  // Hair (dark, voluminous)
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.55 })
  );
  hair.position.y = 2.0;
  hair.scale.set(1.05, 0.7, 1.05);
  hair.castShadow = true;
  player.add(hair);

  // Torso/Jersey
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.68, 0.24), jerseyMaterial);
  torso.position.y = 1.12;
  torso.castShadow = true;
  torso.receiveShadow = true;
  player.add(torso);

  // Jersey number "10" text
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1f8d2c";
  ctx.fillRect(0, 0, 128, 128);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 110px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("10", 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  const numberMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.18),
    new THREE.MeshStandardMaterial({ map: texture })
  );
  numberMesh.position.z = 0.13;
  torso.add(numberMesh);

  // Shorts
  const shorts = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.32, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x0d1f15, roughness: 0.45 })
  );
  shorts.position.y = 0.78;
  shorts.castShadow = true;
  shorts.receiveShadow = true;
  player.add(shorts);

  // Arms
  const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.36, 10), skinMaterial);
  leftUpperArm.position.set(-0.52, 1.38, 0);
  leftUpperArm.castShadow = true;
  player.add(leftUpperArm);

  const leftForeArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.38, 10), skinMaterial);
  leftForeArm.position.set(-0.52, 1.0, 0);
  leftForeArm.castShadow = true;
  player.add(leftForeArm);

  const rightUpperArm = leftUpperArm.clone();
  rightUpperArm.position.x = 0.52;
  player.add(rightUpperArm);

  const rightForeArm = leftForeArm.clone();
  rightForeArm.position.x = 0.52;
  player.add(rightForeArm);

  // Legs
  const leftThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.48, 10), skinMaterial);
  leftThigh.position.set(-0.16, 0.52, 0);
  leftThigh.castShadow = true;
  player.add(leftThigh);

  const leftShin = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.5, 10), skinMaterial);
  leftShin.position.set(-0.16, -0.06, 0);
  leftShin.castShadow = true;
  player.add(leftShin);

  const leftBoot = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.13, 0.36), bootMaterial);
  leftBoot.position.set(-0.16, -0.37, 0.08);
  leftBoot.castShadow = true;
  player.add(leftBoot);

  const rightThigh = leftThigh.clone();
  rightThigh.position.x = 0.16;
  player.add(rightThigh);

  const rightShin = leftShin.clone();
  rightShin.position.x = 0.16;
  player.add(rightShin);

  const rightBoot = leftBoot.clone();
  rightBoot.position.x = 0.16;
  player.add(rightBoot);

  // Socks
  const sockL = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.11, 0.16, 8),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 })
  );
  sockL.position.set(-0.16, 0.08, 0);
  player.add(sockL);

  const sockR = sockL.clone();
  sockR.position.x = 0.16;
  player.add(sockR);

  // Return with references to animatable parts
  player.userData = {
    head,
    leftUpperArm,
    leftForeArm,
    rightUpperArm,
    rightForeArm,
    leftThigh,
    rightThigh,
    leftShin,
    rightShin,
    leftBoot,
    rightBoot,
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
    // Check if user has seen intro before (localStorage)
    const hasSeenIntro = localStorage.getItem("intro_seen");
    if (hasSeenIntro) {
      finishedRef.current = true;
      onFinish();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

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
      ball.position.x = -2.8 + localT * 0.5;
      ball.position.y = 1.9 - localT * 1.35;
      ball.position.z = 0.9 - localT * 0.1;
      ball.rotation.x += localT * 0.3;
      ball.rotation.z += localT * 0.2;

      // Player prepares to receive
      player.userData.head.rotation.y = Math.sin(localT * Math.PI) * 0.3;
      player.userData.leftUpperArm.rotation.x = -0.4 + Math.sin(localT * Math.PI) * 0.2;
      player.userData.rightUpperArm.rotation.x = -0.4 - Math.sin(localT * Math.PI) * 0.15;
    };

    // Animate chest control
    const animateChestControl = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);

      // Ball on chest
      ball.position.x = -2.3;
      ball.position.y = 1.2 + Math.sin(localT * Math.PI * 2) * 0.08;
      ball.position.z = 0.8;

      // Player chest control animation
      player.userData.head.rotation.y = 0.3 - localT * 0.2;
      player.userData.leftUpperArm.rotation.x = -0.5;
      player.userData.rightUpperArm.rotation.x = -0.5;
      player.rotation.x = Math.sin(localT * Math.PI) * 0.15;
    };

    // Animate preparation (touch and settle)
    const animatePreparation = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);

      ball.position.x = -2.2 + localT * 0.3;
      ball.position.y = 0.9 + Math.sin(localT * Math.PI) * 0.15;
      ball.position.z = 0.75;

      // Body angle for volley
      player.rotation.x = 0.15 - localT * 0.1;
      player.userData.leftForeArm.rotation.x = -0.6 + localT * 0.3;
      player.userData.rightForeArm.rotation.x = -0.6 + localT * 0.3;
    };

    // Animate volley jump and kick
    const animateVolleyKick = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);

      // Jump effect
      player.position.y = Math.sin(localT * Math.PI) * 0.35;

      // Kicking leg animation (right leg for volley)
      player.userData.rightThigh.rotation.x = -1.2 * localT;
      player.userData.rightShin.rotation.x = 0.8 * localT;

      // Kicking motion builds up
      const kickIntensity = Math.sin(localT * Math.PI);
      ball.position.x = -1.9 + kickIntensity * 0.25;
      ball.position.y = 0.75 + kickIntensity * 0.3;

      // Upper body rotation during kick
      player.rotation.y = -0.2 + kickIntensity * 0.15;
    };

    // Animate ball flight to goal
    const animateBallFlight = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);

      // Parabolic trajectory
      const flightCurve = Math.sin(localT * Math.PI) * 1.8;
      ball.position.x = -1.65 + localT * 6.8;
      ball.position.y = 1.05 + flightCurve;
      ball.position.z = 0.7 - localT * 0.8;

      // Ball spin
      ball.rotation.x += localT * 0.5;
      ball.rotation.z += localT * 0.35;

      // Camera tracking
      const camX = -4.5 + localT * 6.0;
      const camY = 2.8 + localT * 0.6;
      const camZ = 8.8 - localT * 2.5;
      camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.12);
    };

    // Animate goal impact and net deformation
    const animateGoalImpact = (t, phase) => {
      const localT = (t - phase.start) / (phase.end - phase.start);

      ball.position.set(5.0, 1.2 - localT * 0.15, 0);

      // Net deformation
      const netNodes = goalNet.userData.nodes;
      if (netNodes) {
        netNodes.forEach((node, idx) => {
          const distToCenter = Math.abs(node.z);
          const impact = Math.max(0, 1 - (distToCenter * 2 + idx * 0.05));
          const deform = Math.sin(localT * Math.PI * 3) * impact * 0.12;
          node.x = deform;
        });
      }

      // Camera setup for goal celebration
      camera.position.lerp(new THREE.Vector3(4.0, 2.2, 5.5), 0.08);
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
        localStorage.setItem("intro_seen", "true");
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
    localStorage.setItem("intro_seen", "true");
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
