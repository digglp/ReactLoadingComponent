import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { CharacterListHandler } from "../../../domain/handlers/RickAndMortyHandlers/CharacterListHandler";
import { Character } from "../../../domain/models/Character";
import { CharacterListRequest } from "../../../domain/models/CharacterListRequest";
import { RickAndMortyCharacterRepository } from "../../../infrastructure/repositories/rickandmortyrepository/RickAndMortyCharacterRepository";
import { useHelper } from "../../hooks/useHelper";
import { Loader } from "../utilities/loader/Loader";

export const CharacterList = () => {
  const helper = useHelper();
  const [loading, setLoading] = useState(true);
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const characterListHandler = new CharacterListHandler(new RickAndMortyCharacterRepository(helper.getEnvironment()));

  const onLoadingComplete = (data: any) => {
    // processDepots(data);
    console.log("Data loaded: ", data);
    setCharacterData(data);
    setLoading(false);
  };
  const onLoadingErrored = (error: Error) => {
    console.log(error.message);
  };

  useEffect(() => {
    setLoading(true);
  }, [pageNumber]);

  return (
    <>
      <Card>
        <Card.Header>Character loader with 5 second delay</Card.Header>
        <Card.Body>
          {loading && (
            <Loader
              handler={characterListHandler}
              handlerData={new CharacterListRequest(5000, pageNumber)}
              onComplete={onLoadingComplete}
              onErrored={onLoadingErrored}
              failureMessage="Error loading character data"
              canRetry={true}
            />
          )}
          {!loading && characterData && (
            <>
              <Button className="me-3" onClick={() => setPageNumber(pageNumber > 0 ? pageNumber - 1 : pageNumber)}>
                Load previous page
              </Button>
              <Button onClick={() => setPageNumber(pageNumber + 1)}>Load next page</Button>
              <h3>Character Data Loaded</h3>
              <ul>
                {characterData.map((character) => (
                  <li key={character.id}>
                    {character.name} - {character.location.url}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
