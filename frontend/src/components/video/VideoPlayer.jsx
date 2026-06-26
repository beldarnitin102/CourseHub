export default function VideoPlayer({ selectedLecture }) {
  if (!selectedLecture) return <h2>No lecture selected</h2>;
  console.log("Selected Lecture:", selectedLecture);
console.log("Video URL:", selectedLecture?.videoUrl);

  return (
    <div>

      
      <h3>{selectedLecture.title}</h3>

      <p>{selectedLecture.videoUrl}</p>

      <iframe
        width="800"
        height="500"
        src={selectedLecture.videoUrl}
      />
    </div>
  );
}