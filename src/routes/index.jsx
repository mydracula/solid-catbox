import { Title } from "solid-start";
import Clipboard from 'clipboard';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard'
import ImageEditor from '@uppy/image-editor';
import DropTarget from '@uppy/drop-target';
// import RemoteSources from '@uppy/remote-sources';
// import Url from '@uppy/url'
import Chinese from '../utils/zh_cn.js';
import XHR from '@uppy/xhr-upload';
import ScreenCapture from '@uppy/screen-capture';
import Webcam from '@uppy/webcam';
import Audio from '@uppy/audio';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import '@uppy/screen-capture/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/audio/dist/style.min.css';
import { onMount } from "solid-js";


export default function Home() {
  onMount(() => {
    console.log(Chinese);
    const uppy = new Uppy({
      locale: Chinese,
      allowMultipleUploadBatches: true,
      onBeforeFileAdded: (currentFile) => {
        const isCorrectExtension = ['exe', 'scr', 'cpl', 'doc', 'jar'].includes(currentFile.extension)
        if (isCorrectExtension) {
          uppy.info(uppy.i18n('youCanNotOnlyUploadFileTypes', { types: '.exe、.scr、.cpl、.doc*、.jar' }), 'error', 5000)

          return false
        } else {
          return true
        }
      }
    });
    uppy.setMeta({ reqtype: 'fileupload', userhash: '' })
    uppy.use(Dashboard, { showLinkToFileUploadResult: true, inline: true, target: '#uppy-dashboard', proudlyDisplayPoweredByUppy: false, width: '100%', height: '100%', showProgressDetails: true })
      .use(XHR, { endpoint: '/dev', fieldName: 'fileToUpload', allowedMetaFields: ['reqtype', 'userhash'] })
      .use(ScreenCapture, { target: Dashboard, preferredVideoMimeType: 'video/mp4' })
      .use(Webcam, { target: Dashboard, preferredVideoMimeType: 'video/mp4', preferredImageMimeType: 'image/png', preferredVideoMimeType: 'video/mp4' })
      .use(Audio, { target: Dashboard })
      // .use(Url, { target: Dashboard, companionUrl: location.href + 'api' })
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
          el.setAttribute("data-clipboard-text", body.url);
        }
      }
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
