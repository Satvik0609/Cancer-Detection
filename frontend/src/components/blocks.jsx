import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blocks = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const slabs = gsap.utils.toArray('.slab');

      slabs.forEach((slab, i) => {
        if (i > 0) {
          gsap.fromTo(slab, 
            { 
              y: "100vh", // Start off-screen from the bottom
              rotate: 2   
            },
            {
              y: 0,
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: slab,
                start: "top bottom", 
                end: "top 5%", 
                scrub: true,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => context.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} style={styles.wrapper}>
      {/* Slab 1 */}
      <section className="slab" style={{ ...styles.slab, backgroundColor: '#1a1a1a', zIndex: 1 }}>
        <div style={styles.content}>
          <h2 style={styles.title}>01. The Foundation</h2>
          <p>Initial architectural setup and global state configuration.</p>
          
        </div>
      </section>

      {/* Slab 2 */}
      <section className="slab" style={{ ...styles.slab, backgroundColor: '#2d3436', zIndex: 2 }}>
        <div style={styles.content}>
          <h2 style={styles.title}>02. Data Flow</h2>
          <p>Implementing real-time hooks and GSAP scroll triggers.</p>
          

[Image of a data flow diagram]

        </div>
      </section>

      {/* Slab 3 */}
      <section className="slab" style={{ ...styles.slab, backgroundColor: '#0984e3', zIndex: 3 }}>
        <div style={styles.content}>
          <h2 style={styles.title}>03. Visual Polish</h2>
          <p>Finalizing the UI slabs with responsive layouts and motion.</p>
          
        </div>
      </section>

      {/* Spacer to allow scrolling past the last sticky element */}
      <div style={{ height: '20vh' }}></div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#000',
    paddingTop: '5vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  slab: {
    position: 'sticky',
    top: '5vh',
    width: '90vw',
    height: '85vh',
    marginBottom: '15vh',
    borderRadius: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0px -20px 40px rgba(0,0,0,0.5)',
    color: 'white',
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '20px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  }
};

export default Blocks;