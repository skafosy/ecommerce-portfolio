# สรุปภาษาไทย — Big B

[English README](../README.md)

[เปิด live demo](https://ecommerce-portfolio-nine-lyart.vercel.app/) — ไม่ต้อง login ใช้ข้อมูลสมมติ ไม่มีการรับเงินจริง

ผลงานชิ้นที่ 2 เน้น React / TypeScript / Tailwind เพื่อเสริมผลงานชิ้นแรกที่เป็น Node.js + PostgreSQL

## ที่มา

เริ่มจากโอกาสทำร้านขาย Nintendo แต่ผู้ที่สนใจจ้างเปลี่ยนไปทำอสังหาริมทรัพย์ก่อนเปิดใช้งานจริง เจ้าของ project เรียนรู้จาก YouTube และใช้ AI ช่วยเมื่อเจอปัญหาหรือหาคำสั่งไม่เจอ ไม่มีออเดอร์จริง

ฉบับนี้เป็น implementation ใหม่ที่ AI ช่วยเตรียมต่อจากโจทย์และเส้นทางใช้งานของงานเดิม ไม่ใช่เพียงเปลี่ยนชื่อแล้วนำระบบเดิมมาเปิด public และไม่อ้างว่าเจ้าของเขียนเองทุกบรรทัด

## ทดลองอะไรได้

- ค้นหาสินค้า กรองหมวดหมู่ เรียงราคา
- เปิดหน้ารายละเอียดสินค้า
- เพิ่ม/ลบ/เปลี่ยนจำนวนในตะกร้า demo และคงข้อมูลหลัง refresh
- ป้องกันจำนวนเกิน stock สมมติ และปิดปุ่มสินค้าหมด
- จบ demo แล้วล้างตะกร้า โดยไม่รับเงินจริงหรือสร้างออเดอร์
- มี empty state, 404 และ error boundary

สินค้า ราคา stock และภาพ SVG เป็นข้อมูลสมมติทั้งหมด ไม่มี login ไม่มีข้อมูลลูกค้า และไม่เชื่อมฐานข้อมูลเก่า

## ตรวจด้วยตัวเอง

ใช้ Node.js 24 LTS แล้วรัน:

```bash
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
npm run dev
```

`check` ต้องผ่าน lint, typecheck, unit/component tests 10 ข้อ และ build จากนั้น Playwright รันทดสอบ 2 เส้นทางบน desktop/mobile Chromium รวม 4 executions

GitHub Actions ของฉบับเริ่มต้นผ่านแล้ว: [ดูผล CI](https://github.com/skafosy/ecommerce-portfolio/actions/runs/38019637415) และวันที่ 10 ตุลาคม 2026 ทดสอบ Playwright บน live demo จริงโดยไม่ login ผ่านทั้ง 4 executions ดูป้าย CI ใน README ภาษาอังกฤษสำหรับสถานะล่าสุด

## การใช้ AI

AI ช่วยเขียน code, tests, ภาพ SVG และเอกสารในรอบเตรียม portfolio นี้ เจ้าของต้องอ่าน diff และทำแบบฝึก [REVIEW-TH.md](REVIEW-TH.md) ก่อนใช้ตอบสัมภาษณ์ โดยเฉพาะ state, props, reducer, hydration และการตรวจ localStorage

ตัวอย่างบั๊กที่พบจริง: ลูกศรบนปุ่ม Clear filters ถูกนับรวมใน accessible name ทำให้เทสต์หา label ไม่เจอ จึงใส่ aria-hidden ให้ลูกศร เรื่องนี้พบด้วย automated checks ในรอบ AI-assisted preparation ไม่อ้างว่าเจ้าของเคยจับได้เอง

[วิธีเผยแพร่ทีละขั้น](RELEASE-TH.md) · [เรื่องเล่าการแก้ปัญหา](CASE-STUDIES.md) · [เครดิต tutorial](https://www.youtube.com/watch?v=dTFXufTgfOE)
