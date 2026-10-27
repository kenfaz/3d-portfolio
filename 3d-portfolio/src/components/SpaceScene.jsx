import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";

function Planet() {
  const planetRef = useRef();
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.12;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.025;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.08} floatIntensity={0.2}>
      <group rotation={[0.25, 0, -0.2]}>
        {/* Planet */}
        <mesh ref={planetRef}>
          <sphereGeometry args={[1.65, 64, 64]} />
          <meshStandardMaterial
            color="#344fbc"
            roughness={0.8}
            metalness={0.1}
            emissive="#101b55"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Atmospheric glow */}
        <mesh scale={1.04}>
          <sphereGeometry args={[1.65, 48, 48]} />
          <meshBasicMaterial
            color="#628bff"
            transparent
            opacity={0.09}
            side={2}
          />
        </mesh>

        {/* Planetary rings */}
        <mesh
          ref={ringRef}
          rotation={[Math.PI / 2.35, 0.15, 0]}
        >
          <ringGeometry args={[2.05, 3.05, 128]} />
          <meshStandardMaterial
            color="#a99cff"
            emissive="#554cff"
            emissiveIntensity={0.7}
            transparent
            opacity={0.8}
            side={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SceneContents() {
  return (
    <>
      <ambientLight intensity={0.65} />

      <directionalLight
        position={[-4, 3, 5]}
        intensity={3}
        color="#9bbcff"
      />

      <pointLight
        position={[4, -2, -2]}
        intensity={25}
        color="#8b5cff"
      />

      <Stars
        radius={90}
        depth={55}
        count={2500}
        factor={3}
        saturation={0.4}
        fade
        speed={0.3}
      />

      <Planet />
    </>
  );
}

export default function SpaceScene() {
  return (
    <div className="space-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}