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
            img.src = thumb[0];
            img.className = 'thumbnail';
            img.dataset.index = thumb[1];
            img.onclick = () => toggleSelection(img);
            container.appendChild(img);
        }
    });
}

function toggleSelection(item){
    item.classList.toggle("checked");
}

function createGroup(event){
    event.preventDefault();
    let selectedClips = [];
    let thumbnails = document.querySelectorAll('.thumbnail');
    let groupName = document.getElementById('group_name_input').value;
    thumbnails.forEach((thumbnail) => {
        if (thumbnail.classList.contains('checked')) {
            selectedClips.push(thumbnail.dataset.index);
        }
    });
    
    // Now you can use selectedIndices for further processing
    console.log(selectedClips);
    // You can send these indices to your Python backend using eel if needed
    eel.create_group(selectedClips, groupName);
}