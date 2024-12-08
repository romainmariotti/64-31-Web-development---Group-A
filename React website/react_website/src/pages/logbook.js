import React from "react";

function LogbookPage({ data }) {
  const logbookData = data.find((page) => page.slug === "logbook");

  if (!logbookData) {
    return <p>Logbook data not found.</p>;
  }

  return (
    <div>
      <h1>{logbookData.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: logbookData.content.rendered }} />
    </div>
  );
}

export default LogbookPage;
