import { Canvas } from "@react-three/fiber";
import Experience from "./components/scene/Experience";

function App() {
  return (
    <Canvas
      shadows
      camera={{
        position: [3, 3, 5],
        fov: 50,
      }}
    >
      <Experience />
    </Canvas>
  );
}

export default App;