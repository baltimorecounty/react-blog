import { Config } from "@baltimorecounty/javascript-utilities";

const { setConfig, getValue } = Config;

const apiPath = "api/structured-content/blog";
const testApiRoot = `https://testservices.bcpl.info/${apiPath}`;
const prodApiRoot = `https://services.bcpl.info/${apiPath}`;

/**
 * Run Startup Code
 */
const Run = () => {
  // HACK - the Config utiltiy does not account for beta.
  // TODO: This will need to be addressed when we get closer to launch
  const localApiRoot =
    window.location.hostname.indexOf("beta") > -1
      ? testApiRoot
      : `//localhost:54727/${apiPath}`;

  const configValues = {
    local: {
      apiRoot: localApiRoot,
    },
    development: {
      apiRoot: testApiRoot,
    },
    staging: {
      apiRoot: testApiRoot,
    },
    production: {
      apiRoot: prodApiRoot,
    },
  };

  setConfig(configValues);
};

export { Run, getValue };
