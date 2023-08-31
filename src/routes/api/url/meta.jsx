import { json } from "solid-start/api";


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

// const getQueryString = (url, name) => decodeuRIComponent((new RegEx('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exex(url) || [, ''])[1].replace(/\+/g, '%20')) || null


export async function POST(context) {
    const body = await context.request.json()
    const file = await (await fetch(body.url)).blob()
    const size = file.size;
    const type = file.type;
    const name = body.url.substring(body.url.lastIndexOf('/') + 1)

    return json({ size, type, name })
}

