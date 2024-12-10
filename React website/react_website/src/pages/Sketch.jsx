import React from "react";

function SketchPage({ data }) {
  // Filter the data to find the page with the "sketch" slug
  const sketchData = data.find((page) => page.slug === "sketch");

  if (!sketchData) {
    return <div>Mockup page not found</div>;
  }

  return (
    <div>
      <h2>{sketchData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: sketchData.content.rendered }} />
    </div>
  );
}

export default SketchPage;
