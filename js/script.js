/* ==========================================================================
   RAJODO OUTDOOR - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Bar
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileClose = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Featured Rentals Catalog Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const rentalCards = document.querySelectorAll('.rental-card');

  if (filterBtns.length > 0 && rentalCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        rentalCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      if (header) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all other open items
          faqItems.forEach(i => i.classList.remove('active'));

          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // 5. Booking Modal & WhatsApp Generator
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const bookingForm = document.getElementById('bookingForm');
  const modalProductSelect = document.getElementById('modalProductSelect');

  function openModal(itemName = '') {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (itemName && modalProductSelect) {
        for (let i = 0; i < modalProductSelect.options.length; i++) {
          if (modalProductSelect.options[i].value.toLowerCase().includes(itemName.toLowerCase())) {
            modalProductSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemName = btn.getAttribute('data-item') || '';
      openModal(itemName);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const basecamp = document.getElementById('modalBasecamp').value;
      const product = document.getElementById('modalProductSelect').value;
      const startDate = document.getElementById('modalDate').value;
      const duration = document.getElementById('modalDuration').value;
      const name = document.getElementById('modalName').value;
      const notes = document.getElementById('modalNotes').value;

      // Select target WhatsApp phone number based on chosen Basecamp
      // BC 1 Pangebatan: 6288233863914 | BC 2 Sunyalangu: 6288200374015
      let phone = '6288233863914';
      let bcName = 'BC 1 Pangebatan';
      if (basecamp === 'bc2') {
        phone = '6288200374015';
        bcName = 'BC 2 Sunyalangu';
      }

      // Construct professional WhatsApp message
      const text = `Halo Admin Rajodo Outdoor (${bcName}), saya ingin konfirmasi sewa perlengkapan:
  
• Nama: ${name || '-'}
• Perlengkapan/Paket: ${product}
• Tanggal Sewa: ${startDate || 'Segera'}
• Durasi: ${duration} Hari
• Catatan Tambahan: ${notes || '-'}

Mohon informasi ketersediaan stok dan konfirmasi booking. Terima kasih!`;

      const encodedText = encodeURIComponent(text);
      const waUrl = `https://wa.me/${phone}?text=${encodedText}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');
      closeModal();
    });
  }
});
