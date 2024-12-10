import React from "react";

function DetailedDescriptionPage({ data }) {
  const DetailedDescriptionData = data.find(
    (page) => page.slug === "detailed-game-description"
  );

  if (!DetailedDescriptionData) {
    return <p>Detailed description data not found.</p>;
  }

  return (
    <div>
      <h2>{DetailedDescriptionData.title.rendered}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: DetailedDescriptionData.content.rendered,
        }}
      />
    </div>
  );
}

export default DetailedDescriptionPage;
