document.addEventListener("DOMContentLoaded", function() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const MAX_IMAGES = 5;

    // Carousel functionality
    const carouselItems = document.querySelector('.carousel-items');
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000); // Auto slide change every 3 seconds

    // Function to handle dragover event
    dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    // Function to handle dragleave event
    dropzone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dropzone.classList.remove('dragover');
    });

    // Function to handle drop event
    dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Function to handle file input change event
    fileInput.addEventListener('change', function(e) {
        const files = e.target.files;
        handleFiles(files);
    });

    // Function to handle file upload and display
    function handleFiles(files) {
        if (fileList.childElementCount + files.length > MAX_IMAGES) {
            alert('You can upload a maximum of ' + MAX_IMAGES + ' images.');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.match('image.*') && file.size < 1048576) {
                displayFile(file);
            } else {
                alert('Please upload images below 1MB in size.');
            }
        }
    }

    // Function to display uploaded file with description
    function displayFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const div = document.createElement('div');
            div.className = 'file-name';
        
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;
            img.className = 'thumbnail';
            div.appendChild(img);

            const descriptionText = document.createElement('textarea');
            descriptionText.setAttribute('placeholder', 'Enter description...');
            div.appendChild(descriptionText);
            
            fileList.appendChild(div);
        }
        reader.readAsDataURL(file);
    }

    // Function to load data from localStorage
    function loadFromLocalStorage() {
        const storedImagesData = JSON.parse(localStorage.getItem('storedImagesData') || '[]');
        console.log("Loaded from localStorage:", storedImagesData);
        storedImagesData.forEach(data => {
            const div = document.createElement('div');
            div.className = 'file-name';
    
            const img = document.createElement('img');
            img.src = data.src;
            img.className = 'thumbnail';
            div.appendChild(img);
            
            const descriptionText = document.createElement('div');
            descriptionText.textContent = data.description;
            div.appendChild(descriptionText);
            
            fileList.appendChild(div);
        });
    }

    loadFromLocalStorage();
});
