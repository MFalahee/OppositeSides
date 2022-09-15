import * as React from 'react'
import * as THREE from 'three'
import axios from 'axios'
import { Slideshow, GoogleMap } from '../Components/index'

// 3d imports
import Stars from '../Components/Models/Stars'
import SunModel from '../Components/Models/SunModel'
import '@react-spring/three'
import GlobeModel from '../Components/Models/GlobeModel'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Select, Selection, GodRays, Outline, Bloom, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import generateStarPositions from '../Helpers/setupStars'

const ThePage: React.FC = (pageProps: Object) => {
  const [cameraPosition, setCameraPos] = React.useState<THREE.Vector3>(new THREE.Vector3(10, 0, 0))
  const [toggleScroll, setStop] = React.useState<Boolean>(false)
  const [apiKey, setapiKey] = React.useState<string>(null)

  React.useEffect(() => {
    // This will get the apiKey from the backend
    async function getApi() {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/api`).then(
        (res) => {
          setapiKey(res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    }
    getApi()
  }, [])
  // function that will toggle the ability to 'freeze' the scroll when the user gets to the google map portion.
  function toggScroll(isOn: boolean) {
    if (isOn) {
      setStop(false)
    } else {
      setStop(true)
    }
  }

  const introSlides = [
    'In a time of great uncertainty-',
    'When our most basic ideals are causing deadly fights between us,',
    ['We know so much about what plagues the world and our society,', "Yet, we can't seem to come together to stop it."],
    ["Aren't you sick of it?", 'I know I am. So, I made something to distract myself.'],
    ['Do you know what an antipode is?', 'No? Same. Wait, well I used to not know.', 'Now I know, though.'],
    'An antipode is the exact opposite of something. An antipode can be many things, anything really, but your antipode is a different story.',
    'Finding your antipode is as simple as diving deep down through the earth to the opposite side of the {planet} from where you are standing (or most likely sitting) right now.',
    [
      'As a kid I would daydream about the idea,',
      'I wanted so badly to dig straight down between my toes some days, just to see what was there.',
      'I thought it might be better than my own piece of the world, maybe at least a bit better than math class',
      'But probably, it was just water.'
    ],
    [
      'Well anyways, thanks to my very grown up and adult brain and some new learning, I hope I can help you find yours. ',
      'Virtually, of course.'
    ]
  ]

  function ScrollCamera() {
    const { camera } = useThree()
    const vec = new THREE.Vector3()
    return useFrame(() => camera.position.lerp(vec.set(camera.position.x, camera.position.y, camera.position.z), 0.02))
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('intersection')
        } else {
          entry.target.classList.remove('intersection')
        }
      })
    })

    const antiobs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anti-intersection')
        } else {
          entry.target.classList.remove('anti-intersection')
        }
      })
    })
    let text = document.querySelectorAll('.text-animation')
    text.forEach((line) => {
      observer.observe(line)
    })
    let antitext = document.querySelectorAll('.antipode-text')
    antitext.forEach((ele) => {})
  }, [])

  function moveStars(stars: THREE.Group) {
    if (stars) {
      stars.rotation.x += 0.0001
      stars.rotation.z += 0.00001
    }
    return stars
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
                <Stars radius={500} stars={generateStarPositions(50000)} fn={moveStars} />
                <EffectComposer>
                  <Bloom intensity={0.5} luminanceSmoothing={0.025} luminanceThreshold={0.4} />
                  <Noise premultiply={true} opacity={0.4} blendFunction={BlendFunction.ADD} />
                </EffectComposer>
              </React.Suspense>
            </Selection>
            <hemisphereLight intensity={0.7} groundColor={'black'} color={'white'} />
            <ambientLight intensity={0.1} castShadow={true} />
            <ScrollCamera />
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
