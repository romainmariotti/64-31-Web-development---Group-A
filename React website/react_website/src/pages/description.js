import React from "react";

function DescriptionPage({ data }) {
  const descriptionData = data.find((page) => page.slug === "game-description");

  if (!descriptionData) {
    return <p>Description data not found.</p>;
  }

  return (
    <div>
      <h1>{descriptionData.title.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: descriptionData.content.rendered }}
      />
    </div>
  );
}

export default DescriptionPage;
