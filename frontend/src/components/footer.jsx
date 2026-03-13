import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.mainGrid}>
                {/* 1. Brand Section */}
                <div style={styles.infoCol}>
                    <h3 style={styles.logo}>CHECKPOINT AI</h3>
                    <p style={styles.tagline}>
                        Precision segmentation and AI diagnostics <br /> 
                        revolutionizing oncology.
                    </p>
                </div>

                {/* 2. Team Spirit Section (Smaller & Integrated) */}
                <div style={styles.spiritCol}>
                    <h1 className="bitcount-ink-spirit" style={styles.spiritText}>
                        Smells Like <br /> Team Spirit
                    </h1>
                </div>

                {/* 3. Links Section */}
                <div style={styles.linksWrapper}>
                    <div style={styles.linkGroup}>
                        <h4 style={styles.linkTitle}>Product</h4>
                        <a href="#" style={styles.link}>Detection</a>
                        <a href="#" style={styles.link}>Segmentation</a>
                    </div>
                    <div style={styles.linkGroup}>
                        <h4 style={styles.linkTitle}>Company</h4>
                        <a href="#" style={styles.link}>Ethics</a>
                        <a href="#" style={styles.link}>Team</a>
                    </div>
                </div>
            </div>

            {/* 4. Bottom Bar */}
            <div style={styles.bottomBar}>
                <p style={styles.copyright}>© 2026 Synaptix Healthcare.</p>
                <div style={styles.socials}>
                    <span style={styles.socialItem}>LI</span>
                    <span style={styles.socialItem}>TW</span>
                    <span style={styles.socialItem}>GH</span>
                </div>
            </div>

            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&family=Zen+Dots&display=swap');
                
  .zen-dots-regular {
  font-family: "Zen Dots", sans-serif;
  font-weight: 400;
  font-style: normal;
}`}
            </style>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#0a0a0a',
        color: '#fff',
        padding: '60px 40px 30px 40px',
        width: '100%',
        boxSizing: 'border-box',
        borderTop: '1px solid rgba(255,255,255,0.05)',
    },
    mainGrid: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    infoCol: {
        flex: '1',
        minWidth: '200px',
    },
    logo: {
        fontFamily: '"Zen Dots", sans-serif',
        fontSize: '1.2rem',
        color: '#23a559',
        margin: '0 0 10px 0',
    },
    tagline: {
        opacity: 0.5,
        fontSize: '0.85rem',
        lineHeight: '1.4',
    },
    spiritCol: {
        flex: '1.5',
        textAlign: 'center',
        minWidth: '250px',
    },
    spiritText: {
        fontSize: '2.5rem', 
        margin: 0,
        textTransform: 'uppercase',
        opacity: 0.8,
        lineHeight: '0.9',
        letterSpacing: '-1px',
    },
    linksWrapper: {
        display: 'flex',
        gap: '40px',
        flex: '1',
        justifyContent: 'flex-end',
        minWidth: '200px',
    },
    linkGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    linkTitle: {
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        opacity: 0.3,
        marginBottom: '5px',
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        fontSize: '0.85rem',
        opacity: 0.7,
    },
    bottomBar: {
        marginTop: '60px',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.4,
        fontSize: '0.75rem',
    },
    socials: {
        display: 'flex',
        gap: '15px',
    },
    socialItem: {
        cursor: 'pointer',
    }
};

export default Footer;
