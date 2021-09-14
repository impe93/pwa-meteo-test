import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register({
  onUpdate: ({ waiting }) => {
    if (waiting) {
      waiting.postMessage({ type: "SKIP_WAITING" });

      waiting.addEventListener("statechange", (e) => {
        if ((e.target as ServiceWorker).state === "activated") {
          /**
           * Here the app is ready to reaload and use the new Service Worker (new app version)
           *
           * When this happen, it's common to show something to inform the user and let him reload it if he want
           */

          window.location.reload();
        }
      });
    }
  },
});

reportWebVitals();
