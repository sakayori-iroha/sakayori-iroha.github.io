import * as THREE from 'three'

type Cleanup = () => void

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n))
}

export function mountScene(el: HTMLElement): Cleanup {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()

  // camera
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(2.4, 1.35, 3.2)

  // lighting
  const key = new THREE.DirectionalLight(0xffffff, 1.25)
  key.position.set(3, 4, 2)
  scene.add(key)

  const rim = new THREE.DirectionalLight(0x6dd5ed, 0.65)
  rim.position.set(-4, 1.5, -2)
  scene.add(rim)

  const warm = new THREE.PointLight(0xffd2a6, 0.65, 12)
  warm.position.set(0.0, 1.8, 0.2)
  scene.add(warm)

  const amb = new THREE.AmbientLight(0xffffff, 0.35)
  scene.add(amb)

  // group root (for subtle parallax)
  const root = new THREE.Group()
  scene.add(root)

  // palette — intentionally “anime apartment” but kept original
  const matWall = new THREE.MeshStandardMaterial({ color: 0x111826, roughness: 0.95, metalness: 0.0 })
  const matFloor = new THREE.MeshStandardMaterial({ color: 0x0b0f14, roughness: 0.9, metalness: 0.05 })
  const matWood = new THREE.MeshStandardMaterial({ color: 0x3b2b22, roughness: 0.8, metalness: 0.05 })
  const matBed = new THREE.MeshStandardMaterial({ color: 0x1a2333, roughness: 0.95, metalness: 0.0 })
  const matSheet = new THREE.MeshStandardMaterial({ color: 0xe8eef7, roughness: 0.95, metalness: 0.0 })
  const matAccent = new THREE.MeshStandardMaterial({ color: 0x6dd5ed, roughness: 0.35, metalness: 0.25, emissive: 0x0b1220, emissiveIntensity: 0.6 })
  const matSoft = new THREE.MeshStandardMaterial({ color: 0xff6b6b, roughness: 0.75, metalness: 0.05 })

  // Room shell (open front)
  const room = new THREE.Group()
  root.add(room)

  // floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), matFloor)
  floor.rotation.x = -Math.PI / 2
  floor.position.y = 0
  room.add(floor)

  // back wall
  const back = new THREE.Mesh(new THREE.PlaneGeometry(6, 2.8), matWall)
  back.position.set(0, 1.4, -2)
  room.add(back)

  // left wall
  const left = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.8), matWall)
  left.rotation.y = Math.PI / 2
  left.position.set(-3, 1.4, 0)
  room.add(left)

  // right wall
  const right = new THREE.Mesh(new THREE.PlaneGeometry(4, 2.8), matWall)
  right.rotation.y = -Math.PI / 2
  right.position.set(3, 1.4, 0)
  room.add(right)

  // ceiling (subtle)
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), matWall)
  ceil.rotation.x = Math.PI / 2
  ceil.position.set(0, 2.8, 0)
  ceil.material = new THREE.MeshStandardMaterial({ color: 0x0c1220, roughness: 1.0, metalness: 0.0 })
  room.add(ceil)

  // Window on back wall + city gradient
  const windowFrame = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.2), new THREE.MeshStandardMaterial({ color: 0x0a0d12, roughness: 0.6, metalness: 0.2 }))
  windowFrame.position.set(1.6, 1.65, -1.999)
  room.add(windowFrame)

  const cityCanvas = document.createElement('canvas')
  cityCanvas.width = 256
  cityCanvas.height = 128
  const ctx = cityCanvas.getContext('2d')!
  const g = ctx.createLinearGradient(0, 0, 0, 128)
  g.addColorStop(0, '#0b1630')
  g.addColorStop(0.6, '#08101d')
  g.addColorStop(1, '#05070b')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 128)
  // neon blocks
  for (let i = 0; i < 80; i++) {
    const x = Math.floor(Math.random() * 256)
    const w = 2 + Math.floor(Math.random() * 8)
    const h = 6 + Math.floor(Math.random() * 50)
    const y = 128 - h
    ctx.fillStyle = `rgba(${50 + Math.random() * 60},${180 + Math.random() * 70},${220 + Math.random() * 35},${0.08 + Math.random() * 0.12})`
    ctx.fillRect(x, y, w, h)
  }
  const cityTex = new THREE.CanvasTexture(cityCanvas)
  cityTex.colorSpace = THREE.SRGBColorSpace
  const city = new THREE.Mesh(
    new THREE.PlaneGeometry(2.06, 1.06),
    new THREE.MeshBasicMaterial({ map: cityTex })
  )
  city.position.set(1.6, 1.65, -1.998)
  room.add(city)

  // Bed (single, near left)
  const bed = new THREE.Group()
  bed.position.set(-1.8, 0.22, -0.9)
  room.add(bed)

  const bedBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.22, 0.9), matBed)
  bed.add(bedBase)
  const sheet = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.08, 0.85), matSheet)
  sheet.position.y = 0.15
  bed.add(sheet)

  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.10, 0.22), new THREE.MeshStandardMaterial({ color: 0xdfe8f4, roughness: 0.95 }))
  pillow.position.set(0.42, 0.22, -0.24)
  bed.add(pillow)

  // Desk + laptop + keyboard
  const desk = new THREE.Group()
  desk.position.set(0.35, 0.42, -1.25)
  room.add(desk)

  const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.08, 0.65), matWood)
  desk.add(deskTop)
  const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.72, 0.08), matWood)
  leg1.position.set(-0.7, -0.40, -0.26)
  const leg2 = leg1.clone(); leg2.position.set(0.7, -0.40, -0.26)
  const leg3 = leg1.clone(); leg3.position.set(-0.7, -0.40, 0.26)
  const leg4 = leg1.clone(); leg4.position.set(0.7, -0.40, 0.26)
  desk.add(leg1, leg2, leg3, leg4)

  const laptop = new THREE.Group()
  laptop.position.set(0.15, 0.12, 0)
  desk.add(laptop)

  const base = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.03, 0.42), new THREE.MeshStandardMaterial({ color: 0x0e1116, roughness: 0.35, metalness: 0.5 }))
  laptop.add(base)
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.40, 0.03), new THREE.MeshStandardMaterial({ color: 0x0a0d12, roughness: 0.25, metalness: 0.4, emissive: 0x15223a, emissiveIntensity: 1.2 }))
  screen.position.set(0, 0.21, -0.20)
  screen.rotation.x = -0.25
  laptop.add(screen)

  const keyb = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.03, 0.23), matAccent)
  keyb.position.set(-0.35, 0.07, 0.12)
  keyb.rotation.y = 0.12
  desk.add(keyb)

  // Plush toys pile (soft spheres) near bed corner
  const plush = new THREE.Group()
  plush.position.set(-0.95, 0.14, -0.35)
  room.add(plush)
  const plushGeo = new THREE.SphereGeometry(0.14, 18, 18)
  for (let i = 0; i < 6; i++) {
    const m = i % 2 === 0 ? matSoft : new THREE.MeshStandardMaterial({ color: 0xf7d36b, roughness: 0.85 })
    const s = new THREE.Mesh(plushGeo, m)
    s.position.set((Math.random() - 0.5) * 0.5, (Math.random() * 0.14), (Math.random() - 0.5) * 0.4)
    s.scale.setScalar(0.9 + Math.random() * 0.5)
    plush.add(s)
  }

  // Wall poster (just a colored plane)
  const posterMat = new THREE.MeshStandardMaterial({
    color: 0x122640,
    roughness: 0.7,
    metalness: 0.0,
    emissive: 0x0b1220,
    emissiveIntensity: 0.75,
  })
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.75), posterMat)
  poster.position.set(-2.35, 1.75, -1.999)
  room.add(poster)

  // subtle particles (tiny points)
  const ptsGeo = new THREE.BufferGeometry()
  const N = 120
  const pos = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pos[i * 3 + 0] = (Math.random() - 0.5) * 5.0
    pos[i * 3 + 1] = Math.random() * 2.6
    pos[i * 3 + 2] = (Math.random() - 0.5) * 3.2 - 0.4
  }
  ptsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const ptsMat = new THREE.PointsMaterial({ color: 0x6dd5ed, size: 0.012, transparent: true, opacity: 0.35 })
  const pts = new THREE.Points(ptsGeo, ptsMat)
  root.add(pts)

  // mount
  el.appendChild(renderer.domElement)

  let raf = 0
  let t0 = performance.now()
  let mx = 0
  let my = 0

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

  function onMove(ev: PointerEvent) {
    const r = el.getBoundingClientRect()
    const x = (ev.clientX - r.left) / Math.max(1, r.width)
    const y = (ev.clientY - r.top) / Math.max(1, r.height)
    mx = (x - 0.5) * 2
    my = (y - 0.5) * 2
  }
  el.addEventListener('pointermove', onMove)

  function tick(now: number) {
    const dt = clamp((now - t0) / 1000, 0, 0.05)
    t0 = now

    // gentle breathing
    const t = now * 0.001
    root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, mx * 0.08 + Math.sin(t * 0.25) * 0.02, 0.06)
    root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, my * -0.06 + Math.cos(t * 0.22) * 0.02, 0.06)

    // tiny drift
    pts.rotation.y += dt * 0.03

    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }

  raf = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    el.removeEventListener('pointermove', onMove)
    renderer.dispose()

    // dispose geometries/materials we created
    const disposables: THREE.Object3D[] = []
    scene.traverse((o) => disposables.push(o))

    for (const o of disposables) {
      // @ts-expect-error
      if (o.geometry) o.geometry.dispose?.()
      // @ts-expect-error
      if (o.material) {
        // @ts-expect-error
        const m = o.material
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose?.())
        else m.dispose?.()
      }
    }

    cityTex.dispose()
    ptsGeo.dispose()
    ptsMat.dispose()
    el.innerHTML = ''
  }
}
