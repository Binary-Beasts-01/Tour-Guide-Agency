const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));
addGuide(id);

async function addGuideDetail(id) {
  const guideResult = async () => {
    const guide = await retrieve('guides', id);
    Array.from(document.querySelectorAll('.guideDetail_name')).forEach(
      (item) => {
        item.innerHTML = guide.username;
      }
    );
  };
  return guideResult();
}
