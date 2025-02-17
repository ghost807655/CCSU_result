"use client";

import { useState, useEffect } from "react";

export default function TurnstileWrapper({ children }) {
  const [verified, setVerified] = useState(false);
  const [vrd, setVrd] = useState(false);

  useEffect(() => {
    window.onloadTurnstileCallback = function () {
      turnstile.render("#turnstile-widget", {
        sitekey: "0x4AAAAAAA8_sBfp01Q3qbrU",
        callback: function (token) {
          console.log(`challenge success ${token}`);
          setVrd(true)
          setTimeout(() => {
            setVerified(true);
          }, 1500);
        },
      });
    };
  }, []);

  return (
    <>
      {!verified ? (<>
        <title>Just a moment...</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="refresh" content="390" />
        <link rel="stylesheet" href="/Content/css/hmvr.css" />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" defer></script>

        <div className="main-wrapper" role="main">
          <div className="main-content">
            <h1 className="zone-name-title h1"><img src="/favicon.ico" className="heading-favicon"
              alt="Icon for result.ccsuniversityweb.in" />result.ccsuniversityweb.in</h1>

            <div id="tWuBw3" style={{ display: "inline", visibility: "visible" }}>
              {vrd?
              <div id="challenge-success-text" className="h2">Verification successful</div>:
              <div id="turnstile-widget"></div>
            }
              <div className="core-msg spacer">Waiting for result.ccsuniversityweb.in to respond...</div>
            </div>


          </div>
        </div>

        <div className="footer" role="contentinfo">
          <div className="footer-inner">
            <div className="clearfix diagnostic-wrapper">
              <div className="ray-id">Ray ID: <code>91333460dbb36419</code></div>
            </div>
            <div className="text-center" id="footer-text">Performance &amp; security by <a rel="noopener noreferrer"
              href="https://www.cloudflare.com?utm_source=challenge&amp;utm_campaign=m"
              target="_blank">Cloudflare</a></div>
          </div>
        </div>
      </>
      ) : (
        children
      )}
    </>
  );
}
