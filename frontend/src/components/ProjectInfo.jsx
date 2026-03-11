import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

// Register plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

const ProjectInfo = () => {
  const container = useRef()
  const typeTarget = useRef()

  useGSAP(() => {
    const cards = gsap.utils.toArray(".card")

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=5000", 
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    })

    // Typewrite
    tl.fromTo(typeTarget.current, 
      { text: "" }, 
      { text: "How our model HELPS...", duration: 1.5, ease: "none" }
    )

    // Sequential reveal of cards
    cards.forEach((card, i) => {
      tl.fromTo(card, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          rotateX: -15,
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: i % 2 === 0 ? -8 : 8,
          duration: 2,
          ease: "power2.out"
        }, 
        (i * 2) + 0.5
      )
    })

    tl.to({}, { duration: 1 })

  }, { scope: container })

  return (
    <div className="scroll-runway">
      <section ref={container} className="project-section">
      
        <div className="title-boundary">
           <h2 ref={typeTarget} className="typewriter-text"></h2>
        </div>

        <div className="cards-grid">
          <div className="card item-1">
            <h3>Early Detection</h3>
            <p>Though research has been going on to cure cancer, prevention is better than cure</p>
          </div>

          <div className="card item-2">
            <h3>AI Pipeline</h3>
            <p>Image Classification followed by UNet Segmentation for precise analytics.</p>
          </div>

          <div className="card item-3">
            <h3>Explainability</h3>
            <p>Grad-CAM heatmaps providing transparency into AI decision-making.</p>
          </div>

          <div className="card item-4">
            <h3>Analytics</h3>
            <p>Automated TUMOR cell diameter, coverage, and localized severity scoring through advanced image processing techniques.</p>
          </div>
        </div>
      </section>

      {/* Bottom Boundary */}
      <div className="title-boundary bottom-bar">
      </div>
    </div>
  )
}

export default ProjectInfo