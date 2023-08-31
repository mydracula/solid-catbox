import { APIEvent, json } from "solid-start/api";

export async function POST(context) {
  const body = await context.request.formData()
  const data = await (await fetch(`https://tuphp.hicks.workers.dev/`,
    {
      method: "POST",
      body
    }
  )).text()

  return json(data)
}

