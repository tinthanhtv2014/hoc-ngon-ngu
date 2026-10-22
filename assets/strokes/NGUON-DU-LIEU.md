# Nguồn dữ liệu thứ tự nét

- `zh.json` — nét chữ Hán (tiếng Trung) lấy từ **hanzi-writer-data** (Hanzi Writer, David Chanin),
  dựa trên dữ liệu **Make Me a Hanzi** (Shaunak Kishore), dùng font Arphic theo
  *Arphic Public License*. https://github.com/chanind/hanzi-writer-data · https://github.com/skishore/makemeahanzi
- `ja.json` — nét chữ tiếng Nhật (hiragana, katakana, kanji) lấy từ **KanjiVG** © Ulrich Apel,
  giấy phép *Creative Commons Attribution-Share Alike 3.0*. https://kanjivg.tagaini.net

Chỉ giữ lại đường nét (path) của các chữ app dùng; thứ tự nét giữ nguyên như bản gốc.

# Giáo trình tập viết tiếng Trung (trong `index.html`, biến `WR_COURSE`)

- Danh sách chữ/từ của 15 bài theo **Giáo trình Hán ngữ Quyển 1** (thứ tự như vở tập viết nhóm đang dùng).
- Cấu tạo chữ (các bộ phận + bộ thủ chính) lấy từ **Make Me a Hanzi** `dictionary.txt` (Arphic Public License).
- Pinyin từng chữ tính bằng thư viện **pinyin-pro** (MIT) theo ngữ cảnh từ, đã soát tay.
- Âm Hán Việt, nghĩa tiếng Việt, tên bộ thủ tiếng Việt: soạn riêng cho app.
