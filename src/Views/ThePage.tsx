import * as React from 'react'
import * as THREE from 'three'
import axios from 'axios'
import { Slideshow, GoogleMap } from '../Components/index'
// 3d imports
import Stars from '../Components/Models/Stars'
import '@react-spring/three'
import GlobeModel from '../Components/Models/GlobeModel'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Selection, Bloom, Noise, GodRays } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import generateStarPositions from '../Helpers/setupStars'

const ThePage: React.FC = (pageProps: Object) => {
  const [cameraPosition] = React.useState<THREE.Vector3>(new THREE.Vector3(10, 0, 0))
  const [apiKey, setapiKey] = React.useState<string>()
  const godRayMaterial = new THREE.MeshBasicMaterial({ color: 'orange' })
  const godRayGeo = new THREE.ConeGeometry(0.5, 0.2, 16)
  godRayGeo.rotateX(Math.PI / 2)
  godRayGeo.rotateY(Math.PI / 2)
  godRayGeo.rotateZ((Math.PI / 2) * -0.3)
  const godRaySun = new THREE.Mesh(godRayGeo, godRayMaterial)
  React.useEffect(() => {
    // This will get the apiKey from the backend
    async function getApi() {
      if (process.env.NODE_ENV !== 'production' && !apiKey) {
        await axios.get(`${'http://localhost:5555/api'}`).then(
          (res) => {
            setapiKey(res.data)
          },
          (err) => console.log(err)
        )
      } else {
        await axios.get(`${process.env.REACT_APP_API_URL}/api`).then(
          (res) => {
            setapiKey(res.data)
          },
          (err) => {
            console.log(err)
          }
        )
      }
    }
    getApi()
  }, [apiKey])
  // function that will toggle the ability to 'freeze' the scroll when the user gets to the google map portion.

  const introSlides = [
    'In a time of great uncertainty-',
    'When our most basic ideals are causing deadly fights between us,',
    ['We know so much about what plagues the world and our civilization,', "Yet, we can't seem to work together to stop it."],
    ["Aren't you sick of it?", 'I know I am. So, I started to make something a while ago.'],
    ['Do you know what an antipode is?', 'No? Same here.', "Wait, no. That's not right. I do know what an antipode is."],

    [
      'An antipode is the opposite of something. ',
      'An antipode can be many things, some would argue any- things, but your antipode is a different story.'
    ],
    'Finding your antipode is simple. Just look at a map and find the exact opposite point of where you are right now.',
    "Wait, that sounded a little complicated? Don't worry, I can help you.",
    [
      'As a kid I would daydream about the idea, bored in class.',
      'I wanted to burrow beneath my desk,',
      'Just to see if anything was interesting,',
      'But probably, it was just water.'
    ],
    [
      "Now, thanks to many others' adult brains and some new learning of my own, I hope I can help you find yours. ",
      'Virtually, of course.',
      "Maybe someday I'll be able to make this educational in some way, to help us learn about our opposite spaces and how they are different from us.",
      "But for now, I'm just going to show you yours, and you can decide what to do with it."
    ]
  ]

  function ScrollCamera() {
    const { camera } = useThree() || {}
    const vec = new THREE.Vector3()
    return useFrame(() => camera.position.lerp(vec.set(camera.position.x, camera.position.y, camera.position.z), 0.02))
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('intersection')
      } else {
        entry.target.classList.remove('intersection')
      }
    })
  })

  React.useEffect(() => {
    let text = document.querySelectorAll('.text-animation')
    text.forEach((line) => {
      observer.observe(line)
    })
  })
  function moveStars(stars: THREE.Group) {
    if (stars) {
      stars.rotation.x -= 0.0001
      stars.rotation.z -= 0.0001
    }
    return stars
  }
  return (
    <div className="the-page view-wrapper">
      <div id="arrow-to-top" />
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
              <GlobeModel scale={3} position={0} />
              <Stars radius={500} stars={generateStarPositions(50000)} fn={moveStars} />
              <hemisphereLight intensity={0.7} groundColor={'black'} color={'white'} />
              <ambientLight intensity={0.05} castShadow={true} />
              <ScrollCamera />
              <EffectComposer autoClear={false} multisampling={0}>
                <GodRays
                  sun={godRaySun}
                  width={window.innerWidth}
                  height={window.innerHeight}
                  samples={150}
                  density={0.95}
                  decay={0.95}
                  weight={0.5}
                  exposure={0.5}
                  blendFunction={BlendFunction.SCREEN}
                />
                <Bloom intensity={0.5} luminanceSmoothing={0.025} luminanceThreshold={0.4} />
                <Noise premultiply={true} opacity={0.4} blendFunction={BlendFunction.ADD} />
              </EffectComposer>
            </Selection>
          </Canvas>
        </div>
        <div className="the-page item-wrapper first"></div>
        <div className="the-page item-wrapper slideshow-wrapper">
          <Slideshow slides={introSlides} />
        </div>
        <div className="the-page item-wrapper map-page-wrapper">
          <div className="content-wrapper">{apiKey ? <GoogleMap api={apiKey} /> : null}</div>
        </div>
      </div>
    </div>
  )
}

export default ThePage
