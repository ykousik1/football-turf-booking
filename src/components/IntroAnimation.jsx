import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Create a Neymar-inspired player character with jersey, shorts, and boots
const createNeymarInspiredPlayer = () => {
  const player = new THREE.Group();

  // Jersey (green kit inspired by Neymar's style)
  const jerseyMaterial = new THREE.MeshStandardMaterial({
    color: 0x1f8d2c,
    roughness: 0.35,
    metalness: 0.08,
  });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.82, 0.28), jerseyMaterial);
  torso.castShadow = true;
  torso.receiveShadow = true;
  torso.position.y = 1.08;
  player.add(torso);

  // Jersey number "10" (simple canvas texture)
  const numberCanvas = document.createElement("canvas");
  numberCanvas.width = 64;
  numberCanvas.height = 64;
  const ctx = numberCanvas.getContext("2d");
  ctx.fillStyle = "#1f8d2c";
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("10", 32, 32);

  const texture = new THREE.CanvasTexture(numberCanvas);
  const numberGeometry = new THREE.PlaneGeometry(0.14, 0.16);
  const numberMesh = new THREE.Mesh(numberGeometry, new THREE.MeshStandardMaterial({ map: texture }));
  numberMesh.position.z = 0.15;
  torso.add(numberMesh);

  // Head (light skin tone)
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5d5b8,
    roughness: 0.4,
    metalness: 0.02,
  });
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 20), skinMaterial);
  head.position.set(0, 1.78, 0);
  head.castShadow = true;
  head.receiveShadow = true;
  player.add(head);

  // Hair (dark, stylish)
  const hairMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.5,
  });
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), hairMaterial);
  hair.position.set(0, 1.95, 0);
  hair.scale.set(1, 0.65, 1);
  hair.castShadow = true;
  player.add(hair);

  // Arms
  const armMaterial = skinMaterial.clone();
  const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.75, 12), armMaterial);
  leftArm.position.set(-0.5, 1.3, 0);
  leftArm.rotation.z = -0.35;
  leftArm.castShadow = true;
  leftArm.receiveShadow = true;
  player.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.set(0.5, 1.3, 0);
  rightArm.rotation.z = 0.35;
  player.add(rightArm);

  // Shorts (dark)
  const shortsMaterial = new THREE.MeshStandardMaterial({
    color: 0x0d1f15,
    roughness: 0.45,
  });
  const shorts = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.35, 0.3), shortsMaterial);
  shorts.position.y = 0.75;
  shorts.castShadow = true;
  shorts.receiveShadow = true;
  player.add(shorts);

  // Legs
  const legMaterial = skinMaterial.clone();
  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.85, 12), legMaterial);
  leftLeg.position.set(-0.15, 0.15, 0);
  leftLeg.castShadow = true;
  leftLeg.receiveShadow = true;
  player.add(leftLeg);

  const rightLeg = leftLeg.clone();
  rightLeg.position.set(0.15, 0.15, 0);
  player.add(rightLeg);

  // Boots (premium look)
  const bootMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    roughness: 0.3,
    metalness: 0.15,
  });
  const bootGeometry = new THREE.BoxGeometry(0.2, 0.14, 0.42);
  const leftBoot = new THREE.Mesh(bootGeometry, bootMaterial);
  leftBoot.position.set(-0.15, -0.27, 0.1);
  leftBoot.castShadow = true;
  leftBoot.receiveShadow = true;
  player.add(leftBoot);

  const rightBoot = leftBoot.clone();
  rightBoot.position.set(0.15, -0.27, 0.1);
  player.add(rightBoot);

  // Soccer socks (white stripe)
  const sockMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
  });
  const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.18, 10), sockMaterial);
  sock.position.set(-0.15, -0.05, 0);
  sock.castShadow = true;
  player.add(sock);

  const rightSock = sock.clone();
  rightSock.position.set(0.15, -0.05, 0);
  player.add(rightSock);

  player.userData = {
    torso,
    head,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    leftBoot,
    rightBoot,
  };

  return player;
};

export default function IntroAnimation({ onFinish }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [fade, setFade] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020613);
    scene.fog = new THREE.Fog(0x020613, 10, 28);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      150
    );
    camera.position.set(-4, 2.8, 8.2);
    camera.lookAt(0.3, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    container.appendChild(renderer.domElement);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Lighting setup with stadium atmosphere
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.35);
    mainLight.position.set(-5, 12, 7);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(2048, 2048);
    mainLight.shadow.camera.far = 25;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -5;
    mainLight.shadow.bias = -0.0005;
    scene.add(mainLight);

    // Stadium fill light
    const fillLight = new THREE.DirectionalLight(0x4a8fb8, 0.45);
    fillLight.position.set(6, 8, -5);
    scene.add(fillLight);

    // Ground (grass)
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a4d1f,
      roughness: 0.85,
      metalness: 0.01,
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(50, 30), groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Stadium walls (subtle)
    const stadiumMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0f15,
      roughness: 0.9,
      metalness: 0.02,
    });

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(50, 10, 2), stadiumMaterial);
    backWall.position.set(0, 5, -15);
    backWall.receiveShadow = true;
    scene.add(backWall);

    const sideWall1 = new THREE.Mesh(new THREE.BoxGeometry(2, 8, 30), stadiumMaterial);
    sideWall1.position.set(-25, 4, 0);
    sideWall1.receiveShadow = true;
    scene.add(sideWall1);

    const sideWall2 = sideWall1.clone();
    sideWall2.position.set(25, 4, 0);
    scene.add(sideWall2);

    // Field lines (center and penalty)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xeeeeee,
      transparent: true,
      opacity: 0.25,
      linewidth: 2,
    });

    const linePoints = [
      [-12, 0.02, 0],
      [12, 0.02, 0],
      [0, 0.02, -8],
      [0, 0.02, 8],
      [-4, 0.02, -6],
      [4, 0.02, -6],
    ];

    linePoints.forEach(([x, y, z]) => {
      const length = Math.abs(x) > 5 ? 24 : 16;
      const endPoint = new THREE.Vector3(
        x + (x !== 0 ? 0 : 0),
        y,
        z + (z === 0 ? length : 0)
      );
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y, z),
        endPoint,
      ]);
      scene.add(new THREE.Line(geometry, lineMaterial));
    });

    // Create player using Neymar-inspired design
    const player = createNeymarInspiredPlayer();
    player.position.set(-3.0, 0, 0.8);
    player.rotation.y = Math.PI / 6;
    scene.add(player);

    // Ball
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.12,
    });
    const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.33, 4), ballMaterial);
    ball.castShadow = true;
    ball.receiveShadow = true;
    ball.position.set(-2.1, 0.33, 1.0);
    scene.add(ball);

    // Ball pattern (simple pentagon pattern)
    const ballPatternMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.35,
    });
    for (let i = 0; i < 3; i++) {
      const patch = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), ballPatternMaterial);
      const angle = (i * Math.PI * 2) / 3;
      patch.position.copy(ball.position);
      patch.position.x += Math.cos(angle) * 0.25;
      patch.position.z += Math.sin(angle) * 0.25;
      patch.scale.set(0.9, 0.9, 0.9);
      scene.add(patch);
    }

    // Goal structure
    const goalGroup = new THREE.Group();
    const postMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.15,
      metalness: 0.35,
    });

    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 2.4, 12), postMaterial);
    pillar.position.set(4.8, 1.2, -0.95);
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    goalGroup.add(pillar);

    const pillar2 = pillar.clone();
    pillar2.position.set(4.8, 1.2, 0.95);
    goalGroup.add(pillar2);

    const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 12), postMaterial);
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.set(4.8, 2.4, 0);
    crossbar.castShadow = true;
    crossbar.receiveShadow = true;
    goalGroup.add(crossbar);

    // Goal net with more detail
    const netGroup = new THREE.Group();
    const netMaterial = new THREE.LineBasicMaterial({
      color: 0xe8e8e8,
      transparent: true,
      opacity: 0.4,
    });

    for (let i = -5; i <= 5; i++) {
      for (let j = 0; j < 3; j++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(4.7, 0.2 + i * 0.35, -1.0 + j * 1.0),
          new THREE.Vector3(4.7, 0.2 + (i + 1) * 0.35, -1.0 + j * 1.0),
        ]);
        netGroup.add(new THREE.Line(geometry, netMaterial));

        const vGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(4.7, 0.2 + i * 0.35, -1.0 + j * 1.0),
          new THREE.Vector3(4.7, 0.2 + i * 0.35, -1.0 + (j + 1) * 1.0),
        ]);
        netGroup.add(new THREE.Line(vGeometry, netMaterial));
      }
    }

    goalGroup.add(netGroup);
    scene.add(goalGroup);

    // Play crowd sound effect (optional - low volume)
    const playCheerSound = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const audioContext = new AudioContext();
        const now = audioContext.currentTime;
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.15);

        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0, now + 0.15);

        oscillator.start(now);
        oscillator.stop(now + 0.15);
      } catch (e) {
        // Silent fail if audio context unavailable
      }
    };

    // Animation timeline
    const clock = new THREE.Clock();
    const timelineDuration = 4.5;
    let shouldStop = false;
    let hasPlayed = false;

    const finishAnimation = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setFade(true);
      setTimeout(() => {
        onFinish();
      }, 700);
    };

    const animate = () => {
      if (shouldStop) return;

      const elapsed = clock.getElapsedTime();
      const t = Math.min(elapsed, timelineDuration);
      const progress = t / timelineDuration;

      // Phase 1: Dribbling approach (0-1.2s)
      if (t < 1.2) {
        const phase = t / 1.2;
        player.position.x = -3.0 + phase * 1.8;
        player.position.z = 0.8 + Math.sin(phase * Math.PI * 2) * 0.15;

        const { leftArm, rightArm, leftLeg, rightLeg } = player.userData;
        leftArm.rotation.z = -0.3 - Math.sin(phase * Math.PI * 3) * 0.25;
        rightArm.rotation.z = 0.3 + Math.sin(phase * Math.PI * 3) * 0.28;
        leftLeg.rotation.x = Math.sin(phase * Math.PI * 3) * 0.5;
        rightLeg.rotation.x = Math.cos(phase * Math.PI * 3) * 0.5;

        ball.position.x = -2.1 + phase * 0.85;
        ball.rotation.x += phase * 0.15;
      }
      // Phase 2: Wind-up (1.2-1.55s)
      else if (t < 1.55) {
        const phase = (t - 1.2) / 0.35;
        const { rightLeg } = player.userData;
        rightLeg.rotation.x = -1.1 * phase;
        player.userData.rightBoot.rotation.x = phase * 0.8;
      }
      // Phase 3: Kick (1.55-1.85s)
      else if (t < 1.85) {
        const phase = (t - 1.55) / 0.3;
        if (phase > 0.1 && !hasPlayed) {
          hasPlayed = true;
          playCheerSound();
        }

        const kickPower = Math.sin(phase * Math.PI) * 1.2;
        const { rightLeg } = player.userData;
        rightLeg.rotation.x = -1.1 + kickPower * 1.2;

        ball.position.x = -1.25 + phase * 0.6;
        ball.position.y = 0.33 + Math.sin(phase * Math.PI) * 0.18;
        ball.rotation.x += phase * 0.3;
      }
      // Phase 4: Ball flight (1.85-3.5s)
      else if (t < 3.5) {
        const flightPhase = (t - 1.85) / 1.65;
        const ballTrajectory = Math.sin(Math.min(flightPhase, 0.75) * Math.PI) * 2.2;

        ball.position.x = -0.65 + flightPhase * 5.3;
        ball.position.y = 0.33 + ballTrajectory;
        ball.position.z = 1.0 - flightPhase * 1.85;
        ball.rotation.x += flightPhase * 0.4;
        ball.rotation.z += flightPhase * 0.25;

        // Camera follows ball cinematic
        const targetCamPos = new THREE.Vector3(
          -2 + flightPhase * 3.5,
          2.0 + flightPhase * 0.8,
          6.5 - flightPhase * 2.8
        );
        camera.position.lerp(targetCamPos, 0.08);
        camera.lookAt(
          ball.position.x + 0.5,
          ball.position.y,
          ball.position.z
        );
      }
      // Phase 5: Goal hit and net reaction (3.5-4.5s)
      else if (t < 4.5) {
        const goalPhase = (t - 3.5) / 1.0;
        ball.position.x = 4.85;
        ball.position.y = 0.33 + Math.sin((1 - goalPhase) * Math.PI) * 1.5;
        ball.position.z = 0.02;

        if (goalPhase < 0.3) {
          const bounce = Math.sin(goalPhase * Math.PI * 8) * 0.08;
          netGroup.rotation.z = bounce * 0.15;
          netGroup.position.x = bounce * 0.06;
        }
      }

      renderer.render(scene, camera);

      if (t >= timelineDuration) {
        finishAnimation();
        return;
      }

      requestAnimationFrame(animate);
    };

    setLoaded(true);
    requestAnimationFrame(animate);

    return () => {
      shouldStop = true;
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onFinish]);

  const handleSkip = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFade(true);
    setTimeout(() => {
      onFinish();
    }, 200);
  };

  return (
    <div className={`intro-overlay ${fade ? "intro-fade" : ""}`}>
      <div className="intro-canvas" ref={containerRef} />
      <div className="intro-ui">
        <div className="intro-title">
          <span className="intro-tag">⚽ Goal! Cinematic Kick-Off</span>
          <h1>Welcome to TurfKhelo</h1>
          <p>
            Experience a premium 3D football animation before entering the
            world of turfs, tournaments, and skillful plays.
          </p>
        </div>
        {!loaded && <div className="intro-loading">Loading 3D animation...</div>}
        <button type="button" className="intro-skip" onClick={handleSkip}>
          Skip Animation →
        </button>
      </div>
    </div>
  );
}
