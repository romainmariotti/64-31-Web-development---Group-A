import React, { useRef } from "react";

function ResultPage({ data }) {
  const resultData = data.find((page) => page.slug === "result");
  const videoRef = useRef(null); // Reference to the video element

  if (!resultData) {
    return <p>Result data not found.</p>;
  }

  /* Restart video through a button */
  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div>
      <h2>{resultData.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: resultData.content.rendered }} />

      {/* Video Section */}
      <div>
        <video
          ref={videoRef}
          controls
          width="600"
          src="/test.mp4"
          type="video/mp4"
        />
        <div>
          <button onClick={restartVideo}>Restart video</button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
