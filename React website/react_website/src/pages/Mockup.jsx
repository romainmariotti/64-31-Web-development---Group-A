import React from "react";

function MockupPage({ data }) {
  // Filter the data to find the page with the "mockup" slug
  const mockupData = data.find((page) => page.slug === "mockup");

  if (!mockupData) {
    return <div>Mockup page not found</div>;
  }

  return (
    <div>
      <h2>{mockupData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: mockupData.content.rendered }} />
    </div>
  );
}

export default MockupPage;
