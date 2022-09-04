import * as React from 'react'
import * as THREE from 'three'
import { axiosWithAuth } from '../Helpers/axiosWithAuth'
import { CustomTitle, Slideshow, GoogleMap } from '../Components/index'

// 3d imports
import Stars from '../Helpers/Instances'
import SunModel from '../Helpers/SunModel'
import '@react-spring/three'
import GlobeModel from '../Helpers/GlobeModel'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Select, Selection, GodRays, Outline, Bloom, Noise } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import generateStarPositions from '../Helpers/setupStars'

const ThePage: React.FC = (pageProps: Object) => {
  // I want to make a single page hiding the scroll, and using it to change the 3D canvas
  // as the page transitions from the globe scene to the map scene.
  const [cameraPosition, setCameraPos] = React.useState<THREE.Vector3>(new THREE.Vector3(10, 0, 0))
  let key
  let geo = new THREE.SphereGeometry(0.05, 16, 16)
  let mat = new THREE.MeshBasicMaterial({
    color: '#ffea00',
    wireframe: false,
    transparent: true,
    opacity: 1,
    visible: false
  })

  const introSlides = [
    'In a time of great uncertainty-',
    'When our most basic ideals are causing deadly fights between us,',
    // Transition
    'We know so much about what plagues the world and our society,',
    "Yet, we can't seem to come together to stop it.",
    // make earth turn red?
    "Aren't you sick of it?",
    'I know I am. So, I made something to distract myself.',
    // really should be a break and change here
    // Transition
    'Do you know what an antipode is?',
    'Your antipode is the opposite side of the {planet} from where you are standing (or most likely sitting) right now.',
    "I'm not sure why, but as a kid I was obsessed with the idea of what was opposite from me on this blue marble.",
    'I wanted so badly to dig straight down between my toes some days, just to see what was there.',
    'Well, thanks to my adult brain and some new technology I can finally fulfill that dream.',
    'Virtually, of course.',
    'Lets go..'
  ]

  React.useEffect(() => {
    if (process.env.NODE_ENV != 'test') {
      axiosWithAuth
        .get(`/api`)
        .then((res) => {
          //
          key = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [])

  let godMesh = new THREE.Mesh(geo, mat)
  let godMesh2 = new THREE.Mesh(geo, mat)

  function Rig() {
    const { camera, mouse, scene } = useThree()
    // console.log(scene)
    const vec = new THREE.Vector3()
    return useFrame(() => camera.position.lerp(vec.set(camera.position.x, mouse.y * 2, mouse.x * -2), 0.02))
  }

  function ScrollCamera() {
    const { camera, mouse, scene } = useThree()
    const vec = new THREE.Vector3()
    return useFrame(() => camera.position.lerp(vec.set(camera.position.x, camera.position.y, camera.position.z), 0.02))
  }

  function moveStars(event: MouseEvent, stars: THREE.Group) {
    let w = window.innerWidth
    let h = window.innerHeight
    let x = event.clientX
    let y = event.clientY
    if (stars) {
      let x_pos = (x / w) * 2 + 1
      let y_pos = (y / h) * 2 + 1
      stars.rotation.x = y_pos * 0.4
      stars.rotation.y = x_pos * 0.4
    }
  }

  return (
    <div className="the-page view-wrapper">
      <div className="scroll-container">
        <div className="the-page canvas-wrapper">
          <Canvas
            gl={{ powerPreference: 'high-performance', antialias: false }}
            frameloop="always"
            className="canvas-element"
            style={{
              width: '100vw',
              backgroundColor: 'black'
            }}
            camera={{ fov: 100, position: cameraPosition, near: 0.5, far: 1000 }}
            resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}>
            <Selection>
              <React.Suspense fallback={null}>
                <SunModel scale={0.05} position={0} />
                <GlobeModel scale={3} position={0} />
                <Stars radius={500} stars={generateStarPositions(500)} fn={moveStars} />
                <EffectComposer>
                  <Bloom intensity={0.5} luminanceSmoothing={0.025} luminanceThreshold={0.4} />
                  <Noise premultiply={true} opacity={0.4} blendFunction={BlendFunction.ADD} />
                </EffectComposer>
              </React.Suspense>
            </Selection>
            <hemisphereLight intensity={0.7} groundColor={'black'} color={'white'} />
            <ambientLight intensity={0.1} castShadow={true} />
            <Rig />
            <ScrollCamera />
          </Canvas>
        </div>
        <div className="the-page item-wrapper first"></div>
        <div className="the-page item-wrapper slideshow-wrapper">
          <Slideshow slides={introSlides} />
        </div>
        <div className="the-page item-wrapper map-page-wrapper">
          <div className="content-wrapper">
            <GoogleMap api={key} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThePage
