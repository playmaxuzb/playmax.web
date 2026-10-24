// PLAYMAX 3D showroom viewer — real-time model of the boxing machines, body color only, 360° orbit, human scale and dimensions.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const BODY = { white: '#EDEEF0', black: '#1B1C20', blue: '#0A49D6', red: '#E2131F', green: '#0EA83C' };

const MODELS = {
  mangu: {
    tex: 'mangu', baseColored: true, rounded: 0,
    base: { w: 80, d: 118, h: 7, z0: -32 },
    col: { w: 56, d: 28, z0: -32, top: 205 },
    head: { w: 78, z1: 88, r: 26, lip: [168, 178], band: [178, 205] },
    lid: { w: 82, z0: -34, z1: 91, r: 28, y: [205, 221], flare: 0 },
    ball: { y: 151, z: 46, r: 12 },
    dims: { h: 221, top: 130, mid: 80, kg: 100 }
  },
  ufc: {
    tex: 'ufc', baseColored: false, rounded: 5,
    base: { w: 84, d: 112, h: 8, z0: -32 },
    col: { w: 60, d: 30, z0: -32, top: 200 },
    head: { w: 76, z1: 84, r: 30, lip: [166, 177], band: [177, 200] },
    lid: { w: 96, z0: -38, z1: 100, r: 40, y: [200, 221], flare: 1 },
    ball: { y: 150, z: 44, r: 12 },
    dims: { h: 221, top: 130, mid: 80, kg: 100 }
  }
};

function roundedPlan(w, z0, z1, rFront) {
  // plan in (x, z) with rounded FRONT corners only; returned as THREE.Shape in (x, -z) so extrusion along +y works after rotation
  const s = new THREE.Shape(); const hw = w / 2; const r = Math.min(rFront, hw, (z1 - z0));
  s.moveTo(-hw, z0); s.lineTo(hw, z0); s.lineTo(hw, z1 - r);
  s.absarc(hw - r, z1 - r, r, 0, Math.PI / 2, false); s.lineTo(-hw + r, z1); s.absarc(-hw + r, z1 - r, r, Math.PI / 2, Math.PI, false); s.lineTo(-hw, z0);
  return s;
}
function slab(shape, y0, y1, mat, bevel) {
  const g = new THREE.ExtrudeGeometry(shape, { depth: y1 - y0, bevelEnabled: !!bevel, bevelSize: bevel || 0, bevelThickness: bevel || 0, bevelSegments: 4, curveSegments: 24 });
  g.rotateX(Math.PI / 2); // shape (x, y=z) -> extrude along -y ; after rotation shape y maps to z
  const m = new THREE.Mesh(g, mat); m.position.y = y1; m.castShadow = true; m.receiveShadow = true; return m;
}
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function diamondPlate() {
  const t = canvasTex(256, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#5d6066'); gr.addColorStop(1, '#3d4045'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 16) for (let x = 0; x < w; x += 16) {/* diamond tread */
      const o = ((y / 16) % 2) * 8; g.save(); g.translate(x + o + 4, y + 8); g.rotate(((x + y) / 16) % 2 ? 0.7 : -0.7);
      g.fillStyle = 'rgba(255,255,255,.28)'; g.fillRect(-5, -1.2, 10, 2.4); g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-5, 1.2, 10, 1); g.restore();
    }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(5, 7); return t;
}
function ballTex() {
  return canvasTex(512, 256, (g, w, h) => {
    for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#141416' : '#D3141E'; g.fillRect(i * w / 8, 0, w / 8 + 1, h); }
    g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, h * 0.48, w, h * 0.04);
  });
}
function labelSprite(text, opts = {}) {
  const pad = 18, fs = 46; const c = document.createElement('canvas'); const g = c.getContext('2d');
  g.font = `800 ${fs}px Unbounded, Manrope, system-ui, sans-serif`; const tw = g.measureText(text).width;
  c.width = Math.ceil(tw + pad * 2); c.height = fs + pad * 1.6;
  g.font = `800 ${fs}px Unbounded, Manrope, system-ui, sans-serif`;
  const r = c.height / 2; g.fillStyle = opts.bg || '#FFC233'; g.beginPath(); g.roundRect(0, 0, c.width, c.height, r); g.fill();
  g.fillStyle = opts.fg || '#0B2A6F'; g.textBaseline = 'middle'; g.fillText(text, pad, c.height / 2 + 2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
  const k = (opts.size || 14) / c.height; s.scale.set(c.width * k, c.height * k, 1); s.renderOrder = 10; return s;
}
function bar(a, b, r, mat) {
  const v = new THREE.Vector3().subVectors(b, a); const len = v.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 10), mat);
  m.position.copy(a).addScaledVector(v, 0.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize()); return m;
}
function dimLine(a, b, label, mat, tickDir) {
  const g = new THREE.Group(); g.add(bar(a, b, 0.5, mat));
  for (const p of [a, b]) { const t1 = p.clone().addScaledVector(tickDir, -4), t2 = p.clone().addScaledVector(tickDir, 4); g.add(bar(t1, t2, 0.5, mat)); }
  const s = labelSprite(label); s.position.copy(a).lerp(b, 0.5); g.add(s); return g;
}
function mannequin() {
  const g = new THREE.Group(); const mat = new THREE.MeshStandardMaterial({ color: '#9FB6DA', roughness: 0.55, metalness: 0.05 });
  const cap = (r, len, x, y, z, rz = 0, rx = 0) => { const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 16), mat); m.position.set(x, y, z); m.rotation.z = rz; m.rotation.x = rx; m.castShadow = true; g.add(m); return m; };
  cap(6.6, 70, -9, 44, 0); cap(6.6, 70, 9, 44, 0);                 // legs  (0 → ~85)
  const torso = cap(15, 36, 0, 118, 0); torso.scale.set(1, 1, 0.62); // torso (~85 → ~151)
  cap(4.6, 52, -22, 118, 0, -0.08); cap(4.6, 52, 22, 118, 0, 0.08); // arms
  cap(4.5, 4, 0, 151, 0);                                           // neck
  const head = new THREE.Mesh(new THREE.SphereGeometry(10.5, 24, 18), mat); head.position.set(0, 164, 0); head.scale.set(0.9, 1.05, 0.95); head.castShadow = true; g.add(head);
  const s = labelSprite('175 cm', { bg: '#0B2A6F', fg: '#FFFFFF', size: 12 }); s.position.set(0, 186, 0); g.add(s);
  return g;
}

export async function mountViewer(container, opts = {}) {
  const P = MODELS[opts.model || 'mangu'];
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none';
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer); scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(34, 1, 5, 5000);
  camera.position.set(260, 165, 400);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 108, 25); controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
  controls.minDistance = 170; controls.maxDistance = 760; controls.maxPolarAngle = Math.PI * 0.53; controls.minPolarAngle = Math.PI * 0.12;
  controls.autoRotate = true; controls.autoRotateSpeed = 1.6; controls.update();

  // lights
  scene.add(new THREE.HemisphereLight('#FFFFFF', '#FFE2B8', 0.85));
  const key = new THREE.DirectionalLight('#FFFFFF', 2.1); key.position.set(180, 420, 260); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -220, right: 220, top: 260, bottom: -120, near: 50, far: 1200 }); key.shadow.bias = -0.0004; key.shadow.radius = 6;
  scene.add(key); const fill = new THREE.DirectionalLight('#DDEBFF', 0.7); fill.position.set(-260, 180, -140); scene.add(fill);
  const rim = new THREE.DirectionalLight('#FFD7E6', 0.6); rim.position.set(0, 260, -320); scene.add(rim);

  // floor stage
  const floorTex = canvasTex(512, 512, (g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.55, 'rgba(255,240,214,0.9)'); r.addColorStop(1, 'rgba(255,240,214,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); });
  const disc = new THREE.Mesh(new THREE.CircleGeometry(360, 64), new THREE.MeshBasicMaterial({ map: floorTex, transparent: true, depthWrite: false })); disc.rotation.x = -Math.PI / 2; disc.position.y = -0.4; scene.add(disc);
  const ring = new THREE.Mesh(new THREE.RingGeometry(150, 154, 96), new THREE.MeshBasicMaterial({ color: '#22B0F0', transparent: true, opacity: 0.55 })); ring.rotation.x = -Math.PI / 2; ring.position.y = -0.2; scene.add(ring);
  const shadowFloor = new THREE.Mesh(new THREE.PlaneGeometry(1200, 1200), new THREE.ShadowMaterial({ opacity: 0.22 })); shadowFloor.rotation.x = -Math.PI / 2; shadowFloor.receiveShadow = true; scene.add(shadowFloor);

  // materials
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: BODY[opts.color] || BODY.red, roughness: 0.3, metalness: 0.1, clearcoat: 0.9, clearcoatRoughness: 0.12 });
  const darkMat = new THREE.MeshStandardMaterial({ color: '#202226', roughness: 0.6, metalness: 0.3 });
  const loader = new THREE.TextureLoader(); const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const tex = (name) => new Promise((res) => loader.load(`assets/3d/${P.tex}-${name}.webp`, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; res(t); }, undefined, () => res(null)));
  const [tColFront, tColSide, tColBack, tBandFront, tBandSide] = await Promise.all(['col-front', 'col-side', 'col-back', 'band-front', 'band-side'].map(tex));
  const decalMat = (t, opaque) => new THREE.MeshStandardMaterial({ map: t, transparent: !opaque, alphaTest: opaque ? 0 : 0.35, roughness: 0.42, metalness: 0.05, polygonOffset: true, polygonOffsetFactor: -2 });

  const machine = new THREE.Group(); scene.add(machine);
  const { base, col, head, lid, ball } = P;
  // base plate
  const plate = diamondPlate(); const plateMat = new THREE.MeshStandardMaterial({ map: plate, roughness: 0.38, metalness: 0.75 });
  const baseSide = P.baseColored ? bodyMat : darkMat;
  const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(base.w, base.h, base.d), [baseSide, baseSide, plateMat, darkMat, baseSide, baseSide]);
  baseMesh.position.set(0, base.h / 2, base.z0 + base.d / 2); baseMesh.castShadow = baseMesh.receiveShadow = true; machine.add(baseMesh);
  // column
  const colH = col.top - base.h;
  const colGeo = P.rounded ? new RoundedBoxGeometry(col.w, colH, col.d, 4, P.rounded) : new THREE.BoxGeometry(col.w, colH, col.d);
  const colMesh = new THREE.Mesh(colGeo, bodyMat); colMesh.position.set(0, base.h + colH / 2, col.z0 + col.d / 2); colMesh.castShadow = colMesh.receiveShadow = true; machine.add(colMesh);
  const zFront = col.z0 + col.d, zBack = col.z0;
  if (tColFront) { const h = head.lip[0] - base.h - 1; const m = new THREE.Mesh(new THREE.PlaneGeometry(col.w - 2, h), decalMat(tColFront)); m.position.set(0, base.h + 0.5 + h / 2, zFront + 0.15); machine.add(m); }
  if (tColSide) for (const sgn of [1, -1]) { const h = col.top - base.h - 1; const m = new THREE.Mesh(new THREE.PlaneGeometry(col.d - 1.2, h), decalMat(tColSide, true)); m.position.set(sgn * (col.w / 2 + 0.15), base.h + 0.5 + h / 2, col.z0 + col.d / 2); m.rotation.y = sgn * Math.PI / 2; machine.add(m); }
  if (tColBack) { const h = col.top - base.h - 1; const m = new THREE.Mesh(new THREE.PlaneGeometry(col.w - 2, h), decalMat(tColBack, !P.baseColored)); m.position.set(0, base.h + 0.5 + h / 2, zBack - 0.15); m.rotation.y = Math.PI; machine.add(m); }
  // head: lip + band + lid
  const headPlan = roundedPlan(head.w, zFront - 0.5, head.z1, head.r);
  machine.add(slab(headPlan, head.lip[0], head.lip[1], bodyMat));
  // band ribbon (front curve projected from the front photo, straight sides from the side photo)
  const band = new THREE.Group(); const [b0, b1] = head.band; const hw = head.w / 2, rr = head.r, zc = head.z1 - rr;
  const pts = []; // front curve from right side start to left side start
  const N = 40; for (let i = 0; i <= N; i++) { const t = i / N; let x, z; if (t < 0.35) { const a = (t / 0.35) * Math.PI / 2; x = hw - rr + Math.cos(a) * rr; z = zc + Math.sin(a) * rr; } else if (t < 0.65) { x = hw - rr - ((t - 0.35) / 0.3) * (head.w - 2 * rr); z = head.z1; } else { const a = Math.PI / 2 + ((t - 0.65) / 0.35) * Math.PI / 2; x = -hw + rr + Math.cos(a) * rr; z = zc + Math.sin(a) * rr; } pts.push([x, z]); }
  const ribbon = (points, uOf, texture) => {
    const pos = [], uv = [], idx = []; points.forEach(([x, z], i) => { pos.push(x, b0, z, x, b1, z); const u = uOf(x, z, i); uv.push(u, 0, u, 1); if (i) { const k = i * 2; idx.push(k - 2, k, k - 1, k - 1, k, k + 1); } });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals();
    const m = new THREE.Mesh(g, texture ? decalMat(texture, true) : darkMat); m.material.side = THREE.DoubleSide; m.castShadow = true; return m;
  };
  band.add(ribbon(pts, (x) => (x + hw) / head.w, tBandFront));
  const sidePts = (sgn) => { const a = []; for (let i = 0; i <= 8; i++) { const z = zFront + (zc - zFront) * (i / 8); a.push([sgn * hw, z]); } return a; };
  band.add(ribbon(sidePts(1), (x, z) => 1 - (z - zFront) / (zc - zFront), tBandSide));
  band.add(ribbon(sidePts(-1), (x, z) => (z - zFront) / (zc - zFront), tBandSide));
  machine.add(band);
  // inner core so the band has a solid top/bottom
  machine.add(slab(roundedPlan(head.w - 1, zFront - 0.5, head.z1 - 0.5, head.r - 0.5), b0, b1, darkMat));
  if (lid.flare) {
    // fiberglass cap: wide flared rim + softly domed top
    machine.add(slab(roundedPlan(lid.w, lid.z0, lid.z1, lid.r), lid.y[0], lid.y[0] + 6, bodyMat, 2.5));
    machine.add(slab(roundedPlan(lid.w - 22, lid.z0 + 6, lid.z1 - 14, lid.r - 10), lid.y[0] + 6, lid.y[1] - 5, bodyMat, 5));
  } else {
    machine.add(slab(roundedPlan(lid.w, lid.z0, lid.z1, lid.r), lid.y[0], lid.y[1] - 1.5, bodyMat, 1.5));
  }
  // under-head lights and LED strips
  const glow = new THREE.MeshStandardMaterial({ color: '#FFFFFF', emissive: '#FFF6DE', emissiveIntensity: 2.2 });
  for (const x of [-21, 21]) { const d = new THREE.Mesh(new THREE.CircleGeometry(3.6, 24), glow); d.rotation.x = Math.PI / 2; d.position.set(x, head.lip[0] - 0.1, head.z1 - 20); machine.add(d); }
  const led = new THREE.MeshStandardMaterial({ color: '#FF8A1F', emissive: '#FF7A10', emissiveIntensity: 2.4 });
  for (const sgn of [1, -1]) { const s = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, zc - zFront), led); s.position.set(sgn * (hw + 0.2), head.lip[0] + 2, (zFront + zc) / 2); machine.add(s); }
  const tag = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 12), new THREE.MeshStandardMaterial({ color: '#2CE36B', emissive: '#14D35A', emissiveIntensity: 2 })); tag.position.set(0, head.lip[0] + 3, head.z1 + 0.3); machine.add(tag);
  // punching ball
  const ballMat = new THREE.MeshPhysicalMaterial({ map: ballTex(), roughness: 0.35, clearcoat: 0.6 });
  const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ball.r, 32, 24), ballMat); ballMesh.position.set(0, ball.y, ball.z); ballMesh.castShadow = true; machine.add(ballMesh);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.2, head.lip[0] - ball.y - ball.r + 2, 16), darkMat); arm.position.set(0, (head.lip[0] + ball.y + ball.r) / 2, ball.z); machine.add(arm);
  if (!P.baseColored) { const ledMat = new THREE.MeshStandardMaterial({ color: '#2F6BFF', emissive: '#2F6BFF', emissiveIntensity: 1.6, transparent: true, opacity: 0.85 }); for (const x of [-22, 0, 22]) { const s = new THREE.Mesh(new THREE.PlaneGeometry(6, 60), ledMat); s.rotation.x = -Math.PI / 2; s.position.set(x, base.h + 0.12, base.z0 + base.d - 36); machine.add(s); } }

  // human + dimensions
  const human = mannequin(); human.position.set(-(base.w / 2 + 50), 0, 18); human.visible = !!opts.human; scene.add(human);
  const dimMat = new THREE.MeshBasicMaterial({ color: '#0B2A6F' });
  const dims = new THREE.Group(); dims.visible = !!opts.dims; scene.add(dims);
  const D = P.dims;
  dims.add(dimLine(new THREE.Vector3(base.w / 2 + 22, 0, col.z0 - 4), new THREE.Vector3(base.w / 2 + 22, D.h, col.z0 - 4), D.h + ' cm', dimMat, new THREE.Vector3(1, 0, 0)));
  dims.add(dimLine(new THREE.Vector3(-base.w / 2, 1, base.z0 + base.d + 14), new THREE.Vector3(base.w / 2, 1, base.z0 + base.d + 14), D.mid + ' cm', dimMat, new THREE.Vector3(0, 0, 1)));
  dims.add(dimLine(new THREE.Vector3(-lid.w / 2 - 6, lid.y[1] + 6, lid.z0), new THREE.Vector3(-lid.w / 2 - 6, lid.y[1] + 6, lid.z1), D.top + ' cm', dimMat, new THREE.Vector3(0, 1, 0)));
  const kg = labelSprite(D.kg + ' kg', { bg: '#0B2A6F', fg: '#FFFFFF', size: 13 }); kg.position.set(0, base.h + 16, base.z0 + base.d + 2); dims.add(kg);

  // size, render loop
  let w = 0, h = 0; const resize = () => { const r = container.getBoundingClientRect(); if (!r.width) return; w = r.width; h = r.height; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  const ro = new ResizeObserver(resize); ro.observe(container); resize();
  let tween = null, running = true, visible = true, disposed = false;
  const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0.01 }); io.observe(container);
  const clock = new THREE.Clock();
  controls.addEventListener('start', () => { controls.autoRotate = false; tween = null; if (opts.onInteract) opts.onInteract(); });
  function frame() {
    if (disposed) return; requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(0.05, clock.getDelta());
    if (tween) { tween.t = Math.min(1, (performance.now() - tween.t0) / (tween.d * 1000)); const e = 1 - Math.pow(1 - tween.t, 3); camera.position.lerpVectors(tween.from, tween.to, e); controls.target.lerpVectors(tween.tf, tween.tt, e); if (tween.t >= 1) tween = null; }
    ballMesh.rotation.y += dt * 0.6;
    controls.update(); renderer.render(scene, camera);
  }
  frame();
  const VIEWS = { front: [0, 130, 520], angle: [300, 170, 400], side: [520, 130, 30], back: [-60, 140, -520], top: [180, 520, 300] };
  const api = {
    setColor(name) { bodyMat.color.set(BODY[name] || name); },
    view(name) { const v = VIEWS[name] || VIEWS.angle; controls.autoRotate = false; const k = Math.min(1.25, Math.max(0.9, 1.05 * (h > w ? 1.25 : 1))); tween = { t: 0, t0: performance.now(), d: 0.9, from: camera.position.clone(), to: new THREE.Vector3(v[0] * k, v[1], v[2] * k), tf: controls.target.clone(), tt: new THREE.Vector3(human.visible && (name === 'front' || name === 'back') ? -28 : 0, 108, 25) }; },
    setAuto(on) { controls.autoRotate = !!on; },
    showHuman(on) { human.visible = !!on; },
    showDims(on) { dims.visible = !!on; },
    zoom(f) { const d = camera.position.clone().sub(controls.target); const L = THREE.MathUtils.clamp(d.length() * f, controls.minDistance, controls.maxDistance); camera.position.copy(controls.target).add(d.setLength(L)); },
    dispose() { disposed = true; ro.disconnect(); io.disconnect(); controls.dispose(); renderer.dispose(); pmrem.dispose(); renderer.domElement.remove(); }
  };
  if (opts.onReady) opts.onReady(api);
  return api;
}
