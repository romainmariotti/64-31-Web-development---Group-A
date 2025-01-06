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
          <button onClick={openGame} className="playGame">Play Jet fighter</button>
          <div className={"linkFooter"}>
              <div dangerouslySetInnerHTML={{__html: linksData.content.rendered}}/>
          </div>

      </div>
  );
}

export default LinksPage;
