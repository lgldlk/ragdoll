/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-08 15:26:09
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-08 15:40:30
 */
export function base64Img2Blob(code: string) {
  var parts = code.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}
export function downloadFile(fileName: string, content: string) {

  var aLink = document.createElement('a');
  var blob = base64Img2Blob(content); //new Blob([content]);

  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);

  // aLink.dispatchEvent(evt);
}

export function exportCanvasAsPNG(fileName: string, imgURL: string) {


  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [dlLink.download, dlLink.href].join(':');

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}