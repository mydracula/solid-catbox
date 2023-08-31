import { APIEvent, json } from "solid-start/api";



export const config = {
  runtime: "edge",
  regions: [
    "hkg1",
    "sin1",
    "kix1",
    "icn1",
    "bom1",
    "hnd1",
    "arn1",
    "bru1",
    "cdg1",
    "cle1",
    "cpt1a",
    "dub1",
    "fra1",
    "gru1",
    "iad1",
    "lhr1",
    "pdx1",
    "sfo1",
    "syd1"
  ]
}


export async function POST(context) {
  const body = await context.request.formData()
  const data = await (await fetch(`https://tuphp.hicks.workers.dev/`,
    {
      method: "POST",
      body
    }
  )).text()
  return json({ url: data.replace('https://files.catbox.moe', 'https://catbox.reliedema.icu/i') })
  // return json({
  //   "url": "https://ik.imagekit.io/pshbwfiho/404_Xust2Ss2O.png",
  // })
}

