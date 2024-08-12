function get_path(){
    eel.get_path()(loadThumbnails)
}
async function loadThumbnails() {
    let thumbnails = await eel.get_thumbnails()();
    let container = document.getElementById('thumbnails');
    container.innerHTML = '';
    thumbnails.forEach((thumb, index) => {
        if (thumb) {
            let img = document.createElement('img');
            img.src = thumb;
            img.className = 'thumbnail';
            img.dataset.index = index;
            img.onclick = () => toggleSelection(img);
            container.appendChild(img);
        }
    });
}

function toggleSelection(item){
    item.classList.toggle("checked");
}