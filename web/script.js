//Map that stores groupName and list of indexes (paths)
let groupMap = {}
let currentEditingGroup = "";
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
            img.dataset.groupName = "";
            img.onclick = () => toggleSelection(img);
            container.appendChild(img);
        }
    });
}

function toggleSelection(item){
    if (item.classList.contains("groupName") && isEditingCurrentGroup(item) == false){
        alert("This clip is already part of a group!")
        return;
    }
    item.classList.toggle("selected");
}

function isEditingCurrentGroup(clip){
    if (clip.dataset.groupName == currentEditingGroup){
        return true;
    }
    else{
        return false;
    }

}

function createGroup(event){
    event.preventDefault();
    let selectedClips = [];
    let selectedElems = [];
    let thumbnails = document.querySelectorAll('.thumbnail');
    let groupName = document.getElementById('group_name_input').value;
    if (groupName === '') {
        alert("You must write something!");
        return;
      }
    //for each thumbnail that is selected, store their paths, change its property to group, 
    //and assign the groupName attribute to it
    thumbnails.forEach((thumb) => {
        if (thumb.classList.contains('selected')) {
            selectedClips.push(thumb.dataset.index);
            selectedElems.push(thumb)
            thumb.classList.remove('selected');
            thumb.classList.add('grouped');
            thumb.classList.dataset.groupName = groupName
        }
    });
    for (elem in selectedElem){
        elem.classList.remove('selected');
        thumb.classList.add('grouped');
        thumb.classList.dataset.groupName = groupName
    }

    console.log(selectedClips);
    groupMap[groupName] = selectedClips
    //eel.create_group(selectedClips, groupName);
    newElement(groupName);
}

//Precondition: groupName is already ....
function newElement(groupName) {
    //new list item
    var li = document.createElement("li");
    var t = document.createTextNode(groupName);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);

}