/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-08 15:26:09
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-09 09:27:40
 */
import { ElMessage } from 'element-plus';
export function exportCanvasAsPNG(fileName: string, imgURL: string) {


  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [dlLink.download, dlLink.href].join(':');

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}
export function saveThreeCanvasFile(canvas: HTMLCanvasElement | undefined, fileName: string) {
  if (!canvas) {
    ElMessage({ type: "error", message: "您好保存图片失败请刷新后重试~" })
    return;
  }
  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = canvas.toDataURL("image/jpeg");
  dlLink.dataset.downloadurl = [dlLink.download, dlLink.href].join(':');
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}