import React from "react";

function FlowPage({ data }) {
  const flowData = data.find((page) => page.slug === "flow");

  if (!flowData) {
    return <p>Flow data not found.</p>;
  }

  return (
    <div>
      <h1>{flowData.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: flowData.content.rendered }} />
    </div>
  );
}

export default FlowPage;
