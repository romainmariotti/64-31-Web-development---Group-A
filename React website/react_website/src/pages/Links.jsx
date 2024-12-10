import React from "react";

function LinksPage({ data }) {
  const linksData = data.find((page) => page.slug === "links");

  if (!linksData) {
    return <p>Links data not found.</p>;
  }

  return (
    <div>
      <h2>{linksData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: linksData.content.rendered }} />
    </div>
  );
}

export default LinksPage;
