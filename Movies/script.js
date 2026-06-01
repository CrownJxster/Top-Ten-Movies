console.log("JavaScript is successfully connected!");

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Grab Lightbox Elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  // Track the images of the currently active movie gallery
  let activeGalleryImages = [];
  let currentImgIndex = 0;

  // 2. Setup Click Listeners for Galleries
  // Find every individual movie gallery block on the page
  const galleries = document.querySelectorAll('.movie-gallery');

  console.log("Found " + galleries.length + " galleries!");

  galleries.forEach(gallery => {
    // Get all the images inside THIS specific movie gallery
    const imagesInThisGallery = Array.from(gallery.querySelectorAll('img'));

    imagesInThisGallery.forEach((image, index) => {
      image.addEventListener('click', () => {
        // Save this specific gallery and index to our tracking variables
        activeGalleryImages = imagesInThisGallery;
        currentImgIndex = index;

        // Open Lightbox
        lightboxImg.src = image.src;
        lightbox.style.display = 'flex';
      });
    });
  });

  // 3. Navigation Function (Moves left or right)
  function navigateGallery(direction) {
    // If no gallery is active, do nothing
    if (activeGalleryImages.length === 0) return;

    if (direction === 'next') {
      // Move forward, or loop back to the first image (0) if at the end
      currentImgIndex = (currentImgIndex + 1) % activeGalleryImages.length;
    } else if (direction === 'prev') {
      // Move backward, or loop to the last image if at the beginning
      currentImgIndex = (currentImgIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length;
    }

    // Update the image source seamlessly
    lightboxImg.src = activeGalleryImages[currentImgIndex].src;
  }

  // 4. Keyboard Support (Escape & Arrow Keys)
  document.addEventListener('keydown', (event) => {
    // Check if the lightbox is actually open before doing anything
    if (lightbox.style.display === 'flex') {
      if (event.key === 'Escape') {
        lightbox.style.display = 'none';
      } else if (event.key === 'ArrowRight') {
        navigateGallery('next');
      } else if (event.key === 'ArrowLeft') {
        navigateGallery('prev');
      }
    }
  });

    // 4b. Add Mouse Click Support for the On-Screen Arrow Buttons
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  prevBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Stops the click from accidentally closing the lightbox
    navigateGallery('prev');
  });

  nextBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Stops the click from accidentally closing the lightbox
    navigateGallery('next');
  });

  // 5. Close when clicking the dark overlay background
  lightbox.addEventListener('click', (event) => {
    // Safety check: Don't close if they clicked the image itself or arrow buttons
    if (event.target === lightbox || event.target.classList.contains('close-btn')) {
      lightbox.style.display = 'none';
    }
  });

});

const topBtn = document.querySelector('.back-to-top-btn');

window.addEventListener('scroll', () => {
  // Show button after scrolling down 3000px
  if (window.scrollY > 3000) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});
