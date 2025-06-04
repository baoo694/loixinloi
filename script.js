// Music elements
const bgMusic = document.getElementById('bgMusic')
const musicOverlay = document.getElementById('musicOverlay')
const startButton = document.getElementById('startButton')

// Set initial volume
bgMusic.volume = 0.5

// Function to start music and hide overlay
function startMusic() {
  bgMusic
    .play()
    .then(() => {
      // Music started successfully
      musicOverlay.style.display = 'none'
    })
    .catch((error) => {
      console.error('Error playing music:', error)
    })
}

// Add click event to start button
startButton.addEventListener('click', startMusic)

// Create sparkles
function createSparkle() {
  const sparkle = document.createElement('div')
  sparkle.className = 'sparkle'
  sparkle.style.left = Math.random() * 100 + 'vw'
  sparkle.style.top = Math.random() * 100 + 'vh'
  sparkle.style.animationDelay = Math.random() * 3 + 's'
  document.body.appendChild(sparkle)

  // Remove sparkle after animation
  setTimeout(() => {
    sparkle.remove()
  }, 3000)
}

// Create sparkles periodically
setInterval(createSparkle, 300)

// Create floating hearts
function createHearts() {
  // Create initial batch of hearts
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div')
    heart.className = 'heart'
    heart.style.left = Math.random() * 100 + 'vw'
    heart.style.animationDelay = Math.random() * 2 + 's'
    document.body.appendChild(heart)
  }

  // Continue creating hearts periodically
  setInterval(() => {
    const heart = document.createElement('div')
    heart.className = 'heart'
    heart.style.left = Math.random() * 100 + 'vw'
    heart.style.animationDelay = '0s'
    document.body.appendChild(heart)

    // Remove heart after animation completes
    setTimeout(() => {
      heart.remove()
    }, 6000)
  }, 1000)
}

// Start creating hearts immediately
createHearts()

// Add event listener for the sad button
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('sad-btn')) {
    e.preventDefault() // Prevent any default behavior
    moveButton(e.target)
  }
})

function moveButton(button) {
  // Get viewport dimensions
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // Get button dimensions
  const buttonWidth = button.offsetWidth
  const buttonHeight = button.offsetHeight

  // Calculate safe margins (20px from edges)
  const margin = 20

  // Calculate maximum positions
  const maxX = viewportWidth - buttonWidth - margin
  const maxY = viewportHeight - buttonHeight - margin

  // Ensure minimum positions
  const minX = margin
  const minY = margin

  // Calculate new random position within safe bounds
  const newX = Math.min(Math.max(Math.random() * maxX, minX), maxX)
  const newY = Math.min(Math.max(Math.random() * maxY, minY), maxY)

  // Move button to new position
  button.style.position = 'fixed'
  button.style.left = `${newX}px`
  button.style.top = `${newY}px`

  // Add moving animation
  button.classList.add('moving')

  // Remove animation class after it completes
  setTimeout(() => {
    button.classList.remove('moving')
  }, 500)
}

function showNextCard(mood) {
  const questionCard = document.getElementById('question-card')
  questionCard.style.display = 'none'

  const container = document.querySelector('.container')
  const newCard = document.createElement('div')
  newCard.className = 'card'

  if (mood === 'happy') {
    newCard.innerHTML = `
            <h1>Vậy là hôm nay em ổn rồi… 💖</h1>
            <p class="message-text">Anh mừng lắm, thật đấy.</p>
            <p class="message-text">Anh biết dạo gần đây anh không đủ tốt,<br>
            nhưng nếu được,<br>
            cuối tuần này… mình đi chơi với nhau một chút nhé?</p>
            <p class="message-text">Không phải để bắt đầu lại, chỉ là… để mỉm cười cùng nhau một lần nữa.</p>
            <div class="buttons">
                <button onclick="showInvitation()" class="btn happy-btn">Đồng ý 💝</button>
                <button class="btn sad-btn">Để em suy nghĩ</button>
            </div>
        `
  } else {
    newCard.innerHTML = `
            <h1>Anh xin lỗi… 💔</h1>
            <p class="message-text">Vì có thể chính anh là một phần khiến ngày hôm nay của em tệ hơn.</p>
            <p class="message-text">Nếu có một điều gì đó anh có thể làm để em thấy nhẹ lòng hơn một chút…<br>
            thì cho anh mời em đi chơi cuối tuần này nhé?</p>
            <p class="message-text">Không cần phải nói gì cả.<br>
            Chỉ cần em đến, anh sẽ ở đó – như một người bạn, hoặc… hơn thế, nếu em muốn.</p>
            <div class="buttons">
                <button onclick="showInvitation()" class="btn happy-btn">Đồng ý 💝</button>
                <button class="btn sad-btn">Để em suy nghĩ</button>
            </div>
        `
  }

  container.appendChild(newCard)
}

function showInvitation() {
  const container = document.querySelector('.container')
  // Ẩn slideshow mobile nếu có
  const mobileImg = document.getElementById('mobileBgImage')
  if (mobileImg) mobileImg.style.display = 'none'

  // Kiểm tra mobile
  const isMobile = window.innerWidth <= 600
  if (isMobile) {
    // Ẩn container để không còn khoảng trắng
    container.style.display = 'none'
    // Thêm ảnh date.jpg full màn hình vào body
    let dateDiv = document.getElementById('dateFullscreen')
    if (!dateDiv) {
      dateDiv = document.createElement('div')
      dateDiv.id = 'dateFullscreen'
      dateDiv.className = 'date-fullscreen'
      dateDiv.innerHTML = `<img src="images/date.jpg" alt="Date" />`
      document.body.appendChild(dateDiv)
    } else {
      dateDiv.style.display = 'flex'
    }
  } else {
    container.innerHTML = `
      <div class="card">
        <img src="images/date.jpg" alt="Date" style="width:100%;max-width:400px;display:block;margin:0 auto;border-radius:20px;box-shadow:0 4px 16px rgba(255,107,160,0.13);background:#fff;object-fit:cover;" />
      </div>
    `
  }
}

// Function to create background images grid
function createBackgroundGrid() {
  const grid = document.getElementById('backgroundGrid')
  // Xác định số lượng ảnh dựa trên kích thước màn hình
  const isMobile = window.innerWidth <= 600
  const imageCount = isMobile ? 4 : 8
  grid.innerHTML = ''
  for (let i = 1; i <= imageCount; i++) {
    const img = document.createElement('img')
    img.className = 'background-image'
    img.src = `images/background/image${i}.jpg`
    img.alt = `Background image ${i}`
    img.onerror = function () {
      // Nếu ảnh không tải được, ẩn phần tử đó
      this.style.display = 'none'
    }
    grid.appendChild(img)
  }
}

// Mobile slideshow logic
function setupMobileSlideshow() {
  const mobileImg = document.getElementById('mobileBgImage')
  if (!mobileImg) return
  const images = []
  for (let i = 1; i <= 8; i++) {
    images.push(`images/background/image${i}.jpg`)
  }
  let idx = 0
  function showNext() {
    mobileImg.src = images[idx]
    idx = (idx + 1) % images.length
  }
  showNext()
  setInterval(showNext, 2500)
}

function handleBgDisplay() {
  const isMobile = window.innerWidth <= 600
  const grid = document.getElementById('backgroundGrid')
  const mobileImg = document.getElementById('mobileBgImage')
  if (!mobileImg || !grid) return
  if (isMobile) {
    grid.style.display = 'none'
    mobileImg.style.display = 'block'
  } else {
    grid.style.display = ''
    mobileImg.style.display = 'none'
  }
}

window.addEventListener('resize', handleBgDisplay)
document.addEventListener('DOMContentLoaded', function () {
  createBackgroundGrid()
  createHearts()
  setupMobileSlideshow()
  handleBgDisplay()
})
