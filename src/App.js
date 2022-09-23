import Header from './components/Header/Header';
import './App.scss';
import PagesComposing from './pages/PagesComposing';

function App() {
  return (
    <div className='mainContainer'>
      <Header />
      <PagesComposing />
    </div>
  );
}

export default App;
