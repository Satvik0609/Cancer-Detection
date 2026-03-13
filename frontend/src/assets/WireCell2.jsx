import { useEffect, useRef } from "react";

export default function TumorCell() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const ROWS = 22, COLS = 28;

    function spherePoints() {
      const pts = [];
      for (let i = 0; i <= ROWS; i++) {
        const phi = (i / ROWS) * Math.PI;
        for (let j = 0; j <= COLS; j++) {
          const theta = (j / COLS) * Math.PI * 2;
          pts.push({ phi, theta,
            x: Math.sin(phi)*Math.cos(theta),
            y: Math.cos(phi),
            z: Math.sin(phi)*Math.sin(theta),
          });
        }
      }
      return pts;
    }

    function tumorNoise(phi, theta) {
      let d = 1.0;
      d += 0.18*Math.sin(3*phi+1.2)*Math.cos(2*theta+0.8);
      d += 0.12*Math.sin(5*phi-0.7)*Math.sin(4*theta+1.1);
      d += 0.09*Math.cos(7*phi+2.1)*Math.cos(5*theta-0.5);
      d += 0.07*Math.sin(2*phi+0.3)*Math.cos(7*theta+2.0);
      d += 0.05*Math.cos(9*phi-1.4)*Math.sin(3*theta+0.6);
      d += 0.22*Math.exp(-12*((phi-1.1)**2+(theta-2.3)**2));
      d += 0.18*Math.exp(-10*((phi-2.2)**2+(theta-4.8)**2));
      d += 0.15*Math.exp(-14*((phi-0.8)**2+(theta-1.0)**2));
      return d;
    }

    const basePts = spherePoints();
    const tumorMesh = basePts.map(p => {
      const d = tumorNoise(p.phi, p.theta) * 110;
      return { x: p.x*d, y: p.y*d, z: p.z*d };
    });
    const nucleusPts = basePts.map(p => ({ x: p.x*34, y: p.y*34, z: p.z*34 }));

    function getFaces(mesh) {
      const faces = [];
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          const a=i*(COLS+1)+j, b=a+1, c=(i+1)*(COLS+1)+j, d=c+1;
          const pa=mesh[a],pb=mesh[b],pc=mesh[c],pd=mesh[d];
          const nx=(pb.y-pa.y)*(pc.z-pa.z)-(pb.z-pa.z)*(pc.y-pa.y);
          const ny=(pb.z-pa.z)*(pc.x-pa.x)-(pb.x-pa.x)*(pc.z-pa.z);
          const nz=(pb.x-pa.x)*(pc.y-pa.y)-(pb.y-pa.y)*(pc.x-pa.x);
          const nl=Math.sqrt(nx*nx+ny*ny+nz*nz)||1;
          faces.push({ a,b,c,d, nx:nx/nl,ny:ny/nl,nz:nz/nl });
        }
      }
      return faces;
    }

    const tumorFaces = getFaces(tumorMesh);
    const nucFaces = getFaces(nucleusPts);

    function rotY(p,a){ return{...p,x:p.x*Math.cos(a)+p.z*Math.sin(a),z:-p.x*Math.sin(a)+p.z*Math.cos(a)}; }
    function rotX(p,a){ return{...p,y:p.y*Math.cos(a)-p.z*Math.sin(a),z:p.y*Math.sin(a)+p.z*Math.cos(a)}; }
    function proj(p){ const FOV=500,s=FOV/(FOV+p.z); return{sx:cx+p.x*s,sy:cy+p.y*s}; }

    let rafId;
    function loop(ts) {
      ctx.clearRect(0, 0, W, H);
      const angle = ts / 9000 * Math.PI * 2;
      const rotated = tumorMesh.map(p => rotX(rotY(p, angle), 0.3));
      const nucRot = nucleusPts.map(p => rotX(rotY(p, angle), 0.3));

      const pf = tumorFaces.map(f => {
        const rpa=rotated[f.a],rpb=rotated[f.b],rpc=rotated[f.c],rpd=rotated[f.d];
        const pmz=(rpa.z+rpb.z+rpc.z+rpd.z)/4;
        const light=Math.max(0,-0.6*f.nx-0.5*f.ny+0.6*f.nz);
        return{...f,pmz,light,back:pmz<0,ppa:proj(rpa),ppb:proj(rpb),ppc:proj(rpc),ppd:proj(rpd)};
      }).sort((a,b)=>a.pmz-b.pmz);

      const pn = nucFaces.map(f => {
        const rpa=nucRot[f.a],rpb=nucRot[f.b],rpc=nucRot[f.c],rpd=nucRot[f.d];
        const pmz=(rpa.z+rpb.z+rpc.z+rpd.z)/4;
        return{...f,pmz,ppa:proj(rpa),ppb:proj(rpb),ppc:proj(rpc),ppd:proj(rpd)};
      }).sort((a,b)=>a.pmz-b.pmz);

      // Back shell
      for (const f of pf.filter(f=>f.back)) {
        const{ppa,ppb,ppc,ppd,light}=f;
        const l=0.12+light*0.25;
        ctx.beginPath();
        ctx.moveTo(ppa.sx,ppa.sy); ctx.lineTo(ppb.sx,ppb.sy);
        ctx.lineTo(ppd.sx,ppd.sy); ctx.lineTo(ppc.sx,ppc.sy);
        ctx.closePath();
        ctx.fillStyle=`rgba(${Math.round(220+l*30)},${Math.round(80+l*40)},${Math.round(140+l*30)},0.13)`;
        ctx.fill();
        ctx.strokeStyle='rgba(236,72,153,0.08)';
        ctx.lineWidth=0.3; ctx.stroke();
      }

      // Nucleus
      for (const f of pn) {
        const{ppa,ppb,ppc,ppd}=f;
        ctx.beginPath();
        ctx.moveTo(ppa.sx,ppa.sy); ctx.lineTo(ppb.sx,ppb.sy);
        ctx.lineTo(ppd.sx,ppd.sy); ctx.lineTo(ppc.sx,ppc.sy);
        ctx.closePath();
        ctx.fillStyle='rgba(190,24,93,0.82)';
        ctx.strokeStyle='rgba(236,72,153,0.45)';
        ctx.fill(); ctx.lineWidth=0.4; ctx.stroke();
      }

      // Front shell
      for (const f of pf.filter(f=>!f.back)) {
        const{ppa,ppb,ppc,ppd,light}=f;
        const r=Math.round(210+light*45);
        const g=Math.round(70+light*50);
        const bv=Math.round(130+light*40);
        ctx.beginPath();
        ctx.moveTo(ppa.sx,ppa.sy); ctx.lineTo(ppb.sx,ppb.sy);
        ctx.lineTo(ppd.sx,ppd.sy); ctx.lineTo(ppc.sx,ppc.sy);
        ctx.closePath();
        ctx.fillStyle=`rgba(${r},${g},${bv},0.22)`;
        ctx.strokeStyle=`rgba(236,72,153,${0.15+light*0.5})`;
        ctx.fill(); ctx.lineWidth=0.35; ctx.stroke();
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      style={{ display: "block", background: "transparent" }}
    />
  );
}