// Memeriksa ukuran file yang diunggah
function checkFileSize(file) {
    const maxSize = 200 * 1024;
    if (file.files.length > 0) {
        const fileSize = file.files[0].size;
        if (fileSize > maxSize) {
            alert("File Tidak Boleh Lebih Dari 200kb");

            file.value = "";
            return 0;
        }
    }                                   
}
// Memeriksa jenis tipe file yang akan diunggah
function checkFileType(file, expectedTypes, errorMsg, toDelete) {
    if (!expectedTypes.includes(file.type)) {
        Swal.fire('Error', errorMsg, 'error');
        toDelete.value = null;
        return 0;
    }
}

// Fungsi untuk memeriksa apakah input hanya terdiri dari angka
function IsNumber(input) {
    return /^\d+$/.test(input);
}
function LowercaseAndRemoveSpace(text) {
    // Mengonversi setiap huruf menjadi huruf kecil dan menghapus spasi
    return text.toLowerCase().replace(/\s/g, '');
}

let notyf; // Variabel notyf dideklarasikan di luar event listener
document.addEventListener("DOMContentLoaded", function() {
    // Pustaka notifikasi
    notyf = new Notyf({
        duration: 4000,
        dismissible: false,
        ripple: true,   
        position: {
            x: "right",
            y: "top"
        },
    });
});

function WarningNotif(error) {
    notyf.open({
        type: "error",
        background: "orange",   
        message: error, 
    });
}

function ErrorNotif(error) {
    notyf.open({
        type: "error",
        message: error,
    });
}

function OkeNotif(msg) {
    notyf.open({
        type: "success",
        message: msg,
    })
}

function PurpleNotif(msg) {
    notyf.open({
        type: "info",
        background: "purple",   
        message: msg,
    });
}

function SuccessModal(message) {
    Swal.fire({
        title: 'Success',
        text: message,
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
}
function ErrorModal(message) {
    Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK'
      });
}