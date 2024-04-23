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
function checkFileType(file, expectedTypes, errorMsg, toDelete, callback) {
    if (!expectedTypes.includes(file.type)) {
        toDelete.value = null;
        Swal.fire('Error', errorMsg, 'error');
        return;
    }
    // Panggil callback setelah pengecekan selesai
    if (callback) {
        callback();
    }
}

// Fungsi untuk mengubah nama file
function renameFile(file, newName) {
    // Memisahkan nama file dan ekstensi
    const parts = file.name.split('.');
    const fileName = parts.slice(0, -1).join('.'); // Nama file tanpa ekstensi
    const fileExtension = parts.pop(); // Ekstensi file

    // Menambahkan nama baru di akhir nama file dan menggabungkannya kembali dengan ekstensi
    const renamedFileName = newName + '.' + fileExtension;

    // Membuat objek File baru dengan nama yang diubah
    const renamedFile = new File([file], renamedFileName, { type: file.type });
    return renamedFile;
}

function dateFormatting(dateString) {
    // Buat objek Date dari string
    var tanggal = new Date(dateString);

    // Format tanggal menjadi format yang diinginkan (misalnya: dd-mm-yyyy)
    var formattedDate = ("0" + tanggal.getDate()).slice(-2) + "-" + ("0" + (tanggal.getMonth() + 1)).slice(-2) + "-" + tanggal.getFullYear();

    return formattedDate;
}

function PascalCaseWithSpace(text) {
    // Pisahkan teks menjadi array kata
    var words = text.split(/\s+/);
    
    // Iterasi melalui setiap kata dan konversi menjadi PascalCase
    for (var i = 0; i < words.length; i++) {
        // Ubah huruf pertama kata menjadi huruf besar
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    
    // Gabungkan kembali kata-kata dengan spasi di antara dan kembalikan teks
    return words.join(' ');
}

// Fungsi untuk memeriksa apakah input hanya terdiri dari angka
function IsNumber(input) {
    return /^\d+$/.test(input);
}
function LowercaseAndRemoveSpace(text) {
    // Mengonversi setiap huruf menjadi huruf kecil dan menghapus spasi
    return text.toLowerCase().replace(/\s/g, '');
}
// Fungsi untuk reload halaman setelah respon berhasil diterima
function reloadPage() {
    location.reload(true); // Reload halaman dengan membersihkan cache
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

class Spinner {
    constructor(id) {
        this.id = id;
        this.spinnerElement = $(`
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="sr-only">Loading...</span>
        `);
    }

    show() {
        // Tambahkan spinner ke dalam elemen dengan ID yang disediakan
        $(this.id).append(this.spinnerElement);
    }

    destroy() {
        // Hapus spinner dari elemen dengan ID yang disediakan
        $(this.id).find('.spinner-border').remove();
    }
}