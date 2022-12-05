function extractVideoInformationFromYouTubeUrl(domain, url) {
  if (domain === "youtu") {
    const parts = url.split(".be/");
    if (parts.length >= 2) {
      return parts[1];
    }
    return null;
  }

  const parts = url.split("?");
  if (parts.length < 2) {
    return null;
  }

  const queryParams = parts[1];
  const params = queryParams.split("&");
  for (const pair of params) {
    const tuple = pair.split("=");
    if (tuple[0] === "v") {
      const youtubeVideoId = tuple[1];
      if (!youtubeVideoId || youtubeVideoId.length !== 11) {
        // youtube IDs are 11 characters long
        return null;
      }
      return youtubeVideoId;
    }
  }

  return null;
}

function getDomain(url) {
  if (!url) {
    return null;
  }
  let domain = url.replace(/.+\/\/|www.|\..+/g, "");

  if (!domain) {
    return null;
  }

  return domain.toLowerCase();
}

/*
  Cases:
    1. https://youtu.be/dr0tzAZ4MMo
    2. https://www.youtube.com/watch?v=dr0tzAZ4MMo
*/
function extractVideoInformation(url) {
  if (!url) {
    return null;
  }

  const domain = getDomain(url);

  if (!domain) {
    return null;
  }

  let id;
  switch (domain.toLowerCase()) {
    case "youtube":
    case "youtu":
      id = extractVideoInformationFromYouTubeUrl(domain, url);
      break;
    default:
      id = null;
      break;
  }

  if (!id) {
    return null;
  }

  let source;
  switch (domain.toLowerCase()) {
    case "youtube":
    case "youtu":
      source = "YOUTUBE";
      break;
    default:
      source = null;
      break;
  }

  if (!source) {
    return null;
  }

  return {
    source,
    id,
  };
}

export { extractVideoInformation };
