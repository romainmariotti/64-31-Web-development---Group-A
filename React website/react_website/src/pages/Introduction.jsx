import React from "react";

function IntroductionPage({ data }) {
  const introductionData = data.find(
    (page) => page.slug === "game-description"
  );

  if (!introductionData) {
    return <p>Introduction data not found.</p>;
  }

  // Parse the HTML content into a DOM structure
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    introductionData.content.rendered,
    "text/html"
  );

  // Find the first div and convert it to an <aside>
  const firstDiv = doc.querySelector("div");
  if (firstDiv) {
    const aside = doc.createElement("aside");
    aside.innerHTML = firstDiv.innerHTML;

    // Replace the first div with the <aside>
    firstDiv.replaceWith(aside);

    // Move the second child div outside the aside
    const secondChild = aside.children[1];
    if (secondChild) {
      aside.parentElement.insertBefore(secondChild, aside.nextSibling);
    }
  }

  // Make the updated content an HTML string
  const updatedContent = doc.body.innerHTML;

  return (
    <div className="container">
      <h2>{introductionData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: updatedContent }} />
    </div>
  );
}

export default IntroductionPage;
