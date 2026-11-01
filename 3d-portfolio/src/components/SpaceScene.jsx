
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { CanvasTexture, SRGBColorSpace } from "three";
import "./SpaceScene.css";

function createPlanetTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create planet surface texture.");

  const image = context.createImageData(canvas.width, canvas.height);
  const dark = [27, 24, 76];
  const mid = [80, 57, 158];
  const light = [151, 129, 219];

  for (let y = 0; y < canvas.height; y += 1) {
    const v = (y / canvas.height) * Math.PI;
    for (let x = 0; x < canvas.width; x += 1) {
      const u = (x / canvas.width) * Math.PI * 2;
      const field =
        Math.sin(u * 3 + Math.sin(v * 4) * 1.4) * 0.55 +
        Math.cos(u * 5 - v * 3.2) * 0.28 +
        Math.sin(u * 9 + Math.cos(v * 7) * 2) * 0.17;
      const grain = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      const noise = grain - Math.floor(grain);
      const value = Math.max(0, Math.min(1, 0.5 + field * 0.42 + noise * 0.045));
      const lower = value < 0.58 ? dark : mid;
      const upper = value < 0.58 ? mid : light;
      const blend = value < 0.58 ? value / 0.58 : (value - 0.58) / 0.42;
      const offset = (y * canvas.width + x) * 4;

      image.data[offset] = lower[0] + (upper[0] - lower[0]) * blend;
      image.data[offset + 1] = lower[1] + (upper[1] - lower[1]) * blend;
      image.data[offset + 2] = lower[2] + (upper[2] - lower[2]) * blend;
      image.data[offset + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

const shootingStarPaths = [
  { startX: 1.05, startY: 0.88, deltaX: -1.5, deltaY: -1.05 },
  { startX: 1.05, startY: 0.18, deltaX: -1.5, deltaY: 0.78 },
  { startX: -0.05, startY: 0.78, deltaX: 1.5, deltaY: -0.92 },
  { startX: -0.05, startY: 0.2, deltaX: 1.5, deltaY: 0.86 },
  { startX: 0.55, startY: 1.08, deltaX: 0.8, deltaY: -1.35 },
  { startX: 0.42, startY: -0.08, deltaX: -0.95, deltaY: 1.2 },
  { startX: 0.95, startY: 0.55, deltaX: -1.5, deltaY: 0.15 },
  { startX: 0.08, startY: 0.52, deltaX: 1.5, deltaY: -0.18 },
];

const meteorField = [
  { x: 0.2, lane: -0.12, speed: 0.72 },
  { x: 1.25, lane: 0.2, speed: 0.58 },
  { x: 2.3, lane: -0.3, speed: 0.84 },
];
const laserSlots = Array.from({ length: 3 }, (_, index) => index);
const fragmentSlots = Array.from({ length: meteorField.length * 4 }, (_, index) => index);
const arcadeSceneDepth = 1.55;

function ShootingStar({ delay, pathIndex }) {
  const starRef = useRef(null);
  const glowMaterialRef = useRef(null);
  const trailMaterialRef = useRef(null);
  const headMaterialRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { viewport } = useThree();
  const path = shootingStarPaths[pathIndex % shootingStarPaths.length];

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const updateMotionPreference = () => {
      setReducedMotion(motionPreference.matches);
    };

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useFrame(({ clock }) => {
    if (!starRef.current) return;

    const duration = 1.15;
    const interval = 5.5;
    const phase = (clock.elapsedTime + delay) % interval;
    const isVisible = !reducedMotion && phase < duration;
    starRef.current.visible = isVisible;

    if (!isVisible) return;

    const progress = phase / duration;
    const fade = Math.min(progress / 0.12, (1 - progress) / 0.18, 1);
    const startX = -viewport.width / 2 + viewport.width * path.startX;
    const startY = -viewport.height / 2 + viewport.height * path.startY;
    const deltaX = viewport.width * path.deltaX;
    const deltaY = viewport.height * path.deltaY;
    const trailAngle = Math.atan2(-deltaY, -deltaX);
    starRef.current.position.set(
      startX + progress * deltaX,
      startY + progress * deltaY,
      -1.5
    );
    starRef.current.children.forEach((child) => {
      child.rotation.z = trailAngle;
    });

    if (glowMaterialRef.current) glowMaterialRef.current.opacity = fade * 0.12;
    if (trailMaterialRef.current) trailMaterialRef.current.opacity = fade * 0.72;
    if (headMaterialRef.current) headMaterialRef.current.opacity = fade;
  });

  return (
    <group ref={starRef} visible={false}>
      <mesh position={[0.28, 0.14, 0]} rotation={[0, 0, 0.45]}>
        <planeGeometry args={[0.72, 0.09]} />
        <meshBasicMaterial
          ref={glowMaterialRef}
          color="#79caff"
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.24, 0.12, 0.01]} rotation={[0, 0, 0.45]}>
        <planeGeometry args={[0.58, 0.018]} />
        <meshBasicMaterial
          ref={trailMaterialRef}
          color="#d8f3ff"
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial
          ref={headMaterialRef}
          color="#ffffff"
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function SpaceGame() {
  const shipRef = useRef(null);
  const meteorRefs = useRef([]);
  const laserRefs = useRef([]);
  const fragmentRefs = useRef([]);
  const gameRef = useRef({
    elapsed: 0,
    nextShot: 0,
    shots: laserSlots.map(() => ({ active: false, x: 0, y: 0 })),
    meteors: meteorField.map((meteor) => ({ ...meteor })),
    fragments: fragmentSlots.map(() => ({
      active: false,
      x: 0,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      age: 0,
    })),
  });
  const [reducedMotion, setReducedMotion] = useState(false);
  const { viewport } = useThree();

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const updateMotionPreference = () => {
      setReducedMotion(motionPreference.matches);
    };

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useFrame((_, delta) => {
    const game = gameRef.current;
    game.elapsed += delta;
    const baseShipY = -viewport.height * 0.27;
    const shipY =
      baseShipY +
      (reducedMotion ? 0 : Math.sin(game.elapsed * 1.6) * 0.3);
    const shipX =
      -viewport.width * 0.32 +
      (reducedMotion ? 0 : Math.sin(game.elapsed * 0.65) * 0.16);

    if (shipRef.current) {
      shipRef.current.position.set(shipX, shipY, arcadeSceneDepth);
    }

    if (reducedMotion) return;

    const rightEdge = viewport.width * 0.46;
    game.meteors.forEach((meteor, index) => {
      const mesh = meteorRefs.current[index];
      if (!mesh) return;

      meteor.x -= delta * meteor.speed;
      if (meteor.x < -viewport.width * 0.48) {
        meteor.x = rightEdge + index * 0.7;
      }

      mesh.position.set(meteor.x, shipY + meteor.lane, arcadeSceneDepth);
      mesh.rotation.x += delta * meteor.speed * 0.6;
      mesh.rotation.y += delta * meteor.speed;
    });

    game.shots.forEach((shot, index) => {
      const mesh = laserRefs.current[index];
      if (shot.active) {
        shot.x += delta * 3.2;
        if (shot.x > rightEdge) shot.active = false;
      }
      if (mesh) {
        mesh.visible = shot.active;
        if (shot.active) {
          mesh.position.set(shot.x, shot.y, arcadeSceneDepth + 0.05);
        }
      }
    });

    game.fragments.forEach((fragment, index) => {
      const mesh = fragmentRefs.current[index];
      if (!fragment.active) {
        if (mesh) mesh.visible = false;
        return;
      }

      fragment.age += delta;
      if (fragment.age >= 0.7) {
        fragment.active = false;
        if (mesh) mesh.visible = false;
        return;
      }

      fragment.x += fragment.velocityX * delta;
      fragment.y += fragment.velocityY * delta;
      fragment.velocityY -= delta * 0.55;

      if (mesh) {
        mesh.visible = true;
        mesh.position.set(fragment.x, fragment.y, arcadeSceneDepth + 0.04);
        mesh.rotation.x += delta * 3;
        mesh.rotation.y += delta * 4;
      }
    });

    game.meteors.forEach((meteor, meteorIndex) => {
      const meteorY = shipY + meteor.lane;
      const shot = game.shots.find(
        (activeShot) =>
          activeShot.active &&
          Math.abs(activeShot.x - meteor.x) < 0.2 &&
          Math.abs(activeShot.y - meteorY) < 0.22
      );

      if (shot) {
        shot.active = false;
        const firstFragment = meteorIndex * 4;
        [-2.4, -0.8, 0.8, 2.4].forEach((angle, fragmentIndex) => {
          const fragment = game.fragments[firstFragment + fragmentIndex];
          fragment.active = true;
          fragment.age = 0;
          fragment.x = meteor.x;
          fragment.y = meteorY;
          fragment.velocityX = Math.cos(angle) * (0.55 + fragmentIndex * 0.08);
          fragment.velocityY = Math.sin(angle) * (0.55 + fragmentIndex * 0.08);
        });
        meteor.x = rightEdge + meteorIndex * 0.8;
      }
    });

    if (game.elapsed >= game.nextShot) {
      const shot = game.shots.find((item) => !item.active);
      if (shot) {
        shot.active = true;
        shot.x = shipX + 0.22;
        shot.y = shipY;
      }
      game.nextShot = game.elapsed + 0.62;
    }
  });

  return (
    <group>
      <group ref={shipRef}>
        <mesh rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.14, 0.38, 4]} />
          <meshStandardMaterial
            color="#d5f5ff"
            emissive="#43bfff"
            emissiveIntensity={1.8}
            metalness={0.45}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[-0.13, 0, 0]}>
          <boxGeometry args={[0.18, 0.27, 0.035]} />
          <meshStandardMaterial
            color="#647cff"
            emissive="#493dff"
            emissiveIntensity={0.7}
          />
        </mesh>
        <mesh position={[-0.27, 0, -0.01]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color="#ff9d59" />
        </mesh>
      </group>

      {meteorField.map((meteor, index) => (
        <mesh
          key={`meteor-${index}`}
          ref={(element) => {
            meteorRefs.current[index] = element;
          }}
          position={[
            meteor.x,
            -viewport.height * 0.27 + meteor.lane,
            arcadeSceneDepth,
          ]}
        >
          <dodecahedronGeometry args={[0.13 + index * 0.025, 0]} />
          <meshStandardMaterial
            color="#a86655"
            emissive="#d34d28"
            emissiveIntensity={0.35}
            roughness={1}
          />
        </mesh>
      ))}

      {laserSlots.map((index) => (
        <mesh
          key={`laser-${index}`}
          ref={(element) => {
            laserRefs.current[index] = element;
          }}
          visible={false}
        >
          <planeGeometry args={[0.24, 0.025]} />
          <meshBasicMaterial
            color="#75e8ff"
            transparent
            opacity={0.9}
            toneMapped={false}
          />
        </mesh>
      ))}

      {fragmentSlots.map((index) => (
        <mesh
          key={`fragment-${index}`}
          ref={(element) => {
            fragmentRefs.current[index] = element;
          }}
          visible={false}
        >
          <dodecahedronGeometry args={[0.045 + (index % 4) * 0.008, 0]} />
          <meshStandardMaterial
            color="#d58a61"
            emissive="#ef672f"
            emissiveIntensity={0.45}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function Planet() {
  const surfaceTexture = useMemo(() => createPlanetTexture(), []);
  const motionRef = useRef(null);
  const groupRef = useRef(null);
  const moonOrbitRefs = useRef([]);
  const planetRef = useRef(null);
  const ringRef = useRef(null);
  const dragRef = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    rotationX: 0,
    rotationY: 0,
  });

  useEffect(() => () => surfaceTexture.dispose(), [surfaceTexture]);

  useFrame(({ clock }, delta) => {
    if (motionRef.current) {
      const time = clock.elapsedTime;
      motionRef.current.rotation.x = Math.sin(time * 0.32) * 0.07;
      motionRef.current.rotation.y = Math.sin(time * 0.24) * 0.16;
      motionRef.current.position.y = -0.15 + Math.sin(time * 0.55) * 0.08;
    }

    moonOrbitRefs.current.forEach((orbit, index) => {
      if (orbit) orbit.rotation.y += delta * (0.2 + index * 0.08);
    });

    if (groupRef.current) {
      const easing = 1 - Math.exp(-delta * 6);
      groupRef.current.rotation.x +=
        (dragRef.current.rotationX - groupRef.current.rotation.x) * easing;
      groupRef.current.rotation.y +=
        (dragRef.current.rotationY - groupRef.current.rotation.y) * easing;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.12;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.025;
    }
  });

  return (
    <group ref={motionRef} position={[1.5, -0.15, 0]}>
      <group
        ref={groupRef}
        onPointerDown={(event) => {
          event.stopPropagation();
          event.target.setPointerCapture(event.pointerId);
          dragRef.current.active = true;
          dragRef.current.lastX = event.clientX;
          dragRef.current.lastY = event.clientY;
        }}
        onPointerMove={(event) => {
          if (!dragRef.current.active) return;

          const deltaX = event.clientX - dragRef.current.lastX;
          const deltaY = event.clientY - dragRef.current.lastY;
          dragRef.current.rotationY += deltaX * 0.008;
          dragRef.current.rotationX = Math.max(
            -0.7,
            Math.min(0.7, dragRef.current.rotationX + deltaY * 0.008)
          );
          dragRef.current.lastX = event.clientX;
          dragRef.current.lastY = event.clientY;
        }}
        onPointerUp={(event) => {
          dragRef.current.active = false;
          event.target.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          dragRef.current.active = false;
        }}
      >
        {/* Main planet */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1.35, 64, 64]} />
          <meshStandardMaterial
            map={surfaceTexture}
            roughness={0.72}
            metalness={0.12}
          />
        </mesh>

        {/* Planet atmosphere */}
        <mesh scale={1.045}>
          <sphereGeometry args={[1.35, 48, 48]} />
          <meshBasicMaterial
            color="#8875ff"
            transparent
            opacity={0.09}
            side={2}
          />
        </mesh>

        {/* Planet ring */}
        <mesh
          ref={ringRef}
          rotation={[1.15, 0.25, -0.35]}
        >
          <torusGeometry args={[1.9, 0.035, 12, 120]} />
          <meshStandardMaterial
            color="#b5a7ff"
            emissive="#5e48bc"
            emissiveIntensity={0.7}
            metalness={0.65}
            roughness={0.3}
          />
        </mesh>

      </group>

      {[
        { radius: 2.05, size: 0.18, tilt: 0.2, phase: 0, color: "#b7e5ff" },
        { radius: 2.3, size: 0.14, tilt: 0.8, phase: 2.1, color: "#d0baff" },
        { radius: 2.5, size: 0.11, tilt: -0.55, phase: 4.2, color: "#91dfff" },
      ].map((moon, index) => (
        <group
          key={moon.color}
          ref={(element) => {
            moonOrbitRefs.current[index] = element;
          }}
          rotation={[moon.tilt, moon.phase, 0]}
        >
          <mesh position={[moon.radius, 0, 0]}>
            <sphereGeometry args={[moon.size, 24, 24]} />
            <meshStandardMaterial
              color={moon.color}
              map={surfaceTexture}
              roughness={0.68}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.65} />

      <directionalLight
        position={[-3, 4, 5]}
        intensity={2.2}
        color="#d9d2ff"
      />

      <pointLight
        position={[3, -1, 2]}
        intensity={16}
        color="#6e55ff"
        distance={10}
      />

      <Stars
        radius={65}
        depth={35}
        count={1000}
        factor={2.2}
        saturation={0}
        fade
        speed={0}
      />

      {[0, 0.65, 1.3, 1.95, 2.6, 3.25, 3.9, 4.55].map((delay, index) => (
        <ShootingStar key={delay} delay={delay} pathIndex={index} />
      ))}
      <SpaceGame />
      <Planet />
    </>
  );
}

export default function SpaceScene() {
  return (
    <div className="space-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
