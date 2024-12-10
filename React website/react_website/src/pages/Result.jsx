import React from "react";

function ResultPage({ data }) {
  const resultData = data.find((page) => page.slug === "result");

  if (!resultData) {
    return <p>Result data not found.</p>;
  }

  return (
    <div>
      <h2>{resultData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: resultData.content.rendered }} />
    </div>
  );
}

export default ResultPage;
