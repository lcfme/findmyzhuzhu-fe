import React, { Component, Suspense } from "react";

function createAsync(Fallback) {
  return fallbackProps => LazydComponent => componentProps => (
    <Suspense fallback={<Fallback {...fallbackProps} />}>
      <LazydComponent {...componentProps} />
    </Suspense>
  );
}

function DefaultFallback() {
  return (
    <div className="fullscreen">
      <div className="loading-center">
        <div className="loading-img"></div>
      </div>
    </div>
  );
}

export { createAsync };
export const WidthDefaultFallback = createAsync(DefaultFallback)({});
