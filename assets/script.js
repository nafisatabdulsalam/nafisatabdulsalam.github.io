/* =====================================================================
   EDIT YOUR LINKS HERE. Paste the full URL between the quotation marks.
   Empty URLs are deliberately hidden instead of sending visitors nowhere.
   This file only adds photos/social links and the gallery lightbox;
   navigation, content and scrolling all work without JavaScript.
   ===================================================================== */
const socialLinks = {
  linkedin: '', // Example format: https://www.linkedin.com/in/your-username/
  github: ''    // Example format: https://github.com/your-username
};

document.querySelectorAll('[data-social]').forEach(link => {
  const url = socialLinks[link.dataset.social];
  if (url && /^https:\/\//.test(url)) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.hidden = false;
  }
});

/* Load real photos only when available. Missing files leave the clearly
   labelled empty state intact, so there are no broken-image icons.
   To add a photo, use the file path named by data-photo in the HTML. */
const dialog = document.querySelector('#photo-dialog');
document.querySelectorAll('[data-photo]').forEach(container => {
  const photo = new Image();
  photo.alt = container.dataset.alt || '';
  photo.onload = () => {
    container.replaceChildren(photo);
    if (container.matches('button')) {
      container.disabled = false;
      container.addEventListener('click', () => {
        if (!dialog) return;
        const enlarged = dialog.querySelector('img');
        enlarged.src = photo.src;
        enlarged.alt = photo.alt;
        dialog.querySelector('p').textContent = photo.alt;
        dialog.showModal(); // Native dialog traps focus and supports Escape.
      });
      if (document.querySelectorAll('.gallery-photo:disabled').length === 0) {
        document.querySelector('.gallery-note')?.remove();
      }
    }
  };
  photo.onerror = () => { /* Keep the accessible, labelled photo space. */ };
  photo.src = container.dataset.photo;
});
if (dialog) {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    // Click outside the content to close. Clicks on the photograph stay open.
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}

/* PUBLICATION LINKS: paste verified URLs here. Leave an unavailable resource
   blank; its label remains visible but is not a broken or misleading link. */
const publicationLinks = {
  'beyond-dice': { paper: '', code: '' },
  'mri-capacity': { paper: '', code: '' },
  'physician': { paper: '', code: '' }
};
document.querySelectorAll('[data-publication]').forEach(link => {
  const url = publicationLinks[link.dataset.publication]?.[link.dataset.resource];
  if (url && /^https:\/\//.test(url)) {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.removeAttribute('aria-disabled');
    link.removeAttribute('title');
  }
});
