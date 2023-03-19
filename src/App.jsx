import './App.css'
import { Navbar } from './components/Navbar'
import { TransactionsContext } from './context/TransactionsContext'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <div>
      <Navbar />
      <TransactionsContext />
    </div>
  )
}

export default App
