const showmodal = document.getElementById('show');
const modalEl = document.getElementById('modal');
const addbookmark = document.getElementById('modal-add');
const closemodal = document.getElementById('close-modal');


// Event listeners
addbookmark.addEventListener('click', () => showmodal.classList.add('show-modal'));
closemodal.addEventListener('click', () => showmodal.classList.remove('show-modal'));
window.addEventListener('click', (e) => e.target === show ? showmodal.classList.remove('show-modal') : false)
