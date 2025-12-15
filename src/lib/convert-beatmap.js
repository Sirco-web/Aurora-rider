module.exports = function convertBeatmap (src) {
  if (src.converted) return src;

  if (src['map']) { src = src['map']; }

  src['version'] = src['versions'][0]['hash'];

  // CORS proxy only for cover images
  const coverImageCorsProxy = 'https://corsproxy.io/?url=';
  const originalCoverURL = src['versions'][0]['coverURL'];

  src['directDownload'] = src['versions'][0]['downloadURL'];

  // Use CORS proxy for cover image only
  src['coverURL'] = coverImageCorsProxy + encodeURIComponent(originalCoverURL);

  let diffs = src['versions'][0]['diffs'];

  src.metadata.characteristics = {};

  for (const item of diffs) {

    if (src.metadata.characteristics[item['characteristic']] === undefined) {
      src.metadata.characteristics[item['characteristic']] = {};
    }

    src.metadata.characteristics[item['characteristic']][item['difficulty']] = item;
  }
  src.metadata.characteristics = JSON.stringify(src.metadata.characteristics);

  src.converted = true;

  return src;
};
