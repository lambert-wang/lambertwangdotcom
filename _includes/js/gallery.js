
const DESIRED_ROW_HEIGHT = 128;
const IMAGE_MARGIN = 8;

function layoutImages() {
    let container = document.getElementsByClassName('gallery-container')[0];
    let images = container.getElementsByClassName('gallery-image');

    let containerWidth = container.clientWidth;
    let desiredAspectRatio = containerWidth / DESIRED_ROW_HEIGHT;

    let rowWidth = 0;
    let rowImageStart = 0;
    for (let i = 0; i < images.length; i++) {
        let image = images[i];

        if (image.offsetWidth === 0) {
            continue;
        }

        let imageScale = DESIRED_ROW_HEIGHT / image.naturalHeight;
        let scaledWidth = imageScale * image.naturalWidth + IMAGE_MARGIN;

        rowWidth += scaledWidth;
        if (rowWidth / DESIRED_ROW_HEIGHT > desiredAspectRatio || i == images.length - 1) {
            console.log('Laying out images');

            let rowHeight = DESIRED_ROW_HEIGHT * containerWidth / rowWidth;
            for (let j = rowImageStart; j <= i; j++) {
                let target = images[j];
                let imageWidth = target.naturalWidth * rowHeight / target.naturalHeight - IMAGE_MARGIN;

                console.log('Setting image ' + j + ' height: ' + rowHeight + ' width: ' + imageWidth);

                target.style.height = rowHeight + "px";
                target.style.width = imageWidth + "px";
                target.style.visibility = 'visible';
            }

            rowWidth = 0;
            rowImageStart = i + 1;
        }
    }
}

function setTarget() {
    let expand= document.getElementsByClassName('gallery-expand')[0];
    let expandTarget = document.getElementsByClassName('gallery-expand-target')[0];
    expand.style.display = 'block';
    expandTarget.src = this.src;
}

function clearTarget() {
    let expand= document.getElementsByClassName('gallery-expand')[0];
    expand.style.display = 'none';
}

for (let i of document.getElementsByClassName('gallery-image')) {
    i.onload = layoutImages;
    i.onclick = setTarget;
}

// Borrowed from developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

window.addEventListener("resize", layoutImages);
