import Navbar from '../components/Navbar.jsx';
import StageCheckpoint from '../components/StageCheckpoint.jsx';

const CheckPoint = () => {
  return (
    <div className="min-h-screen bg-black text-slate-50">
      <Navbar variant="checkpoint" />
      <main className="flex flex-col">
        <StageCheckpoint />
      </main>
    </div>
  );
};

export default CheckPoint;