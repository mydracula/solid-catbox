import { Title } from "solid-start";
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import ImageEditor from '@uppy/image-editor';
import DropTarget from '@uppy/drop-target';
import RemoteSources from '@uppy/remote-sources';
import Chinese from '@uppy/locales/lib/zh_CN';
import XHR from '@uppy/xhr-upload';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import { onMount } from "solid-js";


export default function Home() {

  onMount(() => {
    const uppy = new Uppy({
      locale: Chinese,
    });
    uppy.setMeta({ reqtype: 'fileupload', userhash: '' })
    uppy.use(Dashboard, { inline: true, target: '#uppy-dashboard', proudlyDisplayPoweredByUppy: false, width: '100%', height: '100%', showProgressDetails: true })
      .use(XHR, { endpoint: '/api/upload', fieldName: 'fileToUpload', allowedMetaFields: ['reqtype', 'userhash'] })
      .use(RemoteSources, {
        companionUrl: 'https://your-companion-url',
        sources: [
          "Url",
          "Unsplash"
        ],
        // companionAllowedHosts
      })
      .use(ImageEditor, { target: Dashboard })
      .use(DropTarget, {
        target: document.body,
      })
  })

  return (
    <main>
      <Title>catBox</Title>
      <section class="wrap" id="uppy-dashboard">

      </section>
    </main>
  );
}
