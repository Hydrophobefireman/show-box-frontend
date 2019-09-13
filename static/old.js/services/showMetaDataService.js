import { Requests, getIntegrity } from "./httpService.js";
export const getShowMetaData = async id => {
  const token = await getIntegrity();
  const req = await Requests.post(
    "/api/get-show-metadata/",
    true,
    {
      token,
      id
    },
    { "content-type": "application/json" }
  );
  const data = await req.json();
  return data;
};

export const getEpisodeMetaData = async (mid, eid) => {
  const nonce = await getIntegrity();
  const req = await Requests.post(
    "/api/build-player/ep/",
    true,
    {
      nonce,
      eid,
      mid
    },
    { "content-type": "application/json" }
  );
  return await req.json();
};
