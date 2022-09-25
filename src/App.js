import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import PagesComposing from './pages/PagesComposing';

function App() {
  return (
    <>
      <Header />
      <div className='mainContainer'>
        <PagesComposing />
      </div>
      <Footer />
    </>
  );
}

export default App;
