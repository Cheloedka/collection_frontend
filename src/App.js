import React from "react";
import NavigationBar from "./components/Navbar/NavigationBar";
import MainRouter from "./routes/MainRouter"
import Container from 'react-bootstrap/Container';
import './styles/App.css'
import './styles/Scrollbar.css'
import AuthContextProvider from "./context/AuthContextProvider";
import UserContextProvider from "./context/UserContextProvider";

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
