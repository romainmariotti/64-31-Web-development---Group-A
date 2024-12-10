import React from "react";

function FlowPage({ data }) {
  const flowData = data.find((page) => page.slug === "flow");

  if (!flowData) {
    return <p>Flow data not found.</p>;
  }

  return (
    <div>
      <h2>{flowData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: flowData.content.rendered }} />
    </div>
  );
}

export default FlowPage;
