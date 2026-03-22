// https://docs.astro.build/en/guides/endpoints/
export const prerender = false

import base64url from "base64url"
import { createHmac } from "crypto"

const { PROD } = import.meta.env
const { OME_HOST = "", OME_SECRET_KEY = "", PROXY_HOST = OME_HOST } = process.env

export async function GET({ params }: any) {
  const { app = "live", stream = "stream", playlist = "default" } = params

  // https://docs.ovenmediaengine.com/access-control/signedpolicy
  // https://github.com/OvenMediaLabs/OvenMediaEngine/blob/master/misc/signed_policy_url_generator.js
  const expire = Date.now() + 24 * 60 * 60 * 1000 // Now + 24 hours
  const policy = base64url(Buffer.from(`{"url_expire": ${expire}}`)) // Common base64-encoded policy JSON
  const webrtcUrl = `ws://${OME_HOST}/${app}/${stream}/${playlist}?policy=${policy}` // WebRTC policy URL
  const llhlsUrl = `http://${OME_HOST}/${app}/${stream}/${playlist}.m3u8?policy=${policy}` // LLHLS policy URL
  const webrtcSignature = base64url(createHmac("sha1", OME_SECRET_KEY).update(webrtcUrl).digest()) // WebRTC base64-encoded HMAC
  const llhlsSignature = base64url(createHmac("sha1", OME_SECRET_KEY).update(llhlsUrl).digest()) // LLHLS base64-encoded HMAC
  const signedWebrtcUrl = `${webrtcUrl}&signature=${webrtcSignature}` // WebRTC signed URL
  const signedLlhlsUrl = `${llhlsUrl}&signature=${llhlsSignature}` // LLHLS signed URL

  // Support TLS reverse proxy upstream (requires Host header rewrite in proxy)
  // https://github.com/OvenMediaLabs/OvenMediaEngine/issues/448#issuecomment-885447613
  const finalWebrtcUrl =
    OME_HOST == PROXY_HOST ? signedWebrtcUrl : signedWebrtcUrl.replace(`ws://${OME_HOST}`, `wss://${PROXY_HOST}`)
  const finalLlhlsUrl =
    OME_HOST == PROXY_HOST ? signedLlhlsUrl : signedLlhlsUrl.replace(`http://${OME_HOST}`, `https://${PROXY_HOST}`)

  const response = JSON.stringify({
    webrtc_url: finalWebrtcUrl,
    llhls_url: finalLlhlsUrl,
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
