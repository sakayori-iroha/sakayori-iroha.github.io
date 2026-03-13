import * as THREE from 'three'

export function mountScene(el: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(0, 0.2, 3.6)

  const group = new THREE.Group()
  scene.add(group)

  const geo = new THREE.IcosahedronGeometry(1.05, 1)
  const mat = new THREE.MeshStandardMaterial({
    color: 0x6dd5ed,
    metalness: 0.22,
    roughness: 0.32,
    emissive: new THREE.Color(0x0b1220),
    emissiveIntensity: 0.7,
  })
  const mesh = new THREE.Mesh(geo, mat)
  group.add(mesh)

  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(geo),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 })
  )
  group.add(wire)

  const key = new THREE.DirectionalLight(0xffffff, 1.4)
  key.position.set(3, 2, 4)
  scene.add(key)

  const fill = new THREE.DirectionalLight(0xff6b6b, 0.5)
  fill.position.set(-4, -1, 2)
  scene.add(fill)

  const amb = new THREE.AmbientLight(0xffffff, 0.55)
  scene.add(amb)

  el.appendChild(renderer.domElement)

  let raf = 0
  let t0 = performance.now()

  function resize() {
    const r = el.getBoundingClientRect()
    const w = Math.max(1, Math.floor(r.width))
    const h = Math.max(1, Math.floor(r.height))
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }

  const ro = new ResizeObserver(resize)
  ro.observe(el)
  resize()

  function tick(now: number) {
    const dt = Math.min(0.05, (now - t0) / 1000)
    t0 = now

    group.rotation.y += dt * 0.5
    group.rotation.x += dt * 0.18
    mesh.rotation.z += dt * 0.08

    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }

  raf = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    renderer.dispose()
    geo.dispose()
    mat.dispose()
    ;(wire.geometry as THREE.BufferGeometry).dispose()
    ;(wire.material as THREE.Material).dispose()
    el.innerHTML = ''
  }
}
