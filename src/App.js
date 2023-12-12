import NavigationBar from "./components/Navbar/NavigationBar";
import MainRouter from "./routes/MainRouter"
import Container from 'react-bootstrap/Container';
import AuthContextProvider from "./context/AuthContextProvider";
import UserContextProvider from "./context/UserContextProvider";
import './styles/App.css'
import './styles/Scrollbar.css'

function App() {


  return (
      <div className="App">
          <AuthContextProvider>
              <UserContextProvider>
                  <NavigationBar/>
                  <Container>
                      <MainRouter/>
                  </Container>
              </UserContextProvider>
          </AuthContextProvider>
      </div>
  );
}

export default App;
