module.exports = {
  generate: () => {
    // Độ dài của mã OTP
    const otpLength = 6;

    // Tạo một mảng chứa các chữ số ngẫu nhiên
    const digits = Array.from({ length: otpLength }, () =>
      Math.floor(Math.random() * 10)
    );

    // Kết hợp các chữ số thành một chuỗi
    const otp = digits.join("");

    return otp;
  },
};

// Sử dụng hàm để tạo mã OTP
