import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { IHandler } from "../../../../domain/handlers/IHandler";

type Props = {
  handler: IHandler;
  handlerData?: any;
  onComplete: (data: any) => void;
  onErrored: (error: Error) => void;
  failureMessage?: string;
  canRetry: boolean;
};

export const Loader = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (isLoading) {
        try {
          props.onComplete(await props.handler.runAsync(props.handlerData));
          setIsLoading(false);
        } catch (error: any) {
          props.onErrored(error);
          setIsLoading(false);
          setIsErrored(true);
        }
      }
    };

    run();
  }, [isLoading, props]);

  const retry = () => {
    setIsLoading(true);
    setIsErrored(false);
  };

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden" data-testid="loading">
            Loading...
          </span>
        </Spinner>
      )}

      {isErrored && (
        <div>
          {props.failureMessage ? props.failureMessage : <span>"Error loading data"</span>}
          {props.canRetry && (
            <Button className="mb-3" variant="secondary" onClick={() => retry()} data-testid="retryButton">
              Retry
            </Button>
          )}
        </div>
      )}
    </>
  );
};
