export const useHelper = () => {
  const getEnvironment = () => {
    const environment = process.env.REACT_APP_ENVVIRONMENT;

    if (!environment) {
      throw new Error("Environment is not defined");
    }

    return environment;
  };

  return { getEnvironment };
};
