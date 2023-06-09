export default function humanFileSize(size) {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B/s", "kB/s", "MB/s", "GB/s", "TB/s"][i]
  );
}
