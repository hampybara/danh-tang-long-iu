# 💗 Budget của anh iu — Hướng dẫn từ A đến Z

App theo dõi chi tiêu cá nhân, chạy hoàn toàn trên điện thoại, **không cần server**, dữ liệu lưu riêng tư ngay trên máy (localStorage). Làm quà tặng nên mọi câu chữ đều sửa được dễ dàng 🎀

## 📁 Các file trong thư mục

| File | Là gì |
|---|---|
| `index.html` | Toàn bộ app (giao diện + logic) nằm trong 1 file này |
| `photo.jpg` | Ảnh hiện ở màn hình chào — thay ảnh khác cùng tên là được |
| `manifest.json` | Khai báo PWA (tên app, icon, màu) để add vào Home Screen |
| `service-worker.js` | Giúp app mở được cả khi không có mạng |
| `icons/` | Icon app các cỡ (192, 512, apple-touch-icon) |

## 🚀 Bước 1 — Đưa app lên mạng bằng GitHub Pages (miễn phí)

1. Tạo tài khoản tại [github.com](https://github.com) (nếu chưa có).
2. Bấm nút **+** góc phải trên → **New repository**.
   - Repository name: đặt tên tùy thích, VD `budget-app`.
   - Chọn **Public** → bấm **Create repository**.
3. Trong trang repo mới, bấm **uploading an existing file** (hoặc **Add file → Upload files**).
4. Kéo thả **toàn bộ file và thư mục** trong folder này vào (`index.html`, `manifest.json`, `service-worker.js`, `photo.jpg`, và cả thư mục `icons`) → bấm **Commit changes**.
   - ⚠️ Lưu ý: kéo cả *thư mục* `icons` vào để GitHub giữ đúng cấu trúc `icons/icon-192.png`.
5. Vào **Settings** (của repo) → menu trái chọn **Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/ (root)** → **Save**.
6. Đợi 1–2 phút, quay lại trang Pages sẽ thấy link dạng:
   `https://<tên-github>.github.io/budget-app/`
   → Đây chính là link app! Gửi link này cho người ấy 💌

## 📱 Bước 2 — Add vào Home Screen trên iPhone

1. Mở link app bằng **Safari** (bắt buộc Safari, không dùng Chrome).
2. Bấm nút **Chia sẻ** (ô vuông có mũi tên đi lên ở giữa thanh dưới).
3. Kéo xuống, chọn **Add to Home Screen / Thêm vào MH chính**.
4. Bấm **Add** → icon trái tim hồng xuất hiện trên màn hình chính, mở lên là app chạy full màn hình như app thật ✨

## ✏️ Cách tự sửa câu chữ trong app (không cần biết code)

1. Mở file `index.html` bằng bất kỳ trình soạn thảo nào (Notepad, VS Code...).
   - Nếu đã upload lên GitHub: mở file trên GitHub → bấm icon **✏️ (Edit)** → sửa → **Commit changes** là app tự cập nhật.
2. Ngay đầu file có khối `const TEXT = { ... }` với chú thích tiếng Việt từng dòng.
3. Chỉ cần sửa phần chữ nằm trong dấu nháy `"..."`. Ví dụ:
   ```js
   splashQuestion: "Anh iu chi tiền j đấyyy? 🥺",
   ```
   đổi thành:
   ```js
   splashQuestion: "Hôm nay tiêu gì rồi hả anh? 😤",
   ```
4. **Đừng xóa** dấu nháy `"` và dấu phẩy `,` cuối dòng là được.

Danh mục mặc định + số liệu mặc định (bám theo file Excel gốc) nằm ngay bên dưới, trong `DEFAULT_SETTINGS` và `DEFAULT_CATEGORIES` — cũng sửa tương tự.

## 🖼️ Cách đổi ảnh màn hình chào

Thay file `photo.jpg` bằng ảnh khác, **giữ nguyên tên** `photo.jpg` (upload đè lên GitHub). Nên dùng ảnh dọc, dung lượng < 1MB cho nhẹ.

## 💾 Backup / chuyển dữ liệu sang máy mới

Dữ liệu chỉ lưu trên chính chiếc điện thoại đang dùng, nên khi đổi máy hoặc xóa app cần backup:

1. Trong app, bấm **⚙️** → kéo xuống → **📤 Xuất dữ liệu (backup)** → app tải về 1 file `.json`. Cất file này vào iCloud/Google Drive.
2. Trên máy mới: mở app → **⚙️** → **📥 Nhập dữ liệu** → chọn file `.json` đã lưu → xong, toàn bộ giao dịch và ngân sách quay lại đầy đủ 🎉

> Mẹo: thỉnh thoảng (VD cuối tháng) xuất backup 1 lần cho yên tâm.

## 🔄 Khi sửa code mà iPhone chưa thấy bản mới

Mở file `service-worker.js`, tăng số version ở dòng đầu (VD `"anhiu-budget-v1"` → `"anhiu-budget-v2"`), commit lại. Đóng hẳn app rồi mở lại là thấy bản mới.

## 🧠 App hoạt động thế nào (tóm tắt)

- Mỗi tháng có bộ dữ liệu riêng: cài đặt (thu nhập, tiền mặt đầu tháng, 401k, nợ thẻ...), danh mục + ngân sách từng danh mục, và nhật ký giao dịch.
- Sang tháng mới chưa có dữ liệu → app tự tạo và **sao chép ngân sách của tháng gần nhất trước đó** làm gợi ý, chỉnh lại thoải mái mà không ảnh hưởng tháng cũ.
- Thêm giao dịch: bấm **＋** → gõ số tiền → chạm 1 danh mục là lưu luôn (ngày tự lấy hôm nay, ghi chú không bắt buộc).
- Danh mục thêm/sửa/xóa tự do ngay trong tab **Ngân sách** (trừ Income là mốc thu nhập nên giữ cố định). Xóa/sửa chỉ ảnh hưởng từ tháng hiện tại trở đi, lịch sử tháng cũ giữ nguyên.

Made with 💗
