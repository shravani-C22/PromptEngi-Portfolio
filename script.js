// =========================================================
// 1. INITIALIZE 3D VIRTUAL ROOM SCENE
// =========================================================
const canvas = document.getElementById('world-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05070e, 0.035);

const camera = new THREE.PerspectiveCamera(
  48,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.4, 7.2);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Room Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.55));

const mainSpot = new THREE.PointLight(0x00f0ff, 2.2, 25);
mainSpot.position.set(0, 4.5, 4);
scene.add(mainSpot);

const purpleLight = new THREE.PointLight(0x8b5cf6, 2.4, 20);
purpleLight.position.set(-5, 2, -2);
scene.add(purpleLight);

const pinkLight = new THREE.PointLight(0xec4899, 2.0, 20);
pinkLight.position.set(5, 2, -2);
scene.add(pinkLight);

// =========================================================
// 2. VIRTUAL ROOM ARCHITECTURE (FLOOR GRID, WALLS & GLOBE)
// =========================================================
// Cyber Grid Floor
const gridHelper = new THREE.GridHelper(28, 36, 0x00f0ff, 0x1e293b);
gridHelper.position.y = -1.6;
scene.add(gridHelper);

// Glowing Stage Platform under Shravani
const stageDisc = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 1.8, 0.12, 48),
  new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.8,
    roughness: 0.2
  })
);
stageDisc.position.y = -1.54;
scene.add(stageDisc);

const stageRing = new THREE.Mesh(
  new THREE.TorusGeometry(1.72, 0.03, 16, 64),
  new THREE.MeshBasicMaterial({ color: 0x00f0ff })
);
stageRing.rotation.x = Math.PI / 2;
stageRing.position.y = -1.48;
scene.add(stageRing);

// Background Wireframe Globe Web
const bgGlobe = new THREE.Mesh(
  new THREE.IcosahedronGeometry(9, 2),
  new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.14
  })
);
bgGlobe.position.set(0, 1.5, -8);
scene.add(bgGlobe);

// =========================================================
// 3. 3D SHRAVANI AVATAR STANDING IN CENTER OF ROOM
// =========================================================
const avatar = new THREE.Group();
avatar.position.set(0, -0.1, 0);
scene.add(avatar);

const skinMat = new THREE.MeshStandardMaterial({ color: 0xf4c794, roughness: 0.42 });
const jacketMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.45, metalness: 0.2 });
const pantsMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
const hairMat = new THREE.MeshStandardMaterial({ color: 0x111118, roughness: 0.55 });
const cyanGlow = new THREE.MeshStandardMaterial({
  color: 0x00f0ff,
  emissive: 0x00b4d8,
  emissiveIntensity: 0.7
});
const pinkGlow = new THREE.MeshStandardMaterial({
  color: 0xec4899,
  emissive: 0xdb2777,
  emissiveIntensity: 0.55
});

// Legs & Boots
const legGeo = new THREE.CylinderGeometry(0.13, 0.11, 1.05, 16);
const leftLeg = new THREE.Mesh(legGeo, pantsMat);
leftLeg.position.set(-0.22, -0.92, 0);
const rightLeg = new THREE.Mesh(legGeo, pantsMat);
rightLeg.position.set(0.22, -0.92, 0);
avatar.add(leftLeg, rightLeg);

// Torso & Jacket
const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.46, 1.05, 24), jacketMat);
torso.position.y = 0.05;
avatar.add(torso);

const coreGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), pinkGlow);
coreGem.position.set(0, 0.18, 0.39);
avatar.add(coreGem);

// Neck & Head
const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.25, 16), skinMat);
neck.position.y = 0.65;
avatar.add(neck);

const headGroup = new THREE.Group();
headGroup.position.y = 1.12;
avatar.add(headGroup);

const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), skinMat);
head.scale.set(0.96, 1.04, 0.98);
headGroup.add(head);

// Hair & High Ponytail
const hairCap = new THREE.Mesh(
  new THREE.SphereGeometry(0.48, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.58),
  hairMat
);
hairCap.rotation.x = -0.32;
headGroup.add(hairCap);

const ponytailPivot = new THREE.Group();
ponytailPivot.position.set(0, 0.34, -0.42);
headGroup.add(ponytailPivot);

const ponytail = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.95, 20), hairMat);
ponytail.position.set(0, -0.38, -0.12);
ponytail.rotation.x = 0.35;
ponytailPivot.add(ponytail);

// Eyes & Headphones
const eyeGeo = new THREE.SphereGeometry(0.058, 16, 16);
const leftEye = new THREE.Mesh(eyeGeo, cyanGlow);
leftEye.position.set(-0.15, 0.02, 0.41);
const rightEye = new THREE.Mesh(eyeGeo, cyanGlow);
rightEye.position.set(0.15, 0.02, 0.41);
headGroup.add(leftEye, rightEye);

const headphoneBand = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.035, 12, 32, Math.PI),
  pantsMat
);
headphoneBand.position.y = 0.06;
headGroup.add(headphoneBand);

const earGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.08, 16);
const leftEar = new THREE.Mesh(earGeo, cyanGlow);
leftEar.rotation.z = Math.PI / 2;
leftEar.position.set(-0.48, 0.03, 0);
const rightEar = new THREE.Mesh(earGeo, cyanGlow);
rightEar.rotation.z = Math.PI / 2;
rightEar.position.set(0.48, 0.03, 0);
headGroup.add(leftEar, rightEar);

// Arms
const leftArmPivot = new THREE.Group();
leftArmPivot.position.set(-0.48, 0.42, 0);
avatar.add(leftArmPivot);

const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.085, 0.78, 16), jacketMat);
leftArm.position.set(-0.1, -0.32, 0);
leftArm.rotation.z = 0.22;
leftArmPivot.add(leftArm);

const rightArmPivot = new THREE.Group();
rightArmPivot.position.set(0.48, 0.42, 0);
avatar.add(rightArmPivot);

const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.085, 0.78, 16), jacketMat);
rightArm.position.set(0.1, -0.32, 0);
rightArm.rotation.z = -0.22;
rightArmPivot.add(rightArm);

// =========================================================
// 4. THREE INTERACTIVE 3D OBJECTS (LAPTOP, BOOK, PHONE)
// =========================================================
const interactiveObjects = [];

// --- OBJECT A: 3D LAPTOP (Left: AI Projects) ---
const laptopGroup = new THREE.Group();
laptopGroup.position.set(0, 0.2, 0);
laptopGroup.scale.set(0.001, 0.001, 0.001);
laptopGroup.userData = {
  type: 'laptop',
  targetPos: new THREE.Vector3(-2.7, 0.45, 1.1),
  labelEl: document.getElementById('label-laptop')
};
scene.add(laptopGroup);

const laptopBase = new THREE.Mesh(
  new THREE.BoxGeometry(1.15, 0.07, 0.8),
  new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 })
);
laptopGroup.add(laptopBase);

const laptopScreen = new THREE.Mesh(
  new THREE.BoxGeometry(1.15, 0.75, 0.05),
  new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7, roughness: 0.2 })
);
laptopScreen.position.set(0, 0.38, -0.38);
laptopScreen.rotation.x = -0.2;
laptopGroup.add(laptopScreen);

const screenGlow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.02, 0.62),
  new THREE.MeshBasicMaterial({ color: 0x00f0ff })
);
screenGlow.position.set(0, 0.38, -0.35);
screenGlow.rotation.x = -0.2;
laptopGroup.add(screenGlow);

const laptopHitbox = new THREE.Mesh(
  new THREE.BoxGeometry(1.4, 1.2, 1.2),
  new THREE.MeshBasicMaterial({ visible: false })
);
laptopHitbox.userData.type = 'laptop';
laptopGroup.add(laptopHitbox);
interactiveObjects.push(laptopHitbox);

// --- OBJECT B: 3D BOOK (Right: Education & Certificates) ---
const bookGroup = new THREE.Group();
bookGroup.position.set(0, 0.2, 0);
bookGroup.scale.set(0.001, 0.001, 0.001);
bookGroup.userData = {
  type: 'book',
  targetPos: new THREE.Vector3(2.7, 0.55, 1.1),
  labelEl: document.getElementById('label-book')
};
scene.add(bookGroup);

const bookCover = new THREE.Mesh(
  new THREE.BoxGeometry(0.95, 0.18, 1.25),
  new THREE.MeshStandardMaterial({ color: 0x6d28d9, roughness: 0.4 })
);
bookGroup.add(bookCover);

const bookPages = new THREE.Mesh(
  new THREE.BoxGeometry(0.88, 0.14, 1.18),
  new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 })
);
bookPages.position.x = 0.03;
bookGroup.add(bookPages);

const bookSpineGlow = new THREE.Mesh(
  new THREE.BoxGeometry(0.06, 0.2, 1.27),
  cyanGlow
);
bookSpineGlow.position.x = -0.47;
bookGroup.add(bookSpineGlow);

const bookHitbox = new THREE.Mesh(
  new THREE.BoxGeometry(1.3, 0.9, 1.5),
  new THREE.MeshBasicMaterial({ visible: false })
);
bookHitbox.userData.type = 'book';
bookGroup.add(bookHitbox);
interactiveObjects.push(bookHitbox);

// --- OBJECT C: 3D SMARTPHONE (Bottom-Front Right: Contact) ---
const phoneGroup = new THREE.Group();
phoneGroup.position.set(0, 0.2, 0);
phoneGroup.scale.set(0.001, 0.001, 0.001);
phoneGroup.userData = {
  type: 'phone',
  targetPos: new THREE.Vector3(1.85, -0.75, 2.2),
  labelEl: document.getElementById('label-phone')
};
scene.add(phoneGroup);

const phoneBody = new THREE.Mesh(
  new THREE.BoxGeometry(0.52, 0.96, 0.06),
  new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.2 })
);
phoneGroup.add(phoneBody);

const phoneDisplay = new THREE.Mesh(
  new THREE.PlaneGeometry(0.45, 0.86),
  new THREE.MeshBasicMaterial({ color: 0xec4899 })
);
phoneDisplay.position.z = 0.035;
phoneGroup.add(phoneDisplay);

const phoneHitbox = new THREE.Mesh(
  new THREE.BoxGeometry(0.9, 1.3, 0.6),
  new THREE.MeshBasicMaterial({ visible: false })
);
phoneHitbox.userData.type = 'phone';
phoneGroup.add(phoneHitbox);
interactiveObjects.push(phoneHitbox);

const propGroups = [laptopGroup, bookGroup, phoneGroup];

// =========================================================
// 5. PULL-THREAD LOGIC & STORY STATE
// =========================================================
let worldRevealed = false;
let revealProgress = 0;

const threadWrapper = document.getElementById('thread-wrapper');
const threadLine = document.getElementById('thread-line');
const speechText = document.getElementById('speech-text');
const speechSub = document.getElementById('speech-sub');
const quickNav = document.getElementById('quick-nav');

let isDragging = false;
let startY = 0;
const baseThreadHeight = 210;

function revealWorld() {
  if (worldRevealed) return;
  worldRevealed = true;
  threadWrapper.classList.add('pulled');
  quickNav.style.display = 'flex';

  speechText.textContent = '"Welcome! Click any floating object to explore my story."';
  speechSub.textContent = '💻 Laptop = Projects  •  📘 Book = Education & Certs  •  📱 Phone = Contact';

  propGroups.forEach((g) => g.userData.labelEl.classList.remove('hidden'));
}

threadWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const delta = Math.max(0, Math.min(160, e.clientY - startY));
  threadLine.style.height = baseThreadHeight + delta + 'px';
  if (delta > 85) {
    isDragging = false;
    revealWorld();
  }
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  if (!worldRevealed) {
    threadLine.style.height = baseThreadHeight + 'px';
  }
});

threadWrapper.addEventListener('click', revealWorld);

threadWrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const delta = Math.max(0, Math.min(160, e.touches[0].clientY - startY));
  threadLine.style.height = baseThreadHeight + delta + 'px';
  if (delta > 75) {
    isDragging = false;
    revealWorld();
  }
});

// =========================================================
// 6. CLICK RAYCASTING & MODAL CONTROLS
// =========================================================
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let mouseX = 0;
let mouseY = 0;

function openStoryModal(type) {
  document.querySelectorAll('.story-modal').forEach((m) => m.classList.add('hidden'));
  const targetModal = document.getElementById(`modal-${type}`);
  if (targetModal) targetModal.classList.remove('hidden');
}

document.querySelectorAll('[data-open]').forEach((el) => {
  el.addEventListener('click', () => openStoryModal(el.getAttribute('data-open')));
});

document.querySelectorAll('[data-close]').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.story-modal').classList.add('hidden');
  });
});

document.querySelectorAll('.story-modal').forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
});

window.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth) - 0.5;
  mouseY = (e.clientY / window.innerHeight) - 0.5;

  if (!worldRevealed) return;

  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactiveObjects);
  document.body.style.cursor = hits.length > 0 ? 'pointer' : 'default';
});

window.addEventListener('click', (e) => {
  if (!worldRevealed) return;
  // Ignore clicks inside open modals or HUD buttons
  if (e.target.closest('.modal-card') || e.target.closest('.hud-controls') || e.target.closest('.object-tag')) {
    return;
  }

  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactiveObjects);
  if (hits.length > 0) {
    openStoryModal(hits[0].object.userData.type);
  }
});

// =========================================================
// 7. ANIMATION LOOP & 3D-TO-2D LABEL TRACKING
// =========================================================
const clock = new THREE.Clock();

function updateLabelPosition(group, offsetY) {
  const vec = new THREE.Vector3();
  group.getWorldPosition(vec);
  vec.y += offsetY;
  vec.project(camera);

  const x = (vec.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-(vec.y * 0.5) + 0.5) * window.innerHeight;

  group.userData.labelEl.style.left = `${x}px`;
  group.userData.labelEl.style.top = `${y}px`;
}

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Avatar Idle & Head Tracking
  avatar.position.y = -0.1 + Math.sin(t * 2) * 0.04;
  ponytailPivot.rotation.z = Math.sin(t * 2.4) * 0.08;
  coreGem.rotation.y = t * 2;
  stageRing.rotation.z = t * 0.4;
  bgGlobe.rotation.y = t * 0.08;

  headGroup.rotation.y += (mouseX * 0.7 - headGroup.rotation.y) * 0.08;
  headGroup.rotation.x += (mouseY * 0.45 - headGroup.rotation.x) * 0.08;

  // Natural Blinking
  const blink = Math.sin(t * 3.4) > 0.98 ? 0.1 : 1;
  leftEye.scale.y = blink;
  rightEye.scale.y = blink;

  // Reveal Animation when Thread is Pulled
  if (worldRevealed) {
    revealProgress += (1 - revealProgress) * 0.06;

    // Avatar waves and gestures toward objects
    rightArmPivot.rotation.z = 2.1 + Math.sin(t * 5) * 0.3;
    leftArmPivot.rotation.z = -0.4 + Math.cos(t * 2) * 0.1;

    // Smoothly fly objects out from Shravani into orbit
    propGroups.forEach((group, idx) => {
      const target = group.userData.targetPos;
      group.position.lerp(target, 0.07);
      group.position.y = target.y + Math.sin(t * 2.2 + idx * 1.5) * 0.12;
      group.rotation.y = Math.sin(t * 1.2 + idx) * 0.35;

      const s = Math.max(0.001, revealProgress);
      group.scale.set(s, s, s);
    });

    updateLabelPosition(laptopGroup, -0.75);
    updateLabelPosition(bookGroup, -0.65);
    updateLabelPosition(phoneGroup, -0.78);
  }

  // Subtle Camera Parallax
  camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.04;
  camera.lookAt(0, 0.2, 0);

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});