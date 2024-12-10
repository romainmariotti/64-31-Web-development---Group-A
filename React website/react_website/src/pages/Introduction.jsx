import React from "react";

function IntroductionPage({ data }) {
  const introductionData = data.find(
    (page) => page.slug === "game-description"
  );

  if (!introductionData) {
    return <p>Introduction data not found.</p>;
  }

  //Update the fetched data, by changing the first <div> into an <aside>, in order to make the Group data sheet easily accessible
  const updatedContent = introductionData.content.rendered.replace(
    /<div[^>]*>/,
    "<aside>"
  );

  return (
    <div className="container">
      <h2>{introductionData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: updatedContent }} />
    </div>
  );
}

export default IntroductionPage;
