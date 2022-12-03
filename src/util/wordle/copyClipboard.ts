const copyClipboard = (
  text: string,
  successCallback: () => void,
  failCallback: () => void
) => {
  navigator.clipboard.writeText(text).then(successCallback, () => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      successCallback();
    } catch (error) {
      failCallback();
    }
  });
};

export { copyClipboard };
