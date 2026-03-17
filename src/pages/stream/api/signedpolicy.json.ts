// https://docs.astro.build/en/guides/endpoints/
export const prerender = false

import base64url from "base64url"
import { createHmac } from "crypto"

const { PROD, OME_HOST, OME_SECRET_KEY } = import.meta.env

export async function GET({ params }: any) {
  if (!OME_HOST || !OME_SECRET_KEY)
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    })

  const { host = "origin", app = "live", stream = "stream", playlist = "default" } = params

  // https://docs.ovenmediaengine.com/access-control/signedpolicy
  // https://github.com/OvenMediaLabs/OvenMediaEngine/blob/master/misc/signed_policy_url_generator.js
  const expire = Date.now() + 24 * 60 * 60 * 1000 // Now + 24 hours
  const policy = base64url(Buffer.from(`{"url_expire": ${expire}}`))
  const webrtcUrl = `ws${PROD ? "s" : ""}://${OME_HOST}/${app}/${stream}/${playlist}?policy=${policy}`
  const llhlsUrl = `http${PROD ? "s" : ""}://${OME_HOST}/${app}/${stream}/${playlist}.m3u8?policy=${policy}`
  const webrtcSignature = base64url(createHmac("sha1", OME_SECRET_KEY).update(webrtcUrl).digest())
  const llhlsSignature = base64url(createHmac("sha1", OME_SECRET_KEY).update(llhlsUrl).digest())
  const signedWebrtcUrl = `${webrtcUrl}&signature=${webrtcSignature}`
  const signedLlhlsUrl = `${llhlsUrl}&signature=${llhlsSignature}`

  const response = JSON.stringify({
    webrtc_url: signedWebrtcUrl,
    llhls_url: signedLlhlsUrl,
    // expires: expire,
  })

  // console.log(
  //   `Generated signed policy URLs for \`${stream}\` that expires in ${(expire - Date.now()) / 1000 / 60} minutes`,
  // )

  return new Response(response, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}
