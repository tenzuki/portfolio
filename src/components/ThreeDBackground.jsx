import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const ThreeDBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        // Black hole physics constants
        const BLACK_HOLE_RADIUS = 1.35;
        const DISK_INNER_RADIUS = BLACK_HOLE_RADIUS + 0.2;
        const DISK_OUTER_RADIUS = 8.5;
        const DISK_TILT_ANGLE = Math.PI / 3.0;

        // Scene & Atmospheric Space Fog
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020104, 0.012);

        // Camera - Fixed cinematic viewpoint (no scroll distortion)
        const camera = new THREE.PerspectiveCamera(
            55, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            4000
        );
        camera.position.set(-6.5, 4.6, 6.8);
        camera.lookAt(0, 0, 0);

        // WebGL Renderer
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            powerPreference: 'high-performance',
            alpha: false
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x020104, 1.0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1; // Balanced exposure: vibrant cosmic colors without blown-out blinding glare

        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';
        container.appendChild(renderer.domElement);

        // Post-Processing Composer
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        // Unreal Bloom Pass - Balanced celestial glow without nuclear wash-out
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.55, // Refined bloom strength: smooth celestial aura
            0.5,  // Radius
            0.52  // Threshold: prevents saturated color channels from blowing out into solid white
        );
        composer.addPass(bloomPass);

        // Gravitational Lensing Shader Pass
        const lensingShader = {
            uniforms: {
                "tDiffuse": { value: null },
                "blackHoleScreenPos": { value: new THREE.Vector2(0.5, 0.5) },
                "lensingStrength": { value: 0.12 },
                "lensingRadius": { value: 0.35 },
                "aspectRatio": { value: window.innerWidth / window.innerHeight },
                "chromaticAberration": { value: 0.004 }
            },
            vertexShader: `
                varying vec2 vUv; 
                void main() { 
                    vUv = uv; 
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform vec2 blackHoleScreenPos;
                uniform float lensingStrength;
                uniform float lensingRadius;
                uniform float aspectRatio;
                uniform float chromaticAberration;
                varying vec2 vUv;
                
                void main() {
                    vec2 screenPos = vUv;
                    vec2 toCenter = screenPos - blackHoleScreenPos;
                    toCenter.x *= aspectRatio;
                    float dist = length(toCenter);
                    
                    float distortionAmount = lensingStrength / (dist * dist + 0.003);
                    distortionAmount = clamp(distortionAmount, 0.0, 0.7);
                    float falloff = smoothstep(lensingRadius, lensingRadius * 0.3, dist);
                    distortionAmount *= falloff;
                    
                    // Strict zero guard to prevent NaN rendering artifacts
                    vec2 offset = dist > 0.0001 ? (toCenter / dist) * distortionAmount : vec2(0.0);
                    offset.x /= aspectRatio;
                    
                    vec2 distortedUvR = clamp(screenPos - offset * (1.0 + chromaticAberration), 0.0, 1.0);
                    vec2 distortedUvG = clamp(screenPos - offset, 0.0, 1.0);
                    vec2 distortedUvB = clamp(screenPos - offset * (1.0 - chromaticAberration), 0.0, 1.0);
                    
                    float r = texture2D(tDiffuse, distortedUvR).r;
                    float g = texture2D(tDiffuse, distortedUvG).g;
                    float b = texture2D(tDiffuse, distortedUvB).b;
                    
                    gl_FragColor = vec4(r, g, b, 1.0);
                }
            `
        };
        const lensingPass = new ShaderPass(lensingShader);
        composer.addPass(lensingPass);

        // 3D Twinkling Starfield
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 28000;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        const starTwinkle = new Float32Array(starCount);
        const starFieldRadius = 2200;
        const starPalette = [
            new THREE.Color(0x99bbff), new THREE.Color(0xffbbff), new THREE.Color(0xaaffff),
            new THREE.Color(0xffeebb), new THREE.Color(0xffffff), new THREE.Color(0xff8888),
            new THREE.Color(0xffff88), new THREE.Color(0x88ffff), new THREE.Color(0xddccff)
        ];

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            const phi = Math.acos(-1 + (2 * i) / starCount);
            const theta = Math.sqrt(starCount * Math.PI) * phi;
            const radius = Math.cbrt(Math.random()) * starFieldRadius + 80;

            starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i3 + 2] = radius * Math.cos(phi);

            const starColor = starPalette[Math.floor(Math.random() * starPalette.length)].clone();
            starColor.multiplyScalar(Math.random() * 0.7 + 0.4);
            starColors[i3] = starColor.r; 
            starColors[i3 + 1] = starColor.g; 
            starColors[i3 + 2] = starColor.b;
            starSizes[i] = THREE.MathUtils.randFloat(0.8, 3.0);
            starTwinkle[i] = Math.random() * Math.PI * 2;
        }
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
        starGeometry.setAttribute('twinkle', new THREE.BufferAttribute(starTwinkle, 1));

        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: renderer.getPixelRatio() }
            },
            vertexShader: `
                uniform float uTime;
                uniform float uPixelRatio;
                attribute float size;
                attribute float twinkle;
                varying vec3 vColor;
                varying float vTwinkle;
                
                void main() {
                    vColor = color;
                    vTwinkle = sin(uTime * 2.5 + twinkle) * 0.5 + 0.5;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * uPixelRatio * (320.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vTwinkle;
                
                void main() {
                    float dist = distance(gl_PointCoord, vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                    alpha *= (0.25 + vTwinkle * 0.75);
                    
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Event Horizon Glow (BackSide Fresnel Halo)
        const eventHorizonGeom = new THREE.SphereGeometry(BLACK_HOLE_RADIUS * 1.08, 128, 64);
        const eventHorizonMat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uCameraPosition: { value: camera.position }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uCameraPosition;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vec3 viewDirection = normalize(uCameraPosition - vPosition);
                    float fresnel = 1.0 - abs(dot(vNormal, viewDirection));
                    fresnel = pow(fresnel, 2.2);
                    
                    vec3 glowColor = vec3(1.0, 0.55, 0.2);
                    float pulse = sin(uTime * 2.5) * 0.15 + 0.85;
                    
                    gl_FragColor = vec4(glowColor * fresnel * pulse, fresnel * 0.55);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        const eventHorizon = new THREE.Mesh(eventHorizonGeom, eventHorizonMat);
        scene.add(eventHorizon);

        // Black Hole Central Singularity (Absolute Pitch Black Sphere)
        const blackHoleGeom = new THREE.SphereGeometry(BLACK_HOLE_RADIUS, 128, 64);
        const blackHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        blackHoleMat.fog = false;
        const blackHoleMesh = new THREE.Mesh(blackHoleGeom, blackHoleMat);
        blackHoleMesh.renderOrder = 0;
        scene.add(blackHoleMesh);

        // Accretion Disk with Procedural Simplex Noise & Swirling Gas
        const diskGeometry = new THREE.RingGeometry(DISK_INNER_RADIUS, DISK_OUTER_RADIUS, 256, 128);
        const diskMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
                uColorHot: { value: new THREE.Color(0xff9922) }, // Warm solar amber-gold (contrasts with white text)
                uColorMid1: { value: new THREE.Color(0xff4411) }, // Fiery solar orange
                uColorMid2: { value: new THREE.Color(0xcc1155) }, // Electric ruby / magenta
                uColorMid3: { value: new THREE.Color(0x6622cc) }, // Deep royal purple
                uColorOuter: { value: new THREE.Color(0x1a33aa) }, // Deep cosmic blue
                uNoiseScale: { value: 2.5 },
                uFlowSpeed: { value: 0.25 },
                uDensity: { value: 1.25 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying float vRadius;
                varying float vAngle;
                void main() {
                    vUv = uv;
                    vRadius = length(position.xy);
                    vAngle = atan(position.y, position.x);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uTime;
                uniform vec3 uColorHot;
                uniform vec3 uColorMid1;
                uniform vec3 uColorMid2;
                uniform vec3 uColorMid3;
                uniform vec3 uColorOuter;
                uniform float uNoiseScale;
                uniform float uFlowSpeed;
                uniform float uDensity;

                varying vec2 vUv;
                varying float vRadius;
                varying float vAngle;

                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                
                float snoise(vec3 v) {
                    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 = v - i + dot(i, C.xxx) ;
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy;
                    vec3 x3 = x0 - D.yyy;
                    i = mod289(i);
                    vec4 p = permute( permute( permute( 
                             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                    float n_ = 0.142857142857;
                    vec3  ns = n_ * D.wyz - D.xzx;
                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );
                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);
                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));
                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
                    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
                }

                void main() {
                    float normalizedRadius = smoothstep(1.50, 8.50, vRadius);
                    
                    float spiral = vAngle * 3.0 - (1.0 / (normalizedRadius + 0.1)) * 2.0;
                    vec2 noiseUv = vec2(vUv.x + uTime * uFlowSpeed * (2.0 / (vRadius * 0.3 + 1.0)) + sin(spiral) * 0.1, vUv.y * 0.8 + cos(spiral) * 0.1);
                    float noiseVal1 = snoise(vec3(noiseUv * uNoiseScale, uTime * 0.18));
                    float noiseVal2 = snoise(vec3(noiseUv * uNoiseScale * 3.0 + 0.8, uTime * 0.25));
                    float noiseVal3 = snoise(vec3(noiseUv * uNoiseScale * 6.0 + 1.5, uTime * 0.35));
                    
                    float noiseVal = (noiseVal1 * 0.45 + noiseVal2 * 0.35 + noiseVal3 * 0.2);
                    noiseVal = (noiseVal + 1.0) * 0.5;
                    
                    vec3 color = uColorOuter;
                    color = mix(color, uColorMid3, smoothstep(0.0, 0.25, normalizedRadius));
                    color = mix(color, uColorMid2, smoothstep(0.2, 0.55, normalizedRadius));
                    color = mix(color, uColorMid1, smoothstep(0.5, 0.75, normalizedRadius));
                    color = mix(color, uColorHot, smoothstep(0.7, 0.95, normalizedRadius));
                    
                    color *= (0.65 + noiseVal * 0.65);
                    // Balanced celestial accretion disk: vibrant and radiant, but never blown out to solid white
                    float brightness = pow(1.0 - normalizedRadius, 0.9) * 2.1 + 0.55;
                    brightness *= (0.45 + noiseVal * 0.95);
                    
                    float pulse = sin(uTime * 1.8 + normalizedRadius * 12.0 + vAngle * 2.0) * 0.12 + 0.88;
                    brightness *= pulse;
                    
                    float alpha = uDensity * (0.28 + noiseVal * 0.8);
                    alpha *= smoothstep(0.0, 0.15, normalizedRadius);
                    alpha *= (1.0 - smoothstep(0.85, 1.0, normalizedRadius));
                    alpha = clamp(alpha, 0.0, 1.0);

                    gl_FragColor = vec4(color * brightness, alpha);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
        accretionDisk.rotation.x = DISK_TILT_ANGLE;
        accretionDisk.renderOrder = 1;
        scene.add(accretionDisk);

        // Gentle Mouse Parallax (Micro-interaction)
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        const handleMouseMove = (e) => {
            mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Debounced Resize Listener
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
                composer.setSize(width, height);
                bloomPass.resolution.set(width, height);
                lensingPass.uniforms.aspectRatio.value = width / height;
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            }, 100);
        };
        window.addEventListener('resize', handleResize);

        // High-Performance Animation Loop
        const clock = new THREE.Clock();
        const blackHoleScreenPosVec3 = new THREE.Vector3();
        let animationFrameId;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const deltaTime = Math.min(clock.getDelta(), 0.1);
            const elapsedTime = clock.getElapsedTime();

            // Smooth subtle mouse interpolation (no scroll distortion / side view change)
            mouse.x += (mouse.targetX - mouse.x) * 0.03;
            mouse.y += (mouse.targetY - mouse.y) * 0.03;

            // Update shader uniforms
            diskMaterial.uniforms.uTime.value = elapsedTime;
            starMaterial.uniforms.uTime.value = elapsedTime;
            eventHorizonMat.uniforms.uTime.value = elapsedTime;
            eventHorizonMat.uniforms.uCameraPosition.value.copy(camera.position);

            // Project black hole 3D center to 2D screen UV coordinates
            blackHoleScreenPosVec3.copy(blackHoleMesh.position).project(camera);
            lensingPass.uniforms.blackHoleScreenPos.value.set(
                (blackHoleScreenPosVec3.x + 1) / 2,
                (blackHoleScreenPosVec3.y + 1) / 2
            );

            // Stable fixed camera with gentle mouse micro-parallax - NO scroll angle distortion
            const targetCamX = -6.5 + mouse.x * 0.55;
            const targetCamY = 4.6 + mouse.y * 0.35;
            const targetCamZ = 6.8;

            camera.position.x += (targetCamX - camera.position.x) * 0.04;
            camera.position.y += (targetCamY - camera.position.y) * 0.04;
            camera.position.z += (targetCamZ - camera.position.z) * 0.04;
            camera.lookAt(0, 0, 0);

            // Continuous rotating black hole & starfield
            stars.rotation.y += deltaTime * 0.005;
            stars.rotation.x += deltaTime * 0.002;
            accretionDisk.rotation.z += deltaTime * 0.025; // Smooth continuous rotation

            composer.render(deltaTime);
        };

        animate();

        // Cleanup on unmount
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }

            renderer.dispose();
            composer.dispose();
            starGeometry.dispose();
            starMaterial.dispose();
            eventHorizonGeom.dispose();
            eventHorizonMat.dispose();
            blackHoleGeom.dispose();
            blackHoleMat.dispose();
            diskGeometry.dispose();
            diskMaterial.dispose();
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="black-hole-background"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000002 70%)'
            }}
        />
    );
};

export default ThreeDBackground;
