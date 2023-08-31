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
    const { url } = body
    const file = await (await fetch(url)).blob()

    const formData = new FormData();
    formData.append('fileToUpload', file);
    formData.append('reqtype', 'fileupload');
    formData.append('userhash', '');

    const data = await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: formData
    }).text();

    return json(data)
}

