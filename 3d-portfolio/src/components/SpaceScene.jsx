
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import "./SpaceScene.css";

function Planet() {
  const motionRef = useRef(null);
  const groupRef = useRef(null);
  const planetRef = useRef(null);
  const ringRef = useRef(null);
  const dragRef = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    rotationX: 0,
    rotationY: 0,
  });

  useFrame(({ clock }, delta) => {
    if (motionRef.current) {
      const time = clock.elapsedTime;
      motionRef.current.rotation.x = Math.sin(time * 0.32) * 0.07;
      motionRef.current.rotation.y = Math.sin(time * 0.24) * 0.16;
      motionRef.current.position.y = -0.15 + Math.sin(time * 0.55) * 0.08;
    }

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
            color="#5140a8"
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

        {/* Small moon */}
        <mesh position={[1.9, 0.8, 0.35]}>
          <sphereGeometry args={[0.18, 24, 24]} />
          <meshStandardMaterial
            color="#b7e5ff"
            roughness={0.5}
          />
        </mesh>
      </group>
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
