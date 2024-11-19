import React from "react";

function Layout({ children, className }) {
  return (
    <div className={`min-h-screen container mx-auto ${className}`}>
      {children}
    </div>
  );
}

export default Layout;
