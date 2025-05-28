import Swal from 'sweetalert2';


const alertColors = {
  success: '#e63946',
  error: '#b00020',
  warning: '#d62828',
};

export const showAlert = (type, message) => {
  Swal.fire({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    text: message,
    icon: type === 'success' ? undefined : type, // Skip built-in icon for success
    confirmButtonText: 'OK',
    background: '#fff0f0',
    color: alertColors[type] || '#b00020',
    confirmButtonColor: alertColors[type] || '#b00020',
    customClass: {
      icon: `swal-icon-${type}`,
    },
    ...(type === 'success' && {
      html: `
        <div class="custom-check-icon">&#10003;</div>
        <div style="margin-top: 10px;">${message}</div>
      `,
    }),
  });
};
