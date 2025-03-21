// ຫນ້າສະແດງສິນຄ້າ
if (document.getElementById('product-list')) {
  fetch('/products')
    .then(res => res.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      products.forEach(product => {
        productList.innerHTML += `
          <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover rounded-t-2xl">
            <h2 class="text-xl font-semibold mt-4 text-gray-800">${product.name}</h2>
            <p class="text-gray-600 mt-1">$${product.price.toLocaleString()}</p>
            <button onclick="location.href='/product.html?id=${product.id}'" 
                    class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full">
              View Details
            </button>
          </div>
        `;
      });
    })
    .catch(err => console.error('Error:', err));
}

// ຫນ້າລາຍລະອຽດສິນຄ້າ
if (document.getElementById('product-detail')) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  fetch('/products')
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      const productDetail = document.getElementById('product-detail');
      productDetail.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 h-72 object-cover rounded-2xl shadow-md">
        <div class="flex-1">
          <h2 class="text-3xl font-bold text-gray-800">${product.name}</h2>
          <p class="text-gray-600 mt-2 text-lg">$${product.price.toLocaleString()}</p>
          <p class="mt-4 text-gray-700 leading-relaxed">${product.description}</p>
        </div>
      `;
      
      const reviewList = document.getElementById('review-list');
      fetch(`/reviews/${productId}`)
        .then(res => res.json())
        .then(reviews => {
          reviews.forEach(review => {
            reviewList.innerHTML += `
              <div class="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
                <p class="text-gray-800">${review}</p>
              </div>
            `;
          });
        });
    });

  document.getElementById('submit-review').addEventListener('click', () => {
    const reviewInput = document.getElementById('review-input').value;
    if (reviewInput) {
      fetch('/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, review: reviewInput })
      })
      .then(res => res.json())
      .then(data => {
        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML += `
          <div class="bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200">
            <p class="text-gray-800">${reviewInput}</p>
          </div>
        `;
        document.getElementById('review-input').value = '';
      });
    }
  });
}