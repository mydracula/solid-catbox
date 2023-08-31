import { Title } from "solid-start";
import Clipboard from 'clipboard';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard'
import Informer from '@uppy/informer';
import ImageEditor from '@uppy/image-editor';
import DropTarget from '@uppy/drop-target';
import RemoteSources from '@uppy/remote-sources';
import Chinese from '@uppy/locales/lib/zh_CN';
import XHR from '@uppy/xhr-upload';
import ScreenCapture from '@uppy/screen-capture';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import '@uppy/screen-capture/dist/style.min.css';
import { onMount } from "solid-js";


export default function Home() {
  onMount(() => {
    const uppy = new Uppy({
      locale: Chinese,
      allowMultipleUploadBatches: true,
    });
    uppy.setMeta({ reqtype: 'fileupload', userhash: '' })
    uppy.use(Dashboard, { inline: true, target: '#uppy-dashboard', proudlyDisplayPoweredByUppy: false, width: '100%', height: '100%', showProgressDetails: true })
      .use(XHR, { endpoint: '/api/upload', fieldName: 'fileToUpload', allowedMetaFields: ['reqtype', 'userhash'] })
      .use(ScreenCapture, { target: Dashboard })
      .use(RemoteSources, {
        companionUrl: location.href + 'api',
        sources: [
          "Url",
        ],
      })
      // .use(Informer, { target: '#informer' })
      .use(ImageEditor, { target: Dashboard })
      .use(DropTarget, {
        target: document.body,
      })
    uppy.on('upload-success', (file, response) => {
      console.log(file, response);
      const files = uppy.getFiles();
      for (const file of files) {
        const { id, response: { status, body } } = file
        if (status == 200) {
          const el = document.getElementById(`${id.replace('-', '_uppy-')}`)
          new Clipboard(el);
          el.setAttribute("data-clipboard-text", body);
          // el.addEventListener("click", () => {
          //   console.log(el);
          // });
        }
      }
    })

    uppy.on('complete', (result) => {
      console.log('Upload complete! We’ve uploaded these files:', result.successful)
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
