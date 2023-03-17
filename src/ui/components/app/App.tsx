import { Container } from "react-bootstrap";
import { CharacterList } from "../characters/CharacterList";

import "./App.css";

function App() {
  return (
    <>
      <Container>
        <h1>Rick and Morty Character Loader Example</h1>

        <CharacterList />
      </Container>
    </>
  );
}

export default App;
