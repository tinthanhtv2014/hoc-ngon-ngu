# App Học Ngôn Ngữ — bản web app (PWA)

## Cấu trúc
```
index.html            trang chính (đã tách ảnh/model ra file riêng)
manifest.webmanifest  thông tin app: tên, icon, màu, chạy toàn màn hình
sw.js                 service worker: cho app chạy offline
icons/                icon màn hình chính
assets/               ảnh + model 3D game Backroom
vendor/               three.js (dự phòng, bản chính đã nhúng trong index.html)
```

## Đưa lên mạng (cần HTTPS)
Chọn 1 trong các cách:
- **Netlify Drop**: vào https://app.netlify.com/drop, kéo-thả nguyên thư mục này vào.
- **Cloudflare Pages**: Workers & Pages → Create → Pages → Upload assets → kéo thư mục vào.
- **GitHub Pages**: đẩy thư mục lên 1 repo → Settings → Pages → Deploy from branch `main` / root.
- **Server nội bộ**: copy nguyên thư mục lên web server có HTTPS.

## Cài lên iPhone
Mở link bằng **Safari** → nút **Chia sẻ** → **Thêm vào MH chính**.
(Mở link từ Zalo/Messenger thì phải chọn "Mở bằng Safari" trước. App có tự hiện nhắc.)

## Cập nhật app
1. Sửa file, up lại lên host.
2. Mở `sw.js`, tăng `VERSION` (vd `'v1'` → `'v2'`). Không tăng thì máy người dùng có thể vẫn giữ ảnh/model cũ.
3. Người dùng mở app (có mạng) là tự nhận bản mới; đôi khi cần tắt hẳn app rồi mở lại 1 lần.

## Chạy thử trên máy
```
python3 -m http.server 8797
```
rồi mở http://localhost:8797

## Dữ liệu thứ tự nét
`assets/strokes/zh.json` (tiếng Trung) và `assets/strokes/ja.json` (tiếng Nhật) chứa nét của các chữ app đang dùng.
Thêm từ mới có chữ chưa có trong file thì chữ đó chỉ hiện mẫu, không có các bước nét — nhờ Claude tải thêm.
Nguồn và giấy phép: xem `assets/strokes/NGUON-DU-LIEU.md`.

## Giáo trình tập viết tiếng Trung
Phần Luyện viết → tiếng Trung có 15 bài Giáo trình Hán ngữ Q1 + 50 bộ thủ (dữ liệu trong `index.html`, tìm `WR_COURSE`).
Mỗi bài có bảng chữ (phiên âm, Hán Việt, nghĩa, cấu tạo) và vở tập viết từng chữ.

## Lưu tiến độ
Tiến độ (XP, chuỗi ngày, bài đã xong, điểm cao nhất, bài đang viết dở) lưu trong trình duyệt của từng máy (localStorage).
Xoá dữ liệu Safari / gỡ app khỏi màn hình chính là mất tiến độ. Mỗi máy có tiến độ riêng, không đồng bộ giữa các máy.
