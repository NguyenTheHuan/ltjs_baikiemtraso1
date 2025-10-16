// Tạo lớp học sinh
class hocSinh {
  constructor(maHS, hoTen, lopHoc, diemTB, hanhKiem) {
    this.maHS = maHS;
    this.hoTen = hoTen;
    this.lopHoc = lopHoc;
    this.diemTB = diemTB;
    this.hanhKiem = hanhKiem;
  }
}

// Tạo lớp hệ thống quản lý học sinh
class SchoolSystem {
  constructor() {
    this.danhSach = [];
    this.soLuongHocSinh = 0;
  }

// Khởi tạo dữ liệu ban đầu
    khoiTao(data = []) {
        this.danhSach = data;
        this.soLuongHocSinh = data.length;
    }

// Thêm học sinh qua prompt
    nhapHocSinh() {
        const hoTen = prompt("Nhập họ tên học sinh:");
        const lopHoc = prompt("Nhập lớp học:");
        const diemTB = prompt("Nhập điểm trung bình:");
        const hanhKiem = prompt("Nhập hạnh kiểm (Tốt/Khá/Trung bình/Kém):");

        const hsMoi = new hocSinh("", hoTen, lopHoc, diemTB, hanhKiem);
        const maMoi = this.themHocSinh(hsMoi);

        alert(`Thêm học sinh thành công! Mã học sinh: ${maMoi}`);
    }

// Tự động thêm mã học sinh
    themHocSinh(hocSinh) {
        const nam = new Date().getFullYear();
        const maMoi = `ma${nam}${String(this.soLuongHocSinh + 1).padStart(3, "0")}`;
        hocSinh.maHS = maMoi;
        this.danhSach.push(hocSinh);
        this.soLuongHocSinh++;
        return maMoi;
    }

// Tìm kiếm học sinh theo mã
    timHocSinh(maHS) {
        return this.danhSach.find(hs => hs.maHS === maHS) || null;
    }

 // Tìm học sinh theo tên (gõ tên cuối hoặc đầy đủ đều được)
    timTheoTen(tenNhap) {
        tenNhap = tenNhap.trim().toLowerCase();
        return this.danhSach.filter(hs => {
        const tenDayDu = hs.hoTen.toLowerCase();
        const tenCuoi = tenDayDu.split(" ").pop(); // lấy tên cuối
        return tenDayDu.includes(tenNhap) || tenCuoi === tenNhap;
        });
    }

// Cập nhật thông tin học sinh
    capNhatThongTin(maHS, duLieuMoi) {
        const hs = this.timHocSinh(maHS);
        if (!hs) return false;
        delete duLieuMoi.maHS; // không cho cập nhật mã
        Object.assign(hs, duLieuMoi);
        return true;
    }

// Xóa học sinh theo mã
    xoaHocSinh(maHS) {
        const index = this.danhSach.findIndex(hs => hs.maHS === maHS);
        if (index === -1) return false;
        this.danhSach.splice(index, 1);
        return true;
    }

// Lấy danh sách học sinh theo lớp
    layDanhSachTheoLop(tenLop) {
        return this.danhSach.filter(hs => hs.lopHoc === tenLop);
    }

// Thống kê học lực
    thongKeHocLuc() {
        const thongKe = {
        "Xuất Sắc": 0,
        "Giỏi": 0,
        "Khá": 0,
        "Trung Bình": 0,
        "Kém": 0
        };

    this.danhSach.forEach(hs => {
        if (hs.diemTB >= 9) thongKe["Xuất Sắc"]++;
        else if (hs.diemTB >= 8) thongKe["Giỏi"]++;
        else if (hs.diemTB >= 7) thongKe["Khá"]++;
        else if (hs.diemTB >= 5) thongKe["Trung Bình"]++;
        else thongKe["Kém"]++;
        });
        return thongKe;
    }

    // Xắp xếp học sinh theo điểm trung bình
    sapXepTheoDiem(kieuSapXep = "tang") {
        const dsSapXep = [...this.danhSach].sort((a, b) => 
        kieuSapXep === "tang" ? a.diemTB - b.diemTB : b.diemTB - a.diemTB
        );
        return dsSapXep;
    }

// Thống kê hạnh kiểm
    thongKeHanhKiem() {
        const thongKe = {};
        this.danhSach.forEach(hs => {
        const hk = hs.hanhKiem || "Chưa có";
        thongKe[hk] = (thongKe[hk] || 0) + 1;
        });
        return thongKe;
    }

// Lấy danh sách học sinh theo hạnh kiểm
    layDanhSachTheoHanhKiem(hanhKiem) {
        hanhKiem = hanhKiem.trim().toLowerCase();
        return this.danhSach.filter(
        hs => hs.hanhKiem && hs.hanhKiem.toLowerCase() === hanhKiem
        );
    }
}

// ==========================
// DEMO CHẠY THỬ
// ==========================
// Tạo đối tượng hệ thống quản lý
const truong = new SchoolSystem();

// Khởi tạo dữ liệu mẫu
truong.khoiTao([
  new hocSinh("ma2025001", "Nguyễn Văn An", "10A1", 8.5, "Tốt"),
  new hocSinh("ma2025002", "Trần Thị Ái", "10A2", 9.2, "Tốt"),
  new hocSinh("ma2025003", "Lê Văn Ấn", "10A1", 6.8, "Khá"),
  new hocSinh("ma2025004", "Hoàng Thị Bình", "10A3", 5.4, "Trung Bình"),
  new hocSinh("ma2025005", "Phạm Văn Cường", "10A2", 4.9, "Yếu"),
  new hocSinh("ma2025006", "Đỗ Thị Dung", "10A1", 7.0, "Khá"),
  new hocSinh("ma2025007", "Vũ Văn Đông", "10A3", 8.0, "Tốt"),
  new hocSinh("ma2025008", "Bùi Thị Út", "10A2", 6.5, "Khá")
]);

// Thêm học sinh mới
const maMoi = truong.themHocSinh(new hocSinh(null, "Phạm Thị D", "10A1", 7.5, "Khá"));
console.log("Mã học sinh mới:", maMoi);

// Tìm học sinh
console.log("Tìm học sinh:", truong.timHocSinh("ma2025001"));

// Cập nhật thông tin
truong.capNhatThongTin(maMoi, { diemTB: 8.1, hanhKiem: "Tốt" });

// Xóa học sinh
truong.xoaHocSinh("ma2025002");

// Lọc danh sách theo lớp
console.log("Danh sách lớp 10A1:", truong.layDanhSachTheoLop("10A1"));

// Thống kê học lực
console.log("Thống kê học lực:", truong.thongKeHocLuc());

// Sắp xếp theo điểm giảm dần
console.log("Sắp xếp giam:", truong.sapXepTheoDiem("giam"));

// Thống kê hạnh kiểm
console.log("Thống kê hạnh kiểm:", truong.thongKeHanhKiem());

// Lấy danh sách học sinh có hạnh kiểm "Khá"
console.log("Danh sách hạnh kiểm Khá:", truong.layDanhSachTheoHanhKiem("Khá"));