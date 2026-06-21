"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import type * as THREEType from "three";
import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { trackCTAClick } from "@/lib/analytics";

function GenerativeArtScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<THREEType.PointLight | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount || hasError) return;

    let mounted = true;
    let cleanupFn: () => void = () => {};

    import("three")
      .then((THREE) => {
        if (!mounted) return;

        try {
          const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(
            75,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
          );
          camera.position.z = 3;

          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          currentMount.appendChild(renderer.domElement);

          const geometry = new THREE.IcosahedronGeometry(1.2, 64);
          const material = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
              color: { value: new THREE.Color("#FFFFFF") },
            },
            vertexShader: `
              uniform float time;
              varying vec3 vNormal;
              varying vec3 vPosition;
              vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
              vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
              vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
              vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
              float snoise(vec3 v){
                const vec2 C=vec2(1.0/6.0,1.0/3.0);
                const vec4 D=vec4(0.0,0.5,1.0,2.0);
                vec3 i=floor(v+dot(v,C.yyy));
                vec3 x0=v-i+dot(i,C.xxx);
                vec3 g=step(x0.yzx,x0.xyz);
                vec3 l=1.0-g;
                vec3 i1=min(g.xyz,l.zxy);
                vec3 i2=max(g.xyz,l.zxy);
                vec3 x1=x0-i1+C.xxx;
                vec3 x2=x0-i2+C.yyy;
                vec3 x3=x0-D.yyy;
                i=mod289(i);
                vec4 p=permute(permute(permute(
                  i.z+vec4(0.0,i1.z,i2.z,1.0))
                  +i.y+vec4(0.0,i1.y,i2.y,1.0))
                  +i.x+vec4(0.0,i1.x,i2.x,1.0));
                float n_=0.142857142857;
                vec3 ns=n_*D.wyz-D.xzx;
                vec4 j=p-49.0*floor(p*ns.z*ns.z);
                vec4 x_=floor(j*ns.z);
                vec4 y_=floor(j-7.0*x_);
                vec4 x=x_*ns.x+ns.yyyy;
                vec4 y=y_*ns.x+ns.yyyy;
                vec4 h=1.0-abs(x)-abs(y);
                vec4 b0=vec4(x.xy,y.xy);
                vec4 b1=vec4(x.zw,y.zw);
                vec4 s0=floor(b0)*2.0+1.0;
                vec4 s1=floor(b1)*2.0+1.0;
                vec4 sh=-step(h,vec4(0.0));
                vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
                vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
                vec3 p0=vec3(a0.xy,h.x);
                vec3 p1=vec3(a0.zw,h.y);
                vec3 p2=vec3(a1.xy,h.z);
                vec3 p3=vec3(a1.zw,h.w);
                vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
                p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
                vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
                m=m*m;
                return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
              }
              void main(){
                vNormal=normal;
                vPosition=position;
                float displacement=snoise(position*2.0+time*0.5)*0.2;
                vec3 newPosition=position+normal*displacement;
                gl_Position=projectionMatrix*modelViewMatrix*vec4(newPosition,1.0);
              }
            `,
            fragmentShader: `
              uniform vec3 color;
              uniform vec3 pointLightPos;
              varying vec3 vNormal;
              varying vec3 vPosition;
              void main(){
                vec3 normal=normalize(vNormal);
                vec3 lightDir=normalize(pointLightPos-vPosition);
                float diffuse=max(dot(normal,lightDir),0.0);
                float fresnel=1.0-dot(normal,vec3(0.0,0.0,1.0));
                fresnel=pow(fresnel,2.0);
                vec3 finalColor=color*diffuse+color*fresnel*0.5;
                gl_FragColor=vec4(finalColor,1.0);
              }
            `,
            wireframe: true,
          });

          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);

          const pointLight = new THREE.PointLight(0xffffff, 1, 100);
          pointLight.position.set(0, 0, 5);
          lightRef.current = pointLight;
          scene.add(pointLight);

          let frameId: number | null = null;
          let isInViewport = true;
          let isTabVisible = true;

          function animate(t: number) {
            if (!prefersReduced) {
              material.uniforms.time.value = t * 0.0003;
              mesh.rotation.y += 0.0005;
              mesh.rotation.x += 0.0002;
            }
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
          }

          function pauseLoop() {
            if (frameId !== null) {
              cancelAnimationFrame(frameId);
              frameId = null;
            }
          }

          function resumeLoop() {
            if (frameId === null) {
              frameId = requestAnimationFrame(animate);
            }
          }

          frameId = requestAnimationFrame(animate);

          const observer = new IntersectionObserver(
            ([entry]) => {
              isInViewport = entry.isIntersecting;
              if (isInViewport && isTabVisible) {
                resumeLoop();
              } else {
                pauseLoop();
              }
            },
            { threshold: 0 }
          );
          observer.observe(currentMount);

          const handleVisibilityChange = () => {
            isTabVisible = !document.hidden;
            if (isTabVisible && isInViewport) {
              resumeLoop();
            } else {
              pauseLoop();
            }
          };
          document.addEventListener("visibilitychange", handleVisibilityChange);

          const handleResize = () => {
            if (!currentMount) return;
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
          };

          const handleMouseMove = (e: MouseEvent) => {
            if (prefersReduced) return;
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            const vec = new THREE.Vector3(x, y, 0.5).unproject(camera);
            const dir = vec.sub(camera.position).normalize();
            const dist = -camera.position.z / dir.z;
            const pos = camera.position.clone().add(dir.multiplyScalar(dist));
            if (lightRef.current) lightRef.current.position.copy(pos);
            material.uniforms.pointLightPos.value = pos;
          };

          window.addEventListener("resize", handleResize);
          window.addEventListener("mousemove", handleMouseMove);

          cleanupFn = () => {
            if (frameId !== null) cancelAnimationFrame(frameId);
            observer.disconnect();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (currentMount.contains(renderer.domElement)) {
              currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
          };
        } catch {
          setHasError(true);
        }
      })
      .catch(() => {
        if (mounted) setHasError(true);
      });

    return () => {
      mounted = false;
      cleanupFn();
    };
  }, [hasError]);

  if (hasError) return null;

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
}

const container: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function AnomalousMatterHero() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <section
      id="inicio"
      role="banner"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0B0D14" }}
    >
      <Suspense
        fallback={
          <div className="w-full h-full" style={{ backgroundColor: "#0B0D14" }} />
        }
      >
        <GenerativeArtScene />
      </Suspense>

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, #0B0D14 0%, rgba(11,13,20,0.6) 50%, transparent 100%)",
        }}
      />

      <motion.div
        className="relative z-20 flex flex-col justify-end min-h-screen pb-20 md:pb-28 px-6 md:px-12"
        style={{ maxWidth: "72rem", margin: "0 auto", width: "100%" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-xs font-medium uppercase mb-5"
          style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}
        >
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6"
          style={{
            color: "#FFFFFF",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            maxWidth: "48rem",
          }}
        >
          {t('hero.labHeadline')}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base md:text-lg mb-8"
          style={{
            color: "rgba(255,255,255,0.55)",
            lineHeight: "1.6",
            maxWidth: "36rem",
          }}
        >
          {t('hero.labSubtitle')}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <button
            onClick={() => { trackCTAClick('hero'); router.push('/contact'); }}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors duration-200"
            style={{
              borderRadius: "9999px",
              backgroundColor: "#FFFFFF",
              color: "#0B0D14",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#F0F0F0")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF")
            }
          >
            {t('hero.labCta1')}
          </button>
          <a
            href="/#metricas"
            onClick={(e) => { e.preventDefault(); document.getElementById('metricas')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors duration-200"
            style={{
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.7)";
              (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.5)";
            }}
          >
            {t('hero.labCta2')}
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          <span
            className="flex items-center gap-2 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
          </span>
          <span
            className="flex items-center gap-2 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
