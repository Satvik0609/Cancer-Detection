import Navbar from '../components/Navbar.jsx';
import Hero from '../components/hero.jsx';
import ProjectInfo from '../components/ProjectInfo.jsx';
import Blocks from '../components/blocks.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-checkpoint-bg text-slate-50">
      <Navbar variant="landing" />
      <main className="flex flex-col">
        <Hero />
        <ProjectInfo />
        <Blocks />
      </main>
    </div>
  );
};

export default Home;