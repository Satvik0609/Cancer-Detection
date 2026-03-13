import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.jpg';

gsap.registerPlugin(ScrollTrigger);

const Blocks = () => {
  const containerRef = useRef(null);

  const imageSlabs = [
    { id: 1, src: image1, alt: "Arch", rotation: 0, h: '90vh' },
    { id: 2, src: image2, alt: "Flow", rotation: -5, h: '95vh' },
    { id: 3, src: image3, alt: "UI", rotation: 5, h: '80vh' },
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const images = gsap.utils.toArray('.image-slab');

      images.forEach((img, i) => {
        if (i > 0) {
          gsap.fromTo(img, 
            { 
              y: "120vh", 
              rotate: 15, 
              opacity: 0 
            },
            {
              y: 0,
              rotate: imageSlabs[i].rotation,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: img,
                start: "top bottom", 
                end: "top 15%", 
                scrub: true,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={styles.wrapper}>
      <h2 style={styles.header}>About us</h2>
      
      {imageSlabs.map((item, index) => (
        <div 
          key={item.id} 
          className="image-slab" 
          style={{ 
            ...styles.slabContainer, 
            zIndex: index + 1,
            height: item.h,
            top: `calc(50vh - (${item.h} / 2))` 
          }}
        >
          <img 
            src={item.src} 
            alt={item.alt} 
            style={styles.image} 
            onError={(e) => { 
                e.target.src = `https://via.placeholder.com/800x600/1e7e45/ffffff?text=Image+${item.id}`;
            }}
          />
        </div>
      ))}

      <div style={{ height: '50vh' }}></div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#23a559',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%23000000' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    backgroundAttachment: 'fixed',
    minHeight: '0vh', // Increased height to ensure enough scroll room
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '0vh'
  },
  header: {
    color: '#fff',
    padding: '120px 0',
    fontSize: '3rem',
    fontWeight: '800',
    textShadow: '2px 2px 10px rgba(0,0,0,0.2)'
  },
  slabContainer: {
    position: 'sticky',
    width: '80vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
    marginBottom: '60vh',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
};

export default Blocks;