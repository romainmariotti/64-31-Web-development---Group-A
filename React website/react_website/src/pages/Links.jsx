import React from "react";

function LinksPage({ data }) {
  const linksData = data.find((page) => page.slug === "links");

  const openGame = () => {
    window.open("/Game/Start/start.html", "_blank");
  };

  if (!linksData) {
    return <p>Links data not found.</p>;
  }

  return (
    <div>
      <h2>{linksData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: linksData.content.rendered }} />
      <button onClick={openGame} className="playGame"></button>
    </div>
  );
}

export default LinksPage;
