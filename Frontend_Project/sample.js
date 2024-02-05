document.addEventListener('DOMContentLoaded', function () {
    // Assume each item is an object with image, price, and totalPrice properties
    const items = [
      { image: 'image/main1.jpg', price: 14499, totalPrice: 14499 },
      // Add more items as needed
    ];
  
    const cartItemsContainer = document.getElementById('cartItems');
  
    // Function to reduce image size
    function reduceImageSize(originalImage, maxWidth, maxHeight) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = originalImage;
  
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          let width = img.width;
          let height = img.height;
  
          // Calculate the new dimensions to maintain the aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
  
          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert the canvas content to a data URL
          const dataURL = canvas.toDataURL('image/jpeg');
  
          // Resolve with the resized image data URL
          resolve(dataURL);
        };
  
        img.onerror = function () {
          reject(new Error('Error loading image'));
        };
      });
    }
  
    // Populate cart items
    items.forEach(async (item) => {
      const row = document.createElement('tr');
  
      // Reduce image size before adding it to the table
      const resizedImage = await reduceImageSize(item.image, 100, 100);
  
      row.innerHTML = `
        <td><img src="${resizedImage}" alt="Product Image" class="img-fluid"></td>
        <td>₹${item.price}</td>
        <td>₹${item.totalPrice}</td>
      `;
      cartItemsContainer.appendChild(row);
    });
  });
  